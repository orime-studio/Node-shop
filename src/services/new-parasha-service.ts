import { ParashaInput } from "../@types/chabad";
import NewParasha from "../db/models/parasha-new-model";

export const parashaService = {
  // פונקציה לקבלת כל הפרשות או פרשה אחרונה
  getParashot: async (getLast: boolean) => {
    console.log("Inside getParashot, getLast:", getLast); // לוג לבדיקה
    if (getLast) {
      // מחזיר את הפרשה האחרונה בלבד
      const lastParasha = await NewParasha.findOne().sort({ createdAt: -1 }).exec();
      console.log("Last parasha fetched:", lastParasha); // לוג נוסף לבדיקה
      return lastParasha;
    }
    // מחזיר את כל הפרשות
    const allParashot = await NewParasha.find().exec();
    console.log("All parashot fetched:", allParashot); // לוג נוסף לבדיקה
    return allParashot;
  },
  // ניתן להוסיף גם פונקציות אחרות (כגון יצירת פרשה או קבלת פרשה לפי ID)
  createParasha: async (data: ParashaInput) => {
    const parasha = new NewParasha(data);
    return parasha.save();
  },

  getParasha: async (id: string) => {
    return NewParasha.findById(id);
  },
};


