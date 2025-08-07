import { Op } from 'sequelize';
import BusRoute from "../models/busRoute";
import { getTripTime } from "../services/googleMapsService";
import { AuthRequest } from "../types/authRequest";
import { Response } from "express";
import { HTTP_MESSAGES } from '../constants/httpMessages';

export const createBusRoute = async function (req: AuthRequest, res: Response) {
    let { lineNumber, origin, destination } = req.body;

    lineNumber = lineNumber.toUpperCase();
    origin = origin.toUpperCase();
    destination = destination.toUpperCase();

    try {
        const tripInfo = await getTripTime(origin, destination);

        const distanceInKm = Math.round(tripInfo.distanceInMeters / 1000);
        const averageTimeInMinutes = Math.round(tripInfo.durationInSeconds / 60);

        const busRoute = await BusRoute.create({
            lineNumber,
            origin,
            destination,
            distanceInKm,
            averageTimeInMinutes
        });

        return res.json({ 
            message: HTTP_MESSAGES.OK,
            id: busRoute.id
        });
    } catch (error: any) {
        console.error('Error creating bus route:', error);
        res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const editBusRoute = async function (req: AuthRequest, res: Response) {
    const { lineNumber, origin, destination } = req.body;
    const id = req.params.id;

    const lineNumberFormatted = lineNumber && lineNumber.toUpperCase();
    const originFormatted = origin && origin.toUpperCase();
    const destinationFormatted = destination && destination.toUpperCase();

    try {
        const busRouteFound = await BusRoute.findByPk(id);
        if (!busRouteFound) {
            return res.status(404).json({ error: 'Bus route with the given id not found' });
        }
        
        let changed = false;

        if (lineNumberFormatted && busRouteFound.lineNumber !== lineNumberFormatted) {
            busRouteFound.lineNumber = lineNumberFormatted;
            changed = true;
        }

        if (originFormatted && busRouteFound.origin !== originFormatted) {
            busRouteFound.origin = originFormatted;
            changed = true;
        }

        if (destinationFormatted && busRouteFound.destination !== destinationFormatted) {
            busRouteFound.destination = destinationFormatted;
            changed = true;
        }

        if (changed) {
            const tripInfo = await getTripTime(origin || busRouteFound.origin, destination || busRouteFound.destination);
                
            busRouteFound.distanceInKm = Math.round(tripInfo.distanceInMeters / 1000);
            busRouteFound.averageTimeInMinutes = Math.round(tripInfo.durationInSeconds / 60);
            
            await busRouteFound.save();
            return res.json({ message: HTTP_MESSAGES.OK });
        } else {
            return res.json({ message: HTTP_MESSAGES.NO_CHANGES });
        }
    } catch (error: any) {
        console.error('Error updating bus route:', error);
        return res.status(500).json({ error: 'Error updating bus route' });
    }
};

export const deleteBusRoute = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const busRouteFound = await BusRoute.findByPk(id);
        if (!busRouteFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        busRouteFound.destroy();
        return res.json({ message: HTTP_MESSAGES.OK });
    } catch (error: any) {
        console.error('Error deleting bus route:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}

export const getBusRoutes = async function(req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * 10;
        const limit = 10;

        const { count, rows } = await BusRoute.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'lineNumber', 'origin', 'destination']
        });

        res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            records: rows
        });
    } catch (error: any) {
        console.error('Error fetching bus routes:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getBusRouteDetails = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const busRouteFound = await BusRoute.findByPk(id, {
            attributes: ['id', 'lineNumber', 'distanceInKm', 'averageTimeInMinutes', 'origin', 'destination', 'createdAt', 'updatedAt']
        });

        if (!busRouteFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        res.json(busRouteFound);
    } catch (error: any) {
        console.error('Error fetching bus route details:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const searchBusRoute = async function(req: AuthRequest, res: Response) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        const qLike = `%${q}%`;

        const routeResults = await BusRoute.findAll({
            attributes: ['id', 'lineNumber', 'origin', 'destination'],
            where: {
                [Op.or]: [
                    { origin: { [Op.like]: qLike } },
                    { destination: { [Op.like]: qLike } },
                    { lineNumber: { [Op.like]: qLike } }
                ]
            }
        });

        return res.json(routeResults);
    } catch (error: any) {
        console.error('Search error:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}