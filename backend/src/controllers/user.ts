import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import  User from '../models/user';
import bcrypt = require('bcrypt');
import { AuthRequest } from '../types/authRequest';

dotenv.config();

export const registerUser = async(req: AuthRequest, res: Response) => {
    const { email, name, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email: email,
            name: name,
            password: hashedPassword,
            isAdmin: isAdmin
        });

        return res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
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

export const editUser = async function (req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const { name } = req.body;
        const picturePath = req.file?.path;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let changed = false;

        if (name && user.name !== name) {
            user.name = name;
            changed = true;
        }

        if (picturePath && picturePath !== user.picture) {
            user.picture = picturePath;
            changed = true;
        }

        if (changed) {
            await user.save();
            return res.json({ message: 'User updated successfully' });
        } else {
            return res.json({ message: 'No changes made' });
        }
    } catch (error) {
        console.error('Edit error:', error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}