import { Op } from 'sequelize';
import { Response } from "express";
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { AuthRequest } from "../types/authRequest";
import Driver from "../models/driver";
import User from "../models/user";

const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'profilePictures');

export const createDriver = async function (req: AuthRequest, res: Response) {
    try {
        const { name, userId, documentNumber } = req.body;

        const existingDriver = await Driver.findOne({ where: { documentNumber }});
        if (existingDriver) {
            return res.status(409).json({ message: 'Driver with the given document already exists' });
        }

        await Driver.create({ 
            name: name && name.toUpperCase(),
            documentNumber: documentNumber && documentNumber.toUpperCase(),
            userId,
        });

        return res.json({ message: 'Driver created successfully' });
    } catch (error) {
        console.error('Error creating driver:', error);
        res.status(500).json({ error: 'Error creating driver' });
    }
};

export const updateDriver = async function (req: AuthRequest, res: Response) {
    try {
        const { documentNumber, name, active } = req.body;
        const id = req.params.id;

        const driverFound = await Driver.findByPk(id);
        if (!driverFound) {
            return res.status(404).json({ error: 'Driver with given id not found' });
        }

        const formattedName = name && name.toUpperCase();
        const formattedDocumentNumber = documentNumber && documentNumber.toUpperCase();
        const activeBool = active as boolean;

        let changed = false;

        if (formattedDocumentNumber && formattedDocumentNumber !== driverFound.documentNumber) {
            driverFound.documentNumber = formattedDocumentNumber;
            changed = true;
        }

        if (formattedName && formattedName !== driverFound.name) {
            driverFound.name = formattedName;
            changed = true;
        }

        if (active != null && active !== driverFound.active) {
            driverFound.active = active;
            changed = true;
        }

        if (req.file) {
            const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
            const ext = path.extname(req.file.originalname);
            const fileName = `${hash}${ext}`;
            const filePath = path.join(uploadDir, fileName);
            const relativePath = path.join('uploads', 'profilePictures', fileName);

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            if (!fs.existsSync(filePath)) {
                changed = true;
                driverFound.picture = relativePath;
                
                fs.writeFileSync(filePath, req.file.buffer);
            }
        }
        
        if (changed) {
            await driverFound.save(); 
            return res.json({ message: 'Driver updated successfully' });
        } else {
            return res.json({ message: 'No changes were made' });
        }
    } catch (error: any) {
        console.error('Error updating driver:', error);
        return res.status(500).json({ error: 'Error updating driver' });
    }
};

export const deleteDriver = async function (req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;
        
        const driver = await Driver.findByPk(id, {
            attributes: ['id', 'userId']
        });

        if (!driver) {
            return res.status(406).json({ error: 'Driver with the given id not found' });
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
        console.error('Error deleting driver:', error);
        res.status(500).json({ error: 'Error deleting driver' });
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
            attributes: ['id', 'name', 'active', 'documentNumber', 'picture'],
        });

        res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            drivers: rows
        });
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ error: 'Error fetching drivers' });
    }
};

export const getDriverDetails = async function (req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const driverFound = await Driver.findByPk(id, {
            attributes: ['id', 'name', 'documentNumber', 'active', 'picture', 'createdAt', 'updatedAt']
        });

        res.json(driverFound);
    } catch (error) {
        console.error('Error fetching driver details:', error);
        res.status(500).json({ error: 'Error fetching driver details' });
    }
};

export const searchDriver = async function(req: AuthRequest, res: Response) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Missing search query' });
        }

        const qLike = `%${q}%`;

        const driverResults = await Driver.findAll({
            attributes: ['id', 'documentNumber', 'name', 'picture', 'active'],
            where: {
                [Op.or]: [
                    { documentNumber: { [Op.like]: qLike } },
                    { name: { [Op.like]: qLike } }
                ]
            }
        });

        return res.json({ driverResults });
    } catch (error: any) {
        console.log('Search error:', error);
        return res.status(500).json({ error: 'Search error' });
    }
};