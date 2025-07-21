import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import  User from '../models/user';
import bcrypt = require('bcrypt');
import { AuthRequest } from '../types/authRequest';
import { HTTP_MESSAGES } from '../constants/httpMessages';

dotenv.config();

export const createUser = async(req: AuthRequest, res: Response) => {
    try {
        const { email, password, isAdmin } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: HTTP_MESSAGES.CONFLICT });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            isAdmin,
            password: hashedPassword,
        });

        return res.json({ 
            message: 'User registered successfully',
            id: user.id
        });
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({ message: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ where: { email } });
        if (!userFound) {
            return res.status(401).json({ message: HTTP_MESSAGES.UNAUTHORIZED });
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: HTTP_MESSAGES.UNAUTHORIZED });
        }

        const payload = { 
            id: userFound.id, 
            email: userFound.email, 
            isAdmin: userFound.isAdmin 
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        
        return res.json({ token });

    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};