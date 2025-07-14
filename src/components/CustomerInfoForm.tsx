
import { User, Phone, MapPin, PhoneCall } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CustomerInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
}

interface CustomerInfoFormProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
}

const CustomerInfoForm = ({ customerInfo, setCustomerInfo }: CustomerInfoFormProps) => {
  const updateCustomerInfo = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo({
      ...customerInfo,
      [field]: value
    });
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-yellow-400 p-2 rounded-lg">
          <User className="h-5 w-5 text-black" />
        </div>
        <h2 className="text-xl font-semibold text-yellow-400">Customer Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">First Name *</Label>
          <Input
            type="text"
            placeholder="First name"
            value={customerInfo.firstName}
            onChange={(e) => updateCustomerInfo('firstName', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
            required
          />
        </div>
        
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">Middle Name</Label>
          <Input
            type="text"
            placeholder="Middle name"
            value={customerInfo.middleName}
            onChange={(e) => updateCustomerInfo('middleName', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
          />
        </div>
        
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">Last Name *</Label>
          <Input
            type="text"
            placeholder="Last name"
            value={customerInfo.lastName}
            onChange={(e) => updateCustomerInfo('lastName', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">Primary Phone *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="+967 xxx xxx xxx"
              value={customerInfo.primaryPhone}
              onChange={(e) => updateCustomerInfo('primaryPhone', e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
              required
            />
          </div>
        </div>
        
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">Secondary Phone</Label>
          <div className="relative">
            <PhoneCall className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="+967 xxx xxx xxx (Optional)"
              value={customerInfo.secondaryPhone}
              onChange={(e) => updateCustomerInfo('secondaryPhone', e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-yellow-400 font-medium mb-2 block">Delivery Address *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Textarea
            placeholder="Enter your complete delivery address including city, district, and landmarks..."
            value={customerInfo.address}
            onChange={(e) => updateCustomerInfo('address', e.target.value)}
            className="pl-10 pt-10 min-h-[100px] bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 resize-none"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoForm;
