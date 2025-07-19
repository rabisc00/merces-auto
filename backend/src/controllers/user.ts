import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import  User from '../models/user';
import bcrypt = require('bcrypt');
import { AuthRequest } from '../types/authRequest';

dotenv.config();

export const createUser = async(req: AuthRequest, res: Response) => {
    try {
        const { email, password, isAdmin } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with the given email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            isAdmin,
            password: hashedPassword,
        });

        return res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ where: { email } });
        if (!userFound) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const payload = { 
            id: userFound.id, 
            email: userFound.email, 
            isAdmin: userFound.isAdmin 
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
        
        return res.json({ token });

    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: 'Invalid server error' });
    }
};