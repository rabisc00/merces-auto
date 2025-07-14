import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AppUser } from '../models/user.inteface';
import bcrypt = require('bcrypt');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async(req: Request, res: Response) => {
    const { email, username, password, admin } = req.body;

    try {
        const existingUser = await AppUser.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await AppUser.create({
            email,
            username,
            password: hashedPassword,
            admin
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userFound = await AppUser.findOne({ where: { email } });
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
            isAdmin: userFound.admin 
        };
        
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        
        res.status(200).json({ message: 'Login successful', token, user: {
            id: userFound.id, 
            email: userFound.email, 
            isAdmin: userFound.admin 
        }});

    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: 'Invalid server error' });
    }
};