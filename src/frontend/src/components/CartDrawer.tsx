import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { ShoppingCart, Trash2, Plus, Minus, Package, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getProductName } from '../lib/productHelpers';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [open, setOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { t, language } = useLanguage();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId));
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg md:hidden z-50 animate-in pop-up duration-500 hover:scale-110 transition-all gpu-accelerated"
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs text-white animate-in scale-in duration-300 shadow-lg font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="animate-in slide-in-from-bottom duration-500">
        <DrawerHeader className="animate-in fade-in duration-500">
          <DrawerTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-brand" />
            {t.shoppingCart}
          </DrawerTitle>
          <DrawerDescription>
            {items.length === 0 ? t.cartEmpty : `${items.length} ${t.itemsInCart} • ${totalItems} ${t.totalItems.toLowerCase()}`}
          </DrawerDescription>
        </DrawerHeader>
        
        <ScrollArea className="h-[50vh] px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in scale-in duration-500">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg font-medium">{t.cartEmpty}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.addDelicious}</p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {items.map((item, index) => {
                const productIdStr = item.product.id.toString();
                const hasImageError = imageErrors.has(productIdStr);
                const productName = getProductName(item.product, language);
                
                return (
                  <div 
                    key={productIdStr} 
                    className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 animate-in slide-in-from-right border border-transparent hover:border-brand/20"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative shrink-0 group">
                      {!hasImageError ? (
                        <>
                          <img
                            src={item.product.image.getDirectURL()}
                            alt={productName}
                            onError={() => handleImageError(productIdStr)}
                            className="h-20 w-20 rounded-md object-cover transition-transform duration-300 group-hover:scale-110 shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="h-20 w-20 rounded-md bg-muted flex items-center justify-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate text-base">{productName}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t.quantity}: {item.quantity}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 transition-all duration-300 hover:scale-110 hover:bg-brand/10 active:scale-95"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 transition-all duration-300 hover:scale-110 hover:bg-brand/10 active:scale-95"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto transition-all duration-300 hover:scale-110 hover:bg-destructive/10 active:scale-95"
                          onClick={() => {
                            removeItem(item.product.id);
                            toast.success(t.itemRemoved, {
                              duration: 2000,
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <>
            <Separator className="my-4 animate-in fade-in duration-500" />
            <div className="px-4 animate-in fade-in slide-up-fade duration-500">
              <div className="flex justify-center text-lg font-semibold mb-4 p-4 rounded-lg bg-gradient-to-r from-brand/10 to-brand/5 border border-brand/20">
                <span className="text-brand text-xl">{totalItems} {totalItems === 1 ? t.itemsInCart.slice(0, -1) : t.itemsInCart}</span>
              </div>
            </div>
          </>
        )}

        <DrawerFooter className="animate-in fade-in slide-up-fade duration-500 delay-100">
          <DrawerClose asChild>
            <Button variant="outline" className="transition-all duration-300 hover:scale-105 active:scale-95">
              {t.continueShopping}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
