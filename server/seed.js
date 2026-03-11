const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/productModel');

dotenv.config();

const products = [
  {
    title: 'Apple iPhone 15 Pro Max',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    mainImg: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Mobiles & Tablets',
    gender: 'Unisex',
    price: 159900,
    discount: 5,
  },
  {
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy AI is here. Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity.',
    mainImg: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Mobiles & Tablets',
    gender: 'Unisex',
    price: 129999,
    discount: 10,
  },
  {
    title: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry leading noise canceling headphones. Exceptional sound quality and comfortable fit for all day listening.',
    mainImg: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Electronics',
    gender: 'Unisex',
    price: 29990,
    discount: 15,
  },
  {
    title: 'Noise Buds VS104 Pro TWS',
    description: 'True wireless earbuds with deep bass, low latency gaming mode, and fast charging.',
    mainImg: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Electronics',
    gender: 'Unisex',
    price: 1299,
    discount: 20,
  },
  {
    title: 'MacBook Air M3',
    description: 'Supercharged by the M3 chip, MacBook Air is incredibly light, thin, and fast.',
    mainImg: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Electronics',
    gender: 'Unisex',
    price: 114900,
    discount: 8,
  },
  {
    title: 'PUMA Smash V2 L Sneakers',
    description: 'Classic tennis styling meets modern comfort. Soft leather upper with durable rubber outsole.',
    mainImg: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['6', '7', '8', '9', '10'],
    category: 'Fashion',
    gender: 'Men',
    price: 3499,
    discount: 40,
  },
  {
    title: 'Women Printed Rayon Kurta',
    description: 'Elegant ethnic wear made from soft rayon fabric, featuring delicate prints.',
    mainImg: 'https://images.unsplash.com/photo-1583391733958-6c58af90eebc?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1583391733958-6c58af90eebc?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Fashion',
    gender: 'Women',
    price: 1999,
    discount: 60,
  },
  {
    title: 'Levis Blue Jeans',
    description: 'Classic fit blue jeans with stretch for comfort. Made to last long.',
    mainImg: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: ['28', '30', '32', '34', '36'],
    category: 'Fashion',
    gender: 'Men',
    price: 2999,
    discount: 30,
  },
  {
    title: 'Smart LED TV 43-inch',
    description: 'Full HD smart TV with built-in apps, vivid display, and multiple connectivity options.',
    mainImg: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'TVs & Appliances',
    gender: 'Unisex',
    price: 21999,
    discount: 30,
  },
  {
    title: 'Philips Hair Dryer',
    description: 'Powerful hair dryer for quick drying and styling, with heat control options.',
    mainImg: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Beauty',
    gender: 'Unisex',
    price: 899,
    discount: 20,
  },
  {
    title: 'Milton Thermosteel Water Bottle',
    description: 'Keeps water cold or hot for 24 hours. Made from high-quality stainless steel.',
    mainImg: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Home & Kitchen',
    gender: 'Unisex',
    price: 999,
    discount: 15,
  },
  {
    title: 'Samsung 253 L Frost Free Double Door Refrigerator',
    description: 'Digital inverter technology, frost-free operation, energy efficient.',
    mainImg: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'TVs & Appliances',
    gender: 'Unisex',
    price: 24990,
    discount: 22,
  },
  {
    title: 'Canon EOS R50 Mirrorless Camera',
    description: 'Lightweight and compact mirrorless camera, ideal for content creators.',
    mainImg: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Electronics',
    gender: 'Unisex',
    price: 75990,
    discount: 10,
  },
  {
    title: 'L\'Oreal Paris Revitalift Serum',
    description: 'Anti-aging face serum with Hyaluronic Acid for plump and hydrated skin.',
    mainImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Beauty',
    gender: 'Women',
    price: 999,
    discount: 25,
  },
  {
    title: 'Wooden Coffee Table',
    description: 'Premium finish wooden coffee table, perfect for living rooms.',
    mainImg: 'https://images.unsplash.com/photo-1532372576444-dda9541f4ad8?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1532372576444-dda9541f4ad8?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Furniture',
    gender: 'Unisex',
    price: 4999,
    discount: 45,
  },
  {
    title: 'Yonex Badminton Racquet',
    description: 'Lightweight and durable badminton racquet for professional and advanced players.',
    mainImg: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    carousel: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
    ],
    sizes: [],
    category: 'Sports',
    gender: 'Unisex',
    price: 2499,
    discount: 35,
  },
];

async function run() {
  try {
    await connectDB();
    const deleted = await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`Seed complete. Deleted: ${deleted.deletedCount}, Inserted: ${created.length}`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

run();

