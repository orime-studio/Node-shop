import multer from 'multer';
import fs from 'fs';

// הגדרת תיקיית העלאת קבצים
const uploadDirectory = 'public/uploads';

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
        cb(null, uploadDirectory);  // כל הקבצים יישמרו בתיקיית uploads
    },
    filename: (req, file, cb) => {
        console.log(`Uploading file: ${file.originalname}`);
        cb(null, `${Date.now()}-${file.originalname}`);  // שמירת שם הקובץ עם תאריך זמן ייחודי
    },
});

// הגדרת Multer להעלאת קבצים בודדים או מרובים
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // מגבלת גודל קובץ 10MB
    },
    fileFilter: (req, file, cb) => {
        // אפשר להוסיף סינון קבצים כאן אם נדרש
        cb(null, true);
    },
});

export default upload;
