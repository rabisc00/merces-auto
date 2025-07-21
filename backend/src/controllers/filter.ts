import { AuthRequest } from "../types/authRequest";
import { Response } from "express";
import { Op } from 'sequelize';
import Bus from "../models/bus";
import BusRoute from "../models/busRoute";
import Driver from "../models/driver";
import User from "../models/user";
import { HTTP_MESSAGES } from "../constants/httpMessages";

export const searchInfo = async function(req: AuthRequest, res: Response) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        const qLike = `%${q}%`;
        
        const busResults = await Bus.findAll({
            attributes: ['busNumber', 'model', 'inRepair'],
            where: {
                [Op.or]: [
                    { busNumber: { [Op.like]: qLike } },
                    { model: { [Op.like]: qLike } },
                ]
                
            }
        });

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

        const driverResults = await Driver.findAll({
            attributes: ['id', 'documentNumber', 'name', 'picture', 'active'],
            where: {
                [Op.or]: [
                    { documentNumber: { [Op.like]: qLike } },
                    { name: { [Op.like]: qLike } }
                ]
            }
        });

        return res.json({
            buses: busResults,
            routes: routeResults,
            drivers: driverResults
        });
    } catch (error: any) {
        console.log('Search error:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};