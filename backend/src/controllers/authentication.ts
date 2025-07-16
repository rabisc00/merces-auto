import * as dotenv from 'dotenv';
import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt = require('bcrypt');
import { Request, Response } from "express";

dotenv.config();

export async function generateToken(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' ||
        typeof password !== 'string'
    ) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const userFound = await User.findOne({ 
        where: { email } 
    });

    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (!userFound || !userFound.isAdmin || !passwordMatch) {
        return res.status(401).json({ error: "Access denied" });
    }

    const token = jwt.sign(
        { id: userFound.id, email: userFound.email, isAdmin: userFound.isAdmin },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
}