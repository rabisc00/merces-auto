import { Op } from 'sequelize';
import Bus from "../models/bus";
import { AuthRequest } from "../types/authRequest";
import { Response } from "express";
import { HTTP_MESSAGES } from '../constants/httpMessages';
import { removeSpecialCharacters } from '../utils/specialCharacters';

export const createBus = async function(req: AuthRequest, res: Response) {
    try {
        const { busNumber, model, capacity, manufacturingYear } = req.body;
        const busNumberFormatted = busNumber && removeSpecialCharacters(busNumber.toUpperCase());
        const modelFormatted = model && model.toUpperCase();

        const busFound = await Bus.findOne({ where: { busNumber: busNumberFormatted }});
        if (busFound) {
            return res.status(409).json({ error: HTTP_MESSAGES.CONFLICT });
        }

        const bus = await Bus.create({
            busNumber: busNumberFormatted,
            model: modelFormatted,
            capacity,
            manufacturingYear
        });

        return res.json({ 
            message: HTTP_MESSAGES.OK,
            id: bus.id
        });
    } catch (error) {
        console.error('Error creating bus:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const editBus = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;
        const { busNumber, model, capacity, inRepair, manufacturingYear } = req.body;

        const busNumberFormatted = busNumber && removeSpecialCharacters(busNumber.toUpperCase());
        const modelFormatted = model && model.toUpperCase();

        const busFound = await Bus.findByPk(id);
        if (!busFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        let changed = false;

        if (busNumberFormatted && busFound.busNumber !== busNumberFormatted) {
            const existingBus = await Bus.findOne({
                where: {
                    busNumber: busNumberFormatted,
                    id: { [Op.ne]: id }
                }
            });

            if (existingBus) {
                return res.status(409).json({ error: HTTP_MESSAGES.CONFLICT });
            }
            
            busFound.busNumber = busNumberFormatted;
            changed = true;
        }

        if (modelFormatted && busFound.model !== modelFormatted) {
            busFound.model = modelFormatted;
            changed = true;
        }

        if (capacity && busFound.capacity !== capacity) {
            busFound.capacity = capacity;
            changed = true;
        }

        if (manufacturingYear && busFound.manufacturingYear !== manufacturingYear) {
            busFound.manufacturingYear = manufacturingYear;
            changed = true;
        }

        if (inRepair !== undefined && busFound.inRepair !== inRepair) {
            busFound.inRepair = inRepair;
            changed = true;
        }

        if (changed) {
            await busFound.save();
            return res.json({ message: HTTP_MESSAGES.OK });
        } else {
            return res.json({ message: 'No changes were made' });
        }
    } catch (error) {
        console.error('Error updating bus:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const deleteBus = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const busFound = await Bus.findByPk(id);
        if (!busFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        await busFound.destroy();
        return res.json({ message: HTTP_MESSAGES.OK });
    } catch (error) {
        console.error('Error deleting bus:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getBuses = async function(req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Bus.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'busNumber', 'model', 'inRepair', 'manufacturingYear', 'capacity']
        });

        res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            records: rows
        });
    } catch (error) {
        console.error('Error fetching buses:', error);
        res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getBusDetails = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const busFound = await Bus.findByPk(id, {
            attributes: ['id', 'busNumber', 'model', 'capacity', 'manufacturingYear', 'inRepair', 'createdAt', 'updatedAt']
        });

        if (!busFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        res.json(busFound);
    } catch (error) {
        console.error('Error fetching bus details:', error);
        res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const searchBus = async function(req: AuthRequest, res: Response) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        const qLike = `%${q}%`;
        
        const busResults = await Bus.findAll({
            attributes: ['id', 'busNumber', 'model', 'inRepair'],
            where: {
                [Op.or]: [
                    { busNumber: { [Op.like]: qLike } },
                    { model: { [Op.like]: qLike } },
                ]
                
            }
        });

        return res.json(busResults);
    } catch (error: any) {
        console.error('Search error:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};