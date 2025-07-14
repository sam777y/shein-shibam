
import { useState } from 'react';
import { Plus, Trash2, Link, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductLink {
  id: string;
  url: string;
  quantity: number;
}

interface ProductLinkInputProps {
  productLinks: ProductLink[];
  setProductLinks: (links: ProductLink[]) => void;
}

const ProductLinkInput = ({ productLinks, setProductLinks }: ProductLinkInputProps) => {
  const addProductLink = () => {
    const newLink: ProductLink = {
      id: Date.now().toString(),
      url: '',
      quantity: 1
    };
    setProductLinks([...productLinks, newLink]);
  };

  const removeProductLink = (id: string) => {
    setProductLinks(productLinks.filter(link => link.id !== id));
  };

  const updateProductLink = (id: string, field: keyof ProductLink, value: string | number) => {
    setProductLinks(productLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-yellow-400 p-2 rounded-lg">
          <ShoppingCart className="h-5 w-5 text-black" />
        </div>
        <h2 className="text-xl font-semibold text-yellow-400">Product Links</h2>
      </div>

      <div className="space-y-4">
        {productLinks.map((link, index) => (
          <div key={link.id} className="bg-black rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-yellow-400 font-medium">Product #{index + 1}</Label>
              {productLinks.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProductLink(link.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-3">
                <div className="relative">
                  <Link className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="url"
                    placeholder="Paste Shein product link here..."
                    value={link.url}
                    onChange={(e) => updateProductLink(link.id, 'url', e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={link.quantity}
                  onChange={(e) => updateProductLink(link.id, 'quantity', parseInt(e.target.value) || 1)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={addProductLink}
        className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition-all duration-200"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Product
      </Button>
    </div>
  );
};

export default ProductLinkInput;
