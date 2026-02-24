import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function PaymentSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription>
              Thank you for your order. Your payment has been processed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation email shortly with your order details.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
