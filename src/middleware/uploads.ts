import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/upload");

    // יצירת התיקייה אם היא לא קיימת
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // תיקיית היעד
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // שם הקובץ
  }
});

const upload = multer({ storage: storage });

export default upload;
