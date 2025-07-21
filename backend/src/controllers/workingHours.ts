import { Response } from "express";
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { AuthRequest } from "../types/authRequest";
import dayjs from '../utils/dayjs';
import WorkingHours from "../models/workingHours";
import { SQL_DATE_FORMAT } from "../constants/date";
import { HTTP_MESSAGES } from "../constants/httpMessages";

const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'signatures');

export const createWorkingHours = async function(req: AuthRequest, res: Response) {
    try {
        const { startTime, endTime, driverId} = req.body;

        const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
        const ext = path.extname(req.file.originalname);
        const fileName = `${hash}${ext}`;
        const filePath = path.join(uploadDir, fileName);
        const relativePath = path.join('uploads', 'signatures', fileName);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        if (!fs.existsSync(filePath)) {        
            fs.writeFileSync(filePath, req.file.buffer);
        }

        const dayjsStartTime = dayjs(startTime);
        const dayjsEndTime = dayjs(endTime);

        if (!dayjsEndTime.isAfter(dayjsStartTime)) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        const workingHours = await WorkingHours.create({
            driverId,
            startTime: dayjsStartTime.toDate(),
            endTime: dayjsEndTime.toDate(),
            signature: relativePath
        });

        return res.json({ 
            message: HTTP_MESSAGES.OK,
            id: workingHours.id
        });
    } catch (error: any) {
        console.error('Error creating working hour:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const editWorkingHours = async function(req: AuthRequest, res: Response) {
    try {
        const { startTime, endTime } = req.body;
        const id = req.params.id; 

        const workingHoursFound = await WorkingHours.findByPk(id);
        if (!workingHoursFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        const existingStartTime = dayjs(workingHoursFound.startTime);
        const existingEndTime = dayjs(workingHoursFound.endTime);

        const dayjsStartTime = startTime ? dayjs(startTime) : dayjs(existingStartTime);
        const dayjsEndTime = endTime ? dayjs(endTime) : dayjs(existingEndTime);

        if (!dayjsEndTime.isAfter(dayjsStartTime)) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        let changed = false;

        if (startTime && !dayjsStartTime.isSame(existingStartTime)) {
            workingHoursFound.startTime = dayjsStartTime.toDate();
            changed = true;
        }

        if (endTime && !dayjsEndTime.isSame(existingEndTime)) {
            workingHoursFound.endTime = dayjsEndTime.toDate();
            changed = true;
        }

        if (changed) {
            await workingHoursFound.save();
            return res.json({ message: HTTP_MESSAGES.OK });
        } else {
            return res.json({ message: HTTP_MESSAGES.NO_CHANGES });
        }
    } catch (error: any) {
        console.error('Error updating working hour:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const deleteWorkingHours = async function(req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const workingHoursFound = await WorkingHours.findByPk(id);
        if (!workingHoursFound) {
            return res.status(400).json({ error: 'No working hours with the given id found' });
        }

        await workingHoursFound.destroy();
        return res.json({ message: HTTP_MESSAGES.OK });
    } catch (error: any) {
        console.error('Error deleting working hours:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getWorkingHours = async function(req: AuthRequest, res: Response) {
    try {
        const driverId = req.params.driverId;
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * 10;
        const limit = 10;

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
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getWorkingHoursDetails = async function(req: AuthRequest, res: Response) {
    try {
        const workingHoursId = req.params.id;

        const workingHours = await WorkingHours.findByPk(workingHoursId, {
            attributes: ['id', 'startTime', 'endTime', 'signature']
        });
        
        return res.json(workingHours);
    } catch (error: any) {
        console.error('Error fetching working hours:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};