import { parasha } from "../@types/chabad";
import Parasha from "../db/models/parasha-model";
import NewParasha from "../db/models/parasha-new-model";

export const parashaService = {
    createParasha: async (data: parasha) => {
        const parasha = new NewParasha(data);

        return parasha.save();
    },
    getParashot: async () => NewParasha.find(),

    getParasha: async (id: string) => Parasha.findById(id),


};
