import { Op } from 'sequelize';
import Bus from "../models/bus";
import { AuthRequest } from "../types/authRequest";
import { Response } from "express";

export const createBus = async function(req: AuthRequest, res: Response) {
    try {
        const { busNumber, model, capacity, manufacturingYear } = req.body;
        const busNumberFormatted = busNumber.toUpperCase();

        const busFound = await Bus.findOne({ where: { busNumber: busNumberFormatted }});
        if (busFound) {
            return res.status(409).json({ error: 'Bus with the given number already exists'});
        }

        Bus.create({
            busNumber: busNumberFormatted,
            model: model.toUpperCase(),
            capacity,
            manufacturingYear
        });

        return res.json({ message: 'Bus created successfully' });
    } catch (error) {
        console.error('Error creating bus:', error);
        return res.status(500).json({ error: 'Error creating bus' });
    }
};

export const editBus = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;
        const { model, capacity, inRepair, manufacturingYear } = req.body;

        const busFound = await Bus.findByPk(id);
        if (!busFound) {
            return res.status(404).json({ error: 'Bus with the given id not found' });
        }

        let changed = false;

        if (model && busFound.model !== model) {
            busFound.model = model;
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
            return res.json({ message: 'Bus updated successfully' });
        } else {
            return res.json({ message: 'No changes were made'});
        }
    } catch (error) {
        console.error('Error updating bus:', error);
        return res.status(500).json({ error: 'Error updating bus' });
    }
};

export const deleteBus = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const busFound = await Bus.findByPk(id);
        if (!busFound) {
            return res.status(404).json({ error: 'Bus with the given id not found'});
        }

        await busFound.destroy();
        return res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        console.error('Error deleting bus:', error);
        return res.status(500).json({ error: 'Error deleting bus' });
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
            attributes: ['id', 'busNumber', 'model', 'inRepair']
        });

        res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            buses: rows
        });
    } catch (error) {
        console.error('Error fetching buses:', error);
        res.status(500).json({ error: 'Error fetching buses' });
    }
};

export const getBusDetails = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const busFound = await Bus.findByPk(id, {
            attributes: ['id', 'busNumber', 'model', 'capacity', 'manufacturingYear', 'inRepair', 'createdAt', 'updatedAt']
        });

        res.json(busFound);
    } catch (error) {
        console.error('Error fetching bus details:', error);
        res.status(500).json({ error: 'Error fetching bus details' });
    }
};

export const searchBus = async function(req: AuthRequest, res: Response) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: 'Missing search query' });
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
        console.log('Search error:', error);
        return res.status(500).json({ error: 'Search error' });
    }
};