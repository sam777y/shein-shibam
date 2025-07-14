
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
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800" dir="rtl">
      <div className="flex items-center space-x-3 space-x-reverse mb-6">
        <div className="bg-yellow-400 p-2 rounded-lg">
          <User className="h-5 w-5 text-black" />
        </div>
        <h2 className="text-xl font-semibold text-yellow-400">معلومات العميل</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">الاسم الأول *</Label>
          <Input
            type="text"
            placeholder="الاسم الأول"
            value={customerInfo.firstName}
            onChange={(e) => updateCustomerInfo('firstName', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 text-right"
            required
          />
        </div>
        
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">الاسم الأوسط</Label>
          <Input
            type="text"
            placeholder="الاسم الأوسط"
            value={customerInfo.middleName}
            onChange={(e) => updateCustomerInfo('middleName', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 text-right"
          />
        </div>
        
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">الاسم الأخير *</Label>
          <Input
            type="text"
            placeholder="الاسم الأخير"
            value={customerInfo.lastName}
            onChange={(e) => updateCustomerInfo('lastName', e.target.value)}
            className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 text-right"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">رقم الهاتف الأساسي *</Label>
          <div className="relative">
            <Phone className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="+967 xxx xxx xxx"
              value={customerInfo.primaryPhone}
              onChange={(e) => updateCustomerInfo('primaryPhone', e.target.value)}
              className="pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 text-right"
              required
            />
          </div>
        </div>
        
        <div>
          <Label className="text-yellow-400 font-medium mb-2 block">رقم الهاتف الثانوي</Label>
          <div className="relative">
            <PhoneCall className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              placeholder="+967 xxx xxx xxx (اختياري)"
              value={customerInfo.secondaryPhone}
              onChange={(e) => updateCustomerInfo('secondaryPhone', e.target.value)}
              className="pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 text-right"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-yellow-400 font-medium mb-2 block">عنوان التوصيل *</Label>
        <div className="relative">
          <MapPin className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Textarea
            placeholder="أدخل عنوان التوصيل الكامل بما في ذلك المدينة والحي والمعالم..."
            value={customerInfo.address}
            onChange={(e) => updateCustomerInfo('address', e.target.value)}
            className="pr-10 pt-10 min-h-[100px] bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 resize-none text-right"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoForm;
