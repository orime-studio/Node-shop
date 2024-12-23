import { ParashaInput } from "../@types/chabad";
import NewParasha from "../db/models/parasha-new-model";

export const parashaService = {
  // פונקציה לקבלת כל הפרשות או פרשה אחרונה
  getParashot: async (getLast: boolean) => {
    if (getLast) {
      // מחזיר את הפרשה האחרונה בלבד
      const lastParasha = await NewParasha.findOne().sort({ createdAt: -1 }).exec();
      return lastParasha;
    }
    // מחזיר את כל הפרשות
    const allParashot = await NewParasha.find().exec();
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
  editParasha: async (id: string, data: ParashaInput) => {
    // בדוק את נתוני התמונה לפני השמירה
    
    const parasha = await NewParasha.findByIdAndUpdate(id, data, { new: true });

    if (!parasha) throw new Error("Parasha not found");
    
    // גם כאן נוודא שהתמונה נשמרה ב-MongoDB

    return parasha;
},

  deleteParasha: async (id: string) => {
    const parasha = await NewParasha.findByIdAndDelete(id);
    return parasha;
  },
};


