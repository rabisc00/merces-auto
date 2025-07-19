import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import Trip from "../models/trip";
import Timetable from "../models/timetable";
import BusRoute from "../models/busRoute";
import Bus from "../models/bus";
import Driver from "../models/driver";
import User from "../models/user";

export const createTrip = async function (req: AuthRequest, res: Response) {
    try {
        const { 
            numberOfPassengers, 
            observations, 
            driverId, 
            busId, 
            timetableId 
        } = req.body;

        await Trip.create({
            numberOfPassengers,
            observations,
            driverId,
            busId,
            timetableId
        });
        return res.json({ message: 'Trip created successfully' });
    } catch (error: any) {
        console.error('Error creating trip:', error);
        return res.status(500).json({ error: 'Error creating trip' });
    }
};

export const editTrip = async function (req: AuthRequest, res: Response) {
    try {
        const { 
            numberOfPassengers, 
            observations, 
            driverId, 
            busId,
            timetableId
        } = req.body;
        const id = req.params.id;
        
        const tripFound = await Trip.findByPk(id);
        if (!tripFound) {
            return res.status(400).json({ error: 'Trip with the given id not found' });
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

        if (driverId && tripFound.driverId !== driverId) {
            tripFound.driverId = driverId;
            changed = true;
        }

        if (busId && tripFound.busId !== busId) {
            tripFound.busId = busId;
            changed = true;
        }

        if (timetableId && tripFound.timetableId !== timetableId) {
            tripFound.timetableId = timetableId;
            changed = true;
        }

        if (changed) {
            await tripFound.save();
            return res.json({ message: 'Trip updated successfully' });
        } else {
            return res.json({ message: 'No changes were made' });
        }
    } catch (error: any) {
        console.error('Error updating trip:', error);
        return res.status(500).json({ error: 'Error updating trip' });
    }
};

export const deleteTrip = async function(req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const tripFound = await Trip.findByPk(id);
        if (!tripFound) {
            return res.status(400).json({ error: 'Trip with the given id not found'});
        }   

        await tripFound.destroy();
        return res.json({ message: 'Trip deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting trip:', error);
        return res.status(500).json({ error: 'Error deleting trip' });
    }
};

export const getTripsByDriver = async function(req: AuthRequest, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * 10;
    const limit = 10;
    const driverId = req.params.driverId;

    try {
        const { count, rows } = await Trip.findAndCountAll({ 
            offset,
            limit,
            where: { driverId },
            attributes: ['id', 'numberOfPassengers'],
            include: [{
                model: Timetable,
                attributes: ['arrivalTime', 'departureTime'],
                include: [{
                    model: BusRoute,
                    attributes: ['lineNumber', 'origin', 'destination']
                }]
            }]
        });
        
        return res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            trips: rows
        });
    } catch (error: any) {
        console.error('Error fetching trips by driver:', error);
        return res.status(500).json({ error: 'Error fetching trips by driver' });
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
            attributes: ['id', 'numberOfPassengers'],
            include: [{
                model: Timetable,
                attributes: ['arrivalTime', 'departureTime'],
                include: [{
                    model: BusRoute,
                    attributes: ['origin', 'destination']
                }]
            }]
        });
        
        return res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            trips: rows
        });
    } catch (error: any) {
        console.error('Error fetching trips by bus:', error);
        return res.status(500).json({ error: 'Error fetching trips by bus' });
    }
};

export const getTripDetails = async function(req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const tripFound = await Trip.findByPk(id, {
            attributes: ['id', 'numberOfPassengers', 'observations'],
            include: [{
                model: Bus,
                attributes: ['busNumber', 'model', 'capacity', 'manufacturingYear']
            }, {
                model: Driver,
                attributes: ['documentNumber', 'name', 'picture']
            }, {
                model: Timetable,
                attributes: ['arrivalTime', 'departureTime'],
                include: [{
                    model: BusRoute,
                    attributes: ['lineNumber', 'origin', 'destination', 'distanceInKm', 'averageTimeInMinutes']
                }]
            }]
        });

        return res.json(tripFound);
    } catch (error: any) {
        console.error('Error fetching trip details:', error);
        return res.status(500).json({ error: 'Error fetching trip details' });
    }
};