import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import  User from '../models/user';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { HTTP_MESSAGES } from '../constants/httpMessages';
import { AuthRequest } from '../types/authRequest';
import { Op } from 'sequelize';

import bcrypt = require('bcrypt');

dotenv.config();

const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'profilePictures');

export const createUser = async(req: AuthRequest, res: Response) => {
    try {
        const { email, password, name, documentNumber, isAdmin } = req.body;

        const existingUser = await User.findOne({ 
            where: { 
                [Op.or]: [
                    { email, documentNumber }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: HTTP_MESSAGES.CONFLICT });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            isAdmin,
            name: name.toUpperCase(),
            documentNumber: documentNumber.toUpperCase(),
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

export const editUser = async function (req: AuthRequest, res: Response) {
    try {
        const { documentNumber, name, active } = req.body;
        const id = req.params.id;

        const userFound = await User.findByPk(id);
        if (!userFound) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        const formattedName = name && name.toUpperCase();
        const formattedDocumentNumber = documentNumber && documentNumber.toUpperCase();
        const activeBool = active as boolean;

        let changed = false;

        if (formattedDocumentNumber && formattedDocumentNumber !== userFound.documentNumber) {
            userFound.documentNumber = formattedDocumentNumber;
            changed = true;
        }

        if (formattedName && formattedName !== userFound.name) {
            userFound.name = formattedName;
            changed = true;
        }

        if (activeBool != null && activeBool !== userFound.active) {
            userFound.active = active;
            changed = true;
        }

        if (req.file) {
            if (userFound?.picture) {
                const oldPath = path.join(__dirname, '..', '..', userFound?.picture);
                fs.unlink(oldPath, (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err);
                        return;
                    }

                    console.log('File deleted successfully');
                });
            }

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
                userFound.picture = relativePath;
                
                fs.writeFileSync(filePath, req.file.buffer);
            }
        }
        
        if (changed) {
            await userFound.save(); 
            return res.json({ message: HTTP_MESSAGES.OK });
        } else {
            return res.json({ message: HTTP_MESSAGES.NO_CHANGES });
        }
    } catch (error: any) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const deleteUser = async function (req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: HTTP_MESSAGES.NOT_FOUND });
        }

        if (user.isAdmin) {
            return res.status(403).json({ error: HTTP_MESSAGES.UNAUTHORIZED });
        }

        await user.destroy();
        return res.json({ message: HTTP_MESSAGES.OK });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getUsers = async function (req: AuthRequest, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            limit,
            offset,
            attributes: ['id', 'name', 'active', 'isAdmin', 'documentNumber', 'picture'],
        });

        res.json({
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalCount: count,
            records: rows
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const getUserDetails = async function (req: AuthRequest, res: Response) {
    try {
        const id = req.params.id;

        const userFound = await User.findByPk(id, {
            attributes: ['id','email', 'name', 'documentNumber', 'active', 'picture']
        });

        res.json(userFound);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const searchUser = async function(req: AuthRequest, res: Response) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: HTTP_MESSAGES.BAD_REQUEST });
        }

        const qLike = `%${q}%`;

        const userResults = await User.findAll({
            attributes: ['id', 'documentNumber', 'name', 'picture', 'active'],
            where: {
                [Op.or]: [
                    { documentNumber: { [Op.like]: qLike } },
                    { name: { [Op.like]: qLike } },
                    { email: { [Op.like]: qLike }}
                ]
            }
        });

        return res.json(userResults);
    } catch (error: any) {
        console.log('Search error:', error);
        return res.status(500).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ 
            where: { email }
        });

        if (!userFound) {
            return res.status(401).json({ message: HTTP_MESSAGES.UNAUTHORIZED });
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: HTTP_MESSAGES.UNAUTHORIZED });
        }

        if (!userFound.active) {
            return res.status(401).json({ message: HTTP_MESSAGES.UNAUTHORIZED });
        }

        const payload = { 
            id: userFound.id, 
            email: userFound.email, 
            isAdmin: userFound.isAdmin 
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        
        return res.json({
            token,
            isAdmin: userFound.isAdmin
        });

    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
};