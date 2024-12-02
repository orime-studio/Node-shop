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
        console.log(`Destination directory: ${uploadDirectory}`);
        cb(null, uploadDirectory);  // כל הקבצים יישמרו בתיקיית uploads
    },
    filename: (req, file, cb) => {
        console.log(`Uploading file: ${file.originalname}`);
        console.log(`File size: ${file.size} bytes`);
        cb(null, `${Date.now()}-${file.originalname}`);  // שמירת שם הקובץ עם תאריך זמן ייחודי
    },
});

// הגדרת Multer להעלאת קבצים בודדים או מרובים
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // מגבלת גודל הקובץ (10MB)
    },
}) // או .array('images') אם אתה מעלה מספר תמונות

// לא לשכוח להוסיף console.log כשיש צורך בתוך ה-handler של ה-upload (למשל על תוצאות הבקשה)
export default upload;
