import { parasha } from "../@types/chabad";
import NewParasha from "../db/models/parasha-new-model";

export const parashaService = {
    createParasha: async (data: parasha) => {
        const parasha = new NewParasha(data);
    
        return parasha.save();
      },
};
