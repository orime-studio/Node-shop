import { parasha } from "../@types/chabad";
import NewParasha from "../db/models/parasha-new-model";

export const parashaService = {
  createParasha: async (data: parasha) => {
    try {
      const parasha = new NewParasha(data);
      return await parasha.save();
    } catch (error) {
      throw new Error(`Failed to create a new Parasha: ${error.message}`);
    }
  },
};
