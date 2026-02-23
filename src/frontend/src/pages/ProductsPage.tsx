import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useCartStore } from '../store/cartStore';
import CartDrawer from '../components/CartDrawer';
import { ShoppingCart, Sparkles, Leaf, Wheat } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { STATIC_PRODUCTS, convertToProduct } from '../lib/productData';
import type { Product } from '../backend';
import { useEffect } from 'react';

export default function ProductsPage() {
  const addToCart = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product: typeof STATIC_PRODUCTS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const cartProduct = convertToProduct(product);
    
    addToCart(cartProduct, 1);
    const productName = language === 'hi' ? product.translations.hiName :
                        language === 'ta' ? product.translations.taName :
                        language === 'ml' ? product.translations.mlName :
                        product.translations.enName;
    toast.success(`${t.addedToCart}: ${productName}`, {
      duration: 3000,
      className: 'animate-in slide-in-from-top duration-300',
    });
  };

  const handleProductClick = (productId: bigint) => {
    navigate({ to: '/products/$productId', params: { productId: productId.toString() } });
  };

  const getProductName = (product: typeof STATIC_PRODUCTS[0]) => {
    switch (language) {
      case 'hi': return product.translations.hiName;
      case 'ta': return product.translations.taName;
      case 'ml': return product.translations.mlName;
      default: return product.translations.enName;
    }
  };

  const getProductDescription = (product: typeof STATIC_PRODUCTS[0]) => {
    switch (language) {
      case 'hi': return product.translations.hiDescription;
      case 'ta': return product.translations.taDescription;
      case 'ml': return product.translations.mlDescription;
      default: return product.translations.enDescription;
    }
  };

  const getProductIngredients = (product: typeof STATIC_PRODUCTS[0]) => {
    switch (language) {
      case 'hi': return product.translations.hiIngredients;
      case 'ta': return product.translations.taIngredients;
      case 'ml': return product.translations.mlIngredients;
      default: return product.translations.enIngredients;
    }
  };

  return (
    <div className="container px-4 md:px-8 lg:px-12 py-12 md:py-16 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="mb-12 text-center animate-in fade-in slide-in-from-top duration-700">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
          {t.exploreProducts}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t.threeUniqueFlavors}
        </p>
      </div>

      {/* Featured Products Section */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {STATIC_PRODUCTS.map((product, index) => {
          const ingredients = getProductIngredients(product);
          const isVegan = ingredients.every(ing => ing.isVegan);
          const isGlutenFree = ingredients.every(ing => ing.isGlutenFree);

          return (
            <Card 
              key={product.id.toString()}
              className="group overflow-hidden border-2 hover:border-brand/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer animate-in fade-in zoom-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={getProductName(product)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {isVegan && (
                    <Badge className="bg-green-500/90 hover:bg-green-500 text-white shadow-lg backdrop-blur-sm">
                      <Leaf className="h-3 w-3 mr-1" />
                      {t.vegan}
                    </Badge>
                  )}
                  {isGlutenFree && (
                    <Badge className="bg-amber-500/90 hover:bg-amber-500 text-white shadow-lg backdrop-blur-sm">
                      <Wheat className="h-3 w-3 mr-1" />
                      {t.glutenFree}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-brand transition-colors duration-300 text-foreground">
                    {getProductName(product)}
                  </h3>
                  <div className="relative overflow-hidden">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {getProductDescription(product)}
                    </p>
                  </div>
                </div>

                {/* Ingredients Preview */}
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-brand" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {t.ingredients}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ingredients.slice(0, 3).map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {ingredient.name}
                      </span>
                    ))}
                    {ingredients.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        +{ingredients.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {t.addToCart}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <CartDrawer />
    </div>
  );
}
