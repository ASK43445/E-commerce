import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#f1f3f6] flex flex-col">
            <Navbar />
            <main className="flex-grow w-full">
                <Outlet />
            </main>
            <footer className="bg-[#172337] text-white py-6 mt-8 flex flex-col items-center">
                <div className="flex space-x-6 mb-4 text-sm font-semibold">
                    <span className="cursor-pointer hover:underline">ABOUT US</span>
                    <span className="cursor-pointer hover:underline">CONTACT US</span>
                    <span className="cursor-pointer hover:underline">CAREERS</span>
                    <span className="cursor-pointer hover:underline">SHOPEZ STORIES</span>
                </div>
                <p className="text-gray-400 text-sm">&copy; 2026 ShopEZ. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
