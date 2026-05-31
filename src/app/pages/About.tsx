import { Sprout, Heart, Sun, Leaf } from 'lucide-react';
import { useSiteData } from '../context/SiteContext';

export function About() {
  const siteData = useSiteData();
  const iconMap = {
    "100% Organic": Sprout,
    "Handpicked with Care": Heart,
    "Natural Ripening": Sun,
    "Sustainable Practices": Leaf
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-[#ffd54f] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?w=1600&h=800&fit=crop&auto=format"
            alt="Mango orchard"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="font-display text-5xl sm:text-6xl mb-4" style={{ fontWeight: 700 }}>
            {siteData.about.heroTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 max-w-2xl">
            {siteData.about.heroSubtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed text-foreground mb-8">
            {siteData.about.story}
          </p>

          <h2 className="font-display text-3xl mt-12 mb-6" style={{ fontWeight: 700 }}>
            {siteData.about.featuresTitle}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 my-8">
            {siteData.about.features.map((feature: any, index: number) => {
              const Icon = (iconMap as any)[feature.title] || Sprout;
              return (
                <div key={index} className="bg-card border border-border rounded-md p-6">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl mb-2" style={{ fontWeight: 600 }}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <h2 className="font-display text-3xl mt-12 mb-6" style={{ fontWeight: 700 }}>
            {siteData.about.realityTitle}
          </h2>

          <p className="text-lg leading-relaxed text-foreground mb-6">
            {siteData.about.realityText1}
          </p>

          <p className="text-lg leading-relaxed text-foreground mb-6">
            {siteData.about.realityText2}
          </p>

          <div className="bg-primary rounded-md p-8 my-12 text-center">
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-2xl font-display text-primary-foreground" style={{ fontWeight: 600 }}>
              "{siteData.about.quote}"
            </p>
            <p className="text-lg text-primary-foreground/80 mt-2">— {siteData.about.quoteAuthor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
