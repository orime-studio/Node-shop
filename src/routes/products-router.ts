import { Router } from "express";
import { productService } from "../services/product-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";
import { upload } from "../middleware/uploads";
import multer from "multer";
import path from "path";
import fs from "fs";




const router = Router();


// Add products
router.post("/", ...isAdmin, async (req, res, next) => {
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
  try {
    if (!req.payload) {
      throw new Error("Invalid token");
    }

    const imageUrl = `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}`;
    const productData = { ...req.body, image: { url: imageUrl, alt: req.body.alt } };
    const result = await productService.createProduct(productData, req.payload._id);


    res.status(201).json(result);
  } catch (e) {
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
