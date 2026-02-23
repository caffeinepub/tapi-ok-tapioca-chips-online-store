import type { Product, ProductTranslations } from '../backend';

// Static product data with translations
export const STATIC_PRODUCTS: Array<Omit<Product, 'image'> & { image: string }> = [
  {
    id: BigInt(1),
    priceInCents: BigInt(0),
    image: '/assets/Gemini_Generated_Image_v3157jv3157jv315-Photoroom.png',
    isAvailable: true,
    sku: 'TAPI-1',
    detailedDescription: 'Our Cheesy chips are crafted with the finest tapioca and infused with a delectable cheese seasoning that creates an irresistible snacking experience. Perfect for cheese lovers who crave quality and taste.',
    translations: {
      enName: 'Cheesy',
      enDescription: 'Indulge in the rich, savory taste of our Cheesy chips. Each crispy bite delivers a perfect blend of premium cheese flavor and satisfying crunch.',
      enIngredients: [
        { name: 'Tapioca', isVegan: true, isGlutenFree: true },
        { name: 'Vegetable Oil', isVegan: true, isGlutenFree: true },
        { name: 'Cheese Seasoning', isVegan: false, isGlutenFree: true },
        { name: 'Salt', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK secret', isVegan: true, isGlutenFree: true },
      ],
      hiName: 'चीज़ी',
      hiDescription: 'हमारे चीज़ी चिप्स के समृद्ध, स्वादिष्ट स्वाद का आनंद लें। हर कुरकुरा काटने में प्रीमियम चीज़ स्वाद और संतोषजनक क्रंच का सही मिश्रण मिलता है।',
      hiIngredients: [
        { name: 'टैपिओका', isVegan: true, isGlutenFree: true },
        { name: 'वनस्पति तेल', isVegan: true, isGlutenFree: true },
        { name: 'चीज़ सीज़निंग', isVegan: false, isGlutenFree: true },
        { name: 'नमक', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK रहस्य', isVegan: true, isGlutenFree: true },
      ],
      taName: 'சீஸி',
      taDescription: 'எங்கள் சீஸி சிப்ஸின் செழுமையான, சுவையான சுவையை அனுபவியுங்கள். ஒவ்வொரு மொறுமொறுப்பான கடியிலும் பிரீமியம் சீஸ் சுவை மற்றும் திருப்திகரமான க்ரஞ்சின் சரியான கலவை கிடைக்கிறது.',
      taIngredients: [
        { name: 'மரவள்ளிக்கிழங்கு', isVegan: true, isGlutenFree: true },
        { name: 'தாவர எண்ணெய்', isVegan: true, isGlutenFree: true },
        { name: 'சீஸ் சீஸனிங்', isVegan: false, isGlutenFree: true },
        { name: 'உப்பு', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK ரகசியம்', isVegan: true, isGlutenFree: true },
      ],
      mlName: 'ചീസി',
      mlDescription: 'ഞങ്ങളുടെ ചീസി ചിപ്സിന്റെ സമ്പന്നവും രുചികരവുമായ രുചി ആസ്വദിക്കൂ. ഓരോ ക്രിസ്പി കടിയിലും പ്രീമിയം ചീസ് രുചിയുടെയും തൃപ്തികരമായ ക്രഞ്ചിന്റെയും മികച്ച മിശ്രിതം നൽകുന്നു.',
      mlIngredients: [
        { name: 'മരച്ചീനി', isVegan: true, isGlutenFree: true },
        { name: 'സസ്യ എണ്ണ', isVegan: true, isGlutenFree: true },
        { name: 'ചീസ് സീസണിംഗ്', isVegan: false, isGlutenFree: true },
        { name: 'ഉപ്പ്', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK രഹസ്യം', isVegan: true, isGlutenFree: true },
      ],
    },
  },
  {
    id: BigInt(2),
    priceInCents: BigInt(0),
    image: '/assets/Gemini_Generated_Image_hb1ar6hb1ar6hb1a-Photoroom.png',
    isAvailable: true,
    sku: 'TAPI-2',
    detailedDescription: 'Our Salty chips offer a pure, authentic taste that highlights the natural goodness of tapioca. Lightly salted to perfection, these chips provide a satisfying crunch with every bite.',
    translations: {
      enName: 'Salty',
      enDescription: 'Experience the classic, timeless flavor of our Salty chips. Perfectly seasoned with just the right amount of salt for a delightfully crispy snack.',
      enIngredients: [
        { name: 'Tapioca', isVegan: true, isGlutenFree: true },
        { name: 'Vegetable Oil', isVegan: true, isGlutenFree: true },
        { name: 'Sea Salt', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK secret', isVegan: true, isGlutenFree: true },
      ],
      hiName: 'नमकीन',
      hiDescription: 'हमारे नमकीन चिप्स के क्लासिक, कालातीत स्वाद का अनुभव करें। एक स्वादिष्ट कुरकुरा स्नैक के लिए सही मात्रा में नमक के साथ पूरी तरह से अनुभवी।',
      hiIngredients: [
        { name: 'टैपिओका', isVegan: true, isGlutenFree: true },
        { name: 'वनस्पति तेल', isVegan: true, isGlutenFree: true },
        { name: 'समुद्री नमक', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK रहस्य', isVegan: true, isGlutenFree: true },
      ],
      taName: 'உப்பு',
      taDescription: 'எங்கள் உப்பு சிப்ஸின் கிளாசிக், காலமற்ற சுவையை அனுபவியுங்கள். மகிழ்ச்சியான மொறுமொறுப்பான சிற்றுண்டிக்கு சரியான அளவு உப்புடன் சரியாக சுவையூட்டப்பட்டது.',
      taIngredients: [
        { name: 'மரவள்ளிக்கிழங்கு', isVegan: true, isGlutenFree: true },
        { name: 'தாவர எண்ணெய்', isVegan: true, isGlutenFree: true },
        { name: 'கடல் உப்பு', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK ரகசியம்', isVegan: true, isGlutenFree: true },
      ],
      mlName: 'ഉപ്പ്',
      mlDescription: 'ഞങ്ങളുടെ ഉപ്പ് ചിപ്സിന്റെ ക്ലാസിക്, കാലാതീതമായ രുചി അനുഭവിക്കൂ. മനോഹരമായ ക്രിസ്പി സ്നാക്കിനായി ശരിയായ അളവിൽ ഉപ്പ് ചേർത്ത് തികച്ചും രുചികരമാക്കിയിരിക്കുന്നു.',
      mlIngredients: [
        { name: 'മരച്ചീനി', isVegan: true, isGlutenFree: true },
        { name: 'സസ്യ എണ്ണ', isVegan: true, isGlutenFree: true },
        { name: 'കടൽ ഉപ്പ്', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK രഹസ്യം', isVegan: true, isGlutenFree: true },
      ],
    },
  },
  {
    id: BigInt(3),
    priceInCents: BigInt(0),
    image: '/assets/Gemini_Generated_Image_ncp6ijncp6ijncp6-Photoroom.png',
    isAvailable: true,
    sku: 'TAPI-3',
    detailedDescription: 'For those who love a spicy kick, our Chilly chips deliver an exciting blend of chili seasonings that awaken your taste buds. Made with premium tapioca and bold spices for an unforgettable snacking experience.',
    translations: {
      enName: 'Chilly',
      enDescription: 'Turn up the heat with our Chilly chips! These spicy chips pack a flavorful punch with a perfect balance of heat and crunch.',
      enIngredients: [
        { name: 'Tapioca', isVegan: true, isGlutenFree: true },
        { name: 'Vegetable Oil', isVegan: true, isGlutenFree: true },
        { name: 'Chili Seasoning', isVegan: true, isGlutenFree: true },
        { name: 'Salt', isVegan: true, isGlutenFree: true },
        { name: 'Spices', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK secret', isVegan: true, isGlutenFree: true },
      ],
      hiName: 'मिर्ची',
      hiDescription: 'हमारे मिर्ची चिप्स के साथ गर्मी बढ़ाएं! ये मसालेदार चिप्स गर्मी और क्रंच के सही संतुलन के साथ एक स्वादिष्ट पंच पैक करते हैं।',
      hiIngredients: [
        { name: 'टैपिओका', isVegan: true, isGlutenFree: true },
        { name: 'वनस्पति तेल', isVegan: true, isGlutenFree: true },
        { name: 'मिर्च सीज़निंग', isVegan: true, isGlutenFree: true },
        { name: 'नमक', isVegan: true, isGlutenFree: true },
        { name: 'मसाले', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK रहस्य', isVegan: true, isGlutenFree: true },
      ],
      taName: 'மிளகாய்',
      taDescription: 'எங்கள் மிளகாய் சிப்ஸுடன் வெப்பத்தை அதிகரிக்கவும்! இந்த காரமான சிப்ஸ் வெப்பம் மற்றும் க்ரஞ்சின் சரியான சமநிலையுடன் சுவையான பஞ்சை வழங்குகிறது.',
      taIngredients: [
        { name: 'மரவள்ளிக்கிழங்கு', isVegan: true, isGlutenFree: true },
        { name: 'தாவர எண்ணெய்', isVegan: true, isGlutenFree: true },
        { name: 'மிளகாய் சீஸனிங்', isVegan: true, isGlutenFree: true },
        { name: 'உப்பு', isVegan: true, isGlutenFree: true },
        { name: 'மசாலாக்கள்', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK ரகசியம்', isVegan: true, isGlutenFree: true },
      ],
      mlName: 'മുളക്',
      mlDescription: 'ഞങ്ങളുടെ മുളക് ചിപ്സ് ഉപയോഗിച്ച് ചൂട് വർദ്ധിപ്പിക്കുക! ഈ സ്പൈസി ചിപ്സ് ചൂടിന്റെയും ക്രഞ്ചിന്റെയും മികച്ച സന്തുലിതാവസ്ഥയോടെ രുചികരമായ പഞ്ച് നൽകുന്നു.',
      mlIngredients: [
        { name: 'മരച്ചീനി', isVegan: true, isGlutenFree: true },
        { name: 'സസ്യ എണ്ണ', isVegan: true, isGlutenFree: true },
        { name: 'മുളക് സീസണിംഗ്', isVegan: true, isGlutenFree: true },
        { name: 'ഉപ്പ്', isVegan: true, isGlutenFree: true },
        { name: 'സുഗന്ധവ്യഞ്ജനങ്ങൾ', isVegan: true, isGlutenFree: true },
        { name: 'TAPI OK രഹസ്യം', isVegan: true, isGlutenFree: true },
      ],
    },
  },
];

// Helper function to get product by ID
export function getProductById(productId: bigint): (Omit<Product, 'image'> & { image: string }) | null {
  return STATIC_PRODUCTS.find(p => p.id.toString() === productId.toString()) || null;
}

// Helper function to convert static product to full Product type
export function convertToProduct(staticProduct: Omit<Product, 'image'> & { image: string }): Product {
  return {
    ...staticProduct,
    image: {
      getDirectURL: () => staticProduct.image,
      getBytes: async () => new Uint8Array(),
    } as any,
  };
}
