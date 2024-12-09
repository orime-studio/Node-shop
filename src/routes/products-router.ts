import { Router } from "express";
import { IProductInput } from "../@types/@types";
import { isAdmin } from "../middleware/is-admin";
import isProductId from "../middleware/is-product-Id";
import upload from "../middleware/uploads";
import { validateToken } from "../middleware/validate-token";
import { productService } from "../services/product-service";


const router = Router();


// Add products
router.post("/", isAdmin, upload.fields([ // תמונה ראשית
  { name: "images", maxCount: 5 }, // עד 5 תמונות נוספות
]), async (req, res, next) => {
  try {
    if (!req.payload) {
      console.log("Token validation failed.");
      throw new Error("Invalid token");
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log("Received files:", files);
    
    // יצירת מערך של תמונות נוספות
    const images = files.images
      ? files.images.map((file) => ({
        url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
        alt: req.body.alt || "", // תיאור התמונה (alt)
      }))
      : [];

    // בניית המידע עבור המוצר
    const productData: IProductInput = {
      ...req.body,
      images, // חיבור מערך התמונות
    };

    const result = await productService.createProduct(productData, req.payload._id);
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



/* router.get("/", async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
}); */




 router.get("/:id", isProductId, async (req, res, next) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (e) {
    next(e);
  }
}); 




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
