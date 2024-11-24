import multer from 'multer';
import fs from 'fs';
import path from 'path';

// בדיקה אם תיקיית uploads קיימת ואם לא, ניצור אותה
const uploadDirectory = 'public/uploads';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// הגדרת Multer לשמירת קבצים בתיקיית uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// יצירת אובייקט Multer להעלאת קובץ אחד
const upload = multer({ storage });

export default upload;
