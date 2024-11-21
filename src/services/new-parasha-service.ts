import { ParashaInput } from "../@types/chabad";
import NewParasha from "../db/models/parasha-new-model";

export const parashaService = {
    createParasha: async (data: ParashaInput) => {
        const parasha = new NewParasha(data);

        return parasha.save();
    },
    getParashot: async () => NewParasha.find(),

    getParasha: async (id: string) => NewParasha.findById(id),


};
