import mongoose from "mongoose";
import NewParashaSchema from "../schemas/parasha-new-schema";

const NewParasha = mongoose.model("NewParasha", NewParashaSchema);

export default NewParasha;
