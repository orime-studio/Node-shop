import fs from 'fs';
import multer from 'multer';
import path from 'path';

// הגדרת תיקיית העלאת קבצים מהסביבה
const uploadDirectory = '/tmp/uploads';


// הדפסת המיקום של התיקייה

if (!uploadDirectory) {
    throw new Error("Environment variable PERSISTENT_DISK_PATH is not set. Please configure it in your .env file.");
}

// יצירת התיקייה אם היא לא קיימת
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
} else {
}

// בדיקת הרשאות קריאה וכתיבה
fs.access(uploadDirectory, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        throw new Error(`Permission issue with directory: ${uploadDirectory}`);
    }
});

// הגדרת Multer לשמירת קבצים בתיקייה
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);  // כל הקבצים יישמרו בתיקייה זו
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        const fullPath = path.join(uploadDirectory, uniqueFilename);
        cb(null, uniqueFilename);  // יצירת שם קובץ ייחודי
    },
});

// הגדרת Multer עם מגבלות ומחסומי קלט
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // מגבלת גודל קובץ - 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, and PDF files are allowed!'));
        }
        cb(null, true);
    },
});

// ייצוא פונקציות להעלאה
export default upload;
