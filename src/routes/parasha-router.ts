import { Router } from "express";
import { parashaService } from "../services/parasha-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";

const router = Router();


// יצירת פרשה חדשה
router.post("/", isAdmin, upload.single("image"), async (req, res, next) => {
    try {
      if (!req.payload) {
        throw new Error("Invalid token");
      }
  
/*       let imageUrl = `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}`;
      if (req.file) {
        console.log("Image URL:", imageUrl);
      } else {
        imageUrl = req.body.imageUrl;
        console.log("Image URL2:", imageUrl);
      } */
  
      // הוספת ה-userId לנתונים של הפרשה

      const imageUrl = req.file `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}`;
      res.json({ imageUrl })
      const parashaData = { 
        ...req.body, 
        image: { url: imageUrl, alt: req.body.alt },
        userId: req.payload._id 
      };
      const result = await parashaService.createParasha(parashaData);
      res.status(201).json(result);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
  
  // עדכון פרשה קיימת
  router.put("/:id", isAdmin, upload.single("image"), async (req, res, next) => {
    try {
      if (!req.payload) {
        throw new Error("Invalid token");
      }
  
      const imageUrl = req.file ? `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}` : req.body.imageUrl;
      const parashaData = { ...req.body, image: { url: imageUrl, alt: req.body.alt } };
      const updatedParasha = await parashaService.updateParasha(req.params.id, parashaData);
      res.json(updatedParasha);
    } catch (e) {
      next(e);
    }
  });
  
// מחיקת Parasha
router.delete("/:id", validateToken, isAdmin, async (req, res, next) => {
  try {
    const deletedParasha = await parashaService.deleteParasha(req.params.id);
    res.json({ message: "Parasha deleted successfully", parasha: deletedParasha });
  } catch (e) {
    next(e);
  }
});

// קבלת רשימת Parashot
router.get("/", async (req, res, next) => {
  try {
    const parashot = await parashaService.getParashot();
    res.json(parashot);
  } catch (e) {
    next(e);
  }
});

// קבלת Parasha לפי ID
router.get("/:id", async (req, res, next) => {
  try {
    const parasha = await parashaService.getParasha(req.params.id);
    res.json(parasha);
  } catch (e) {
    next(e);
  }
});

export { router as parashaRouter };
