import * as dotenv from 'dotenv';
import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt = require('bcrypt');
import { Request, Response } from "express";
import { HTTP_MESSAGES } from '../constants/httpMessages';

dotenv.config();

export async function generateToken(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ 
            where: { email },
        });

        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if (!userFound || !userFound.isAdmin || !passwordMatch || !userFound.active
        ) {
            return res.status(401).json({ error: HTTP_MESSAGES.UNAUTHORIZED });
        }

        const token = jwt.sign(
            { id: userFound.id, email: userFound.email, isAdmin: userFound.isAdmin },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ token });
    } catch (error: any) {
        console.error('Error generating token:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};