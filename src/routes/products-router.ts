import { Router } from "express";
import { productService } from "../services/product-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";

import multer from 'multer';
import path from 'path';
import fs from 'fs';


const router = Router();


// Add products


// הגדרת מיקום תיקיית העלאת הקבצים
const uploadDir = path.join(__dirname, 'public', 'utploads');

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

// הנתיב להעלאת מוצר (כולל קובץ)
router.post("/", isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    // בדיקת הטוקן
    if (!req.payload) {
      console.log("Token validation failed.");
      throw new Error("Invalid token");
    }

    // הדפסת המידע על הקובץ שהועלה
    console.log("Uploaded file:", req.file);

    // יצירת כתובת URL של התמונה
    const imageUrl = `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}`;
    console.log("Image URL:", imageUrl);

    // הדפסת המידע על הנתונים שהתקבלו בגוף הבקשה
    console.log("Request body:", req.body);

    // בניית המידע עבור המוצר
    const productData = {
      ...req.body,
      image: {
        url: imageUrl,
        alt: req.body.alt
      }
    };
    console.log("Product data:", productData);

    // יצירת המוצר בשירות
    const result = await productService.createProduct(productData, req.payload._id);
    console.log("Product creation result:", result);

    // שליחת תשובה ללקוח
    res.status(201).json(result);
  } catch (e) {
    console.error("Error during product creation:", e.message);
    next(e);
  }
});





router.put("/:id", ...isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.payload) {
      throw new Error("Invalid token");
    }
    const imageUrl = req.file ? `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}` : req.body.imageUrl;
    const productData = { ...req.body, image: { url: imageUrl, alt: req.body.alt } };
    const updatedProduct = await productService.updateProduct(req.params.id, productData);
    res.json(updatedProduct);
  } catch (e) {
    next(e);
  }
});


//delete product
router.delete("/:id", ...isAdmin, isProductId, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productService.deleteProduct(productId);
    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (e) {
    next(e);
  }
});



router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", isProductId, async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (e) {
    next(e);
  }
});


router.patch("/replenish", validateToken, isAdmin, async (req, res, next) => {
  try {
    const updates = req.body;
    const products = await productService.bulkReplenishStock(updates);
    res.json(products);
  } catch (e) {
    next(e);
  }
});

export { router as productRouter };
