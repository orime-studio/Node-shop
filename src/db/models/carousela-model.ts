// models/carousel-model.ts

import mongoose from "mongoose";
import carouselImageSchema from "../schemas/carousella-schema";

const CarouselImage = mongoose.model("CarouselImage", carouselImageSchema);

export default CarouselImage;
