import { HTTP_MESSAGES } from "../constants/httpMessages";
import Trip from "../models/trip";
import User from "../models/user";
import { AuthRequest } from "../types/authRequest";
import { Response } from "express";

export const generateReport = async (req: AuthRequest, res: Response) => {
    try {
        const { userId, startTime, endTime } = req.body;

        const queryResponse = await User.findByPk(userId, {
            include: [{
                model: Trip,
                attributes: ['numberOfPassengers', 'date']
            }]
        })
    } catch (error: any) {
        console.error('Generate report error:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
}