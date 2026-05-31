import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { CartProvider } from './context/CartContext';
import { SiteProvider } from './context/SiteContext';

export function Root() {
  return (
    <SiteProvider>
      <CartProvider>
        <div className="min-h-screen">
          <Navigation />
          <Outlet />
        </div>
      </CartProvider>
    </SiteProvider>
  );
}
