import { Button } from '../components/ui/button';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import ProductSlider from '../components/ProductSlider';
import HeroBackground from '../components/HeroBackground';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations only once on initial mount
    setHasAnimated(true);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <HeroBackground />
        
        <div className="container relative z-10 px-4 md:px-8 lg:px-12 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div 
                className={`inline-block ${hasAnimated ? 'animate-fade-in-up opacity-0' : ''}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand font-medium text-sm border border-brand/20 shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  {t.premiumTapiocaChips}
                </span>
              </div>
              
              <h1 
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground ${hasAnimated ? 'animate-fade-in-up animation-delay-200 opacity-0' : ''}`}
                style={{ animationFillMode: 'forwards' }}
              >
                {t.crunchyDelicious}
                <span className="block mt-2 bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
                  {t.tapiocaChips}
                </span>
              </h1>
              
              <p 
                className={`text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 ${hasAnimated ? 'animate-fade-in-up animation-delay-400 opacity-0' : ''}`}
                style={{ animationFillMode: 'forwards' }}
              >
                {t.experiencePerfectBlend}
              </p>
              
              <div 
                className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${hasAnimated ? 'animate-fade-in-up animation-delay-600 opacity-0' : ''}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/products' })}
                  className="group gap-2 shadow-brand-lg hover:shadow-brand transition-all duration-500 hover:scale-105 active:scale-95 text-base px-8 py-6"
                >
                  {t.shopNow}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/contact' })}
                  className="border-2 hover:bg-brand/10 hover:border-brand transition-all duration-300 hover:scale-105 active:scale-95 text-base px-8 py-6 text-foreground"
                >
                  {t.learnMore}
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image with TAPI OK Logo */}
            <div 
              className={`relative ${hasAnimated ? 'animate-fade-in-scale animation-delay-800 opacity-0' : ''}`}
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-brand/5 rounded-full blur-3xl animate-pulse-slow" />
                <img
                  src="/assets/ChatGPT Image Feb 23, 2026, 04_03_18 AM (1)-1.png"
                  alt="TAPI OK Tapioca Chips"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Slider Section */}
      <section className="py-16 md:py-20 bg-muted/30 px-4 md:px-8 lg:px-12">
        <div className="container">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {t.exploreProducts}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {t.readyExperience}
            </p>
          </div>
          <ProductSlider />
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-2xl border-2 border-transparent hover:border-brand/30 transition-all duration-500 hover:shadow-brand hover:-translate-y-2 bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mx-auto">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.premiumQuality}</h3>
              <p className="text-foreground/70">{t.madeFromFinest}</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl border-2 border-transparent hover:border-brand/30 transition-all duration-500 hover:shadow-brand hover:-translate-y-2 bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.naturalIngredients}</h3>
              <p className="text-foreground/70">{t.noArtificial}</p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl border-2 border-transparent hover:border-brand/30 transition-all duration-500 hover:shadow-brand hover:-translate-y-2 bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mx-auto">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{t.fastDelivery}</h3>
              <p className="text-foreground/70">{t.freshChips}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-brand/10 via-brand/5 to-transparent px-4 md:px-8 lg:px-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {t.readyExperience}
            </h2>
            <p className="text-lg text-foreground/70">
              {t.browseCollection}
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/products' })}
              className="group gap-2 shadow-brand-lg hover:shadow-brand transition-all duration-500 hover:scale-110 active:scale-95 text-base px-10 py-6"
            >
              {t.exploreProducts}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
