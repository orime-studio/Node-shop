import _ from "underscore";
import { IProductInput } from "../@types/@types";
import Product from "../db/models/product-model";
import { Logger } from "../logs/logger";
import BizCardsError from "../errors/BizCardsError";


const generateBizNumber = async () => {
  //generate random bizNumber:
  while (true) {
    const r = _.random(1_000_000, 9_999_999);
    const dbRes = await Product.findOne({ bizNumber: r });
    if (!dbRes) {
      return r;
    }
  }
};


export const productService = {
  // Create product
  createProduct: async (data: IProductInput, userId: string) => {
    const product = new Product(data);
    product.userId = userId;
    product.barcode = await generateBizNumber();
    Logger.log(product.barcode);

    return product.save();
  },


  updateProduct: async (id: string, data: FormData) => {
      const product = await Product.findByIdAndUpdate(id, data, { new: true });
      if (!product) throw new Error("Product not found");
      return product;
    },
 


/*   getProducts: async () => Product.find(),
 */
  getProduct: async (id: string) => Product.findById(id),

  getProductByUserId: async (userId: string) => Product.find({ userId: userId }),



 /*  getProducts: async (filters: {
    minPrice?: number;
    maxPrice?: number;
    size?: string[];
    searchTerm?: string;
  }) => {
    const query: any = {};

    if (filters.searchTerm) {
      const regex = new RegExp(filters.searchTerm, "i");
      query.$or = [
        { title: regex },
        { subtitle: regex },
        { description: regex },
      ];
    }

    if (filters.size || filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.variants = { $elemMatch: {} };

      if (filters.size) {
        query.variants.$elemMatch.size = { $in: filters.size };
      }

      const priceConditions: any = {};
      if (filters.minPrice !== undefined) {
        // נשים לב שזה מחיר סופי: basePrice + salePrice(אם קיים) + additionalCost
        // כאן קצת מורכב כי המחיר הסופי מחושב דינמית. כפתרון פשוט, נניח שהמחיר של variant לא מחושב כאן.
        // אפשר לשמור מחיר סופי בסכמה עצמה אם תרצי, אך כעת נשאיר כך.
        // בהתאם לדרישה שלך, אפשר להוסיף שדה "finalPrice" במוצר או מחושבת On-The-Fly.
        // לצורך דוגמה נשאיר כמו שהיה (משתמשים priceConditions רק if needed)
        priceConditions.$gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        priceConditions.$lte = filters.maxPrice;
      }

      // במקרה הנוכחי, אין לנו שדה מחיר סופי בווריאנט בסכמה החדשה.
      // אם תרצי, אפשר להוסיף שדה finalPrice: Number מחושב ובקוד העדכני לאתחל אותו.
      // כאן נשאיר באופן פשוט, כאילו אנחנו מסננים לפי basePrice בלבד,
      // או נוסיף שדה finalPrice בעת יצירת מוצר.

      // לצורך הפשטה - אם תרצי לסנן, תצטרכי לחשב את finalPrice לשמירה מראש.
      // כרגע נמחק את הסינון לפי מחיר ב-query הזה, או נשאיר אותו כמסומן בהערה.

      if (Object.keys(priceConditions).length > 0) {
        // במציאות, צריך finalPrice בווריאנט. נניח שהadditionalCost בסה"כ נוסף לbasePrice.
        // finalPrice = (basePrice (+salePrice?)) + variant.color.additionalCost + variant.size.additionalCost
        // כדי לסנן לפי זה, צריך דרך מראש לחשב finalPrice ולשמור בסכמה או לשנות לשאילתת Aggregation.
        // כרגע נשמיט את הסינון הזה או נשתמש רק בסינון גס על basePrice (לא לגמרי מדויק):
        query.basePrice = priceConditions;
      }
    }

    const products = await Product.find(query);
    return products;
  },
 */


  getProducts: async (filters: {
    minPrice?: number;
    maxPrice?: number;
    size?: string[];
    searchTerm?: string;
}) => {
    // אם אין פילטרים, מחזיר את כל המוצרים
    if (!filters.minPrice && !filters.maxPrice && !filters.size && !filters.searchTerm) {
        return await Product.find(); // מחזיר את כל המוצרים ללא סינון
    }

    const query: any = {};

    // חיפוש לפי מילות מפתח
    if (filters.searchTerm) {
        const regex = new RegExp(filters.searchTerm, "i");
        query.$or = [
            { title: regex },
            { subtitle: regex },
            { description: regex },
        ];
    }

    // הגדרת תנאים עבור ווריאנטים
    if (filters.size || filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.variants = { $elemMatch: {} };

        if (filters.size) {
            query.variants.$elemMatch['size.value'] = { $in: filters.size }; // בדיקה לפי ערכי המידה
        }

        // סינון לפי מחיר
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            query.variants.$elemMatch.price = {};

            if (filters.minPrice !== undefined) {
                query.variants.$elemMatch.price.$gte = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                query.variants.$elemMatch.price.$lte = filters.maxPrice;
            }
        }
    }

    // שאילתה לבסיס הנתונים
    const products = await Product.find(query);

    // חישוב המחיר הסופי (במקרה שהפילטרים לא יכולים להיעשות בבסיס הנתונים ישירות)
    const filteredProducts = products.filter(product => {
        return product.variants.some(variant => {
            const finalPrice =
                product.basePrice +
                (product.salePrice || 0) +
                variant.size.additionalCost +
                variant.color.additionalCost;

            const isWithinPriceRange =
                (filters.minPrice === undefined || finalPrice >= filters.minPrice) &&
                (filters.maxPrice === undefined || finalPrice <= filters.maxPrice);

            return isWithinPriceRange;
        });
    });

    return filteredProducts;
},



  deleteProduct: async (id: string) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },

  /* bulkReplenishStock: async (updates: { id: string; size: string; quantity: number }[]) => {
    if (!Array.isArray(updates) || updates.length === 0) {
      throw new BizCardsError(400, "Updates must be a non-empty array");
    }

    const results = [];

    for (const update of updates) {
      if (!update.id || !update.size || !update.quantity) {
        throw new BizCardsError(400, "Each update must include id, size, and quantity");
      }
      if (update.quantity <= 0) {
        throw new BizCardsError(400, "Quantity must be greater than 0");
      }

      const product = await Product.findById(update.id);
      if (!product) throw new BizCardsError(404, `Product not found: ${update.id}`);

      const variant = product.variants.find(v => v.size === update.size);
      if (!variant) throw new BizCardsError(400, `Invalid size: ${update.size}`);

      variant.quantity += update.quantity;
      await product.save();
      results.push(product);
    }

    return results;
  }, */
};