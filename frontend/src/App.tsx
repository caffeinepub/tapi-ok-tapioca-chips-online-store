import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentFailurePage from './pages/PaymentFailurePage';
import AdminPage from './pages/AdminPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { InternalAuthProvider } from './contexts/InternalAuthContext';
import { AuthModalProvider } from './contexts/AuthModalContext';
import AuthModal from './components/AuthModal';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductsPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$productId',
  component: ProductDetailPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage,
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailurePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  contactRoute,
  cartRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function ThemeInitializer() {
  useEffect(() => {
    // Initialize theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(savedTheme);
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
    }
  }, []);

  return null;
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeInitializer />
      <QueryClientProvider client={queryClient}>
        <InternalAuthProvider>
          <AuthModalProvider>
            <LanguageProvider>
              <RouterProvider router={router} />
              <AuthModal />
              <Toaster />
            </LanguageProvider>
          </AuthModalProvider>
        </InternalAuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
