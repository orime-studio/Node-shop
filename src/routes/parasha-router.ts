import { Router } from "express";
import { parashaService } from "../services/parasha-service";
import { validateToken } from "../middleware/validate-token";
import { isAdmin } from "../middleware/is-admin";

const router = Router();

// הוספת Parasha
router.post("/", validateToken, isAdmin, async (req, res, next) => {
  try {
    const result = await parashaService.createParasha(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

// עדכון Parasha
router.put("/:id", validateToken, isAdmin, async (req, res, next) => {
  try {
    const updatedParasha = await parashaService.updateParasha(req.params.id, req.body);
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
