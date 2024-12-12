import { Schema } from "mongoose";
import { IProduct, IVariant } from "../../@types/@types";
import imageSchema from "./image-schema";

const VariantSchema = new Schema<IVariant>({
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new Schema<IProduct>({
  barcode: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  shoppingCart: [{ type: String }],
  sold: { type: Number, required: false, default: 0 },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  mainImage: { 
    type: imageSchema, 
    required: true // התמונה הראשית היא חובה
  },
  images: [{ 
    type: imageSchema, 
    required: false // התמונות הנוספות אינן חובה
  }],
  alt: { type: String, required: false },
  variants: [VariantSchema], // מערך מסמכים מקוננים עבור הווריאנטים
  mainCategory: { type: String, required: true }, // קטגוריה ראשית חובה
  tags: [{ type: String, required: false }], // רשימת תגים אופציונלית
});

export default ProductSchema;
