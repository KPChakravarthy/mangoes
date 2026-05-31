import { Link, useLocation } from 'react-router';
import { ShoppingCart, Home, Info, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSiteData } from '../context/SiteContext';
import logo from '../../logo.png';

export function Navigation() {
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const siteData = useSiteData();

  const navItems = [
    { path: '/', icon: Home, label: siteData.navigation.home },
    { path: '/about', icon: Info, label: siteData.navigation.about },
    { path: '/contact', icon: Phone, label: siteData.navigation.contact },
    { path: '/cart', icon: ShoppingCart, label: siteData.navigation.cart },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="relative h-16 flex items-center min-w-[140px] z-50">
            <img 
              src={logo} 
              alt="Logo" 
              className="absolute top-[-6px] left-0 h-20 w-auto object-contain" 
            />
          </Link>

          <div className="flex gap-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground border border-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{label}</span>
                  {label === 'Cart' && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
