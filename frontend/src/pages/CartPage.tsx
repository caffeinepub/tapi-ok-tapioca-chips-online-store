import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductName, getProductDescription } from '../lib/productHelpers';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleQuantityChange = (productId: bigint, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemove = (productId: bigint) => {
    removeItem(productId);
  };

  if (items.length === 0) {
    return (
      <div className="container px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{t.cartEmpty}</h1>
            <p className="text-lg text-muted-foreground">{t.addSomeProducts}</p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate({ to: '/products' })}
            className="gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            {t.continueShopping}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-8 lg:px-12 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">{t.shoppingCart}</h1>
        <p className="text-muted-foreground">{t.reviewItems}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id.toString()} className="p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img
                    src={item.product.image.getDirectURL()}
                    alt={getProductName(item.product, language)}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1 text-foreground">
                    {getProductName(item.product, language)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {getProductDescription(item.product, language)}
                  </p>

                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 transition-all duration-200 hover:scale-110"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium text-foreground">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 transition-all duration-200 hover:scale-110"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(item.product.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 transition-all duration-200 hover:scale-105"
                    >
                      <Trash2 className="h-4 w-4" />
                      {t.remove}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-20 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">{t.orderSummary}</h2>
            
            <div className="space-y-3 py-4 border-y">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.subtotal}</span>
                <span className="font-medium text-foreground">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.shipping}</span>
                <span className="font-medium text-foreground">{t.calculated}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">{t.total}</span>
              <span className="text-brand">₹{getTotalPrice()}</span>
            </div>

            <Button
              size="lg"
              className="w-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => navigate({ to: '/contact' })}
            >
              {t.proceedToCheckout}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 transition-all duration-300 hover:scale-105"
              onClick={() => navigate({ to: '/products' })}
            >
              <ArrowLeft className="h-4 w-4" />
              {t.continueShopping}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
