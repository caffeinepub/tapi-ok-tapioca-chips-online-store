import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useIsAdmin } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { data: isAdmin, isLoading } = useIsAdmin();

  if (isLoading) {
    return (
      <div className="container py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-20">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Product management features coming soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>View and manage orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Order management features coming soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Submissions</CardTitle>
            <CardDescription>View customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contact form management coming soon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
