import Order from "../db/models/order-model";
import Product from "../db/models/product-model";
import { IOrderProduct } from "../@types/@types";
import BizCardsError from "../errors/BizCardsError";

export const orderService = {

    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById((product as IOrderProduct).productId);
                if (!productDetails) throw new BizCardsError(404, `Product with ID ${product.productId} not found`);
    
                const variant = productDetails.variants.find(v => v.size === product.size);
                if (!variant) throw new BizCardsError(404, `Variant with size ${product.size} not found for product ${product.productId}`);
    
                const color = variant.colors.find(c => c.name === product.color);
                if (!color) throw new BizCardsError(404, `Color ${product.color} not available for product ${product.productId}`);
    
                if (color.quantity < product.quantity) throw new BizCardsError(400, `Not enough stock for color ${product.color} in product ${product.productId}`);
    
                // עדכון מלאי הצבע
                color.quantity -= product.quantity;
    
                productDetails.sold += product.quantity;
                await productDetails.save();
    
                // החזרת פרטי המוצר לשמירה בהזמנה
                return {
                    productId: product.productId,
                    title: productDetails.title,
                    barcode: productDetails.barcode,
                    quantity: product.quantity,
                    price: variant.price,
                    size: product.size,
                    color: product.color,
                    mainImage: productDetails.mainImage,
                    description: productDetails.description,
                };
            }));
    
            // חישוב סכום כולל
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);
    
            // יצירת הזמנה
            const order = new Order({
                userId,
                products: orderProducts,
                totalAmount,
                orderNumber: `ORD-${Date.now().toString()}-${Math.floor(Math.random() * 10000)}`,
            });
    
            return await order.save();
        } catch (error) {
            console.error("Error creating order:", error.message);
            throw error;
        }
    },    


    cancelOrder: async (orderId: string) => {
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        if (order.status === "cancelled") {
            throw new Error("Order is already cancelled");
        }

        for (const product of order.products) {
            const productDetails = await Product.findById(product._id);
            if (productDetails) {
                const variant = productDetails.variants.find(v => v.size === product.size);
                if (variant) {
                    const color = variant.colors.find(c => c.name === product.color);
                    if (color) {
                        color.quantity += product.quantity;
                    }
                }
                productDetails.sold -= product.quantity;
                await productDetails.save();
            }
        }
        order.status = "cancelled";
        return await order.save();
    },



    getOrder: async (orderId: string) => {
        const order = await Order.findById(orderId).populate("products.productId");
        if (!order) throw new Error("Order not found");
        return order;
    },

    getOrdersByUser: async (userId: string) => {
        return Order.find({ userId }).populate("products.productId");
    },

    getAllOrders: async () => {
        const orders = await Order.find(({ status: { $ne: "cancelled" } })).populate("products.productId");
        const count = await Order.countDocuments({ status: { $ne: "cancelled" } });
        return { orders: orders.map(order => order.toObject()), count };

        },

};
