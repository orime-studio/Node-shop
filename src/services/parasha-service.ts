import { IParasha } from "../@types/@types";
import Parasha from "../db/models/parasha-model";

export const parashaService = {
  createParasha: async (data: IParasha, userId: string) => {
    const parasha = new Parasha(data);
    parasha.userId = userId;

    return parasha.save();
  },
  updateParasha: async (id: string, data: IParasha) => {
    const parasha = await Parasha.findByIdAndUpdate(id, data, { new: true });
    if (!parasha) throw new Error("Parasha not found");
    return parasha;
  },
  deleteParasha: async (id: string) => {
    const parasha = await Parasha.findByIdAndDelete(id);
    return parasha;
  },
  getParashot: async () => Parasha.find(),
  getParasha: async (id: string) => Parasha.findById(id),
};
