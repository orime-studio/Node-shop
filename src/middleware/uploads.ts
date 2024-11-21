import multer from "multer";
import path from "path";

// הגדרת Multer עם אחסון הקבצים
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join("public", "uploads");
        console.log("Destination Path:", uploadPath); // דיבאג: הנתיב לתיקיית ההעלאה
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        console.log("Generated Filename:", uniqueFilename); // דיבאג: שם הקובץ שנוצר
        cb(null, uniqueFilename);
    },
});

const upload = multer({ storage });

export default upload;
