import { IImage } from "./@types";

export type ParashaInput = {
    author: string;          // שם המחבר
    title: string;           // כותרת הפרשה
    miniText: string;        // טקסט מקוצר שמתאר את הפרשה
    alt: string;             // תיאור התמונה (alt)
    image: IImage;    // תמונה של הפרשה
    parashPage: ParashPage[]; // רשימת עמודי הפרשה
};

export type ParashPage = {
    title: string; // כותרת של עמוד
    text: string;  // תוכן של עמוד
};

export type Parasha = ParashaInput & {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
