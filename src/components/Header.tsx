
import { ShoppingBag, Package } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black border-b-2 border-yellow-400 py-4 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="bg-yellow-400 p-2 rounded-lg">
            <img 
              src="/lovable-uploads/149befe1-8604-4b82-8bb7-ffb7f1c96b75.png" 
              alt="شي إن شبام" 
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">شي إن شبام</h1>
            <p className="text-gray-300 text-sm">اطلب الآن من شي إن</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 space-x-reverse text-gray-300">
          <Package className="h-5 w-5" />
          <span className="text-sm">طلبات سريعة وسهلة</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
