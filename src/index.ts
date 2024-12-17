
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
import { videoRouter } from "./routes/video-router";
import { articleRouter } from "./routes/article-router";
import { carouselRouter } from "./routes/carousela-router";



configDevEnv();
connect();

Logger.error("hi");

const app = express();
//middleware chain:
app.use(json());
app.use(morgan("dev"));
app.options("*", cors());
app.use(cors());
//http://localhost:8080/api/v1/users  
 
 


/* app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));  // תיקיית הסטטיים שהוגדרה
 */
/* app.use("/uploads", express.static(path.join(__dirname, "uploads"))); */



app.use("/api/v1/users", usersRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/cart", cartRouter);  // הוספת הנתיב לעגלת הקניות
app.use('/api/v1/pages', pageRoute);
app.use('/api/v1/parasha', newParashaRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/article', articleRouter);
app.use('/api/v1/carousela', carouselRouter);
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));


app.use(errorHandler);
app.use(notFound);

//start the server:
app.listen(8080, () => {

});
