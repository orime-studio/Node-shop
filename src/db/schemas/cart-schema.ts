import { Schema } from 'mongoose';
import { ICart, ICartItem } from '../../@types/@types';
import imageSchema from './image-schema';

const cartItemSchema = new Schema<ICartItem>({
    productId: { type: String, required: true },
    variantId: { type: String, required: true },
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    basePrice: { type: Number, required: true },
    priceAddition: { type: Number, required: true },
    size: { type: String, required: true },
    mainImage: imageSchema,
});

const cartSchema = new Schema<ICart>({
    userId: { type: String, required: false }, // הפיכת userId לאופציונלי
    items: [cartItemSchema],
    isGuest: { type: Boolean, default: false }, // הוספת שדה לזיהוי משתמש אורח
});

export default cartSchema;
