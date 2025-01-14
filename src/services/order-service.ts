import Order from "../db/models/order-model";
import Product from "../db/models/product-model";
import { IOrderProduct } from "../@types/@types";
import BizCardsError from "../errors/BizCardsError";

export const orderService = {
    createOrder: async (userId: string, products: IOrderProduct[]) => {
        try {
            const orderProducts = await Promise.all(products.map(async product => {
                const productDetails = await Product.findById(product.productId);
                const variant = productDetails.variants.find(v => v.size === product.size);
                if (!variant) throw new BizCardsError(404, "Variant not found");

                const color = variant.colors.find(c => c.name === product.color);
                if (!color) throw new BizCardsError(404, "Color not found");
                if (color.quantity < product.quantity) throw new BizCardsError(400, "Not enough stock for the selected color");

                // Update stock for the selected color
                color.quantity -= product.quantity;
                productDetails.sold += product.quantity;
                await productDetails.save();

                return {
                    productId: product.productId,
                    title: productDetails.title,
                    barcode: productDetails.barcode,
                    quantity: product.quantity,
                    price: variant.price,
                    size: product.size,
                    color: product.color, // Include the color in the order
                };
            }));

            // Calculate totalAmount
            const totalAmount = orderProducts.reduce((acc, product) => acc + (product.quantity * product.price), 0);

            const order = new Order({
                userId,
                products: orderProducts,
                totalAmount,
                orderNumber: `ORD-${Date.now().toString()}`,
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
            const productDetails = await Product.findById(product.productId);
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
