import mongoose from "mongoose";
import parashaSchema from "../schemas/parasha-schema";

const Parasha = mongoose.model("Parasha", parashaSchema);

export default Parasha;
