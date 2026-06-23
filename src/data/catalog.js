// Mock catalog data for BudDash. No real backend — swap this out for an API later.

export const categories = [
  { id: 'all', label: 'All', icon: '🛒' },
  { id: 'flower', label: 'Flower', icon: '🌿' },
  { id: 'edibles', label: 'Edibles', icon: '🍬' },
  { id: 'vapes', label: 'Vapes', icon: '💨' },
  { id: 'prerolls', label: 'Pre-Rolls', icon: '🚬' },
  { id: 'concentrates', label: 'Concentrates', icon: '🍯' },
  { id: 'drinks', label: 'Drinks', icon: '🥤' },
]

export const dispensaries = [
  {
    id: 'green-room',
    name: 'The Green Room',
    tagline: 'Craft flower & small-batch edibles',
    rating: 4.9,
    reviews: 1240,
    etaMin: 25,
    etaMax: 40,
    deliveryFee: 0,
    image: 'linear-gradient(135deg,#2e7d32,#66bb6a)',
    promo: 'Free delivery',
  },
  {
    id: 'high-tide',
    name: 'High Tide Collective',
    tagline: 'Premium vapes & concentrates',
    rating: 4.7,
    reviews: 860,
    etaMin: 30,
    etaMax: 50,
    deliveryFee: 3.99,
    image: 'linear-gradient(135deg,#00695c,#26a69a)',
    promo: '20% off first order',
  },
  {
    id: 'sunset-botanicals',
    name: 'Sunset Botanicals',
    tagline: 'Organic, sun-grown selection',
    rating: 4.8,
    reviews: 612,
    etaMin: 20,
    etaMax: 35,
    deliveryFee: 1.99,
    image: 'linear-gradient(135deg,#ef6c00,#ffb300)',
    promo: null,
  },
  {
    id: 'cloud-nine',
    name: 'Cloud Nine Cannabis',
    tagline: 'Late-night delivery, every day',
    rating: 4.6,
    reviews: 2010,
    etaMin: 35,
    etaMax: 55,
    deliveryFee: 2.49,
    image: 'linear-gradient(135deg,#4527a0,#7e57c2)',
    promo: 'Open till 2am',
  },
]

export const products = [
  { id: 'p1', dispensary: 'green-room', name: 'Blue Dream', category: 'flower', strain: 'Hybrid', thc: '22%', price: 45, unit: '⅛ oz', emoji: '🌿', desc: 'Balanced hybrid with sweet berry notes. Smooth, uplifting, great for daytime.' },
  { id: 'p2', dispensary: 'green-room', name: 'OG Kush', category: 'flower', strain: 'Indica', thc: '24%', price: 50, unit: '⅛ oz', emoji: '🌿', desc: 'Classic earthy, piney indica. Deeply relaxing — best for evenings.' },
  { id: 'p3', dispensary: 'green-room', name: 'Watermelon Gummies', category: 'edibles', strain: '10mg ea', thc: '100mg', price: 22, unit: '10-pack', emoji: '🍬', desc: 'Vegan gummies, precisely dosed at 10mg THC each.' },
  { id: 'p4', dispensary: 'high-tide', name: 'Sour Diesel Cart', category: 'vapes', strain: 'Sativa', thc: '85%', price: 38, unit: '1g', emoji: '💨', desc: 'High-potency distillate cartridge. Energetic, citrus-forward sativa.' },
  { id: 'p5', dispensary: 'high-tide', name: 'Live Resin Badder', category: 'concentrates', strain: 'Hybrid', thc: '78%', price: 55, unit: '1g', emoji: '🍯', desc: 'Full-spectrum live resin with rich terpene profile.' },
  { id: 'p6', dispensary: 'high-tide', name: 'Pineapple Express Cart', category: 'vapes', strain: 'Hybrid', thc: '88%', price: 40, unit: '1g', emoji: '💨', desc: 'Tropical, fruity hybrid. Smooth pulls, all-day comfort.' },
  { id: 'p7', dispensary: 'sunset-botanicals', name: 'Sun-Grown Sativa', category: 'flower', strain: 'Sativa', thc: '19%', price: 35, unit: '⅛ oz', emoji: '🌿', desc: 'Organic, outdoor-grown sativa. Bright and clean.' },
  { id: 'p8', dispensary: 'sunset-botanicals', name: 'Mango THC Seltzer', category: 'drinks', strain: '5mg', thc: '5mg', price: 8, unit: 'can', emoji: '🥤', desc: 'Sparkling mango seltzer, micro-dosed at 5mg. Fast-acting.' },
  { id: 'p9', dispensary: 'sunset-botanicals', name: 'Infused Pre-Roll Pack', category: 'prerolls', strain: 'Hybrid', thc: '32%', price: 28, unit: '5-pack', emoji: '🚬', desc: 'Kief-coated pre-rolls. Five half-grams, ready to spark.' },
  { id: 'p10', dispensary: 'cloud-nine', name: 'Midnight Cookies', category: 'flower', strain: 'Indica', thc: '26%', price: 52, unit: '⅛ oz', emoji: '🌿', desc: 'Dessert-strain indica. Sweet, heavy, deeply calming.' },
  { id: 'p11', dispensary: 'cloud-nine', name: 'Chocolate Bar 100mg', category: 'edibles', strain: '10mg/sq', thc: '100mg', price: 24, unit: 'bar', emoji: '🍫', desc: 'Belgian dark chocolate, scored into ten 10mg squares.' },
  { id: 'p12', dispensary: 'cloud-nine', name: 'Single Pre-Roll', category: 'prerolls', strain: 'Sativa', thc: '21%', price: 12, unit: '1g', emoji: '🚬', desc: 'Top-shelf flower in a slow-burning single. Grab and go.' },
]

export function dispensaryById(id) {
  return dispensaries.find((d) => d.id === id)
}

export function productsByDispensary(id) {
  return products.filter((p) => p.dispensary === id)
}
