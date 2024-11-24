import multer from 'multer';
import fs from 'fs';
import path from 'path';

// הגדרת תיקיית העלאת קבצים
const uploadDirectory = 'public/uploadsfolder';

// אם התיקיה לא קיימת, ניצור אותה
if (!fs.existsSync(uploadDirectory)) {
    console.log("Creating upload directory...");
    fs.mkdirSync(uploadDirectory, { recursive: true });
} else {
    console.log("Upload directory already exists.");
}

// הגדרת Multer לשמירת קבצים בתיקיית uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Setting destination for file upload...");
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        console.log(`Uploading file: ${file.originalname}`);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export default upload;
