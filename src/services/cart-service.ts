import Product from '../db/models/product-model';
import { ICart, ICartWithTotals } from '../@types/@types';
import CartModel from '../db/models/cart-model';
import BizCardsError from '../errors/BizCardsError';

// במקרה שאין עגלה ב-MongoDB (למשתמש לא מחובר), ניתן להשתמש ב-localStorage
export const cartService = {
    getCartById: async (userId: string): Promise<ICartWithTotals | null> => {
        try {
            // מנסים למצוא את העגלה ב-MongoDB
            const cart = await CartModel.findOne({ userId }).populate('items.variantId');

            if (!cart) {
                // אם לא נמצאה עגלה ב-MongoDB, ננסה לשחזר אותה מ-localStorage (אם יש)
                const cartFromLocalStorage = localStorage.getItem('cart');
                if (cartFromLocalStorage) {
                    return JSON.parse(cartFromLocalStorage);
                }
                return null;
            }

            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);

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
        color: string
    ): Promise<ICart | null> => {
        
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            cart = new CartModel({
                userId,
                items: [] // יצירת מערך ריק חוקי
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
                color,
                title: product.title,
                price: variant.price,
                mainImage: product.mainImage
            });
        }

        // אם המשתמש לא מחובר, נשמור את העגלה ב-localStorage
        if (!userId) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            await cart.save();
        }

        return cart;
    },

    removeProductFromCart: async (userId: string, variantId: string): Promise<ICart | null> => {
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            // אם לא נמצא cart ב-MongoDB, ננסה לשחזר מה-localStorage
            const cartFromLocalStorage = localStorage.getItem('cart');
            if (cartFromLocalStorage) {
                cart = JSON.parse(cartFromLocalStorage);
            } else {
                throw new BizCardsError(404, 'Cart not found');
            }
        }

        cart.items = cart.items.filter((item) => item.variantId !== variantId);

        // עדכון ב-localStorage אם המשתמש לא מחובר
        if (!userId) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            await cart.save();
        }

        return cart;
    },

    updateQuantityInCart: async (userId: string, productId: string, variantId: string, quantity: number): Promise<ICart | null> => {
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            // אם לא נמצא cart ב-MongoDB, ננסה לשחזר מה-localStorage
            const cartFromLocalStorage = localStorage.getItem('cart');
            if (cartFromLocalStorage) {
                cart = JSON.parse(cartFromLocalStorage);
            } else {
                throw new BizCardsError(404, 'Cart not found');
            }
        }

        const itemIndex = cart.items.findIndex((item) => item.variantId === variantId);
        if (itemIndex === -1) {
            throw new BizCardsError(404, 'Product not found in cart');
        }

        cart.items[itemIndex].quantity = quantity;

        // עדכון ב-localStorage אם המשתמש לא מחובר
        if (!userId) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            await cart.save();
        }

        return cart;
    },

    clearCart: async (userId: string): Promise<ICart | null> => {
        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            // אם לא נמצא cart ב-MongoDB, ננסה לשחזר מה-localStorage
            const cartFromLocalStorage = localStorage.getItem('cart');
            if (cartFromLocalStorage) {
                cart = JSON.parse(cartFromLocalStorage);
            } else {
                throw new BizCardsError(404, 'Cart not found');
            }
        }

        cart.items = [];

        // עדכון ב-localStorage אם המשתמש לא מחובר
        if (!userId) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            await cart.save();
        }

        return cart;
    }
};
