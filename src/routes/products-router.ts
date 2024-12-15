import { Router } from "express";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";
import upload from "../middleware/uploads";
import { validateToken } from "../middleware/validate-token";
import { productService } from "../services/product-service";




const router = Router();


// Add products
router.post("/", ...isAdmin, upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 5 }]),
  async (req, res, next) => {
  try {
    // בדיקת הטוקן
    if (!req.payload) {
      console.log("Token validation failed.");
      throw new Error("Invalid token");
    }

    // בדיקת הקבצים שהועלו
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // בדיקת תמונה ראשית
      if (!files.mainImage || files.mainImage.length === 0) {
        throw new Error("Main image is required.");
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




// update product
router.put("/:id", ...isAdmin, upload.fields([
  { name: "mainImage", maxCount: 1 }, // תמונה ראשית
  { name: "images", maxCount: 5 }, // עד 5 תמונות נוספות
]), async (req, res, next) => {
  try {
    if (!req.payload) {
      throw new Error("Invalid token");
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log("Received files:", files);

    const mainImage = files.mainImage && files.mainImage.length > 0
    ? {
        url: `https://node-tandt-shop.onrender.com/uploads/${files.mainImage[0].filename}`,
        alt: req.body.alt || "",
      }
    : {
        url: req.body.mainImageUrl || '', // אם לא הועלתה תמונה, נשתמש ב-URL קיים מה-body
        alt: req.body.alt || "",
      };
  console.log("Main image data:", mainImage);

     
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
    console.log("Additional images data:", images);


    const productData = { 
      ...req.body, 
      mainImage,
      images};

    const updatedProduct = await productService.updateProduct(req.params.id, productData);

    if (!updatedProduct) {
      console.error("Product not found for ID:", req.params.id);
      
      return res.status(404).json({ message: "Product not found." });
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
    const { minPrice, maxPrice, size, searchTerm } = req.query;

    const filters = {
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      size: size ? (size as string).split(",") : undefined,
      searchTerm: searchTerm ? (searchTerm as string) : undefined,
    };

    console.log("Received filters:", filters);


    const products = await productService.getProducts(filters);
    res.json(products);
  } catch (e) {
    next(e);
  }
});


// replenish stock
router.patch("/replenish", validateToken, isAdmin, async (req, res, next) => {
  try {
    const updates = req.body;
    const products = await productService.bulkReplenishStock(updates);
    res.json(products);
  } catch (e) {
    next(e);
  }
});

//get all categories
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await productService.getAllCategories();
    res.json(categories);
  } catch (e) {
    next(e);
  }
});

//get all products by category
router.get("/category/:category", async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await productService.getProductsByCategory(category);
    res.json(products);
  } catch (e) {
    next(e);
  }
});

//get all products by tag
router.get("/tag/:tag", async (req, res, next) => {
  try {
    const tag = req.params.tag;
    const products = await productService.getProductsByTag(tag);
    res.json(products);
  } catch (e) {
    next(e);
  }
});

export { router as productRouter };
