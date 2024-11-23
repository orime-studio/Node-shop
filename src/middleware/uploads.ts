import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    console.log(`Upload path: ${uploadPath}`);

    // יצירת התיקייה אם היא לא קיימת
    if (!fs.existsSync(uploadPath)) {
      try {
        console.log("Directory does not exist. Creating...");
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log("Directory created successfully.");
      } catch (error) {
        console.error("Error creating directory:", error);
        return cb(error, uploadPath); // החזרת שגיאה אם נכשל
      }
    } else {
      console.log("Directory already exists.");
    }

    cb(null, uploadPath); // תיקיית היעד
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    console.log(`Saving file with name: ${fileName}`);
    cb(null, fileName);
  },
});

export const upload = multer({ storage });