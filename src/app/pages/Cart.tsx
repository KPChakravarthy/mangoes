import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';
import { useState } from 'react';
import { useSiteData } from '../context/SiteContext';

export function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [nameError, setNameError] = useState(false);
  const siteData = useSiteData();

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      setNameError(true);
      return;
    }

    if (cart.length === 0) {
      alert(siteData.cart.emptyAlert);
      return;
    }

    setNameError(false);

    // Build order message
    const orderDetails = cart
      .map((item) => `${item.name} (${item.variety}) - ${item.quantity} kg @ ₹${item.pricePerKg}/kg = ₹${item.quantity * item.pricePerKg}`)
      .join('%0A');

    const totalAmount = getTotalPrice();
    const message = `Hi! My name is ${customerName}%0A%0AI would like to order:%0A%0A${orderDetails}%0A%0ATotal: ₹${totalAmount}%0A%0AI will share the payment screenshot shortly.`;

    const whatsappNumber = '919480705353'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🥭</div>
          <h2 className="font-display text-3xl mb-3" style={{ fontWeight: 700 }}>
            {siteData.cart.emptyTitle}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {siteData.cart.emptySubtitle}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-muted transition-all active:scale-95 border border-border"
          >
            <ShoppingBag className="w-5 h-5" />
            {siteData.cart.browseProducts}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl mb-2" style={{ fontWeight: 700 }}>
            {siteData.cart.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {siteData.cart.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-md p-6"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md bg-muted flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl mb-1" style={{ fontWeight: 600 }}>
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-2">{item.variety}</p>
                        <p className="text-lg font-semibold">₹{item.pricePerKg}/kg</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-md bg-secondary text-secondary-foreground border border-border hover:bg-muted transition-all active:scale-95 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="font-display text-xl min-w-[80px] text-center" style={{ fontWeight: 600 }}>
                        {item.quantity} kg
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-10 h-10 rounded-md bg-primary text-primary-foreground transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-border"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <div className="ml-auto text-right">
                        <div className="text-sm text-muted-foreground">{siteData.cart.subtotal}</div>
                        <div className="text-xl font-display text-[#2d1b0e]" style={{ fontWeight: 700 }}>
                          ₹{item.quantity * item.pricePerKg}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-md p-6 sticky top-20">
              <h2 className="font-display text-2xl mb-6" style={{ fontWeight: 700 }}>
                {siteData.cart.summaryTitle}
              </h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}kg
                    </span>
                    <span className="font-semibold">₹{item.quantity * item.pricePerKg}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-display text-xl" style={{ fontWeight: 700 }}>
                    {siteData.cart.total}
                  </span>
                  <span className="font-display text-2xl text-[#2d1b0e]" style={{ fontWeight: 700 }}>
                    ₹{getTotalPrice()}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  {siteData.cart.yourNameLabel}
                </label>
                <input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (e.target.value.trim()) setNameError(false);
                  }}
                  placeholder={siteData.cart.yourNamePlaceholder}
                  className={`w-full px-4 py-3 rounded-md border bg-input-background focus:outline-none focus:ring-2 focus:ring-ring ${
                    nameError ? 'border-destructive ring-destructive' : 'border-border'
                  }`}
                />
                {nameError && (
                  <p className="text-destructive text-xs mt-1 font-medium">
                    {siteData.cart.nameAlert}
                  </p>
                )}
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-4 rounded-md font-semibold bg-primary text-primary-foreground transition-all active:scale-95 flex items-center justify-center gap-2 border border-border"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {siteData.cart.orderWhatsappButton}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {siteData.cart.redirectNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
