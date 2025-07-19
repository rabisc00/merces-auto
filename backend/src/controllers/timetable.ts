import { Response } from "express";
import dayjs from '../utils/dayjs';
import { AuthRequest } from "../types/authRequest";
import Timetable from "../models/timetable";
import DayOfTheWeek from "../models/dayOfTheWeek";
import { SQL_DATE_FORMAT } from "../constants/date";

export const createTimetable = async function(req: AuthRequest, res: Response) {
    try {
        const { busRouteId, arrivalTime, departureTime, days } = req.body;

        const formattedArrivalTime = new Date(arrivalTime);
        const formattedDepartureTime = new Date(departureTime);

        const timetable = await Timetable.create({
            routeId: busRouteId,
            arrivalTime: formattedArrivalTime,
            departureTime: formattedDepartureTime
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

        const formattedArrivalTime = dayjs(timetableFound.arrivalTime).format(SQL_DATE_FORMAT);
        const formattedDepartureTime = dayjs(timetableFound.departureTime).format(SQL_DATE_FORMAT);

        let changed = false;

        if (arrivalTime && formattedArrivalTime !== arrivalTime) {
            timetableFound.arrivalTime = arrivalTime;
            changed = true;
        }

        if (departureTime && formattedDepartureTime !== departureTime) {
            timetableFound.departureTime = departureTime;
            changed = true;
        }

        if (changed) {
            await timetableFound.save(); 
        } 

        const newDayRecords = await Promise.all(
            days.map(async (dayName) => {
                const [day] = await DayOfTheWeek.findOrCreate({ where: { name: dayName } });
                return day;
            })
        );

        await timetableFound.$set('days', newDayRecords);
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

export const getTimetables = async function (req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * 10;
        const limit = 10;

        const { count, rows } = await Timetable.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'arrivalTime', 'departureTime']
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
            attributes: ['id', 'arrivalTime', 'departureTime', 'createdAt', 'updatedAt']
        });

        return res.json({ timetableFound })
    } catch (error: any) {
        console.error('Error fetching timetable details', error);
        return res.status(500).json({ error: 'Error fetching timetable details' });
    }
}