const multer = require('multer');
const path = require('path');
const fs = require('fs');

// הגדרת תיקיית העלאת קבצים
const uploadDirectory = 'uploads/';

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
        cb(null, uploadDirectory);  // כל הקבצים יישמרו בתיקייה אחת
    },
    filename: (req, file, cb) => {
        console.log(`Uploading file: ${file.originalname}`);
        cb(null, `${Date.now()}-${file.originalname}`);  // שם קובץ ייחודי עם timestamp
    },
});

const upload = multer({ storage });

export default upload;
