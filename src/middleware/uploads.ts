import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join("public", "uploads");
        console.log("Upload Path:", uploadPath); // לוג: נתיב שמירה
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}-${file.originalname}`;
        console.log("Saved File Name:", uniqueFilename); // לוג: שם הקובץ שנשמר
        cb(null, uniqueFilename);
    },
});

const upload = multer({ storage });

export default upload;
