
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
        title: "Missing Product Links",
        description: "Please add at least one valid Shein product link.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerInfo.firstName.trim() || !customerInfo.lastName.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter your first and last name.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerInfo.primaryPhone.trim()) {
      toast({
        title: "Missing Phone Number",
        description: "Please enter your primary phone number.",
        variant: "destructive",
      });
      return false;
    }

    if (!customerInfo.address.trim()) {
      toast({
        title: "Missing Address",
        description: "Please enter your delivery address.",
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
        title: "Order Submitted Successfully!",
        description: "Your order has been sent via WhatsApp. We'll contact you soon.",
        className: "bg-green-900 border-green-700",
      });
    } catch (error) {
      toast({
        title: "Error Submitting Order",
        description: "There was an issue sending your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Smart <span className="text-yellow-400">Shein</span> Ordering
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Simply paste your Shein product links and we'll handle the rest. 
            Fast, secure, and delivered to your doorstep in Yemen.
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
              <Send className="h-5 w-5 mr-2" />
              Submit Order via WhatsApp
            </Button>
            
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">Secure & Fast</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your order will be sent directly to our WhatsApp for immediate processing.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">
              We support all WhatsApp versions including Business, GB WhatsApp, and more
            </span>
          </div>
        </div>
      </main>
      
      <footer className="bg-black border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Shein Shibam - Smart Shopping Made Simple
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
