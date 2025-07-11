import { Request, Response } from 'express';
import { AppUser } from '../models/appUser';

import bcrypt = require('bcrypt');

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

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const checkValidUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userWithSameEmail = await AppUser.findOne({ where: { email } });
        if (!userWithSameEmail) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, userWithSameEmail.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        res.status(200).json({ message: 'Login successful', userWithSameEmail });
    } catch (error) {
        console.error('LKogin error: ', error);
        res.status(500).json({ message: 'Invalid server error' });
    }
}