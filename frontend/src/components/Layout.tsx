import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';
import ProfileSetupModal from './ProfileSetupModal';
import { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
      <ProfileSetupModal />
    </div>
  );
}
