import { Response } from "express";
import dayjs from '../utils/dayjs';
import { AuthRequest } from "../types/authRequest";
import Timetable from "../models/timetable";
import DayOfTheWeek from "../models/dayOfTheWeek";
import { SQL_DATE_FORMAT } from "../constants/date";
import BusRoute from "../models/busRoute";

export const createTimetable = async function(req: AuthRequest, res: Response) {
    try {
        const { busRouteId, arrivalTime, departureTime, days } = req.body;

        const dayjsArrivalTime = dayjs(arrivalTime);
        const dayjsDepartureTime = dayjs(departureTime);

        if (!dayjsDepartureTime.isAfter(dayjsArrivalTime)) {
            return res.status(400).json({ error: 'departureTime must be after arrivalTime' });
        }

        const timetable = await Timetable.create({
            routeId: busRouteId,
            arrivalTime: dayjsArrivalTime.toDate(),
            departureTime: dayjsDepartureTime.toDate()
        });

        const dayRecords = await Promise.all(
            days.map(async (day: string) => {
                const [dayRecord] = await DayOfTheWeek.findOrCreate({ where: { name: day.toUpperCase() } });
                return dayRecord
            })
        );

        await timetable.$set('days', dayRecords);

        return res.json({ message: 'Timetable created successfully' });
    } catch (error: any) {
        console.error('Error creating timetable:', error);
        return res.status(500).json({ error: 'Error creating timetable' });
    }
};

export const editTimetable = async function(req: AuthRequest, res: Response) {
    try {
        const { arrivalTime, departureTime, days } = req.body;
        const id = req.params.id;

        const timetableFound = await Timetable.findByPk(id, {
            include: [DayOfTheWeek]
        });

        if (!timetableFound) {
            return res.status(400).json({ error: 'Timetable with the given id not found' });
        }

        const existingArrival = dayjs(timetableFound.arrivalTime);
        const existingDeparture = dayjs(timetableFound.departureTime);

        const newArrival = arrivalTime ? dayjs(arrivalTime) : existingArrival;
        const newDeparture = departureTime ? dayjs(departureTime) : existingDeparture;

        if (!newDeparture.isAfter(newArrival)) {
            return res.status(400).json({ error: 'departureTime must be after arrivalTime' });
        }

        let changed = false;

        // Only update if the new value is different from what's in DB
        if (arrivalTime && !newArrival.isSame(existingArrival)) {
            timetableFound.arrivalTime = newArrival.toDate();
            changed = true;
        }

        if (departureTime && !newDeparture.isSame(existingDeparture)) {
            timetableFound.departureTime = newDeparture.toDate();
            changed = true;
        }

        if (changed) {
            await timetableFound.save(); 
        } 

        if (days != null) {
            const newDayRecords = await Promise.all(
                days.map(async (dayName) => {
                    const [day] = await DayOfTheWeek.findOrCreate({ where: { name: dayName } });
                    return day;
                })
            );

            await timetableFound.$set('days', newDayRecords);
        }

        return res.json({ message: 'Timetable updated successfully' });
    } catch (error: any) {
        console.error('Error updating timetable:', error);
        return res.status(500).json({ error: 'Error updating timetable' });
    }
};

export const deleteTimetable = async function (req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const timetableFound = await Timetable.findByPk(id);
        if (!timetableFound) {
            return res.status(400).json({ error: 'Timetable with the given id not found'});
        }

        await timetableFound.destroy();
        return res.json({ message: 'Timetable deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting timetable:', error);
        return res.status(500).json({ error: 'Error deleting timetable' });
    }
};

export const getTimetablesByRouteId = async function (req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * 10;
        const limit = 10;
        const routeId = req.params.routeId;

        const { count, rows } = await Timetable.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'arrivalTime', 'departureTime'],
            where: { routeId },
            include: [{
                model: BusRoute,
                attributes: ['id', 'lineNumber', 'origin', 'destination']
            }]
        });

        return res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            timetables: rows
        });
    } catch (error: any) {
        console.error('Error fetching timetables:', error);
        return res.status(500).json({ error: 'Error fetching timetable' });
    }
};

export const getTimetableDetails = async function (req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const timetableFound = await Timetable.findByPk(id, {
            attributes: ['id', 'arrivalTime', 'departureTime', 'createdAt', 'updatedAt'],
            include: [{
                model: BusRoute,
                attributes: ['id', 'lineNumber', 'origin', 'destination']
            }]
        });

        if (!timetableFound) {
            return res.status(404).json({ error: 'Timetable with the given ID not found' });
        }

        return res.json(timetableFound);
    } catch (error: any) {
        console.error('Error fetching timetable details', error);
        return res.status(500).json({ error: 'Error fetching timetable details' });
    }
};