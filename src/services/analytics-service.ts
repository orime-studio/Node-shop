import Product from "../db/models/product-model";
import Order from "../db/models/order-model";
import { IOrder, IOrderProduct } from "../@types/@types";
import BizCardsError from "../errors/BizCardsError";

export const analyticsService = {

    // Get all orders
    getAllOrders: async (): Promise<{ orders: IOrder[], count: number }> => {
        const orders = await Order.find().populate({
            path: 'userId',
            select: 'name', // אכלוס השדה name מתוך userId
        }).populate('products.productId');

        const count = await Order.countDocuments(); // ספירת כמות ההזמנות

        const formattedOrders = orders.map(order => ({
            userId: order.userId._id.toString(),
            products: order.products.map(product => ({
                productId: product.productId._id.toString(),
                title: product.title, // שימוש ב- productId כדי לקבל את ה-title
                barcode: product.barcode, // שימוש ב- productId כדי לקבל את ה-barcode
                quantity: product.quantity,
                price: product.price,
                size: product.size,
                color: product.color, // הוספת הצבע
            })),
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
            orderNumber: order.orderNumber,
        }));

        return { orders: formattedOrders, count };
    },


    getSalesByDate: async (startDate: Date, endDate: Date) => {

        if (!startDate || !endDate) {
            throw new BizCardsError(400, "Start date and end date are required");
        }

        if (new Date(endDate) < new Date(startDate)) {
            throw new BizCardsError(400, "End date cannot be earlier than start date");
        }

        // הוספת יום אחד לתאריך הסיום כדי לכלול את כל היום הנוכחי
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        const salesByDate = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // קיבוץ לפי יום
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
            {
                $sort: { _id: 1 }, // מיון לפי תאריך עולה
            },
        ]);

        const overallSales = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate), // תאריך התחלה
                        $lte: adjustedEndDate,   // תאריך סיום כולל את כל היום הנוכחי
                    },
                    status: { $ne: "cancelled" } // לא כולל הזמנות מבוטלות
                },
            },
            {
                $group: {
                    _id: null, // קיבוץ כל המסמכים יחד
                    totalAmount: { $sum: "$totalAmount" }, // סכום כל הכסף שנכנס
                    totalSales: { $sum: 1 }, // סך כל המכירות
                },
            },
        ]);

        return {
            salesByDate,
            overallSales: overallSales[0] || { totalAmount: 0, totalSales: 0 },
        };
    },



    getOrderStatus: async () => {
        const orders = await Order.find({}, { status: 1 }); // נביא רק את השדה status

        const statuses = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        return statuses;
    },

    updateOrderStatus: async (orderId: string, status: string) => {

        if (!status) {
            throw new BizCardsError(400, "Status is required");
        }

        const validStatuses = ["pending", "approved", "processing", "shipped", "delivered", "cancelled", "returned", "completed"];
        if (!validStatuses.includes(status)) {
            throw new BizCardsError(404, "Invalid status");
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new BizCardsError(404, "Order not found");
        }

        return order;
    },
};
