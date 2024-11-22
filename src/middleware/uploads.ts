import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    console.log("Checking upload path:", uploadPath);

    // יצירת התיקייה אם היא לא קיימת
    if (!fs.existsSync(uploadPath)) {
      console.log("Upload path does not exist. Creating it...");
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log("Upload path created successfully.");
    } else {
      console.log("Upload path already exists.");
    }

    cb(null, uploadPath); // תיקיית היעד
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    console.log("Generating filename:", fileName);
    cb(null, fileName); // שם הקובץ
  }
});

const upload = multer({ storage: storage });

export default upload;
