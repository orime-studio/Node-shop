import { IProductInput } from "../@types/@types";

const users = [
  {
    isAdmin: true,
    name: {
      first: "admin",
      middle: "",
      last: "orime",
    },
    phone: "0507123012",
    email: "admin@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Tel aviv",
      street: "Shoham",
      houseNumber: 5,
      zip: "8920435",
    },
    isBusiness: true,
  },
  {
    name: {
      first: "Moshe",
      middle: "",
      last: "Doe",
    },
    phone: "050-8123012",
    email: "moshe@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "HaNevim",
      houseNumber: 5,
      zip: "8920435",
    },
    isBusiness: true,
  },
  {
    name: {
      first: "Yossi",
      middle: "",
      last: "Cohen",
    },
    phone: "050-9123012",
    email: "rtytuj@gmail.com",
    password: "Abc!123Abc",
    address: {
      state: "IL",
      country: "Israel",
      city: "Haifa",
      street: "HaNevim",
      houseNumber: 5,
      zip: "8920435",
    },
    isBusiness: true,

  },

];


const products: IProductInput[] = [
  {
    title: "Black Ribbed Sweater",
    subtitle: "Elegant and Versatile",
    description: "A black ribbed sweater that offers both elegance and versatility. Perfect for any occasion.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/2.png",
        alt: "Black Ribbed Sweater"
      }
    ],
    alt: "Black Ribbed Sweater",
    categories: ["Sweaters", "Winter"],
   
    basePrice: 200, // מחיר בסיס לדוגמה
    salePrice: 180, // לדוגמה
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 35,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Blazer",
    subtitle: "Classic and Timeless",
    description: "A classic black blazer that never goes out of style.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/3.png",
        alt: "Black Blazer"
      }
    ],
    alt: "Black Blazer",
    categories: ["Blazers", "Formal"],
    basePrice: 300,
    salePrice: 250,
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 15,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Ribbed Sweater",
    subtitle: "Elegant and Versatile",
    description: "A black ribbed sweater that offers both elegance and versatility. Perfect for any occasion.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/2.png",
        alt: "Black Ribbed Sweater"
      }
    ],
    alt: "Black Ribbed Sweater",
    categories: ["Sweaters", "Winter"],
   
    basePrice: 200, // מחיר בסיס לדוגמה
    salePrice: 180, // לדוגמה
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 35,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Blazer",
    subtitle: "Classic and Timeless",
    description: "A classic black blazer that never goes out of style.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/3.png",
        alt: "Black Blazer"
      }
    ],
    alt: "Black Blazer",
    categories: ["Blazers", "Formal"],
    basePrice: 300,
    salePrice: 250,
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 15,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Ribbed Sweater",
    subtitle: "Elegant and Versatile",
    description: "A black ribbed sweater that offers both elegance and versatility. Perfect for any occasion.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/2.png",
        alt: "Black Ribbed Sweater"
      }
    ],
    alt: "Black Ribbed Sweater",
    categories: ["Sweaters", "Winter"],
   
    basePrice: 200, // מחיר בסיס לדוגמה
    salePrice: 180, // לדוגמה
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 35,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Blazer",
    subtitle: "Classic and Timeless",
    description: "A classic black blazer that never goes out of style.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/3.png",
        alt: "Black Blazer"
      }
    ],
    alt: "Black Blazer",
    categories: ["Blazers", "Formal"],
    basePrice: 300,
    salePrice: 250,
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 15,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Ribbed Sweater",
    subtitle: "Elegant and Versatile",
    description: "A black ribbed sweater that offers both elegance and versatility. Perfect for any occasion.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/2.png",
        alt: "Black Ribbed Sweater"
      }
    ],
    alt: "Black Ribbed Sweater",
    categories: ["Sweaters", "Winter"],
   
    basePrice: 200, // מחיר בסיס לדוגמה
    salePrice: 180, // לדוגמה
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 35,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Blazer",
    subtitle: "Classic and Timeless",
    description: "A classic black blazer that never goes out of style.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/3.png",
        alt: "Black Blazer"
      }
    ],
    alt: "Black Blazer",
    categories: ["Blazers", "Formal"],
    basePrice: 300,
    salePrice: 250,
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 15,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  {
    title: "Black Blazer",
    subtitle: "Classic and Timeless",
    description: "A classic black blazer that never goes out of style.",
    images: [
      {
        url: "https://node-tandt-shop.onrender.com/uploads/3.png",
        alt: "Black Blazer"
      }
    ],
    alt: "Black Blazer",
    categories: ["Blazers", "Formal"],
    basePrice: 300,
    salePrice: 250,
    shippingTime: 14,
    variants: [
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "S", additionalCost: 0 },
        quantity: 40,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "M", additionalCost: 0 },
        quantity: 15,
      },
      {
        color: { value: "Black", additionalCost: 0 },
        size: { value: "L", additionalCost: 0 },
        quantity: 20,
      },
    ],
  },
  // ניתן להמשיך כך לשאר המוצרים, בהתאם לדוגמה הראשונה
];


export { users, products };
