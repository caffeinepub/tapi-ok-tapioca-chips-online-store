import { Link } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { XCircle } from 'lucide-react';

export default function PaymentFailurePage() {
  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Payment Failed</CardTitle>
            <CardDescription>
              Unfortunately, your payment could not be processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please try again or contact support if the problem persists.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link to="/products">Try Again</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
