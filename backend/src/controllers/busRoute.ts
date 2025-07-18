import BusRoute from "../models/busRoute";
import { getTravelTime } from "../services/googleMapsService";
import { AuthRequest } from "../types/authRequest";
import { Response } from "express";

export const createBusRoute = async function (req: AuthRequest, res: Response) {
    const { lineNumber, origin, destination } = req.body;

    try {
        const travelInfo = await getTravelTime(origin, destination);

        const distanceInKm = Math.round(travelInfo.distanceInMeters / 1000);
        const averageTimeInMinutes = Math.round(travelInfo.durationInSeconds / 60);

        await BusRoute.create({
            lineNumber,
            origin,
            destination,
            distanceInKm,
            averageTimeInMinutes
        });

        return res.json({ message: 'Bus route created succesfully' });
    } catch (error: any) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ error: 'Failed to fetch coordinates' });
    }
};

export const updateBusRoute = async function (req: AuthRequest, res: Response) {
    const { lineNumber, origin, destination } = req.body;
    const id = req.params.id;

    try {
        const busRouteFound = await BusRoute.findByPk(id);
        
        let changed = false;

        if (lineNumber && busRouteFound.lineNumber !== lineNumber) {
            busRouteFound.lineNumber = lineNumber;
            changed = true;
        }

        if (origin && busRouteFound.origin !== origin) {
            busRouteFound.origin = origin;
            changed = true;
        }

        if (destination && busRouteFound.destination !== destination) {
            busRouteFound.destination = destination;
            changed = true;
        }

        if (changed) {
            const travelInfo = await getTravelTime(origin || busRouteFound.origin, destination || busRouteFound.destination);
                
            busRouteFound.distanceInKm = Math.round(travelInfo.distanceInMeters / 1000);
            busRouteFound.averageTimeInMinutes = Math.round(travelInfo.durationInSeconds / 60);
            
            await busRouteFound.save();
            return res.json({ message: 'Bus Route updated successfully' });
        } else {
            return res.json({ message: 'No changes were made' });
        }
    } catch (error: any) {
        console.error('Update error:', error);
        return res.status(500).json({ error: 'Error editing bus route' });
    }
};

export const deleteBusRoute = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const busRouteFound = await BusRoute.findByPk(id);
        if (!busRouteFound) {
            return res.status(404).json({ error: 'Bus route with the given id was not found'});
        }

        busRouteFound.destroy();
        return res.json({ message: 'Bus route deleted successfully' });
    } catch (error: any) {
        console.error('Delete error: ', error);
        return res.status(500).json({ error: 'Error deleting bus route' });
    }
}

export const getBusRoutes = async function(req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string);
        const offset = (page - 1) * 10;
        const limit = 10;

        const { count, rows } = await BusRoute.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'distanceInKm', 'averageTimeInMinutes', 'origin', 'destination']
        });

        res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            busRoutes: rows
        });
    } catch (error: any) {
        console.error('Error fetching bus routes:', error);
        return res.status(500).json({ error: 'Error to fetch bus routes'});
    }
};