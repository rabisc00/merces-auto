import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import  User from '../models/user';
import bcrypt = require('bcrypt');
import crypto from 'crypto';
import { AuthRequest } from '../types/authRequest';

dotenv.config();

const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'profilePictures');

export const createUser = async(req: AuthRequest, res: Response) => {
    const { email, name, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with the given email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            name,
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

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User with the given id not found' });
        }

        let changed = false;

        if (name && user.name !== name) {
            user.name = name;
            changed = true;
        }

        if (req.file) {
            const hash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');
            const ext = path.extname(req.file.originalname);
            const fileName = `${hash}${ext}`;
            const filePath = path.join(uploadDir, fileName);
            const relativePath = path.join('uploads', 'profilePictures', fileName);

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            if (!fs.existsSync(filePath)) {
                changed = true;
                user.picture = relativePath;
                
                fs.writeFileSync(filePath, req.file.buffer);
            }
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
};