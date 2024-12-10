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
  images: [
    imageSchema
  ],
  alt: { type: String, required: false },
  variants: [VariantSchema], // Array of embedded documents
});

export default ProductSchema;