import { Schema } from "mongoose";
import { IProduct, IVariant } from "../../@types/@types";

const VariantSchema = new Schema<IVariant>({
  color: {
    value: { type: String, required: true },
    additionalCost: { type: Number, default: 0 }
  },
  size: {
    value: { type: String, required: true },
    additionalCost: { type: Number, default: 0 }
  },
  quantity: { type: Number, required: true },
});

const ProductSchema = new Schema<IProduct>({
  barcode: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  shoppingCart: [{ type: String }],
  sold: { type: Number, default: 0 },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, required: true },
  }],
  categories: { type: [String], required: true },
  basePrice: { type: Number, required: true },
  salePrice: { type: Number },
  shippingTime: { type: Number, default: 14 },
  variants: [VariantSchema],
});

export default ProductSchema;
