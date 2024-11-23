import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");

    // יצירת התיקייה אם היא לא קיימת
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    } else {
    }

    cb(null, uploadPath); // תיקיית היעד
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName); // שם הקובץ
  }
});

const upload = multer({ storage: storage });

export default upload;
