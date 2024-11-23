import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");

    // בדוק אם התיקייה קיימת ואם לא - צור אותה
    if (!fs.existsSync(uploadPath)) {
      console.log(`Directory does not exist. Creating: ${uploadPath}`);
      fs.mkdirSync(uploadPath, { recursive: true });
    } else {
      console.log(`Directory already exists: ${uploadPath}`);
    }

    cb(null, uploadPath); // העבר את הנתיב ל-multer
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    console.log(`Saving file with name: ${fileName}`); // הוסף לוג לשם הקובץ
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // הגבלת גודל קובץ ל-5MB
  fileFilter: (req, file, cb) => {
    console.log(`Received file: ${file.originalname} with type: ${file.mimetype}`);
    cb(null, true); // אפשר העלאת קבצים
  }
});

console.log("Multer storage configured and ready.");

export default upload;
