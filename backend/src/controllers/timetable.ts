import { Response } from "express";
import dayjs from '../utils/dayjs';
import { AuthRequest } from "../types/authRequest";
import Timetable from "../models/timetable";
import DayOfTheWeek from "../models/dayOfTheWeek";
import BusRoute from "../models/busRoute";
import { HTTP_MESSAGES } from "../constants/httpMessages";

export const createTimetable = async function(req: AuthRequest, res: Response) {
    try {
        const { busRouteId, arrivalTime, departureTime, days } = req.body;

        const timetable = await Timetable.create({
            routeId: busRouteId,
            arrivalTime: arrivalTime,
            departureTime: departureTime
        });

        const daysMap = days.map((d: string) => parseInt(d))

        const dayRecords = await DayOfTheWeek.findAll({
            where: { dayId: daysMap }
        });

        const foundDayIds = dayRecords.map(record => record.dayId);
        const invalidDays = daysMap.filter((day: number) => !foundDayIds.includes(day));

        if (invalidDays.length > 0) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        await timetable.$set('days', dayRecords);

        return res.json({ 
            message: 'Timetable created successfully',
            id: timetable.id
        });
    } catch (error: any) {
        console.error('Error creating timetable:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const editTimetable = async function(req: AuthRequest, res: Response) {
    try {
        const { busRouteId, arrivalTime, departureTime, days } = req.body;
        const id = req.params.id;

        const timetableFound = await Timetable.findByPk(id, {
            include: [DayOfTheWeek]
        });

        if (!timetableFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        let changed = false;

        if (busRouteId && timetableFound.routeId !== busRouteId) {
            const busRouteFound = await BusRoute.findByPk(busRouteId);
            if (!busRouteFound) {
                return res.status(400).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
            }

            timetableFound.routeId = busRouteId;
        }

        if (arrivalTime && timetableFound.arrivalTime !== arrivalTime) {
            timetableFound.arrivalTime = arrivalTime;
            changed = true;
        }

        if (departureTime && timetableFound.departureTime !== departureTime) {
            timetableFound.departureTime = departureTime;
            changed = true;
        }

        if (changed) {
            await timetableFound.save(); 
        } 

        if (days != null) {;
            const dayRecords = await DayOfTheWeek.findAll({
                where: { dayId: days }
            });

            await timetableFound.$set('days', dayRecords);
        }

        return res.json({ message: HTTP_MESSAGES.OK });
    } catch (error: any) {
        console.error('Error updating timetable:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const deleteTimetable = async function (req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const timetableFound = await Timetable.findByPk(id);
        if (!timetableFound) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        await timetableFound.destroy();
        return res.json({ message: HTTP_MESSAGES.OK });
    } catch (error: any) {
        console.error('Error deleting timetable:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getTimetableByDate = async function (req: AuthRequest, res: Response) {
    try {
        const date = new Date(req.query.date as string);
        const routeId = req.params.routeId;
        const dayIndex = date.getDay();

        const timetables = await Timetable.findAll({
            attributes: ['id', 'arrivalTime', 'departureTime'],
            where: {
                routeId: routeId
            },
            include: [{
                model: DayOfTheWeek,
                attributes: ['dayId'],
                where: {
                    dayId: dayIndex
                },
                through: { attributes: [] }
            }, {
                model: BusRoute,
                attributes: ['id', 'lineNumber', 'origin', 'destination']
            }]
        });

        return res.json(timetables);
    } catch (error: any) {
        console.error('Error fetching timetables by date:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getTimetableDetails = async function (req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const timetableFound = await Timetable.findByPk(id, {
            attributes: ['id', 'arrivalTime', 'departureTime', 'createdAt', 'updatedAt'],
            include: [{
                model: BusRoute,
                attributes: ['id', 'lineNumber', 'origin', 'destination'],
            }, {
                model: DayOfTheWeek,
                attributes: ['dayId'],
                through: { attributes: [] }
            }]
        });

        if (!timetableFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        return res.json(timetableFound);
    } catch (error: any) {
        console.error('Error fetching timetable details', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getTimetables = async function (req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Timetable.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'arrivalTime', 'departureTime'],
            include: [{
                model: DayOfTheWeek,
                attributes: ['dayId'],
                through: { attributes: [] }
            }, {
                model: BusRoute,
                attributes: ['id', 'lineNumber', 'origin', 'destination']
            }]
        });

        return res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            records: rows
        });
    } catch (error: any) {
        console.error('Error fetching timetables:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}