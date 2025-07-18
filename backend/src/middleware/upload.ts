import multer from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const uploadPictureDir = path.join(__dirname, '..', '..', 'uploads', 'profilePictures');
if (!fs.existsSync(uploadPictureDir)) {
    fs.mkdirSync(uploadPictureDir, { recursive: true });
}

const uploadSignatureDir = path.join(__dirname, '..', '..', 'uploads', 'profilePictures');
if (!fs.existsSync(uploadPictureDir)) {
    fs.mkdirSync(uploadPictureDir, { recursive: true });
}

const storagePicture = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profilePictures/');
    },
    filename: (req, file, cb) => {
        const hash = crypto.createHash('sha256');
        const chunks: Buffer[] = [];

        file.stream.on('data', (chunk) => chunks.push(chunk));

        file.stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            hash.update(buffer);

            const fileHash = hash.digest('hex');
            const ext = path.extname(file.originalname);
            const filename = `${fileHash}${ext}`;
            const filePath = path.join(uploadPictureDir, filename);

            if (fs.existsSync(filePath)) {
                console.log('File already exists, skipping upload');
            }

            fs.writeFileSync(filePath, buffer);
            cb(null, filename);
        });

        file.stream.on('error', (err) => {
            cb(err, '');
        })
    }
});

const storageSignature = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/signatures');
    },
    filename: (req, file, cb) => {
        const hash = crypto.createHash('sha256');
        const chunks: Buffer[] = [];

        file.stream.on('data', (chunk) => chunks.push(chunk));

        file.stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            hash.update(buffer);

            const fileHash = hash.digest('hex');
            const ext = path.extname(file.originalname);
            const filename = `${fileHash}${ext}`;
            const filePath = path.join(uploadSignatureDir, filename);

            if (fs.existsSync(filePath)) {
                console.log('File already exists, skipping upload');
            }

            fs.writeFileSync(filePath, buffer);
            cb(null, filename);
        });

        file.stream.on('error', (err) => {
            cb(err, '');
        })
    },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'))
    }
};

export const uploadPicture = multer({ storage: storagePicture, fileFilter });
export const uploadSignature = multer({ storage: storageSignature, fileFilter });