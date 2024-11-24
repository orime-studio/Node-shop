import multer from "multer";
import fs from "fs";
import path from "path";

// שם חדש לתיקייה
const uploadDirectory = "public/new-uploads";

// בדוק אם התיקייה קיימת, ואם לא - צור אותה
if (!fs.existsSync(uploadDirectory)) {
    console.log(`Directory ${uploadDirectory} does not exist. Creating it...`);
    fs.mkdirSync(uploadDirectory, { recursive: true });
} else {
    console.log(`Directory ${uploadDirectory} already exists.`);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // הגדרת תיקיית היעד להעלאת הקובץ
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        // יצירת שם קובץ ייחודי עם timestamp
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        console.log(`Uploading file: ${uniqueFileName}`); // הדפסת שם הקובץ המועלה
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage });

export default upload;
