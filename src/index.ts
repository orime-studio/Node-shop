import express, { json } from "express";
import usersRouter from "./routes/users-router";
import notFound from "./middleware/not-found";
import connect from "./db/connection";
import configDevEnv from "../config";
import errorHandler from "./middleware/error-handler";
import morgan from "morgan";
import { productRouter } from "./routes/products-router";
import { Logger } from "./logs/logger";
import cors from 'cors';
import { analyticsRouter } from "./routes/analytics-router";
import { orderRouter } from "./routes/order-router";
import path from "path";
import { cartRouter } from "./routes/cart-router";
import { messageRouter } from "./routes/message-router";
import pageRoute from './routes/page-router';
import { newParashaRouter } from "./routes/new-parasha-router";

// הוספת Multer
import multer from 'multer';
import fs from 'fs';

// הגדרת מיקום התיקיה לשמירת הקבצים
const uploadDir = path.join(__dirname, 'public', 'uploads');

// אם תיקיית uploads לא קיימת, ניצור אותה
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// הגדרת Multer לשמירת הקבצים בתיקיה
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // קובעים את מיקום השמירה
  },
  filename: (req, file, cb) => {
    // נותנים שם ייחודי לקובץ (תאריך זמן כדי למנוע כפילויות)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// הגדרת multer עם הגדרת ה-storage
const upload = multer({ storage: storage });

configDevEnv();
connect();

Logger.error("hi");

const app = express();
//middleware chain:
app.use(json());
app.use(morgan("dev"));
app.use(cors());

// הגדרת תיקיית uploads כ-static כך שניתן לגשת אליה דרך URL
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/cart", cartRouter);
app.use('/api/v1/pages', pageRoute);
app.use('/api/v1/parasha', newParashaRouter);

// נתיב להעלאת קובץ
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    return res.json({ message: 'File uploaded successfully!', file: req.file });
  } else {
    return res.status(400).json({ message: 'No file uploaded' });
  }
});

app.use(express.static("public"));
app.use(errorHandler);
app.use(notFound);

//start the server:
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
