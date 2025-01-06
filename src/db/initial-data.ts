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
    title: "Ribbed Elegance",
    subtitle: "Elegant and Versatile",
    description: "A ribbed sweater that offers both elegance and versatility. Perfect for any occasion.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/2.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/3.png" },
    ],
    alt: "Ribbed Sweater",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "brown", quantity: 5 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "brown", quantity: 5 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "brown", quantity: 5 },
        ],
      },
    ],
    mainCategory: "Coat",
    tags: ["elegant", "versatile"],
  },
  {
    title: "Classic Tailored",
    subtitle: "Classic and Timeless",
    description: "A classic blazer that never goes out of style. Ideal for both formal and casual occasions.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/3.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/4.png" },
    ],
    alt: "Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "black", quantity: 8 },
          { name: "white", quantity: 7 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "black", quantity: 8 },
          { name: "white", quantity: 7 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "black", quantity: 8 },
          { name: "white", quantity: 7 },
        ],
      },
    ],
    mainCategory: "Jacket",
    tags: ["classic", "timeless"],
  },
  {
    title: "Modern Check",
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
          { name: "black", quantity: 8 },
          { name: "grey", quantity: 6 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "black", quantity: 8 },
          { name: "grey", quantity: 6 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "black", quantity: 8 },
          { name: "grey", quantity: 6 },
        ],
      },
    ],
    mainCategory: "Jacket",
    tags: ["stylish", "modern"],
  },
  {
    title: "Oversized Comfort",
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
          { name: "Beige", quantity: 10 },
          { name: "black", quantity: 8 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "black", quantity: 8 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "black", quantity: 8 },
        ],
      },
    ],
    mainCategory: "Jacket",
    tags: ["comfort", "style"],
  },
  {
    title: "Sleek Sophistication",
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
          { name: "Beige", quantity: 10 },
          { name: "grey", quantity: 6 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "Offwhite", quantity: 6 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "grey", quantity: 6 },
        ],
      },
    ],
    mainCategory: "Jacket",
    tags: ["sleek", "sophisticated"],
  },
  {
    title: "Bold Trendsetter",
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
          { name: "brown", quantity: 5 },
          { name: "black", quantity: 8 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "brown", quantity: 5 },
          { name: "black", quantity: 8 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "brown", quantity: 5 },
          { name: "black", quantity: 8 },
        ],
      },
      {
        size: "XL",
        price: 110,
        colors: [
          { name: "brown", quantity: 5 },
          { name: "black", quantity: 8 },
        ],
      },
    ],
    mainCategory: "Jacket",
    tags: ["bold", "trendy"],
  },
  {
    title: "Crisp Cleanse",
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
          { name: "white", quantity: 7 },
          { name: "grey", quantity: 6 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "white", quantity: 7 },
          { name: "Offwhite", quantity: 6 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "white", quantity: 7 },
          { name: "grey", quantity: 6 },
        ],
      },
    ],
    mainCategory: "Coat",
    tags: ["crisp", "clean"],
  },
  {
    title: "Chic Modernity",
    subtitle: "Chic and Modern",
    description: "An elegant blazer that is both chic and modern. Perfect for elevating any look.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/9.png" },
    images: [
      { url: "https://node-tandt-shop.onrender.com/uploads/10.png" },
    ],
    alt: "Elegant Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "black", quantity: 8 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "black", quantity: 8 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "Beige", quantity: 10 },
          { name: "black", quantity: 8 },
        ],
      },
    ],
    mainCategory: "Jacket",
    tags: ["chic", "modern"],
  },
  {
    title: "Timeless Sophistication",
    subtitle: "Elegant and Timeless",
    description: "A sophisticated blazer that is both elegant and timeless. Perfect for any occasion.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/10.png" },
    images: [],
    alt: "Sophisticated Blazer",
    variants: [
      {
        size: "S",
        price: 80,
        colors: [
          { name: "black", quantity: 8 },
          { name: "grey", quantity: 6 },
        ],
      },
      {
        size: "M",
        price: 90,
        colors: [
          { name: "black", quantity: 8 },
          { name: "grey", quantity: 6 },
        ],
      },
      {
        size: "L",
        price: 100,
        colors: [
          { name: "black", quantity: 8 },
          { name: "grey Offwhite", quantity: 6 },
        ],
      },
    ],
    mainCategory: "Jacket",
    tags: ["elegant", "timeless"],
  },
  {
    title: "Blush Classic Leather Bag",
    subtitle: "Timeless and Elegant",
    description: "A classic blush pink leather bag with a modern gold chain accent. Perfect for any occasion.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/11.png" },
    images: [],
    alt: "Blush Leather Bag",
    variants: [
      {
        size: "1",
        price: 120,
        colors: [
          { name: "pink", quantity: 15 },
          { name: "Beige", quantity: 10 }
        ]
      }
    ],
    mainCategory: "Bags",
    tags: ["classic", "elegant", "leather"]
  },
  {
    title: "Polka Dot Statement Bag",
    subtitle: "Bold and Fun",
    description: "A trendy white bag with black polka dots. Adds a playful touch to any outfit.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/12.png" },
    images: [],
    alt: "Polka Dot Bag",
    variants: [
      {
        size: "1",
        price: 110,
        colors: [
          { name: "white", quantity: 12 }
        ]
      }
    ],
    mainCategory: "Bags",
    tags: ["bold", "fun", "modern"]
  },
  {
    title: "Elegant Black Leather Tote",
    subtitle: "Sophisticated and Versatile",
    description: "A sleek black leather tote that combines elegance and practicality.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/13.png" },
    images: [],
    alt: "Black Leather Tote",
    variants: [
      {
        size: "1",
        price: 130,
        colors: [
          { name: "black", quantity: 10 },
          { name: "silver", quantity: 8 }
        ]
      }
    ],
    mainCategory: "Bags",
    tags: ["sleek", "sophisticated", "versatile"]
  },
  {
    title: "Sky Blue Minimalist Bag",
    subtitle: "Light and Chic",
    description: "A sky-blue minimalist bag perfect for a relaxed yet stylish look.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/14.png" },
    images: [],
    alt: "Sky Blue Bag",
    variants: [
      {
        size: "1",
        price: 125,
        colors: [
          { name: "Light blue", quantity: 8 },
          { name: "white", quantity: 6 }
        ]
      }
    ],
    mainCategory: "Bags",
    tags: ["chic", "minimalist", "stylish"]
  },
  {
    title: "Classic Pearl Jewelry Set",
    subtitle: "Timeless Elegance",
    description: "A sophisticated set of pearl jewelry, including a necklace, bracelet, and ring.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/15.png" },
    images: [],
    alt: "Pearl Jewelry Set",
    variants: [
      {
        size: "1",
        price: 200,
        colors: [
          { name: "white", quantity: 10 }
        ]
      }
    ],
    mainCategory: "Jewelry",
    tags: ["timeless", "elegant", "pearl"]
  },
  {
    title: "Heart Pendant Necklace",
    subtitle: "Romantic and Unique",
    description: "A delicate gold necklace with a vintage-style heart pendant.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/16.png" },
    images: [],
    alt: "Heart Pendant Necklace",
    variants: [
      {
        size: "1",
        price: 150,
        colors: [
          { name: "gold", quantity: 12 },
          { name: "silver", quantity: 10 }
        ]
      }
    ],
    mainCategory: "Jewelry",
    tags: ["romantic", "unique", "vintage"]
  },
  {
    title: "Delicate Gold Chains",
    subtitle: "Subtle and Elegant",
    description: "A collection of fine gold chains perfect for layering or wearing solo.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/17.png" },
    images: [],
    alt: "Gold Chains",
    variants: [
      {
        size: "1",
        price: 180,
        colors: [
          { name: "זהב", quantity: 15 }
        ]
      }
    ],
    mainCategory: "Jewelry",
    tags: ["delicate", "gold", "layering"]
  },
  {
    title: "Unique Gold Ring",
    subtitle: "Bold and Stylish",
    description: "A one-of-a-kind gold ring that makes a statement.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/18.png" },
    images: [],
    alt: "Gold Ring",
    variants: [
      {
        size: "1",
        price: 120,
        colors: [
          { name: "זהב", quantity: 8 },
          { name: "pink", quantity: 5 }
        ]
      }
    ],
    mainCategory: "Jewelry",
    tags: ["unique", "stylish", "gold"]
  },
  {
    title: "Elegant Patent Leather Heels",
    subtitle: "Classic and Sleek",
    description: "A pair of white patent leather heels perfect for any elegant event.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/19.png" },
    images: [],
    alt: "White Patent Leather Heels",
    variants: [
      {
        size: "37",
        price: 140,
        colors: [
          { name: "white", quantity: 6 },
          { name: "silver", quantity: 4 }
        ]
      }
    ],
    mainCategory: "Shoes",
    tags: ["elegant", "classic", "heels"]
  },
  {
    title: "High Classic Leather Heels",
    subtitle: "Timeless and Trendy",
    description: "High classic leather heels in a bold tan shade. Perfect for day or night.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/20.png" },
    images: [],
    alt: "High Leather Heels",
    variants: [
      {
        size: "38",
        price: 150,
        colors: [
          { name: "brown", quantity: 5 },
          { name: "black", quantity: 7 }
        ]
      }
    ],
    mainCategory: "Shoes",
    tags: ["timeless", "leather", "heels"]
  },
  {
    title: "Crimson Tassel Booties",
    subtitle: "Chic and Unique",
    description: "Bold crimson and black tassel booties. Perfect for making a statement in winter.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/21.png" },
    images: [],
    alt: "Crimson Tassel Booties",
    variants: [
      {
        size: "38",
        price: 160,
        colors: [
          { name: "red", quantity: 4 },
          { name: "black", quantity: 6 }
        ]
      }
    ],
    mainCategory: "Shoes",
    tags: ["chic", "unique", "bold"]
  },
  {
    title: "Classic Black Stiletto",
    subtitle: "Elegant and Versatile",
    description: "Sophisticated black stiletto heels perfect for evening wear.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/22.png" },
    images: [],
    alt: "Black Stiletto Heels",
    variants: [
      {
        size: "39",
        price: 140,
        colors: [
          { name: "black", quantity: 10 }
        ]
      }
    ],
    mainCategory: "Shoes",
    tags: ["elegant", "classic", "versatile"]
  },
  {
    title: "Knee-High Luxe Boots",
    subtitle: "Bold and Stylish",
    description: "Luxurious knee-high leather boots in black for a striking look.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/23.png" },
    images: [],
    alt: "Knee-High Luxe Boots",
    variants: [
      {
        size: "40",
        price: 200,
        colors: [
          { name: "black", quantity: 6 }
        ]
      }
    ],
    mainCategory: "Shoes",
    tags: ["bold", "stylish", "luxe"]
  },
  {
    title: "Vibrant Red Leather Bag",
    subtitle: "Bright and Playful",
    description: "A stunning red leather bag with a classic buckle design.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/24.png" },
    images: [],
    alt: "Red Leather Bag",
    variants: [
      {
        size: "1",
        price: 150,
        colors: [
          { name: "red", quantity: 8 }
        ]
      }
    ],
    mainCategory: "Bags",
    tags: ["vibrant", "classic", "playful"]
  },
  {
    title: "Beige Buttoned Trench Coat",
    subtitle: "Elegant and Timeless",
    description: "A classic beige trench coat with double-breasted buttons.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/25.png" },
    images: [],
    alt: "Beige Trench Coat",
    variants: [
      {
        size: "M",
        price: 220,
        colors: [
          { name: "Beige", quantity: 5 }
        ]
      }
    ],
    mainCategory: "Coats",
    tags: ["elegant", "timeless", "classic"]
  },
  {
    title: "Cozy Brown Fur Coat",
    subtitle: "Warm and Stylish",
    description: "A luxurious fur coat in rich brown, perfect for winter chic.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/26.png" },
    images: [],
    alt: "Brown Fur Coat",
    variants: [
      {
        size: "L",
        price: 240,
        colors: [
          { name: "brown", quantity: 4 }
        ]
      }
    ],
    mainCategory: "Coats",
    tags: ["warm", "stylish", "luxurious"]
  },
  {
    title: "Dual-Tone Chic Coat",
    subtitle: "Stylish and Modern",
    description: "A stylish dual-tone coat in beige and brown, perfect for transitional weather.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/27.png" },
    images: [],
    alt: "Beige and Brown Coat",
    variants: [
      {
        size: "M",
        price: 210,
        colors: [
          { name: "Beige", quantity: 5 },
          { name: "brown", quantity: 5 }
        ]
      }
    ],
    mainCategory: "Coats",
    tags: ["dual-tone", "modern", "chic"]
  },
  {
    title: "Winter Glam Fur Coat",
    subtitle: "Glamorous and Warm",
    description: "A statement fur coat with bold stripes in black and white.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/28.png" },
    images: [],
    alt: "Black and White Fur Coat",
    variants: [
      {
        size: "L",
        price: 260,
        colors: [
          { name: "black", quantity: 3 },
          { name: "white", quantity: 3 }
        ]
      }
    ],
    mainCategory: "Coats",
    tags: ["glamorous", "warm", "bold"]
  },
  {
    title: "Classic Pink Button Coat",
    subtitle: "Chic and Feminine",
    description: "A feminine pink coat with elegant button detailing.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/29.png" },
    images: [],
    alt: "Pink Button Coat",
    variants: [
      {
        size: "M",
        price: 230,
        colors: [
          { name: "pink", quantity: 4 }
        ]
      }
    ],
    mainCategory: "Coats",
    tags: ["chic", "feminine", "elegant"]
  },
  {
    title: "Modern Beige and Rust Coats",
    subtitle: "Elegant Pair",
    description: "A duo of elegant coats in beige and rust for versatile styling.",
    mainImage: { url: "https://node-tandt-shop.onrender.com/uploads/30.png" },
    images: [],
    alt: "Beige and Rust Coats",
    variants: [
      {
        size: "M",
        price: 250,
        colors: [
          { name: "Beige", quantity: 5 },
          { name: "brown", quantity: 5 }
        ]
      }
    ],
    mainCategory: "Coats",
    tags: ["modern", "stylish", "versatile"]
  }
];



export { users, products };
