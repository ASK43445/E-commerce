import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const categories = [
    { name: 'Top Offers', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/f0b3c58d99158fc3.png' },
    { name: 'Mobiles & Tablets', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/9bb3499c8248d2ba.png' },
    { name: 'Electronics', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/789a7fdb0e3dcc7b.png' },
    { name: 'TVs & Appliances', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/f6a3bbdc197c3dc7.png' },
    { name: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=128&q=80' },
    { name: 'Beauty', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/d300931cce14bbbc.png' },
    { name: 'Home & Kitchen', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/5b8f6029d5b432e6.png' },
    { name: 'Furniture', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/83236e65a909ac46.png' },
    { name: 'Travel', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/e77c5c0d51375354.png' },
    { name: 'Grocery', img: 'https://rukminim2.flixcart.com/fk-p-flap/128/128/image/332151608d51baeb.png' },
];

const Home = () => {
    const [electronics, setElectronics] = useState([]);
    const [fashionBeauty, setFashionBeauty] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await getProducts();

                const elec = data.filter(p => p.category === 'Electronics' || p.category === 'TVs & Appliances' || p.category === 'Home & Kitchen').slice(0, 5);
                setElectronics(elec);

                const fb = data.filter(p => p.category === 'Fashion' || p.category === 'Beauty' || p.category === 'Mobiles & Tablets').slice(0, 5);
                setFashionBeauty(fb);
            } catch (err) {
                console.error("Failed to fetch products for home view", err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-[#f1f3f6] pb-8">

            {/* Categories Strip */}
            <div className="bg-white shadow-sm mb-4 px-2 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center overflow-x-auto no-scrollbar lg:justify-center lg:gap-8 gap-4 px-4 overflow-x-auto">
                    {categories.map((cat, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[70px] cursor-pointer group">
                            <div className="w-16 h-16 rounded mb-1 flex items-center justify-center transition-transform transform group-hover:scale-105 overflow-hidden">
                                <img src={cat.img} alt={cat.name} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <span className="text-[13px] sm:text-sm font-medium text-gray-800 whitespace-nowrap group-hover:text-[#2874f0]">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Banner Area */}
            <div className="max-w-7xl mx-auto px-2 mb-4">
                <div className="w-full h-[200px] sm:h-[280px] bg-gradient-to-r from-[#ffe500] to-[orange] flex items-center justify-center relative shadow-sm overflow-hidden cursor-pointer group">
                    <div className="absolute inset-0 bg-black/10 transition-opacity opacity-0 group-hover:opacity-100"></div>
                    <div className="text-center text-white px-4 z-10 drop-shadow-md">
                        <h2 className="text-3xl sm:text-5xl font-bold mb-2 italict text-gray-900 tracking-wide">Big Diwali Sale!</h2>
                        <p className="text-lg sm:text-2xl font-bold max-w-xl mx-auto text-gray-800">Get up to 80% Off on Top Brands</p>
                        <Link to="/products" className="mt-6 inline-block bg-[#2874f0] text-white font-bold py-2 px-8 rounded-sm shadow-lg hover:bg-blue-600 transition">EXPLORE NOW</Link>
                    </div>
                </div>
            </div>

            {/* Product Section: Best of Electronics */}
            <div className="max-w-7xl mx-auto px-2 mb-4">
                <div className="bg-white shadow border border-gray-100 rounded-sm overflow-hidden">
                    <div className="p-4 flex items-center justify-between border-b bg-white">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Best of Electronics</h2>
                        <Link to="/products" className="bg-[#2874f0] text-white px-6 py-2 rounded-full shadow-sm text-sm font-medium hover:bg-blue-600 transition">VIEW ALL</Link>
                    </div>
                    <div className="p-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 bg-white overflow-hidden">
                        {electronics.map((item, i) => (
                            <Link to={`/products/${item._id}`} key={i} className="group cursor-pointer flex flex-col items-center border border-transparent hover:border-gray-200 rounded p-2 transition">
                                <div className="w-full h-32 sm:h-44 bg-white flex items-center justify-center mb-3 group-hover:scale-105 transition transform duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-br-lg z-10">SALE</div>
                                    <img src={item.mainImg} alt={item.title} className="max-w-full max-h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                                </div>
                                <h3 className="text-sm font-medium text-gray-800 text-center truncate w-full">{item.title}</h3>
                                <p className="text-green-600 font-semibold mt-1 text-sm">₹{item.price}</p>
                                <p className="text-xs text-gray-500 mt-1 truncate max-w-full">{item.category}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Section: Beauty, Food, Toys */}
            <div className="max-w-7xl mx-auto px-2 mb-8">
                <div className="bg-white shadow border border-gray-100 rounded-sm overflow-hidden">
                    <div className="p-4 flex items-center justify-between border-b bg-white">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Beauty, Food, Toys & more</h2>
                        <Link to="/products" className="bg-[#2874f0] text-white px-6 py-2 rounded-full shadow-sm text-sm font-medium hover:bg-blue-600 transition">VIEW ALL</Link>
                    </div>
                    <div className="p-4 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 bg-white overflow-hidden">
                        {fashionBeauty.map((item, i) => (
                            <Link to={`/products/${item._id}`} key={i} className="group cursor-pointer flex flex-col items-center border border-transparent hover:border-gray-200 rounded p-2 transition">
                                <div className="w-full h-32 sm:h-44 bg-white flex items-center justify-center mb-3 group-hover:scale-105 transition transform duration-300 overflow-hidden">
                                    <img src={item.mainImg} alt={item.title} className="max-w-full max-h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                                </div>
                                <h3 className="text-sm font-medium text-gray-800 text-center truncate w-full">{item.title}</h3>
                                <p className="text-green-600 font-semibold mt-1 text-sm">₹{item.price}</p>
                                <p className="text-xs text-gray-500 mt-1 truncate max-w-full">{item.category}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
