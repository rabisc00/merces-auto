import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import Driver from "../models/driver";


export const registerDriver = async function (req: AuthRequest, res: Response) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access Denied' });

    const { userId, documentNumber } = req.body;

    try {
        const existingDriver = Driver.findOne({ where: { documentNumber }});
        if (existingDriver) {
            return res.status(409).json({ message: 'Driver with the given document already exists' });
        }

        await Driver.create({ 
            userId,
            documentNumber
        });

        return res.json({ message: 'Driver created successfully' });
    } catch (error) {
        console.error('Registration error', error);
        res.status(500).json({ error: 'Error registering driver' });
    }
}