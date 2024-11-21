import multer from "multer";
import fs from "fs";
import path from "path";

// הגדרת Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public/uploads'); // תיקיית היעד

    // בדוק אם התיקיה קיימת, אם לא – צור אותה
    fs.exists(uploadPath, (exists) => {
      if (!exists) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
          if (err) {
            return cb(err, uploadPath);
          }
          cb(null, uploadPath); // אם התיקיה נוצרה, הגדר את התיקיה כיעד
        });
      } else {
        cb(null, uploadPath); // אם התיקיה קיימת, השתמש בה
      }
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // שם הקובץ
  }
});

const uploadNew = multer({ storage: storage });

export default uploadNew;
