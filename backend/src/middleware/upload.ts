import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPictureDir = path.join(__dirname, '..', '..', 'uploads', 'profilePictures');
if (!fs.existsSync(uploadPictureDir)) {
    fs.mkdirSync(uploadPictureDir, { recursive: true });
}

const uploadSignatureDir = path.join(__dirname, '..', '..', 'uploads', 'profilePictures');
if (!fs.existsSync(uploadSignatureDir)) {
    fs.mkdirSync(uploadSignatureDir, { recursive: true });
}

export const uploadPicture = multer({ 
    storage: multer.memoryStorage(), 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    }
});

export const uploadSignature = multer({ 
    storage: multer.memoryStorage(), 
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    }
});