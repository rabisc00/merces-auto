import { Response } from "express";
import dayjs from '../utils/dayjs';
import { AuthRequest } from "../types/authRequest";
import BusRouteTimetable from "../models/busRouteTimetable";
import DayOfTheWeek from "../models/dayOfTheWeek";
import { SQL_DATE_FORMAT } from "../constants/date";

export const createBusRouteTimetable = async function(req: AuthRequest, res: Response) {
    const { busRouteId, arrivalTime, departureTime, days } = req.body;

    try {
        const formattedArrivalTime = new Date(arrivalTime);
        const formattedDepartureTime = new Date(departureTime);

        const timetable = await BusRouteTimetable.create({
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

export const editBusRouteTimetable = async function(req: AuthRequest, res: Response) {
    const { arrivalTime, departureTime, days } = req.body;
    const id = req.params.id;

    try {
        const timetableFound = await BusRouteTimetable.findByPk(id, {
            include: [DayOfTheWeek]
        });

        if (!timetableFound) {
            return res.status(400).json({ error: 'No timetable with the given id found' });
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

export const deleteBusRouteTimetable = async function (req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const timetableFound = await BusRouteTimetable.findByPk(id);
        if (!timetableFound) {
            return res.status(400).json({ error: 'Timetable with the given id not found'});
        }

        await timetableFound.destroy();
        return res.json({ message: 'Timetable deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting timetable', error);
        return res.status(500).json({ error: 'Error deleting timetable' });
    }
};

export const getBusRouteTimetables = async function (req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * 10;
    const limit = 10;

    try {
        const { count, rows } = await BusRouteTimetable.findAndCountAll({
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
}