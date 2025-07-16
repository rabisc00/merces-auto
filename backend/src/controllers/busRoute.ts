import BusRoute from "../models/busRoute";
import { getTravelTime } from "../services/googleMapsService";
import { AuthRequest } from "../types/authRequest";
import { Response } from "express";

export const createBusRoute = async function (req: AuthRequest, res: Response) {
    const { lineNumber, origin, destination } = req.body;

    if (!lineNumber || !origin || !destination ||
        typeof lineNumber !== 'string' || typeof origin !== 'string' || 
        typeof destination !== 'string'
    ) {
        return res.status(400).json({ error: 'Both origin and destination are required'});
    }

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
        res.status(500).json({ error: 'Failed to fetch coordinates'});
    }

    try {
        
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Error registering bus route' });
    }
}