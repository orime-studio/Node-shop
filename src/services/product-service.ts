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

// Update product
  updateProduct: async (id: string, data: FormData) => {
      const product = await Product.findByIdAndUpdate(id, data, { new: true });
      if (!product) throw new Error("Product not found");
      return product;
    },
 


/*   getProducts: async () => Product.find(),
 */
  getProduct: async (id: string) => Product.findById(id),

  getProductByUserId: async (userId: string) => Product.find({ userId: userId }),


  getProducts: async (filters: {
    minPrice?: number;
    maxPrice?: number;
    size?: string[];
    searchTerm?: string;
    category?: string;
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

    if (filters.category) {
      // סינון לפי קטגוריה ראשית
      query.mainCategory = filters.category;
    }

    if (filters.size || filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.variants = { $elemMatch: {} };

      if (filters.size) {
        query.variants.$elemMatch.size = { $in: filters.size };
      }

      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        const priceConditions: any = {};
        if (filters.minPrice !== undefined) {
          priceConditions.$gte = filters.minPrice;
        }
        if (filters.maxPrice !== undefined) {
          priceConditions.$lte = filters.maxPrice;
        }
        query.variants.$elemMatch.price = priceConditions;
      }
    }

    console.log("MongoDB Query:", JSON.stringify(query, null, 2));

    
    const products = await Product.find(query);
    return products;
  },


  deleteProduct: async (id: string) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },

}