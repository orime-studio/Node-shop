import { Router } from "express";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";
import upload from "../middleware/uploads";
import { productService } from "../services/product-service";
import BizCardsError from "../errors/BizCardsError";




const router = Router();


// Add products
router.post("/", ...isAdmin, upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 5 }]),
  async (req, res, next) => {
  try {
    // בדיקת הטוקן
    if (!req.payload) {
      throw new BizCardsError(400, "Invalid token");
    }

    // בדיקת הקבצים שהועלו
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // בדיקת תמונה ראשית
      if (!files.mainImage || files.mainImage.length === 0) {
        throw new BizCardsError(400, "Main image is required.");
      }

      // יצירת URL לתמונה הראשית
      const mainImage = {
        url: `https://node-tandt-shop.onrender.com/uploads/${files.mainImage[0].filename}`,
        alt: req.body.alt || "", // תיאור התמונה (alt)
      };

      // יצירת מערך של תמונות נוספות
      const images = files.images
        ? files.images.map((file) => ({
          url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
          alt: req.body.alt || "", // תיאור התמונה (alt)
        }))
        : [];
    // בניית המידע עבור המוצר
    const productData = {
      ...req.body,
      mainImage,
      images, // מערך של תמונות
    };

    // יצירת המוצר בשירות
    const result = await productService.createProduct(productData, req.payload._id);

    // שליחת תשובה ללקוח
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});




// update product
router.put("/:id", ...isAdmin, upload.fields([
  { name: "mainImage", maxCount: 1 }, // תמונה ראשית
  { name: "images", maxCount: 5 }, // עד 5 תמונות נוספות
]), async (req, res, next) => {
  try {
    if (!req.payload) {
      throw new BizCardsError(400, "Invalid token");
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const mainImage = files.mainImage && files.mainImage.length > 0
    ? {
        url: `https://node-tandt-shop.onrender.com/uploads/${files.mainImage[0].filename}`,
        alt: req.body.alt || "",
      }
    : {
        url: req.body.mainImageUrl || '', // אם לא הועלתה תמונה, נשתמש ב-URL קיים מה-body
        alt: req.body.alt || "",
      };

     
      const images = files.images && files.images.length > 0
      ? files.images.map((file) => ({
          url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
          alt: req.body.alt || "",
        }))
      : req.body.images && Array.isArray(req.body.images) 
        ? req.body.images.map((image: string) => ({
            url: image, // הפוך את המיתרים לאובייקטים עם URL
            alt: req.body.alt || "",
        }))
        : []; // אם אין תמונות ב-body, נשאיר כ-array ריק


    const productData = { 
      ...req.body, 
      mainImage,
      images};

    const updatedProduct = await productService.updateProduct(req.params.id, productData);

    if (!updatedProduct) {
      throw new BizCardsError(404, "Product not found.");
    }

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



/* router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
}); */



// get product by id
 router.get("/:id", isProductId, async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (e) {
    next(e);
  }
}); 



// get all products
router.get("/", async (req, res, next) => {
  try {
    const { minPrice, maxPrice, size, searchTerm, category } = req.query;

    const filters = {
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      size: size ? (size as string).split(",") : undefined,
      searchTerm: searchTerm ? (searchTerm as string) : undefined,
      category: category ? (category as string) : undefined, // הוספת קטגוריה
    };

    const products = await productService.getProducts(filters);
    res.json(products);
  } catch (e) {
    next(e);
  }
});




export { router as productRouter };
