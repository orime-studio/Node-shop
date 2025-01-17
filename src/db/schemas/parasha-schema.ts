import { Schema } from "mongoose";
import { IParasha, IParashaComponent } from "../../@types/@types";

const ParashaComponentSchema = new Schema<IParashaComponent>({
  type: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    url: { type: String, required: true },
  },
  alt: { type: String, required: false },
});

const ParashaSchema = new Schema<IParasha>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  components: [ParashaComponentSchema],
  createdAt: { type: Date, default: Date.now },
});

export default ParashaSchema;
