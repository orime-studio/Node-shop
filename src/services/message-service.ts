import { IMessage } from '../@types/@types';
import Message from '../db/models/message-model';


export const messageService = {
    // יצירת הודעה חדשה
    createMessage: async (data: IMessage) => {
        const message = new Message(data);
        return message.save();
    },

    // קבלת כל ההודעות
    getAllMessages: async () => {

        const messages = await Message.find({}).sort({ createdAt: -1 });

        return messages;
    },
};