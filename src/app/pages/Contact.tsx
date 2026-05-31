import { MessageCircle, Users, MapPin, Mail } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

export function Contact() {
  const siteData = useSiteData();
  const whatsappGroupLink = "https://chat.whatsapp.com/your-group-link"; // Replace with actual WhatsApp group link
  const whatsappNumber = "919480705353"; // Replace with actual WhatsApp number

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-80 bg-[#ffd54f] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1732472581875-89ff83f18439?w=1600&h=800&fit=crop&auto=format"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="font-display text-5xl sm:text-6xl mb-4" style={{ fontWeight: 700 }}>
            {siteData.contact.heroTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90">
            {siteData.contact.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl mb-4" style={{ fontWeight: 700 }}>
            {siteData.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {siteData.contact.subtitle}
          </p>
        </div>

        {/* WhatsApp Group Card */}
        <div className="bg-primary rounded-md p-8 mb-8 border border-border">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl mb-3 text-primary-foreground" style={{ fontWeight: 700 }}>
              {siteData.contact.communityTitle}
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-lg text-lg">
              {siteData.contact.communityDescription}
            </p>
            <a
              href={whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-md font-semibold transition-all active:scale-95 border border-border"
            >
              <MessageCircle className="w-5 h-5" />
              {siteData.contact.communityButton}
            </a>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid sm:grid-cols-1 max-w-lg mx-auto gap-6 mb-12">
          <div className="bg-card border border-border rounded-md p-6">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-primary-solid" />
            </div>
            <h3 className="font-display text-xl mb-2" style={{ fontWeight: 600 }}>
              {siteData.contact.directWhatsappTitle}
            </h3>
            <p className="text-muted-foreground mb-4">
              {siteData.contact.directWhatsappDescription}
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-solid hover:underline font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              {siteData.contact.directWhatsappButton}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
