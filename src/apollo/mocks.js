// Local mock data so the template renders WITHOUT the (dead/paid) BudDash backend.
// Replace this whole file once you wire up a real GraphQL backend.
// Themed as cannabis dispensaries to fit the BudDash idea.

const IMG = {
  greenRoom: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=600&q=70",
  highTide: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=70",
  sunset: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=70",
  cloudNine: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&q=70",
};

// A placeholder Google Maps key keeps the app's map-loader gate from hanging.
// It is intentionally not a real key — add your own to enable live maps.
export const MOCK_CONFIGURATION = {
  __typename: "Configuration",
  _id: "mock-config",
  currency: "USD",
  currencySymbol: "$",
  deliveryRate: 5,
  twilioEnabled: false,
  webClientID: "",
  googleApiKey: "AIzaSyDUMMY-REPLACE-WITH-YOUR-OWN-KEY",
  webAmplitudeApiKey: "",
  googleMapLibraries: "places,drawing,geometry",
  googleColor: "#3c8f7c",
  webSentryUrl: "",
  publishableKey: "",
  clientId: "",
  skipEmailVerification: true,
  skipMobileVerification: true,
  costType: "fixed",
  vapidKey: "",
};

function makeRestaurant(over) {
  return {
    __typename: "Restaurant",
    _id: over._id,
    name: over.name,
    image: over.image,
    slug: over.slug,
    address: over.address,
    location: { __typename: "Point", coordinates: over.coordinates },
    deliveryTime: over.deliveryTime,
    minimumOrder: over.minimumOrder,
    tax: 8,
    reviewData: {
      __typename: "ReviewData",
      total: over.reviews,
      ratings: over.rating,
      reviews: [],
    },
    categories: [
      {
        __typename: "Category",
        _id: `${over._id}-c1`,
        title: "Flower",
        foods: [
          { __typename: "Food", _id: `${over._id}-f1`, title: "Blue Dream" },
          { __typename: "Food", _id: `${over._id}-f2`, title: "OG Kush" },
        ],
      },
      {
        __typename: "Category",
        _id: `${over._id}-c2`,
        title: "Edibles",
        foods: [
          { __typename: "Food", _id: `${over._id}-f3`, title: "Gummies" },
        ],
      },
    ],
    rating: over.rating,
    isAvailable: true,
    openingTimes: [
      {
        __typename: "OpeningTimes",
        day: "MON",
        times: [{ __typename: "Times", startTime: ["09", "00"], endTime: ["22", "00"] }],
      },
    ],
  };
}

export const MOCK_RESTAURANTS = [
  makeRestaurant({ _id: "r1", name: "The Green Room", image: IMG.greenRoom, slug: "the-green-room", address: "123 Main St", coordinates: [-104.9903, 39.7392], deliveryTime: 30, minimumOrder: 20, reviews: 1240, rating: 4.9 }),
  makeRestaurant({ _id: "r2", name: "High Tide Collective", image: IMG.highTide, slug: "high-tide-collective", address: "88 Ocean Ave", coordinates: [-104.985, 39.742], deliveryTime: 40, minimumOrder: 25, reviews: 860, rating: 4.7 }),
  makeRestaurant({ _id: "r3", name: "Sunset Botanicals", image: IMG.sunset, slug: "sunset-botanicals", address: "401 Sun Blvd", coordinates: [-104.995, 39.735], deliveryTime: 25, minimumOrder: 15, reviews: 612, rating: 4.8 }),
  makeRestaurant({ _id: "r4", name: "Cloud Nine Cannabis", image: IMG.cloudNine, slug: "cloud-nine-cannabis", address: "9 Skyline Dr", coordinates: [-104.98, 39.75], deliveryTime: 35, minimumOrder: 20, reviews: 2010, rating: 4.6 }),
];

export const MOCK_NEARBY = {
  __typename: "NearByData",
  offers: [],
  sections: [],
  restaurants: MOCK_RESTAURANTS,
};

// Richer list used by the DoorDash-style dashboard (Dashboard.js).
const DASH_IMG = [
  "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=600&q=70",
  "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=70",
  "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=70",
  "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&q=70",
  "https://images.unsplash.com/photo-1498671546682-94a232c26d17?w=600&q=70",
  "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=600&q=70",
  "https://images.unsplash.com/photo-1611843467160-25afb8df1074?w=600&q=70",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=70",
];

export function dispensaryBySlug(slug) {
  return DASHBOARD_DISPENSARIES.find((d) => d.slug === slug);
}

// Per-dispensary product menus for the functional ordering flow.
const MENU_TEMPLATE = [
  { id: "p1", name: "Blue Dream", category: "Flower", strain: "Hybrid", thc: "22%", price: 45, unit: "⅛ oz", emoji: "🌿", desc: "Balanced hybrid with sweet berry notes. Uplifting, great for daytime." },
  { id: "p2", name: "OG Kush", category: "Flower", strain: "Indica", thc: "24%", price: 50, unit: "⅛ oz", emoji: "🌿", desc: "Classic earthy, piney indica. Deeply relaxing — best for evenings." },
  { id: "p3", name: "Sour Diesel", category: "Flower", strain: "Sativa", thc: "21%", price: 48, unit: "⅛ oz", emoji: "🌿", desc: "Energizing, citrus-forward sativa. Bright and fast-hitting." },
  { id: "p4", name: "Watermelon Gummies", category: "Edibles", strain: "10mg ea", thc: "100mg", price: 22, unit: "10-pack", emoji: "🍬", desc: "Vegan gummies, precisely dosed at 10mg THC each." },
  { id: "p5", name: "Dark Chocolate Bar", category: "Edibles", strain: "10mg/sq", thc: "100mg", price: 24, unit: "bar", emoji: "🍫", desc: "Belgian dark chocolate scored into ten 10mg squares." },
  { id: "p6", name: "Sour Diesel Cart", category: "Vapes", strain: "Sativa", thc: "85%", price: 38, unit: "1g", emoji: "💨", desc: "High-potency distillate cartridge. Citrus-forward sativa." },
  { id: "p7", name: "Live Resin Badder", category: "Concentrates", strain: "Hybrid", thc: "78%", price: 55, unit: "1g", emoji: "🍯", desc: "Full-spectrum live resin with a rich terpene profile." },
  { id: "p8", name: "Infused Pre-Roll 5pk", category: "Pre-Rolls", strain: "Hybrid", thc: "32%", price: 28, unit: "5-pack", emoji: "🚬", desc: "Kief-coated pre-rolls. Five half-grams, ready to spark." },
  { id: "p9", name: "Mango THC Seltzer", category: "Drinks", strain: "5mg", thc: "5mg", price: 8, unit: "can", emoji: "🥤", desc: "Sparkling mango seltzer, micro-dosed at 5mg. Fast-acting." },
];

export function productsForDispensary(slug) {
  // Slight per-store price variation so menus feel distinct.
  const seed = (slug || "").length % 3;
  return MENU_TEMPLATE.map((p) => ({
    ...p,
    id: `${slug}-${p.id}`,
    price: p.price + seed,
  }));
}

export const DASHBOARD_DISPENSARIES = [
  { id: "r1", slug: "the-green-room", name: "The Green Room", image: DASH_IMG[0], rating: 4.9, reviews: "1.2k+", distance: 1.1, time: 30, fee: 0, promo: "Free delivery" },
  { id: "r2", slug: "high-tide-collective", name: "High Tide Collective", image: DASH_IMG[1], rating: 4.7, reviews: "860+", distance: 2.3, time: 40, fee: 1.99, promo: "20% off first order" },
  { id: "r3", slug: "sunset-botanicals", name: "Sunset Botanicals", image: DASH_IMG[2], rating: 4.8, reviews: "612", distance: 0.8, time: 25, fee: 0, promo: "Free delivery" },
  { id: "r4", slug: "cloud-nine-cannabis", name: "Cloud Nine Cannabis", image: DASH_IMG[3], rating: 4.6, reviews: "2k+", distance: 3.1, time: 45, fee: 2.49, promo: "Open till 2am" },
  { id: "r5", slug: "evergreen-dispensary", name: "Evergreen Dispensary", image: DASH_IMG[4], rating: 4.8, reviews: "940+", distance: 1.6, time: 32, fee: 1.49, promo: null },
  { id: "r6", slug: "kush-corner", name: "Kush Corner", image: DASH_IMG[5], rating: 4.5, reviews: "430", distance: 2.0, time: 38, fee: 0, promo: "Free delivery" },
  { id: "r7", slug: "highland-greens", name: "Highland Greens", image: DASH_IMG[6], rating: 4.9, reviews: "1.5k+", distance: 1.9, time: 35, fee: 1.99, promo: "$5 off $25+" },
  { id: "r8", slug: "terp-house", name: "Terp House", image: DASH_IMG[7], rating: 4.7, reviews: "780+", distance: 2.7, time: 42, fee: 1.49, promo: null },
];

// Returns canned data for known operations; null-fills unknown ones so the
// app never crashes on `data.<field>` being undefined.
// Demo credential that is allowed to log in (mock auth — replace with a real
// backend later). Anything else returns an "invalid credentials" error.
const DEMO_EMAIL = "ace@gmail.com";
const DEMO_PASSWORD = "abcd1234";

export default function resolveMock(operationName, topLevelFields, variables) {
  const vars = variables || {};
  switch (operationName) {
    case "Configuration":
      return { configuration: MOCK_CONFIGURATION };
    case "Restaurants":
      return { nearByRestaurants: MOCK_NEARBY };
    case "Tips":
      return { tips: { __typename: "Tips", _id: "mock-tips", tipVariations: [5, 10, 15], enabled: true } };
    case "Taxes":
      return { taxes: { __typename: "Taxes", _id: "mock-taxes", taxationCharges: 8, enabled: true } };
    case "EmailExist":
      // Report any email as "exists" so the flow routes to the password screen.
      return { emailExist: { __typename: "User", _id: "mock-user-1" } };
    case "Login": {
      const emailOk = (vars.email || "").trim().toLowerCase() === DEMO_EMAIL;
      const passOk = vars.password === DEMO_PASSWORD;
      // Social logins (type !== "default") have no password — allow them through.
      const isSocial = vars.type && vars.type !== "default";
      if (!isSocial && !(emailOk && passOk)) {
        return { __error: "Invalid credentials!" };
      }
      return {
        login: {
          __typename: "AuthData",
          userId: "mock-user-1",
          token: "mock-token-buddash",
          tokenExpiration: "3600",
          name: "Ace",
          email: vars.email || DEMO_EMAIL,
          phone: "",
          inNewUser: false,
        },
      };
    }
    default: {
      const data = {};
      (topLevelFields || []).forEach((f) => {
        data[f] = null;
      });
      return data;
    }
  }
}
