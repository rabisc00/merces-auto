import { Response, NextFunction } from "express";
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { AuthRequest } from "../types/authRequest";
import { HTTP_MESSAGES } from "../constants/httpMessages";

dotenv.config();

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: HTTP_MESSAGES.FORBIDDEN });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Authentication error', err);
        return res.status(403).json({ error: HTTP_MESSAGES.UNAUTHORIZED });
    }
};

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user?.isAdmin) {
        return res.status(401).json({ error: HTTP_MESSAGES.UNAUTHORIZED });
    }
    
    return next();
};