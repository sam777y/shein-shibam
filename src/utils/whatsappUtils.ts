
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

export const formatWhatsAppMessage = (productLinks: ProductLink[], customerInfo: CustomerInfo): string => {
  const validProducts = productLinks.filter(link => link.url.trim() !== '');
  
  let message = `🛍️ *New Shein Order - Shein Shibam*\n\n`;
  
  // Customer Information
  message += `👤 *Customer Information:*\n`;
  message += `Name: ${customerInfo.firstName} ${customerInfo.middleName} ${customerInfo.lastName}\n`;
  message += `📞 Primary Phone: ${customerInfo.primaryPhone}\n`;
  if (customerInfo.secondaryPhone) {
    message += `📞 Secondary Phone: ${customerInfo.secondaryPhone}\n`;
  }
  message += `📍 Address: ${customerInfo.address}\n\n`;
  
  // Product Links
  message += `🛒 *Product Details:*\n`;
  validProducts.forEach((product, index) => {
    message += `${index + 1}. Quantity: ${product.quantity}\n`;
    message += `   Link: ${product.url}\n\n`;
  });
  
  // Summary
  const totalItems = validProducts.reduce((sum, link) => sum + link.quantity, 0);
  message += `📊 *Order Summary:*\n`;
  message += `Total Products: ${validProducts.length}\n`;
  message += `Total Items: ${totalItems}\n\n`;
  
  message += `🤝 Thank you for choosing Shein Shibam!`;
  
  return message;
};

export const sendWhatsAppMessage = (message: string, phoneNumber: string = "+967777492635") => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab/window
  window.open(whatsappUrl, '_blank');
};
