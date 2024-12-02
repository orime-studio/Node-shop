import { Router } from "express";
import { productService } from "../services/product-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";
import upload from "../middleware/uploads";
import Product from "../db/models/product-model";




const router = Router();


// Add products
router.post("/", ...isAdmin, upload.single("image"), async (req, res, next) => {
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




/* router.get("/:id", isProductId, async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (e) {
    next(e);
  }
}); */


router.get("/", async (req, res, next) => {
  try {
    const { minPrice, maxPrice, size, sortPrice } = req.query;
    let filter: any = {};
    
    // Apply price filters if provided
    if (minPrice) {
      filter['variants.price'] = { $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filter['variants.price'] = { ...filter['variants.price'], $lte: Number(maxPrice) };
    }
    
    // Apply size filter if provided
    if (size) {
      filter['variants.size'] = size;
    }
    
    // Fetch products based on filters
    let productsQuery = Product.find(filter);
    
    // Apply sort if provided
    if (sortPrice) {
      const sortDirection = sortPrice === "asc" ? 1 : -1;
      productsQuery = productsQuery.sort({ "variants.price": sortDirection });
    }
    
    const products = await productsQuery.exec();
    res.json(products);
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
