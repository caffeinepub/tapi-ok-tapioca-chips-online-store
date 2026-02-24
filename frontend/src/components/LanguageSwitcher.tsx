import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../lib/translations';

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative transition-all duration-300 hover:scale-110 hover:bg-brand/10 active:scale-95"
          aria-label="Select language"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 animate-in slide-in-from-top-2 duration-200">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? 'bg-brand/10 text-brand font-semibold' : ''}`}
          >
            <span className="flex items-center justify-between w-full">
              <span>{lang.nativeName}</span>
              {language === lang.code && (
                <span className="ml-2 text-xs">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
