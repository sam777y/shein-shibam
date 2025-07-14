
import { Package, User, MapPin, Phone } from 'lucide-react';

interface ProductLink {
  id: string;
  url: string;
  quantity: number;
}

interface CustomerInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
}

interface OrderSummaryProps {
  productLinks: ProductLink[];
  customerInfo: CustomerInfo;
}

const OrderSummary = ({ productLinks, customerInfo }: OrderSummaryProps) => {
  const validProducts = productLinks.filter(link => link.url.trim() !== '');
  const totalItems = validProducts.reduce((sum, link) => sum + link.quantity, 0);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-yellow-400 p-2 rounded-lg">
          <Package className="h-5 w-5 text-black" />
        </div>
        <h2 className="text-xl font-semibold text-yellow-400">Order Summary</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-700">
          <span className="text-gray-300">Total Products</span>
          <span className="text-yellow-400 font-semibold">{validProducts.length}</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-700">
          <span className="text-gray-300">Total Items</span>
          <span className="text-yellow-400 font-semibold">{totalItems}</span>
        </div>

        {customerInfo.firstName && customerInfo.lastName && (
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-300 text-sm">Customer</span>
            </div>
            <p className="text-white font-medium">
              {customerInfo.firstName} {customerInfo.middleName} {customerInfo.lastName}
            </p>
          </div>
        )}

        {customerInfo.primaryPhone && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-300 text-sm">Contact</span>
            </div>
            <p className="text-white">{customerInfo.primaryPhone}</p>
            {customerInfo.secondaryPhone && (
              <p className="text-gray-400 text-sm">{customerInfo.secondaryPhone}</p>
            )}
          </div>
        )}

        {customerInfo.address && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-300 text-sm">Delivery Address</span>
            </div>
            <p className="text-white text-sm leading-relaxed">{customerInfo.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
