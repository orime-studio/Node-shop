import { ParashaInput } from "../@types/chabad";
import NewParasha from "../db/models/parasha-new-model";

export const parashaService = {
  // פונקציה לקבלת כל הפרשות או פרשה אחרונה
  getParashot: async (getLast: boolean = false) => {
    if (getLast) {
      // אם רוצים את הפרשה האחרונה, נשיג את הפרשה האחרונה לפי תאריך יצירה (createdAt)
      return NewParasha.findOne().sort({ createdAt: -1 });  // -1 מסדר יורד לפי תאריך
    } else {
      // אם לא רוצים את הפרשה האחרונה, נשיג את כל הפרשות
      return NewParasha.find();  // כל הפרשות
    }
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
