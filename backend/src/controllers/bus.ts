import Bus from "../models/bus";
import { AuthRequest } from "../types/authRequest";
import { Response } from "express";

export const createBus = async function(req: AuthRequest, res: Response) {
    const { busNumber, model, capacity, manufacturingYear } = req.body;

    try {
        const busFound = await Bus.findOne({ where: { busNumber }});
        if (busFound) {
            return res.status(409).json({ error: 'Bus with given the number already exists'});
        }

        Bus.create({
            busNumber,
            model,
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
    const id = req.params.id;
    const { model, capacity, inRepair, manufacturingYear } = req.body;

    try {
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
    const id = req.params.id;

    try {
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
            attributes: ['id', 'busNumber', 'model', 'capacity', 'manufacturingYear', 'inRepair', ]
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