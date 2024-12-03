import { CarouselImageInput, CarouselImageUpdateInput } from "../@types/@types";
import CarouselImage from "../db/models/carousela-model";


export const carouselService = {
  // קבלת כל התמונות של הקרוסלה
  getCarouselImages: async () => {
    const images = await CarouselImage.find().exec();
    return images;
  },

  // הוספת תמונה חדשה לקרוסלה
  createCarouselImage: async (data: CarouselImageInput) => {
    const image = new CarouselImage(data);
    return image.save();
  },

  // שליפת תמונה לפי מזהה
  getCarouselImage: async (id: string) => {
    return CarouselImage.findById(id);
  },

  // עדכון תמונה בקרוסלה
  updateCarouselImage: async (id: string, data: CarouselImageUpdateInput) => {
    const image = await CarouselImage.findByIdAndUpdate(id, data, { new: true });
    if (!image) throw new Error("Carousel image not found");
    return image;
  },

  // מחיקת תמונה מהקרוסלה
  deleteCarouselImage: async (id: string) => {
    const image = await CarouselImage.findByIdAndDelete(id);
    return image;
  },
};
