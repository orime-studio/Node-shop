import Product from '../db/models/product-model';
import { ICart, ICartWithTotals } from '../@types/@types';
import CartModel from '../db/models/cart-model';
import BizCardsError from '../errors/BizCardsError';

// במקרה שאין עגלה ב-MongoDB (למשתמש לא מחובר), ניתן להשתמש ב-localStorage
export const cartService = {
    getCartById: async (userId: string): Promise<ICartWithTotals | null> => {
        try {
            const cart = await CartModel.findOne({ userId }).populate('items.variantId');

            if (!cart) {
                const cartFromLocalStorage = localStorage.getItem('cart');
                if (cartFromLocalStorage) {
                    return JSON.parse(cartFromLocalStorage);
                }
                return null;
            }

            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cart.items.reduce((total, item) => 
                total + item.quantity * (item.basePrice + item.priceAddition), 
                0
            );

            return {
                ...cart.toObject(),
                totalQuantity,
                totalPrice
            } as ICartWithTotals;
        } catch (error) {
            throw new BizCardsError(400, 'Error fetching cart');
        }
    },

    addProductToCart: async (
        userId: string,
        productId: string,
        variantId: string,
        quantity: number,
        size: string,
    ): Promise<ICart | null> => {
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({
                userId,
                items: []
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new BizCardsError(404, 'Product not found');
        }

        const variant = product.variants.find(v => v._id.toString() === variantId);
        if (!variant) {
            throw new BizCardsError(404, 'Variant not found');
        }

        const itemIndex = cart.items.findIndex(
            item => item.productId === productId && item.size === size && item.variantId === variantId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                variantId,
                quantity,
                size,
                title: product.title,
                basePrice: product.basePrice,
                priceAddition: variant.priceAddition,
                mainImage: product.mainImage
            });
        }

        if (!userId) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            await cart.save();
        }

        return cart;
    },
};

