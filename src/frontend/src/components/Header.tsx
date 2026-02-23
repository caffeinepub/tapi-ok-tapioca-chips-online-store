import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, LogIn, LogOut, Sun, Moon, User, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../store/cartStore';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import UserProfileDisplay from './UserProfileDisplay';
import { useInternalAuth } from '../contexts/InternalAuthContext';
import { useAuthModal } from '../contexts/AuthModalContext';

export default function Header() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useInternalAuth();
  const { openModal } = useAuthModal();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleCartClick = () => {
    navigate({ to: '/cart' });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Manually update the class and persist to localStorage
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLoginClick = () => {
    openModal();
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm"
      style={{ backgroundColor: '#D32F2F' }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center">
          {/* Brand logo - always visible, no theme switching */}
          <img 
            src="/assets/ChatGPT Image Feb 23, 2026, 12_00_04 PM (1)-1.png" 
            alt="TAPI OK Logo" 
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/" 
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-105 active:scale-95 text-white"
            activeProps={{ className: 'bg-white/20 text-white' }}
          >
            {t.home}
          </Link>
          <Link 
            to="/products" 
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-105 active:scale-95 text-white"
            activeProps={{ className: 'bg-white/20 text-white' }}
          >
            {t.products}
          </Link>
          <Link 
            to="/contact" 
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-white/20 hover:text-white hover:scale-105 active:scale-95 text-white"
            activeProps={{ className: 'bg-white/20 text-white' }}
          >
            {t.contact}
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCartClick}
            className="relative transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#D32F2F] shadow-lg animate-in zoom-in-50 duration-300">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Desktop Auth */}
          <div className="hidden md:block">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full transition-all duration-300 hover:scale-105">
                    <UserProfileDisplay name={user.name} showName={false} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-3 border-b">
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-foreground">
                    <User className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-2 text-foreground">
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer gap-2">
                    <LogOut className="h-4 w-4" />
                    {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleLoginClick}
                className="gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg bg-white text-[#D32F2F] hover:bg-white/90"
              >
                <LogIn className="h-4 w-4" />
                {t.login}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-all duration-300 hover:scale-110 hover:bg-white/20 active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="border-t md:hidden animate-in slide-in-from-top-5 duration-300 backdrop-blur-md"
          style={{ backgroundColor: '#D32F2F' }}
        >
          <nav className="container flex flex-col space-y-1 py-4">
            <Link 
              to="/" 
              className="px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/20 hover:text-white active:scale-95 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link 
              to="/products" 
              className="px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/20 hover:text-white active:scale-95 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.products}
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/20 hover:text-white active:scale-95 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.contact}
            </Link>
            <div className="pt-2">
              {isAuthenticated && user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <UserProfileDisplay name={user.name} showName={false} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">{user.name}</p>
                      <p className="text-xs text-white/70 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full gap-2 bg-white text-[#D32F2F] border-white hover:bg-white/90"
                  >
                    <LogOut className="h-4 w-4" />
                    {t.logout}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    handleLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gap-2 bg-white text-[#D32F2F] hover:bg-white/90"
                >
                  <LogIn className="h-4 w-4" />
                  {t.login}
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
