import type { Product } from '../backend';
import type { Language } from './translations';

export function getProductName(product: Product, language: Language): string {
  const translations = product.translations;
  if (!translations) return '';
  
  switch (language) {
    case 'hi': return translations.hiName;
    case 'ta': return translations.taName;
    case 'ml': return translations.mlName;
    default: return translations.enName;
  }
}

export function getProductDescription(product: Product, language: Language): string {
  const translations = product.translations;
  if (!translations) return '';
  
  switch (language) {
    case 'hi': return translations.hiDescription;
    case 'ta': return translations.taDescription;
    case 'ml': return translations.mlDescription;
    default: return translations.enDescription;
  }
}

export function getProductIngredients(product: Product, language: Language) {
  const translations = product.translations;
  if (!translations) return [];
  
  switch (language) {
    case 'hi': return translations.hiIngredients;
    case 'ta': return translations.taIngredients;
    case 'ml': return translations.mlIngredients;
    default: return translations.enIngredients;
  }
}
