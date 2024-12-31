import { Schema } from 'mongoose';
import { ICart } from '../../@types/@types';
import imageSchema from './image-schema';

const cartItemSchema = new Schema({
    productId: { type: String, required: true },
    variantId: { type: String, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true }, // Add color property
    mainImage: imageSchema,
});

const cartSchema = new Schema<ICart>({
    userId: { type: String, required: false }, // הפיכת userId לאופציונלי
    items: [cartItemSchema],
    isGuest: { type: Boolean, default: false }, // הוספת שדה לזיהוי משתמש אורח
});

export default cartSchema;
