import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import Driver from "../models/driver";
import User from "../models/user";


export const createDriver = async function (req: AuthRequest, res: Response) {
    const { userId, documentNumber } = req.body;

    if (!userId || !documentNumber || typeof userId !== 'string' ||
        typeof documentNumber !== 'string'
    ) {
        return res.status(400).json({ error: 'Document number and user id are required' });
    }

    try {
        const existingDriver = await Driver.findOne({ where: { documentNumber }});
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
};

export const deleteDriver = async function (req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const driver = await Driver.findByPk(id, {
            attributes: ['id', 'userId']
        });

        if (!driver) {
            return res.status(406).json({ error: 'Driver with the given id was not found' });
        }

        if (!driver.userId) {
            await driver.destroy();
        } else {
            const user = await User.findByPk(driver.userId, {
                attributes: ['id', 'isAdmin']
            });

            if (user.isAdmin) {
                return res.status(403).json({ error: 'You\'re not allowed to delete this user' });
            }
            
            await user.destroy();
        }

        return res.json({ message: 'Driver deleted successfully' });
    } catch (error) {
        console.error('Deletion error', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};

export const getDrivers = async function (req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Driver.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'documentNumber'],
            include: {
                model: User,
                attributes: ['id', 'name', 'email', 'picture', 'createdAt']
            }
        });

        res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            drivers: rows
        });
    } catch (error) {
        console.error('Get error', error);
        res.status(500).json({ error: 'Failed to fetch drivers' });
    }
}