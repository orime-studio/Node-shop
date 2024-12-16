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
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/2.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/3.png" },
    ],
    alt: "Black Ribbed Sweater",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Black Blazer",
    subtitle: "Classic and Timeless",
    description: "A classic black blazer that never goes out of style. Ideal for both formal and casual occasions.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/3.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/4.png" },
    ],
    alt: "Black Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Checked Blazer",
    subtitle: "Stylish and Modern",
    description: "A stylish checked blazer that adds a modern touch to any outfit. Perfect for making a statement.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/4.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/5.png" },
    ],
    alt: "Checked Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Oversized Blazer",
    subtitle: "Comfort and Style",
    description: "An oversized blazer that combines comfort and style. Perfect for a relaxed yet chic look.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/5.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/6.png" },
    ],
    alt: "Oversized Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Beige Blazer",
    subtitle: "Sleek and Sophisticated",
    description: "A sleek and sophisticated beige blazer. Perfect for adding a touch of elegance to any outfit.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/6.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/7.png" },
    ],
    alt: "Beige Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Fashionable Blazer",
    subtitle: "Bold and Trendy",
    description: "A fashionable blazer that is both bold and trendy. Perfect for standing out in style.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/7.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/8.png" },
    ],
    alt: "Fashionable Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "XL",
        price: 110,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "White Blouse",
    subtitle: "Crisp and Clean",
    description: "A crisp and clean white blouse. Ideal for both professional and casual settings.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/8.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/9.png" },
    ],
    alt: "White Blouse",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],


      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Elegant Beige Blazer",
    subtitle: "Chic and Modern",
    description: "An elegant beige blazer that is both chic and modern. Perfect for elevating any look.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/9.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/10.png" },
    ],
    alt: "Elegant Beige Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Sophisticated Blazer",
    subtitle: "Elegant and Timeless",
    description: "A sophisticated blazer that is both elegant and timeless. Perfect for any occasion.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/10.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/2.png" },
    ],
    alt: "Sophisticated Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "אדום", quantity: 10 },
          { name: "כחול", quantity: 5 },
        ],

      },
    ],
    mainCategory: "clothing",
    tags: ["elegant", "versatile"],
  },
];


export { users, products };
