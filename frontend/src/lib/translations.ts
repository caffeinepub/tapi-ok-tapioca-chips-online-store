export type Language = 'en' | 'hi' | 'ta' | 'ml';

export interface Translations {
  // Navigation
  home: string;
  products: string;
  contact: string;
  login: string;
  logout: string;
  account: string;
  
  // Hero Section
  heroTitle: string;
  heroTagline: string;
  heroSubtitle: string;
  heroDescription: string;
  shopNow: string;
  contactUs: string;
  premiumTapiocaChips: string;
  crunchyDelicious: string;
  tapiocaChips: string;
  experiencePerfectBlend: string;
  learnMore: string;
  
  // Product Section
  exploreFlavors: string;
  discoverFavorite: string;
  threeUniqueFlavors: string;
  viewAllProducts: string;
  exploreProducts: string;
  addToCart: string;
  
  // USP Section
  whatMakesUsSpecial: string;
  tapiOkDifference: string;
  craftExperience: string;
  naturalTitle: string;
  naturalDesc: string;
  handcraftedTitle: string;
  handcraftedDesc: string;
  qualityTitle: string;
  qualityDesc: string;
  
  // Features
  whyChoose: string;
  committedBest: string;
  premiumQuality: string;
  premiumQualityDesc: string;
  madeWithLove: string;
  madeWithLoveDesc: string;
  varietyFlavors: string;
  varietyFlavorsDesc: string;
  fastDelivery: string;
  fastDeliveryDesc: string;
  madeFromFinest: string;
  naturalIngredients: string;
  noArtificial: string;
  freshChips: string;
  
  // CTA
  readyExperience: string;
  browseCollection: string;
  
  // Product Details
  aboutProduct: string;
  ingredients: string;
  quantity: string;
  sku: string;
  availability: string;
  inStock: string;
  outOfStock: string;
  backToProducts: string;
  
  // Cart
  shoppingCart: string;
  cartEmpty: string;
  itemsInCart: string;
  totalItems: string;
  clearCart: string;
  continueShopping: string;
  remove: string;
  browseProducts: string;
  addDelicious: string;
  addSomeProducts: string;
  reviewItems: string;
  orderSummary: string;
  subtotal: string;
  shipping: string;
  calculated: string;
  total: string;
  proceedToCheckout: string;
  
  // Contact
  getInTouch: string;
  questionsOrFeedback: string;
  sendMessage: string;
  fillForm: string;
  name: string;
  email: string;
  message: string;
  yourName: string;
  yourEmail: string;
  tellUs: string;
  sending: string;
  contactInfo: string;
  reachOut: string;
  address: string;
  phone: string;
  businessHours: string;
  open247: string;
  alwaysHere: string;
  
  // Idea Suggestion Box
  ideaSuggestionBox: string;
  shareYourIdeas: string;
  weValueFeedback: string;
  emailOptional: string;
  yourIdea: string;
  shareThoughts: string;
  submitIdea: string;
  submittingIdea: string;
  ideaSubmitted: string;
  ideaFailed: string;
  
  // Auth
  connecting: string;
  loginDescription: string;
  secureAuthentication: string;
  secureAuthDescription: string;
  noPasswordNeeded: string;
  noPasswordDescription: string;
  loginWithInternetIdentity: string;
  loginFooterNote: string;
  
  // Loading & Errors
  loadingProducts: string;
  unableToLoad: string;
  issueLoading: string;
  tryAgain: string;
  retrying: string;
  productNotFound: string;
  noLongerAvailable: string;
  
  // Badges
  vegan: string;
  glutenFree: string;
  containsAllergens: string;
  
  // Messages
  addedToCart: string;
  itemRemoved: string;
  cartCleared: string;
  messageSent: string;
  messageFailed: string;
  fillAllFields: string;
  
  // Footer
  quickLinks: string;
  followUs: string;
  builtWith: string;
  
  // Language
  language: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    contact: 'Contact',
    login: 'Login / Sign Up',
    logout: 'Logout',
    account: 'Account',
    
    // Hero Section
    heroTitle: 'TAPI OK',
    heroTagline: 'A UNIER product',
    heroSubtitle: 'Crispy, Crunchy, Irresistible',
    heroDescription: 'Discover the perfect snack made from premium tapioca. Handcrafted with love, delivering authentic flavors in every bite.',
    shopNow: 'Shop Now',
    contactUs: 'Contact Us',
    premiumTapiocaChips: 'Premium Tapioca Chips',
    crunchyDelicious: 'Crunchy & Delicious',
    tapiocaChips: 'Tapioca Chips',
    experiencePerfectBlend: 'Experience the perfect blend of taste and crunch in every bite',
    learnMore: 'Learn More',
    
    // Product Section
    exploreFlavors: 'Explore Our Flavors',
    discoverFavorite: 'Discover Your Favorite',
    threeUniqueFlavors: 'Three unique flavors, each crafted to perfection',
    viewAllProducts: 'View All Products',
    exploreProducts: 'Explore Our Products',
    addToCart: 'Add to Cart',
    
    // USP Section
    whatMakesUsSpecial: 'What Makes Us Special',
    tapiOkDifference: 'The TAPI OK Difference',
    craftExperience: 'We don\'t just make chips—we craft an experience',
    naturalTitle: '100% Natural',
    naturalDesc: 'Made from pure tapioca with no artificial additives, preservatives, or colors. Just wholesome goodness.',
    handcraftedTitle: 'Handcrafted',
    handcraftedDesc: 'Every batch is carefully prepared by skilled artisans who pour their passion into each crispy chip.',
    qualityTitle: 'Quality Assured',
    qualityDesc: 'Rigorous quality checks ensure every pack meets our high standards for taste, texture, and freshness.',
    
    // Features
    whyChoose: 'Why Choose TAPI OK?',
    committedBest: 'We\'re committed to delivering the best tapioca chips experience',
    premiumQuality: 'Premium Quality',
    premiumQualityDesc: 'Made from the finest tapioca, ensuring exceptional taste and texture',
    madeWithLove: 'Made with Love',
    madeWithLoveDesc: 'Each batch is carefully prepared with attention to detail',
    varietyFlavors: 'Variety of Flavors',
    varietyFlavorsDesc: 'From classic to bold, we have a flavor for every taste',
    fastDelivery: 'Fast Delivery',
    fastDeliveryDesc: 'Quick and secure shipping to your doorstep',
    madeFromFinest: 'Made from the finest tapioca with authentic flavors',
    naturalIngredients: 'Natural Ingredients',
    noArtificial: 'No artificial preservatives or additives',
    freshChips: 'Fresh chips delivered right to your door',
    
    // CTA
    readyExperience: 'Ready to Experience the Crunch?',
    browseCollection: 'Browse our collection and find your favorite flavor today',
    
    // Product Details
    aboutProduct: 'About This Product',
    ingredients: 'Ingredients',
    quantity: 'Quantity',
    sku: 'SKU',
    availability: 'Availability',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    backToProducts: 'Back to Products',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    itemsInCart: 'items in cart',
    totalItems: 'Total Items',
    clearCart: 'Clear Cart',
    continueShopping: 'Continue Shopping',
    remove: 'Remove',
    browseProducts: 'Browse Products',
    addDelicious: 'Add some delicious tapioca chips to get started!',
    addSomeProducts: 'Add some products to get started',
    reviewItems: 'Review your items before checkout',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    calculated: 'Calculated at checkout',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Contact
    getInTouch: 'Get in Touch',
    questionsOrFeedback: 'Have questions or feedback? We\'d love to hear from you!',
    sendMessage: 'Send us a Message',
    fillForm: 'Fill out the form below and we\'ll respond as soon as possible',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    yourName: 'Your name',
    yourEmail: 'your.email@example.com',
    tellUs: 'Tell us what\'s on your mind...',
    sending: 'Sending...',
    contactInfo: 'Contact Information',
    reachOut: 'Reach out to us anytime - we\'re here to help!',
    address: 'Address',
    phone: 'Phone',
    businessHours: 'Business Hours',
    open247: 'Open 24/7',
    alwaysHere: 'We\'re always here for you, every day of the week',
    
    // Idea Suggestion Box
    ideaSuggestionBox: 'Idea Suggestion Box',
    shareYourIdeas: 'Share Your Ideas',
    weValueFeedback: 'We value your feedback and ideas! Help us improve by sharing your thoughts.',
    emailOptional: 'Email (Optional)',
    yourIdea: 'Your Idea / Suggestion',
    shareThoughts: 'Share your thoughts, ideas, or suggestions...',
    submitIdea: 'Submit Idea',
    submittingIdea: 'Submitting...',
    ideaSubmitted: 'Thank you! Your idea has been submitted successfully.',
    ideaFailed: 'Failed to submit idea. Please try again.',
    
    // Auth
    connecting: 'Connecting...',
    loginDescription: 'Secure authentication powered by Internet Identity',
    secureAuthentication: 'Secure Authentication',
    secureAuthDescription: 'Your privacy is protected with blockchain-based identity verification',
    noPasswordNeeded: 'No Password Needed',
    noPasswordDescription: 'Sign in securely without remembering passwords or sharing personal data',
    loginWithInternetIdentity: 'Login with Internet Identity',
    loginFooterNote: 'By logging in, you agree to our terms of service and privacy policy',
    
    // Loading & Errors
    loadingProducts: 'Loading product details...',
    unableToLoad: 'Unable to load product',
    issueLoading: 'There was an issue loading this product',
    tryAgain: 'Try Again',
    retrying: 'Retrying...',
    productNotFound: 'Product not found',
    noLongerAvailable: 'This product may no longer be available',
    
    // Badges
    vegan: 'Vegan',
    glutenFree: 'Gluten-Free',
    containsAllergens: 'Contains Allergens',
    
    // Messages
    addedToCart: 'Added to cart',
    itemRemoved: 'Item removed from cart',
    cartCleared: 'Cart cleared',
    messageSent: 'Message sent successfully! We\'ll get back to you soon.',
    messageFailed: 'Failed to send message. Please try again.',
    fillAllFields: 'Please fill in all fields',
    
    // Footer
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    builtWith: 'Built with love using',
    
    // Language
    language: 'Language',
  },
  hi: {
    // Navigation
    home: 'होम',
    products: 'उत्पाद',
    contact: 'संपर्क',
    login: 'लॉगिन / साइन अप',
    logout: 'लॉगआउट',
    account: 'खाता',
    
    // Hero Section
    heroTitle: 'TAPI OK',
    heroTagline: 'एक UNIER उत्पाद',
    heroSubtitle: 'कुरकुरा, क्रंची, अप्रतिरोध्य',
    heroDescription: 'प्रीमियम टैपिओका से बना सही स्नैक खोजें। प्यार से हस्तनिर्मित, हर काटने में प्रामाणिक स्वाद प्रदान करता है।',
    shopNow: 'अभी खरीदें',
    contactUs: 'संपर्क करें',
    premiumTapiocaChips: 'प्रीमियम टैपिओका चिप्स',
    crunchyDelicious: 'कुरकुरा और स्वादिष्ट',
    tapiocaChips: 'टैपिओका चिप्स',
    experiencePerfectBlend: 'हर काटने में स्वाद और क्रंच का सही मिश्रण अनुभव करें',
    learnMore: 'और जानें',
    
    // Product Section
    exploreFlavors: 'हमारे स्वाद देखें',
    discoverFavorite: 'अपना पसंदीदा खोजें',
    threeUniqueFlavors: 'तीन अनोखे स्वाद, प्रत्येक पूर्णता के साथ तैयार',
    viewAllProducts: 'सभी उत्पाद देखें',
    exploreProducts: 'हमारे उत्पाद देखें',
    addToCart: 'कार्ट में जोड़ें',
    
    // USP Section
    whatMakesUsSpecial: 'हमें विशेष क्या बनाता है',
    tapiOkDifference: 'TAPI OK का अंतर',
    craftExperience: 'हम सिर्फ चिप्स नहीं बनाते—हम एक अनुभव तैयार करते हैं',
    naturalTitle: '100% प्राकृतिक',
    naturalDesc: 'शुद्ध टैपिओका से बना, बिना किसी कृत्रिम योजक, संरक्षक या रंग के। बस स्वस्थ अच्छाई।',
    handcraftedTitle: 'हस्तनिर्मित',
    handcraftedDesc: 'हर बैच को कुशल कारीगरों द्वारा सावधानीपूर्वक तैयार किया जाता है जो हर कुरकुरे चिप में अपना जुनून डालते हैं।',
    qualityTitle: 'गुणवत्ता आश्वासन',
    qualityDesc: 'कठोर गुणवत्ता जांच यह सुनिश्चित करती है कि हर पैक स्वाद, बनावट और ताजगी के लिए हमारे उच्च मानकों को पूरा करता है।',
    
    // Features
    whyChoose: 'TAPI OK क्यों चुनें?',
    committedBest: 'हम सर्वोत्तम टैपिओका चिप्स अनुभव प्रदान करने के लिए प्रतिबद्ध हैं',
    premiumQuality: 'प्रीमियम गुणवत्ता',
    premiumQualityDesc: 'बेहतरीन टैपिओका से बना, असाधारण स्वाद और बनावट सुनिश्चित करता है',
    madeWithLove: 'प्यार से बनाया गया',
    madeWithLoveDesc: 'हर बैच को विस्तार पर ध्यान देकर सावधानीपूर्वक तैयार किया जाता है',
    varietyFlavors: 'विभिन्न स्वाद',
    varietyFlavorsDesc: 'क्लासिक से बोल्ड तक, हमारे पास हर स्वाद के लिए एक फ्लेवर है',
    fastDelivery: 'तेज़ डिलीवरी',
    fastDeliveryDesc: 'आपके दरवाजे तक त्वरित और सुरक्षित शिपिंग',
    madeFromFinest: 'प्रामाणिक स्वाद के साथ बेहतरीन टैपिओका से बना',
    naturalIngredients: 'प्राकृतिक सामग्री',
    noArtificial: 'कोई कृत्रिम संरक्षक या योजक नहीं',
    freshChips: 'ताजा चिप्स सीधे आपके दरवाजे पर',
    
    // CTA
    readyExperience: 'क्रंच का अनुभव करने के लिए तैयार हैं?',
    browseCollection: 'हमारे संग्रह को ब्राउज़ करें और आज अपना पसंदीदा स्वाद खोजें',
    
    // Product Details
    aboutProduct: 'इस उत्पाद के बारे में',
    ingredients: 'सामग्री',
    quantity: 'मात्रा',
    sku: 'SKU',
    availability: 'उपलब्धता',
    inStock: 'स्टॉक में',
    outOfStock: 'स्टॉक से बाहर',
    backToProducts: 'उत्पादों पर वापस जाएं',
    
    // Cart
    shoppingCart: 'शॉपिंग कार्ट',
    cartEmpty: 'आपकी कार्ट खाली है',
    itemsInCart: 'कार्ट में आइटम',
    totalItems: 'कुल आइटम',
    clearCart: 'कार्ट साफ़ करें',
    continueShopping: 'खरीदारी जारी रखें',
    remove: 'हटाएं',
    browseProducts: 'उत्पाद ब्राउज़ करें',
    addDelicious: 'शुरू करने के लिए कुछ स्वादिष्ट टैपिओका चिप्स जोड़ें!',
    addSomeProducts: 'शुरू करने के लिए कुछ उत्पाद जोड़ें',
    reviewItems: 'चेकआउट से पहले अपने आइटम की समीक्षा करें',
    orderSummary: 'ऑर्डर सारांश',
    subtotal: 'उपयोग',
    shipping: 'शिपिंग',
    calculated: 'चेकआउट पर गणना की गई',
    total: 'कुल',
    proceedToCheckout: 'चेकआउट के लिए आगे बढ़ें',
    
    // Contact
    getInTouch: 'संपर्क में रहें',
    questionsOrFeedback: 'प्रश्न या प्रतिक्रिया है? हम आपसे सुनना पसंद करेंगे!',
    sendMessage: 'हमें संदेश भेजें',
    fillForm: 'नीचे दिया गया फॉर्म भरें और हम जल्द से जल्द जवाब देंगे',
    name: 'नाम',
    email: 'ईमेल',
    message: 'संदेश',
    yourName: 'आपका नाम',
    yourEmail: 'your.email@example.com',
    tellUs: 'हमें बताएं कि आपके मन में क्या है...',
    sending: 'भेजा जा रहा है...',
    contactInfo: 'संपर्क जानकारी',
    reachOut: 'किसी भी समय हमसे संपर्क करें - हम मदद के लिए यहां हैं!',
    address: 'पता',
    phone: 'फोन',
    businessHours: 'व्यापार समय',
    open247: '24/7 खुला',
    alwaysHere: 'हम हमेशा आपके लिए यहां हैं, सप्ताह के हर दिन',
    
    // Idea Suggestion Box
    ideaSuggestionBox: 'विचार सुझाव बॉक्स',
    shareYourIdeas: 'अपने विचार साझा करें',
    weValueFeedback: 'हम आपकी प्रतिक्रिया और विचारों को महत्व देते हैं! अपने विचार साझा करके हमें बेहतर बनाने में मदद करें।',
    emailOptional: 'ईमेल (वैकल्पिक)',
    yourIdea: 'आपका विचार / सुझाव',
    shareThoughts: 'अपने विचार, आइडिया या सुझाव साझा करें...',
    submitIdea: 'विचार सबमिट करें',
    submittingIdea: 'सबमिट हो रहा है...',
    ideaSubmitted: 'धन्यवाद! आपका विचार सफलतापूर्वक सबमिट किया गया है।',
    ideaFailed: 'विचार सबमिट करने में विफल। कृपया पुनः प्रयास करें।',
    
    // Auth
    connecting: 'कनेक्ट हो रहा है...',
    loginDescription: 'इंटरनेट आइडेंटिटी द्वारा संचालित सुरक्षित प्रमाणीकरण',
    secureAuthentication: 'सुरक्षित प्रमाणीकरण',
    secureAuthDescription: 'ब्लॉकचेन-आधारित पहचान सत्यापन के साथ आपकी गोपनीयता सुरक्षित है',
    noPasswordNeeded: 'पासवर्ड की आवश्यकता नहीं',
    noPasswordDescription: 'पासवर्ड याद रखे बिना या व्यक्तिगत डेटा साझा किए बिना सुरक्षित रूप से साइन इन करें',
    loginWithInternetIdentity: 'इंटरनेट आइडेंटिटी से लॉगिन करें',
    loginFooterNote: 'लॉगिन करके, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत होते हैं',
    
    // Loading & Errors
    loadingProducts: 'उत्पाद विवरण लोड हो रहा है...',
    unableToLoad: 'उत्पाद लोड करने में असमर्थ',
    issueLoading: 'इस उत्पाद को लोड करने में समस्या थी',
    tryAgain: 'पुनः प्रयास करें',
    retrying: 'पुनः प्रयास कर रहा है...',
    productNotFound: 'उत्पाद नहीं मिला',
    noLongerAvailable: 'यह उत्पाद अब उपलब्ध नहीं हो सकता है',
    
    // Badges
    vegan: 'शाकाहारी',
    glutenFree: 'ग्लूटेन-मुक्त',
    containsAllergens: 'एलर्जी युक्त',
    
    // Messages
    addedToCart: 'कार्ट में जोड़ा गया',
    itemRemoved: 'कार्ट से आइटम हटाया गया',
    cartCleared: 'कार्ट साफ़ किया गया',
    messageSent: 'संदेश सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।',
    messageFailed: 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।',
    fillAllFields: 'कृपया सभी फ़ील्ड भरें',
    
    // Footer
    quickLinks: 'त्वरित लिंक',
    followUs: 'हमें फॉलो करें',
    builtWith: 'प्यार से बनाया गया',
    
    // Language
    language: 'भाषा',
  },
  ta: {
    // Navigation
    home: 'முகப்பு',
    products: 'தயாரிப்புகள்',
    contact: 'தொடர்பு',
    login: 'உள்நுழைய / பதிவு செய்ய',
    logout: 'வெளியேறு',
    account: 'கணக்கு',
    
    // Hero Section
    heroTitle: 'TAPI OK',
    heroTagline: 'ஒரு UNIER தயாரிப்பு',
    heroSubtitle: 'மொறுமொறுப்பான, கடித்துண்ணக்கூடிய, எதிர்க்க முடியாத',
    heroDescription: 'உயர்தர மரவள்ளிக்கிழங்கிலிருந்து தயாரிக்கப்பட்ட சரியான சிற்றுண்டியைக் கண்டறியுங்கள். அன்புடன் கைவினைப்பொருளாக, ஒவ்வொரு கடியிலும் உண்மையான சுவைகளை வழங்குகிறது.',
    shopNow: 'இப்போது வாங்கவும்',
    contactUs: 'எங்களை தொடர்பு கொள்ளுங்கள்',
    premiumTapiocaChips: 'பிரீமியம் மரவள்ளிக்கிழங்கு சிப்ஸ்',
    crunchyDelicious: 'மொறுமொறுப்பான மற்றும் சுவையான',
    tapiocaChips: 'மரவள்ளிக்கிழங்கு சிப்ஸ்',
    experiencePerfectBlend: 'ஒவ்வொரு கடியிலும் சுவை மற்றும் மொறுமொறுப்பின் சரியான கலவையை அனுபவிக்கவும்',
    learnMore: 'மேலும் அறிக',
    
    // Product Section
    exploreFlavors: 'எங்கள் சுவைகளை ஆராயுங்கள்',
    discoverFavorite: 'உங்கள் விருப்பத்தைக் கண்டறியுங்கள்',
    threeUniqueFlavors: 'மூன்று தனித்துவமான சுவைகள், ஒவ்வொன்றும் முழுமையாக வடிவமைக்கப்பட்டது',
    viewAllProducts: 'அனைத்து தயாரிப்புகளையும் காண்க',
    exploreProducts: 'எங்கள் தயாரிப்புகளை ஆராயுங்கள்',
    addToCart: 'கூடையில் சேர்க்கவும்',
    
    // USP Section
    whatMakesUsSpecial: 'எங்களை சிறப்பாக்குவது என்ன',
    tapiOkDifference: 'TAPI OK வேறுபாடு',
    craftExperience: 'நாங்கள் சிப்ஸ் மட்டும் செய்யவில்லை—நாங்கள் ஒரு அனுபவத்தை உருவாக்குகிறோம்',
    naturalTitle: '100% இயற்கை',
    naturalDesc: 'செயற்கை சேர்க்கைகள், பாதுகாப்புகள் அல்லது வண்ணங்கள் இல்லாமல் தூய மரவள்ளிக்கிழங்கிலிருந்து தயாரிக்கப்பட்டது. வெறும் ஆரோக்கியமான நன்மை.',
    handcraftedTitle: 'கைவினைப்பொருள்',
    handcraftedDesc: 'ஒவ்வொரு தொகுதியும் திறமையான கைவினைஞர்களால் கவனமாக தயாரிக்கப்படுகிறது, அவர்கள் ஒவ்வொரு மொறுமொறுப்பான சிப்பிலும் தங்கள் ஆர்வத்தை ஊற்றுகிறார்கள்.',
    qualityTitle: 'தரம் உறுதி',
    qualityDesc: 'கடுமையான தர சோதனைகள் ஒவ்வொரு பேக்கும் சுவை, அமைப்பு மற்றும் புதுமைக்கான எங்கள் உயர் தரங்களை பூர்த்தி செய்கிறது என்பதை உறுதி செய்கிறது.',
    
    // Features
    whyChoose: 'TAPI OK ஏன் தேர்வு செய்ய வேண்டும்?',
    committedBest: 'சிறந்த மரவள்ளிக்கிழங்கு சிப்ஸ் அனுபவத்தை வழங்க நாங்கள் உறுதிபூண்டுள்ளோம்',
    premiumQuality: 'பிரீமியம் தரம்',
    premiumQualityDesc: 'சிறந்த மரவள்ளிக்கிழங்கிலிருந்து தயாரிக்கப்பட்டது, விதிவிலக்கான சுவை மற்றும் அமைப்பை உறுதி செய்கிறது',
    madeWithLove: 'அன்புடன் தயாரிக்கப்பட்டது',
    madeWithLoveDesc: 'ஒவ்வொரு தொகுதியும் விவரங்களுக்கு கவனம் செலுத்தி கவனமாக தயாரிக்கப்படுகிறது',
    varietyFlavors: 'பல்வேறு சுவைகள்',
    varietyFlavorsDesc: 'கிளாசிக் முதல் தைரியமான வரை, ஒவ்வொரு சுவைக்கும் எங்களிடம் ஒரு சுவை உள்ளது',
    fastDelivery: 'விரைவான விநியோகம்',
    fastDeliveryDesc: 'உங்கள் வீட்டு வாசலுக்கு விரைவான மற்றும் பாதுகாப்பான ஷிப்பிங்',
    madeFromFinest: 'உண்மையான சுவைகளுடன் சிறந்த மரவள்ளிக்கிழங்கிலிருந்து தயாரிக்கப்பட்டது',
    naturalIngredients: 'இயற்கை பொருட்கள்',
    noArtificial: 'செயற்கை பாதுகாப்புகள் அல்லது சேர்க்கைகள் இல்லை',
    freshChips: 'புதிய சிப்ஸ் உங்கள் வீட்டு வாசலுக்கு நேரடியாக வழங்கப்படுகிறது',
    
    // CTA
    readyExperience: 'மொறுமொறுப்பை அனுபவிக்க தயாரா?',
    browseCollection: 'எங்கள் தொகுப்பை உலாவவும் மற்றும் இன்று உங்கள் விருப்பமான சுவையைக் கண்டறியவும்',
    
    // Product Details
    aboutProduct: 'இந்த தயாரிப்பு பற்றி',
    ingredients: 'பொருட்கள்',
    quantity: 'அளவு',
    sku: 'SKU',
    availability: 'கிடைக்கும் தன்மை',
    inStock: 'இருப்பில் உள்ளது',
    outOfStock: 'இருப்பில் இல்லை',
    backToProducts: 'தயாரிப்புகளுக்கு திரும்பு',
    
    // Cart
    shoppingCart: 'ஷாப்பிங் கார்ட்',
    cartEmpty: 'உங்கள் கார்ட் காலியாக உள்ளது',
    itemsInCart: 'கார்ட்டில் பொருட்கள்',
    totalItems: 'மொத்த பொருட்கள்',
    clearCart: 'கார்ட்டை அழி',
    continueShopping: 'ஷாப்பிங்கைத் தொடரவும்',
    remove: 'அகற்று',
    browseProducts: 'தயாரிப்புகளை உலாவவும்',
    addDelicious: 'தொடங்க சில சுவையான மரவள்ளிக்கிழங்கு சிப்ஸ் சேர்க்கவும்!',
    addSomeProducts: 'தொடங்க சில தயாரிப்புகளைச் சேர்க்கவும்',
    reviewItems: 'செக்அவுட் செய்வதற்கு முன் உங்கள் பொருட்களை மதிப்பாய்வு செய்யவும்',
    orderSummary: 'ஆர்டர் சுருக்கம்',
    subtotal: 'துணை மொத்தம்',
    shipping: 'ஷிப்பிங்',
    calculated: 'செக்அவுட்டில் கணக்கிடப்பட்டது',
    total: 'மொத்தம்',
    proceedToCheckout: 'செக்அவுட்டுக்கு தொடரவும்',
    
    // Contact
    getInTouch: 'தொடர்பில் இருங்கள்',
    questionsOrFeedback: 'கேள்விகள் அல்லது கருத்துகள் உள்ளதா? உங்களிடமிருந்து கேட்க விரும்புகிறோம்!',
    sendMessage: 'எங்களுக்கு ஒரு செய்தி அனுப்பவும்',
    fillForm: 'கீழே உள்ள படிவத்தை நிரப்பவும், நாங்கள் விரைவில் பதிலளிப்போம்',
    name: 'பெயர்',
    email: 'மின்னஞ்சல்',
    message: 'செய்தி',
    yourName: 'உங்கள் பெயர்',
    yourEmail: 'your.email@example.com',
    tellUs: 'உங்கள் மனதில் என்ன இருக்கிறது என்று எங்களிடம் சொல்லுங்கள்...',
    sending: 'அனுப்புகிறது...',
    contactInfo: 'தொடர்பு தகவல்',
    reachOut: 'எந்த நேரத்திலும் எங்களை தொடர்பு கொள்ளுங்கள் - நாங்கள் உதவ இங்கே இருக்கிறோம்!',
    address: 'முகவரி',
    phone: 'தொலைபேசி',
    businessHours: 'வணிக நேரங்கள்',
    open247: '24/7 திறந்திருக்கும்',
    alwaysHere: 'வாரத்தின் ஒவ்வொரு நாளும் நாங்கள் எப்போதும் உங்களுக்காக இங்கே இருக்கிறோம்',
    
    // Idea Suggestion Box
    ideaSuggestionBox: 'யோசனை பரிந்துரை பெட்டி',
    shareYourIdeas: 'உங்கள் யோசனைகளைப் பகிரவும்',
    weValueFeedback: 'உங்கள் கருத்துகள் மற்றும் யோசனைகளை நாங்கள் மதிக்கிறோம்! உங்கள் எண்ணங்களைப் பகிர்வதன் மூலம் எங்களை மேம்படுத்த உதவுங்கள்.',
    emailOptional: 'மின்னஞ்சல் (விருப்பமானது)',
    yourIdea: 'உங்கள் யோசனை / பரிந்துரை',
    shareThoughts: 'உங்கள் எண்ணங்கள், யோசனைகள் அல்லது பரிந்துரைகளைப் பகிரவும்...',
    submitIdea: 'யோசனையை சமர்ப்பிக்கவும்',
    submittingIdea: 'சமர்ப்பிக்கிறது...',
    ideaSubmitted: 'நன்றி! உங்கள் யோசனை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.',
    ideaFailed: 'யோசனையை சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    
    // Auth
    connecting: 'இணைக்கிறது...',
    loginDescription: 'இணைய அடையாளத்தால் இயக்கப்படும் பாதுகாப்பான அங்கீகாரம்',
    secureAuthentication: 'பாதுகாப்பான அங்கீகாரம்',
    secureAuthDescription: 'பிளாக்செயின் அடிப்படையிலான அடையாள சரிபார்ப்புடன் உங்கள் தனியுரிமை பாதுகாக்கப்படுகிறது',
    noPasswordNeeded: 'கடவுச்சொல் தேவையில்லை',
    noPasswordDescription: 'கடவுச்சொற்களை நினைவில் வைக்காமல் அல்லது தனிப்பட்ட தரவைப் பகிராமல் பாதுகாப்பாக உள்நுழையவும்',
    loginWithInternetIdentity: 'இணைய அடையாளத்துடன் உள்நுழையவும்',
    loginFooterNote: 'உள்நுழைவதன் மூலம், எங்கள் சேவை விதிமுறைகள் மற்றும் தனியுரிமை கொள்கையை ஒப்புக்கொள்கிறீர்கள்',
    
    // Loading & Errors
    loadingProducts: 'தயாரிப்பு விவரங்கள் ஏற்றப்படுகின்றன...',
    unableToLoad: 'தயாரிப்பை ஏற்ற முடியவில்லை',
    issueLoading: 'இந்த தயாரிப்பை ஏற்றுவதில் சிக்கல் இருந்தது',
    tryAgain: 'மீண்டும் முயற்சிக்கவும்',
    retrying: 'மீண்டும் முயற்சிக்கிறது...',
    productNotFound: 'தயாரிப்பு கிடைக்கவில்லை',
    noLongerAvailable: 'இந்த தயாரிப்பு இனி கிடைக்காமல் போகலாம்',
    
    // Badges
    vegan: 'சைவம்',
    glutenFree: 'குளூட்டன் இல்லாத',
    containsAllergens: 'ஒவ்வாமைகளைக் கொண்டுள்ளது',
    
    // Messages
    addedToCart: 'கார்ட்டில் சேர்க்கப்பட்டது',
    itemRemoved: 'கார்ட்டிலிருந்து பொருள் அகற்றப்பட்டது',
    cartCleared: 'கார்ட் அழிக்கப்பட்டது',
    messageSent: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! நாங்கள் விரைவில் உங்களைத் தொடர்புகொள்வோம்.',
    messageFailed: 'செய்தியை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    fillAllFields: 'அனைத்து புலங்களையும் நிரப்பவும்',
    
    // Footer
    quickLinks: 'விரைவு இணைப்புகள்',
    followUs: 'எங்களைப் பின்தொடரவும்',
    builtWith: 'அன்புடன் கட்டப்பட்டது',
    
    // Language
    language: 'மொழி',
  },
  ml: {
    // Navigation
    home: 'ഹോം',
    products: 'ഉൽപ്പന്നങ്ങൾ',
    contact: 'ബന്ധപ്പെടുക',
    login: 'ലോഗിൻ / സൈൻ അപ്പ്',
    logout: 'ലോഗൗട്ട്',
    account: 'അക്കൗണ്ട്',
    
    // Hero Section
    heroTitle: 'TAPI OK',
    heroTagline: 'ഒരു UNIER ഉൽപ്പന്നം',
    heroSubtitle: 'ക്രിസ്പി, ക്രഞ്ചി, അപ്രതിരോധ്യം',
    heroDescription: 'പ്രീമിയം മരച്ചീനിയിൽ നിന്ന് നിർമ്മിച്ച മികച്ച സ്നാക്ക് കണ്ടെത്തുക. സ്നേഹത്തോടെ കൈകൊണ്ട് നിർമ്മിച്ചത്, ഓരോ കടിയിലും ആധികാരിക രുചികൾ നൽകുന്നു.',
    shopNow: 'ഇപ്പോൾ വാങ്ങുക',
    contactUs: 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    premiumTapiocaChips: 'പ്രീമിയം മരച്ചീനി ചിപ്സ്',
    crunchyDelicious: 'ക്രഞ്ചിയും രുചികരവും',
    tapiocaChips: 'മരച്ചീനി ചിപ്സ്',
    experiencePerfectBlend: 'ഓരോ കടിയിലും രുചിയുടെയും ക്രഞ്ചിന്റെയും മികച്ച മിശ്രിതം അനുഭവിക്കുക',
    learnMore: 'കൂടുതൽ അറിയുക',
    
    // Product Section
    exploreFlavors: 'ഞങ്ങളുടെ രുചികൾ പര്യവേക്ഷണം ചെയ്യുക',
    discoverFavorite: 'നിങ്ങളുടെ പ്രിയപ്പെട്ടത് കണ്ടെത്തുക',
    threeUniqueFlavors: 'മൂന്ന് അദ്വിതീയ രുചികൾ, ഓരോന്നും പൂർണതയോടെ രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു',
    viewAllProducts: 'എല്ലാ ഉൽപ്പന്നങ്ങളും കാണുക',
    exploreProducts: 'ഞങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക',
    addToCart: 'കാർട്ടിലേക്ക് ചേർക്കുക',
    
    // USP Section
    whatMakesUsSpecial: 'ഞങ്ങളെ പ്രത്യേകമാക്കുന്നത് എന്താണ്',
    tapiOkDifference: 'TAPI OK വ്യത്യാസം',
    craftExperience: 'ഞങ്ങൾ ചിപ്സ് മാത്രം ഉണ്ടാക്കുന്നില്ല—ഞങ്ങൾ ഒരു അനുഭവം സൃഷ്ടിക്കുന്നു',
    naturalTitle: '100% പ്രകൃതിദത്തം',
    naturalDesc: 'കൃത്രിമ അഡിറ്റീവുകൾ, പ്രിസർവേറ്റീവുകൾ അല്ലെങ്കിൽ നിറങ്ങൾ ഇല്ലാതെ ശുദ്ധമായ മരച്ചീനിയിൽ നിന്ന് നിർമ്മിച്ചത്. വെറും ആരോഗ്യകരമായ നന്മ.',
    handcraftedTitle: 'കൈകൊണ്ട് നിർമ്മിച്ചത്',
    handcraftedDesc: 'ഓരോ ബാച്ചും വൈദഗ്ധ്യമുള്ള കരകൗശല വിദഗ്ധർ ശ്രദ്ധാപൂർവ്വം തയ്യാറാക്കുന്നു, അവർ ഓരോ ക്രിസ്പി ചിപ്പിലും അവരുടെ അഭിനിവേശം ഒഴിക്കുന്നു.',
    qualityTitle: 'ഗുണനിലവാരം ഉറപ്പ്',
    qualityDesc: 'കർശനമായ ഗുണനിലവാര പരിശോധനകൾ ഓരോ പാക്കും രുചി, ഘടന, പുതുമ എന്നിവയ്ക്കുള്ള ഞങ്ങളുടെ ഉയർന്ന നിലവാരം പാലിക്കുന്നുവെന്ന് ഉറപ്പാക്കുന്നു.',
    
    // Features
    whyChoose: 'എന്തുകൊണ്ട് TAPI OK തിരഞ്ഞെടുക്കണം?',
    committedBest: 'മികച്ച മരച്ചീനി ചിപ്സ് അനുഭവം നൽകാൻ ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്',
    premiumQuality: 'പ്രീമിയം ഗുണനിലവാരം',
    premiumQualityDesc: 'മികച്ച മരച്ചീനിയിൽ നിന്ന് നിർമ്മിച്ചത്, അസാധാരണമായ രുചിയും ഘടനയും ഉറപ്പാക്കുന്നു',
    madeWithLove: 'സ്നേഹത്തോടെ നിർമ്മിച്ചത്',
    madeWithLoveDesc: 'ഓരോ ബാച്ചും വിശദാംശങ്ങളിൽ ശ്രദ്ധ ചെലുത്തി ശ്രദ്ധാപൂർവ്വം തയ്യാറാക്കുന്നു',
    varietyFlavors: 'വൈവിധ്യമാർന്ന രുചികൾ',
    varietyFlavorsDesc: 'ക്ലാസിക് മുതൽ ബോൾഡ് വരെ, ഓരോ രുചിക്കും ഞങ്ങളുടെ പക്കൽ ഒരു ഫ്ലേവർ ഉണ്ട്',
    fastDelivery: 'വേഗത്തിലുള്ള ഡെലിവറി',
    fastDeliveryDesc: 'നിങ്ങളുടെ വീട്ടുവാതിൽക്കൽ വേഗത്തിലും സുരക്ഷിതമായും ഷിപ്പിംഗ്',
    madeFromFinest: 'ആധികാരിക രുചികളോടെ മികച്ച മരച്ചീനിയിൽ നിന്ന് നിർമ്മിച്ചത്',
    naturalIngredients: 'പ്രകൃതിദത്ത ചേരുവകൾ',
    noArtificial: 'കൃത്രിമ പ്രിസർവേറ്റീവുകളോ അഡിറ്റീവുകളോ ഇല്ല',
    freshChips: 'പുതിയ ചിപ്സ് നിങ്ങളുടെ വീട്ടുവാതിൽക്കൽ നേരിട്ട് എത്തിക്കുന്നു',
    
    // CTA
    readyExperience: 'ക്രഞ്ച് അനുഭവിക്കാൻ തയ്യാറാണോ?',
    browseCollection: 'ഞങ്ങളുടെ ശേഖരം ബ്രൗസ് ചെയ്യുക, ഇന്ന് നിങ്ങളുടെ പ്രിയപ്പെട്ട രുചി കണ്ടെത്തുക',
    
    // Product Details
    aboutProduct: 'ഈ ഉൽപ്പന്നത്തെക്കുറിച്ച്',
    ingredients: 'ചേരുവകൾ',
    quantity: 'അളവ്',
    sku: 'SKU',
    availability: 'ലഭ്യത',
    inStock: 'സ്റ്റോക്കിൽ ഉണ്ട്',
    outOfStock: 'സ്റ്റോക്കിൽ ഇല്ല',
    backToProducts: 'ഉൽപ്പന്നങ്ങളിലേക്ക് മടങ്ങുക',
    
    // Cart
    shoppingCart: 'ഷോപ്പിംഗ് കാർട്ട്',
    cartEmpty: 'നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്',
    itemsInCart: 'കാർട്ടിലെ ഇനങ്ങൾ',
    totalItems: 'മൊത്തം ഇനങ്ങൾ',
    clearCart: 'കാർട്ട് മായ്ക്കുക',
    continueShopping: 'ഷോപ്പിംഗ് തുടരുക',
    remove: 'നീക്കം ചെയ്യുക',
    browseProducts: 'ഉൽപ്പന്നങ്ങൾ ബ്രൗസ് ചെയ്യുക',
    addDelicious: 'ആരംഭിക്കാൻ കുറച്ച് രുചികരമായ മരച്ചീനി ചിപ്സ് ചേർക്കുക!',
    addSomeProducts: 'ആരംഭിക്കാൻ കുറച്ച് ഉൽപ്പന്നങ്ങൾ ചേർക്കുക',
    reviewItems: 'ചെക്ക്ഔട്ടിന് മുമ്പ് നിങ്ങളുടെ ഇനങ്ങൾ അവലോകനം ചെയ്യുക',
    orderSummary: 'ഓർഡർ സംഗ്രഹം',
    subtotal: 'ഉപമൊത്തം',
    shipping: 'ഷിപ്പിംഗ്',
    calculated: 'ചെക്ക്ഔട്ടിൽ കണക്കാക്കിയത്',
    total: 'മൊത്തം',
    proceedToCheckout: 'ചെക്ക്ഔട്ടിലേക്ക് പോകുക',
    
    // Contact
    getInTouch: 'ബന്ധപ്പെടുക',
    questionsOrFeedback: 'ചോദ്യങ്ങളോ ഫീഡ്ബാക്കോ ഉണ്ടോ? നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു!',
    sendMessage: 'ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക',
    fillForm: 'താഴെയുള്ള ഫോം പൂരിപ്പിക്കുക, ഞങ്ങൾ എത്രയും വേഗം പ്രതികരിക്കും',
    name: 'പേര്',
    email: 'ഇമെയിൽ',
    message: 'സന്ദേശം',
    yourName: 'നിങ്ങളുടെ പേര്',
    yourEmail: 'your.email@example.com',
    tellUs: 'നിങ്ങളുടെ മനസ്സിൽ എന്താണെന്ന് ഞങ്ങളോട് പറയുക...',
    sending: 'അയയ്ക്കുന്നു...',
    contactInfo: 'ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ',
    reachOut: 'എപ്പോൾ വേണമെങ്കിലും ഞങ്ങളെ ബന്ധപ്പെടുക - സഹായിക്കാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്!',
    address: 'വിലാസം',
    phone: 'ഫോൺ',
    businessHours: 'ബിസിനസ് സമയം',
    open247: '24/7 തുറന്നിരിക്കുന്നു',
    alwaysHere: 'ആഴ്ചയിലെ എല്ലാ ദിവസവും ഞങ്ങൾ എപ്പോഴും നിങ്ങൾക്കായി ഇവിടെയുണ്ട്',
    
    // Idea Suggestion Box
    ideaSuggestionBox: 'ആശയ നിർദ്ദേശ ബോക്സ്',
    shareYourIdeas: 'നിങ്ങളുടെ ആശയങ്ങൾ പങ്കിടുക',
    weValueFeedback: 'നിങ്ങളുടെ ഫീഡ്ബാക്കും ആശയങ്ങളും ഞങ്ങൾ വിലമതിക്കുന്നു! നിങ്ങളുടെ ചിന്തകൾ പങ്കിട്ട് ഞങ്ങളെ മെച്ചപ്പെടുത്താൻ സഹായിക്കുക.',
    emailOptional: 'ഇമെയിൽ (ഓപ്ഷണൽ)',
    yourIdea: 'നിങ്ങളുടെ ആശയം / നിർദ്ദേശം',
    shareThoughts: 'നിങ്ങളുടെ ചിന്തകൾ, ആശയങ്ങൾ അല്ലെങ്കിൽ നിർദ്ദേശങ്ങൾ പങ്കിടുക...',
    submitIdea: 'ആശയം സമർപ്പിക്കുക',
    submittingIdea: 'സമർപ്പിക്കുന്നു...',
    ideaSubmitted: 'നന്ദി! നിങ്ങളുടെ ആശയം വിജയകരമായി സമർപ്പിച്ചു.',
    ideaFailed: 'ആശയം സമർപ്പിക്കുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.',
    
    // Auth
    connecting: 'കണക്റ്റ് ചെയ്യുന്നു...',
    loginDescription: 'ഇന്റർനെറ്റ് ഐഡന്റിറ്റി നൽകുന്ന സുരക്ഷിത പ്രാമാണീകരണം',
    secureAuthentication: 'സുരക്ഷിത പ്രാമാണീകരണം',
    secureAuthDescription: 'ബ്ലോക്ക്ചെയിൻ അടിസ്ഥാനമാക്കിയുള്ള ഐഡന്റിറ്റി സ്ഥിരീകരണത്തോടെ നിങ്ങളുടെ സ്വകാര്യത സംരക്ഷിക്കപ്പെടുന്നു',
    noPasswordNeeded: 'പാസ്വേഡ് ആവശ്യമില്ല',
    noPasswordDescription: 'പാസ്വേഡുകൾ ഓർമ്മിക്കാതെയോ വ്യക്തിഗത ഡാറ്റ പങ്കിടാതെയോ സുരക്ഷിതമായി സൈൻ ഇൻ ചെയ്യുക',
    loginWithInternetIdentity: 'ഇന്റർനെറ്റ് ഐഡന്റിറ്റി ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക',
    loginFooterNote: 'ലോഗിൻ ചെയ്യുന്നതിലൂടെ, നിങ്ങൾ ഞങ്ങളുടെ സേവന നിബന്ധനകളും സ്വകാര്യതാ നയവും അംഗീകരിക്കുന്നു',
    
    // Loading & Errors
    loadingProducts: 'ഉൽപ്പന്ന വിശദാംശങ്ങൾ ലോഡ് ചെയ്യുന്നു...',
    unableToLoad: 'ഉൽപ്പന്നം ലോഡ് ചെയ്യാൻ കഴിയുന്നില്ല',
    issueLoading: 'ഈ ഉൽപ്പന്നം ലോഡ് ചെയ്യുന്നതിൽ ഒരു പ്രശ്നമുണ്ടായിരുന്നു',
    tryAgain: 'വീണ്ടും ശ്രമിക്കുക',
    retrying: 'വീണ്ടും ശ്രമിക്കുന്നു...',
    productNotFound: 'ഉൽപ്പന്നം കണ്ടെത്തിയില്ല',
    noLongerAvailable: 'ഈ ഉൽപ്പന്നം ഇനി ലഭ്യമല്ലായിരിക്കാം',
    
    // Badges
    vegan: 'സസ്യാഹാരം',
    glutenFree: 'ഗ്ലൂറ്റൻ രഹിതം',
    containsAllergens: 'അലർജികൾ അടങ്ങിയിരിക്കുന്നു',
    
    // Messages
    addedToCart: 'കാർട്ടിലേക്ക് ചേർത്തു',
    itemRemoved: 'കാർട്ടിൽ നിന്ന് ഇനം നീക്കം ചെയ്തു',
    cartCleared: 'കാർട്ട് മായ്ച്ചു',
    messageSent: 'സന്ദേശം വിജയകരമായി അയച്ചു! ഞങ്ങൾ ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.',
    messageFailed: 'സന്ദേശം അയയ്ക്കുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.',
    fillAllFields: 'എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക',
    
    // Footer
    quickLinks: 'ദ്രുത ലിങ്കുകൾ',
    followUs: 'ഞങ്ങളെ പിന്തുടരുക',
    builtWith: 'സ്നേഹത്തോടെ നിർമ്മിച്ചത്',
    
    // Language
    language: 'ഭാഷ',
  },
};
