
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import ProductLinkInput from '@/components/ProductLinkInput';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import OrderSummary from '@/components/OrderSummary';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatWhatsAppMessage, sendWhatsAppMessage } from '@/utils/whatsappUtils';

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

const Index = () => {
  const [productLinks, setProductLinks] = useState<ProductLink[]>([
    { id: '1', url: '', quantity: 1 }
  ]);
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    middleName: '',
    lastName: '',
    primaryPhone: '',
    secondaryPhone: '',
    address: ''
  });

  const { toast } = useToast();

  const validateForm = () => {
    const validProducts = productLinks.filter(link => link.url.trim() !== '');
    
    if (validProducts.length === 0) {
      toast({
        title: "روابط المنتجات مفقودة",
        description: "يرجى إضافة رابط منتج واحد على الأقل من شين.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerInfo.firstName.trim() || !customerInfo.lastName.trim()) {
      toast({
        title: "الاسم مفقود",
        description: "يرجى إدخال الاسم الأول والأخير.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerInfo.primaryPhone.trim()) {
      toast({
        title: "رقم الهاتف مفقود",
        description: "يرجى إدخال رقم الهاتف الأساسي.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerInfo.address.trim()) {
      toast({
        title: "العنوان مفقود",
        description: "يرجى إدخال عنوان التوصيل.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmitOrder = () => {
    if (!validateForm()) return;

    try {
      const validProducts = productLinks.filter(link => link.url.trim() !== '');
      const message = formatWhatsAppMessage(validProducts, customerInfo);
      
      sendWhatsAppMessage(message);
      
      toast({
        title: "تم إرسال الطلب بنجاح!",
        description: "تم إرسال طلبك عبر الواتساب. سنتواصل معك قريباً.",
        className: "bg-green-900 border-green-700",
      });
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900" dir="rtl">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            اطلب الان من <span className="text-yellow-400">shein</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            ما عليك سوى لصق روابط منتجات شين وسنتولى الباقي. 
            سريع، آمن، ويصل إلى باب منزلك في اليمن.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProductLinkInput 
              productLinks={productLinks}
              setProductLinks={setProductLinks}
            />
            
            <CustomerInfoForm 
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          </div>
          
          <div className="space-y-6">
            <OrderSummary 
              productLinks={productLinks}
              customerInfo={customerInfo}
            />
            
            <Button
              onClick={handleSubmitOrder}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Send className="h-5 w-5 ml-2" />
              إرسال الطلب عبر الواتساب
            </Button>
            
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">آمن وسريع</span>
              </div>
              <p className="text-gray-400 text-sm">
                سيتم إرسال طلبك مباشرة إلى الواتساب للمعالجة الفورية.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-gray-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              ندعم جميع إصدارات الواتساب بما في ذلك Business وGB WhatsApp وغيرها
            </span>
          </div>
        </div>
      </main>
      
      <footer className="bg-black border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 شي إن شبام - تسوق ذكي بطريقة بسيطة
          </p>
          <p className="text-yellow-400 text-sm font-medium">
            العنوان: صنعاء، شارع القيادة - بجوار صالة زهرة اللوتس
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
