
import { ShoppingBag, Package } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black border-b-2 border-yellow-400 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-400 p-2 rounded-lg">
            <ShoppingBag className="h-8 w-8 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">Shein Shibam</h1>
            <p className="text-gray-300 text-sm">Smart Shein Ordering</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 text-gray-300">
          <Package className="h-5 w-5" />
          <span className="text-sm">Fast & Easy Orders</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
