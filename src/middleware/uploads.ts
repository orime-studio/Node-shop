const fs = require('fs');
const multer = require('multer');
const path = require('path');

// הגדרת תיקיית העלאת קבצים
const uploadDirectory = 'uploads/';

// אם התיקיה לא קיימת, ניצור אותה
if (!fs.existsSync(uploadDirectory)) {
    console.log("Creating upload directory...");
    fs.mkdirSync(uploadDirectory, { recursive: true });
} else {
    console.log("Upload directory already exists.");
}

// בדיקת הרשאות קריאה וכתיבה על התיקיה
fs.access(uploadDirectory, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.log(`No read/write permission for the directory:22222 ${uploadDirectory}`);
    } else {
        console.log(`Read/write permissions are available for the directory111111: ${uploadDirectory}`);
    }
});

// הגדרת Multer לשמירת קבצים בתיקיית uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Setting destination for file upload...");
        cb(null, uploadDirectory);  // כל הקבצים יישמרו בתיקייה אחת
    },
    filename: (req, file, cb) => {
        console.log(`Preparing to upload file: ${file.originalname}`);
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        console.log(`Generated unique filename: ${uniqueFilename}`);
        cb(null, uniqueFilename);  // שם קובץ ייחודי עם timestamp
    },
});

const upload = multer({ storage });


export default upload;
