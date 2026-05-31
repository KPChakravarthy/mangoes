import { Plus, Minus } from 'lucide-react';
import { useCart, Product } from '../context/CartContext';
import { useState } from 'react';
import { useSiteData } from '../context/SiteContext';

function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const siteData = useSiteData();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isSoldOut = (product as any).isSoldOut;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
  };

  const handleIncrement = () => {
    if (quantity < product.stock && !isSoldOut) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className={`bg-card rounded-md overflow-hidden transition-all border border-border ${isSoldOut ? 'opacity-75' : ''}`}>
      <div className="relative h-56 bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md font-bold text-lg uppercase shadow-sm">
              {siteData.home.soldOut}
            </div>
          </div>
        )}
        {showSuccess && !isSoldOut && (
          <div className="absolute inset-0 bg-primary bg-opacity-90 flex items-center justify-center">
            <div className="text-4xl text-primary-foreground">✓</div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl mb-1" style={{ fontWeight: 700 }}>
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3">{product.variety}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-display text-[#2d1b0e]" style={{ fontWeight: 700 }}>
              ₹{product.pricePerKg}
            </div>
            <div className="text-xs text-muted-foreground">{siteData.home.perKg}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{siteData.home.available}</div>
            <div className="text-lg font-semibold">{product.stock} kg</div>
          </div>
        </div>

        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className="w-full py-3 rounded-md font-semibold bg-primary text-primary-foreground transition-all active:scale-95 border border-border disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
          >
            {siteData.home.addToCart}
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              className="flex-1 py-3 rounded-md bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-all active:scale-95 flex items-center justify-center"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="font-display text-2xl min-w-[60px] text-center" style={{ fontWeight: 700 }}>
              {quantity} kg
            </div>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock || isSoldOut}
              className="flex-1 py-3 rounded-md bg-primary text-primary-foreground transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-border"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Home() {
  const siteData = useSiteData();
  const PRODUCTS: Product[] = siteData.home.products;

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 bg-[#ffd54f] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1705723115413-a0ec375ac414?w=1600&h=600&fit=crop&auto=format"
            alt="Mango farm"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <div className="text-7xl mb-4">🥭</div>
          <h1 className="font-display text-5xl sm:text-6xl mb-3" style={{ fontWeight: 700 }}>
            {siteData.home.heroTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 max-w-2xl">
            {siteData.home.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="font-display text-3xl mb-2" style={{ fontWeight: 700 }}>
            {siteData.home.productsTitle}
          </h2>
          <p className="text-muted-foreground text-lg">
            {siteData.home.productsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
