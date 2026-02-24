import { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ScrollArea } from '../components/ui/scroll-area';
import { ShoppingCart, Plus, Minus, ArrowLeft, Check, X, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import CartDrawer from '../components/CartDrawer';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductName, getProductDescription, getProductIngredients } from '../lib/productHelpers';
import { getProductById, convertToProduct } from '../lib/productData';

export default function ProductDetailPage() {
  const { productId } = useParams({ from: '/products/$productId' });
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const { t, language } = useLanguage();

  // Get product from static data
  const staticProduct = getProductById(BigInt(productId));
  const product = staticProduct ? convertToProduct(staticProduct) : null;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [productId]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (product) {
      const productName = getProductName(product, language);
      try {
        addToCart(product, quantity);
        toast.success(`${t.addedToCart}: ${quantity} ${productName}`, {
          duration: 3000,
          className: 'animate-in slide-in-from-top duration-300',
        });
        setQuantity(1);
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart. Please try again.');
      }
    }
  };

  const handleBackToProducts = () => {
    navigate({ to: '/products' });
  };

  if (!product) {
    return (
      <div className="container py-20 text-center animate-in fade-in duration-500">
        <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">{t.productNotFound}</h2>
        <p className="text-muted-foreground mb-6">{t.noLongerAvailable}</p>
        <Button onClick={handleBackToProducts}>{t.backToProducts}</Button>
      </div>
    );
  }

  const productName = getProductName(product, language);
  const productDescription = getProductDescription(product, language);
  const productIngredients = getProductIngredients(product, language);

  return (
    <div className="container py-12 animate-in fade-in duration-500">
      <Button 
        variant="ghost" 
        onClick={handleBackToProducts}
        className="mb-8 hover:bg-brand/10 transition-all duration-300 hover:scale-105 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {t.backToProducts}
      </Button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="animate-in fade-in slide-in-from-left duration-500">
          <Card className="overflow-hidden border-2 hover:border-brand/50 transition-all duration-500 shadow-lg hover:shadow-2xl">
            <div className="aspect-square bg-muted relative group">
              <img
                src={product.image.getDirectURL()}
                alt={productName}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500 gpu-accelerated"
                style={{ willChange: 'transform' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Card>
        </div>

        {/* Product Details */}
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500 relative">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 animate-in fade-in duration-300">{productName}</h1>
            <div className="p-4 bg-gradient-to-br from-brand/10 to-brand/5 rounded-lg border-2 border-brand/20 animate-in slide-up-fade duration-500 delay-100">
              <p className="text-lg leading-relaxed text-foreground font-medium">
                {productDescription}
              </p>
            </div>
          </div>

          <Separator className="animate-in fade-in duration-500 delay-200" />

          {/* Detailed Description with Scrollable Container */}
          {product.detailedDescription && (
            <div className="animate-in slide-up-fade duration-500 delay-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span className="h-1 w-8 bg-brand rounded-full" />
                {t.aboutProduct}
              </h2>
              <ScrollArea className="h-auto max-h-[200px] rounded-lg border border-border bg-muted/30">
                <div className="p-4">
                  <p className="text-base leading-relaxed text-foreground">
                    {product.detailedDescription}
                  </p>
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Ingredients with Scrollable Container - Fixed positioning and z-index */}
          {productIngredients && productIngredients.length > 0 && (
            <div className="animate-in slide-up-fade duration-500 delay-400 relative z-10">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span className="h-1 w-8 bg-brand rounded-full" />
                {t.ingredients}
              </h2>
              <ScrollArea className="h-auto max-h-[280px] rounded-lg border border-border bg-muted/30">
                <div className="p-3 space-y-3">
                  {productIngredients.map((ingredient, idx) => (
                    <Card 
                      key={idx} 
                      className="p-4 hover:shadow-md transition-all duration-300 hover:border-brand/30 animate-in fade-in scale-in bg-background"
                      style={{ 
                        animationDelay: `${500 + idx * 50}ms`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span className="font-medium text-base">{ingredient.name}</span>
                        <div className="flex gap-2 flex-wrap">
                          {ingredient.isVegan && (
                            <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 transition-all duration-300 hover:scale-105">
                              <Check className="h-3 w-3 mr-1" />
                              {t.vegan}
                            </Badge>
                          )}
                          {ingredient.isGlutenFree && (
                            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 transition-all duration-300 hover:scale-105">
                              <Check className="h-3 w-3 mr-1" />
                              {t.glutenFree}
                            </Badge>
                          )}
                          {!ingredient.isVegan && !ingredient.isGlutenFree && (
                            <Badge variant="outline" className="text-muted-foreground transition-all duration-300 hover:scale-105">
                              <X className="h-3 w-3 mr-1" />
                              {t.containsAllergens}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          <Separator className="animate-in fade-in duration-500 delay-600" />

          {/* Add to Cart Section - Fixed z-index and positioning */}
          <div className="space-y-4 animate-in slide-up-fade duration-500 delay-700 relative z-20">
            <div className="flex items-center gap-4">
              <span className="text-base font-medium">{t.quantity}:</span>
              <div className="flex items-center border-2 rounded-lg transition-all duration-300 hover:border-brand/50 shadow-sm hover:shadow-md bg-background">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-12 w-12 transition-all duration-300 hover:scale-110 hover:bg-brand/10 active:scale-95"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="w-16 text-center font-bold text-lg">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-12 w-12 transition-all duration-300 hover:scale-110 hover:bg-brand/10 active:scale-95"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 group bg-[#C9A05B] hover:bg-[#B89050] text-[#2D2D2D] dark:bg-[#C9A05B] dark:hover:bg-[#B89050] dark:text-[#2D2D2D] font-bold border-2 border-[#C9A05B]/30 dark:border-[#C9A05B]/30"
            >
              <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              {t.addToCart}
            </Button>
          </div>

          {/* Product Info - Fixed z-index */}
          <Card className="p-4 bg-muted/50 animate-in fade-in scale-in duration-500 delay-800 relative z-10">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.sku}:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.availability}:</span>
                <Badge variant={product.isAvailable ? "default" : "secondary"} className={product.isAvailable ? "bg-green-600" : ""}>
                  {product.isAvailable ? t.inStock : t.outOfStock}
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <CartDrawer />
    </div>
  );
}
