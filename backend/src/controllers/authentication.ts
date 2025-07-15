import User from "../models/user";
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response } from "express";

dotenv.config();

export async function generateToken(req: Request, res: Response) {
    const { email, password } = req.body;

    const userFound = await User.findOne({ 
        where: { email } 
    });

    console.log(userFound);

    if (!userFound || !userFound.isAdmin) {
        return res.status(401).json({ error: "Access denied" });
    }

    const token = jwt.sign(
        { id: userFound.id, email: userFound.email, isAdmin: userFound.isAdmin },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
}