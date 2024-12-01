    // middleware/multi-uploads.ts

import multer from 'multer';
import fs from 'fs';
import path from 'path';

// הגדרת תיקיית העלאת קבצים עבור מאמרים
const multiUploadDirectory = 'public/multi_uploads';

// אם התיקיה לא קיימת, ניצור אותה
if (!fs.existsSync(multiUploadDirectory)) {
    console.log("Creating multi upload directory...");
    fs.mkdirSync(multiUploadDirectory, { recursive: true });
} else {
    console.log("Multi upload directory already exists.");
}

// הגדרת Multer לשמירת קבצים בתיקיית multi_uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Setting destination for multi file upload...");
        cb(null, multiUploadDirectory);
    },
    filename: (req, file, cb) => {
        console.log(`Uploading file: ${file.originalname}`);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const multiUpload = multer({ storage });

export default multiUpload;
