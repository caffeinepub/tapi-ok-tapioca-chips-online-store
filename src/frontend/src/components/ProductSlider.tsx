import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const sliderImages = [
  '/assets/ChatGPT Image Jan 27, 2026, 09_07_45 AM-Photoroom.png', // Cheesy
  '/assets/ChatGPT Image Jan 27, 2026, 09_24_30 AM-Photoroom.png', // Salty
  '/assets/ChatGPT Image Jan 27, 2026, 09_28_44 AM-Photoroom.png', // Chilly
];

export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  // Entry animation: Pop up images on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
      // After pop-up animation completes, show the slider
      setTimeout(() => {
        setShowSlider(true);
      }, 1200);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || !showSlider) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, showSlider]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % sliderImages.length;
    goToSlide(newIndex);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand font-medium mb-4">
            <span className="text-2xl">🥔</span>
            <span>Our Products</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            TAPI OK Tapioca Chips
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium quality chips in delicious flavors
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Slider Container */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-muted/50 to-muted/30">
            {/* Slides with Entry Animation */}
            <div className="relative w-full h-full">
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    !hasAnimated
                      ? 'opacity-0 scale-0'
                      : showSlider
                      ? index === currentIndex
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-95 z-0'
                      : 'opacity-100 scale-100 z-10'
                  }`}
                  style={{
                    transitionDelay: !hasAnimated ? `${index * 200}ms` : '0ms',
                  }}
                >
                  <img
                    src={image}
                    alt={`TAPI OK Tapioca Chips ${index === 0 ? 'Cheesy' : index === 1 ? 'Salty' : 'Chilly'}`}
                    className="w-full h-full object-contain p-4 md:p-8"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons - Only show after entry animation */}
            {showSlider && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full shadow-xl hover:scale-110 transition-all duration-300 opacity-90 hover:opacity-100 animate-in fade-in slide-in-from-left"
                  onClick={goToPrevious}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full shadow-xl hover:scale-110 transition-all duration-300 opacity-90 hover:opacity-100 animate-in fade-in slide-in-from-right"
                  onClick={goToNext}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Gradient Overlays for Better Button Visibility */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background/20 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background/20 to-transparent pointer-events-none z-10" />
              </>
            )}
          </div>

          {/* Dots Navigation - Only show after entry animation */}
          {showSlider && (
            <div className="flex justify-center gap-3 mt-8 animate-in fade-in zoom-in duration-500 delay-300">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-brand shadow-lg'
                      : 'w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each packet is carefully crafted to deliver the perfect crunch and authentic tapioca flavor
          </p>
        </div>
      </div>
    </section>
  );
}
