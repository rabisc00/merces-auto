import { Request, Response } from 'express';
import { Driver } from '../models/driver';

export const registerDriver = async (req: Request, res: Response) => {
    const { name, documentNumber, registrationDate, active, picture } = req.body;

    try {
        const existingDriver = await Driver.findOne({ where: { documentNumber }});
        if (existingDriver) {
            return res.status(409).json({ message: 'Document number already in use' });
        }

        const driver = await Driver.create({
            name,
            documentNumber,
            registrationDate,
            active,
            picture
        });

        res.status(201).json({ message: 'Driver registered successfully', driver });
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({ message: 'Error registering driver' });
    }
}