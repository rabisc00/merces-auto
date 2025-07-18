import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import dayjs from '../utils/dayjs';
import WorkingHours from "../models/workingHours";
import { SQL_DATE_FORMAT } from "../constants/date";

export const createWorkingHours = async function(req: AuthRequest, res: Response) {
    const { startTime, endTime, driverId} = req.body;
    const signaturePath = req.file?.path;

    try {
        await WorkingHours.create({
            driverId,
            startTime,
            endTime,
            signature: signaturePath
    });

        return res.json({ message: 'Working hour creating successfully'});
    } catch (error: any) {
        console.error('Error creating working hour:', error);
        return res.status(500).json({ error: 'Error creating working hours'});
    }
};

export const editWorkingHours = async function(req: AuthRequest, res: Response) {
    const { startTime, endTime } = req.body;
    const id = req.params.id;

    try {
        const workingHoursFound = await WorkingHours.findByPk(id);
        if (!workingHoursFound) {
            return res.status(400).json({ error: 'No working hours with the given id found'});
        }

        const formattedStartTime = dayjs(workingHoursFound.startTime).format(SQL_DATE_FORMAT);
        const formattedEndTime = dayjs(workingHoursFound.endTime).format(SQL_DATE_FORMAT);

        let changed = false;

        if (startTime && startTime !== formattedStartTime) {
            workingHoursFound.startTime = startTime;
            changed = true;
        }

        if (endTime && endTime !== formattedEndTime) {
            workingHoursFound.endTime = endTime;
            changed = true;
        }

        if (changed) {
            await workingHoursFound.save();
            return res.json({ message: 'Successfully updated the working hours'});
        } else {
            return res.json({ message: 'No changes made' });
        }
    } catch (error: any) {
        console.error('Error updating working hour:', error);
        return res.status(500).json({ error: 'Error editing working hours' });
    }
};

export const deleteWorkingHours = async function(req: AuthRequest, res: Response) {
    const id = req.params.id;

    try {
        const workingHoursFound = await WorkingHours.findByPk(id);
        if (!workingHoursFound) {
            return res.status(400).json({ error: 'No working hours with the given id found' });
        }

        await workingHoursFound.destroy();
        return res.json({ message: 'Working hours deleted successfully'});
    } catch (error: any) {
        console.error('Error deleting working hours:', error);
        return res.status(500).json({ error: 'Error deleting working hours' });
    }
};

export const getAllWorkingHours = async function(req: AuthRequest, res: Response) {
    const driverId = req.params.driverId;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * 10;
    const limit = 10;

    try {
        const { count, rows } = await WorkingHours.findAndCountAll({ 
            offset,
            limit,
            attributes: ['id', 'startTime', 'endTime'],
            where: { driverId },
        });
        
        return res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            workingHours: rows
        });
    } catch (error: any) {
        console.error('Error fetching working hours:', error);
        return res.status(500).json({ error: 'Error fetching working hours'});
    }
};

export const getWorkingHoursDetails = async function(req: AuthRequest, res: Response) {
    const workingHoursId = req.params.id;

    try {
        const workingHours = await WorkingHours.findByPk(workingHoursId, {
            attributes: ['id', 'startTime', 'endTime', 'signature']
        });
        
        return res.json({
            workingHours
        });
    } catch (error: any) {
        console.error('Error fetching working hours:', error);
        return res.status(500).json({ error: 'Error fetching working hours'});
    }
};