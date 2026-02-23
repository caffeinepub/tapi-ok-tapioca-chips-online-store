import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'tapi-ok-store');

  return (
    <footer className="border-t bg-gradient-to-b from-muted/30 to-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-bold bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
              TAPI OK
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium tapioca chips made from the finest ingredients. Crispy, delicious, and perfect for any occasion.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-brand transition-all duration-300 hover:translate-x-1 inline-block">
                  {t.home}
                </a>
              </li>
              <li>
                <a href="/products" className="text-muted-foreground hover:text-brand transition-all duration-300 hover:translate-x-1 inline-block">
                  {t.products}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-brand transition-all duration-300 hover:translate-x-1 inline-block">
                  {t.contact}
                </a>
              </li>
              <li>
                <a href="/contact#idea-suggestion-box" className="text-muted-foreground hover:text-brand transition-all duration-300 hover:translate-x-1 inline-block">
                  {t.ideaSuggestionBox}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t.followUs}</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-brand transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/unier.co?igsh=bjB2OW05bGZocnFn" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-brand transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            © {currentYear} TAPI OK. All rights reserved. | {t.builtWith}{' '}
            <Heart className="h-4 w-4 text-red-500 fill-red-500 inline-block" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
