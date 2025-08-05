import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import Trip from "../models/trip";
import Timetable from "../models/timetable";
import BusRoute from "../models/busRoute";
import Bus from "../models/bus";
import User from "../models/user";
import { HTTP_MESSAGES } from "../constants/httpMessages";

export const createTrip = async function (req: AuthRequest, res: Response) {
    try {
        const { 
            numberOfPassengers, 
            observations, 
            date,
            userId, 
            busId, 
            timetableId
        } = req.body;

        const trip = await Trip.create({
            numberOfPassengers,
            observations,
            date,
            userId,
            busId,
            timetableId
        });
        return res.json({ 
            message: 'Trip created successfully',
            id: trip.id
        });
    } catch (error: any) {
        console.error('Error creating trip:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const editTrip = async function (req: AuthRequest, res: Response) {
    try {
        const { 
            numberOfPassengers, 
            observations, 
            date,
            userId, 
            busId,
            timetableId
        } = req.body;
        const id = req.params.id;
        
        const tripFound = await Trip.findByPk(id);
        if (!tripFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        let changed = false;

        if (numberOfPassengers && tripFound.numberOfPassengers !== numberOfPassengers) {
            tripFound.numberOfPassengers = numberOfPassengers;
            changed = true;
        }

        if (observations && tripFound.observations !== observations) {
            tripFound.observations = observations;
            changed = true;
        }

        if (date && tripFound.date !== date) {
            tripFound.date = date;
            changed = true;
        }

        if (userId && tripFound.userId !== userId) {
            const userFound = await User.findByPk(userId);
            if (!userFound) {
                return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
            }

            await tripFound.$set('user', userFound);
            changed = true;
        }

        if (busId && tripFound.busId !== busId) {
            const busFound = await Bus.findByPk(busId);
            if (!busFound) {
                return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
            }

            await tripFound.$set('bus', busFound);
            changed = true;
        }

        if (timetableId && tripFound.timetableId !== timetableId) {
            const timetableFound = await Timetable.findByPk(timetableId);
            if (!timetableFound) {
                return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
            }

            await tripFound.$set('timetable', timetableFound);
            changed = true;
        }

        if (changed) {
            await tripFound.save();
            return res.json({ message: HTTP_MESSAGES.OK });
        } else {
            return res.json({ message: HTTP_MESSAGES.NO_CHANGES });
        }
    } catch (error: any) {
        console.error('Error updating trip:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const deleteTrip = async function(req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const tripFound = await Trip.findByPk(id);
        if (!tripFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }   

        await tripFound.destroy();
        return res.json({ message: HTTP_MESSAGES.OK });
    } catch (error: any) {
        console.error('Error deleting trip:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getTripsByUser = async function(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * 10;
    const limit = 10;
    const userId = req.params.userId;

    try {
        const { count, rows } = await Trip.findAndCountAll({ 
            offset,
            limit,
            where: { userId },
            attributes: ['id', 'numberOfPassengers', 'date'],
            include: [{
                model: Timetable,
                attributes: ['id', 'departureTime', 'arrivalTime'],
                include: [{
                    model: BusRoute,
                    attributes: ['id', 'lineNumber', 'origin', 'destination']
                }]
            }]
        });
        
        return res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            records: rows
        });
    } catch (error: any) {
        console.error('Error fetching trips by user:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.OK });
    }
};

export const getTripsByBus = async function(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * 10;
    const limit = 10;
    const busId = req.params.busId;

    try {
        const { count, rows } = await Trip.findAndCountAll({ 
            offset,
            limit,
            where: { busId },
            attributes: ['id', 'numberOfPassengers', 'date'],
            include: [{
                model: Timetable,
                attributes: ['id', 'arrivalTime', 'departureTime'],
                include: [{
                    model: BusRoute,
                    attributes: ['id', 'lineNumber', 'origin', 'destination']
                }]
            }]
        });
        
        return res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            records: rows
        });
    } catch (error: any) {
        console.error('Error fetching trips by bus:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getTripDetails = async function(req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const tripFound = await Trip.findByPk(id, {
            attributes: ['id', 'numberOfPassengers', 'observations', 'date'],
            include: [{
                model: Bus,
                attributes: ['id', 'busNumber', 'model']
            }, {
                model: User,
                attributes: ['id', 'documentNumber', 'name']
            }, {
                model: Timetable,
                attributes: ['id', 'arrivalTime', 'departureTime'],
                include: [{
                    model: BusRoute,
                    attributes: ['lineNumber', 'origin', 'destination', 'distanceInKm', 'averageTimeInMinutes']
                }]
            }]
        });

        if (!tripFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        return res.json(tripFound);
    } catch (error: any) {
        console.error('Error fetching trip details:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};