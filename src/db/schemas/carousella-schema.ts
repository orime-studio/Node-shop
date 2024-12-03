// schemas/carousel-schema.ts

import { Schema } from "mongoose";

const carouselImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default carouselImageSchema;
