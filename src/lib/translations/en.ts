// English translations
const en = {
  // Navbar
  nav: {
    home: "Home",
    about: "About",
    products: "Products",
    dashboard: "Cooperative Dashboard",
    login: "Cooperative Login",
    appearance: "Appearance",
  },

  // Hero
  hero: {
    badge: "Rwanda's #1 Agricultural Marketplace",
    headline1: "Connecting Farmers",
    headline2: "Directly to Markets",
    description:
      "Rwanda's most trusted agricultural cooperative platform. Buy fresh produce directly from verified farmer cooperatives across the country.",
    exploreProducts: "Explore Products",
    joinCooperative: "Join a Cooperative",
  },

  // Why Choose Us
  whyChoose: {
    heading: "Why Choose AgriConnect?",
    subheading: "Built for Rwandan farmers and buyers.",
    features: [
      {
        title: "Verified Cooperatives",
        description:
          "Every cooperative is government registered and quality-audited before listing.",
      },
      {
        title: "Fair Pricing",
        description:
          "No middlemen. Farmers set fair prices and buyers get transparent deals.",
      },
      {
        title: "Kinyarwanda Support",
        description:
          "Full platform support in both Kinyarwanda and English for all users.",
      },
      {
        title: "Nationwide Delivery",
        description:
          "Reliable logistics network across all 30 districts of Rwanda.",
      },
    ],
  },

  // Featured Products
  featuredProducts: {
    heading: "Fresh from the Farms",
    subheading: "Handpicked quality produce from our trusted cooperatives.",
    viewAll: "View All Products",
  },

  // CTA
  cta: {
    heading: "Ready to bring your cooperative online?",
    description:
      "Join thousands of Rwandan farmers already selling on AgriConnect. Registration is free.",
    register: "Register Your Cooperative",
    learnMore: "Learn More",
  },

  // About page
  about: {
    badge: "About Us",
    heading: "Who We Are",
    description:
      "AgriConnect Rwanda is a digital agricultural society / marketplace platform designed to connect farmers with buyers. We help bridge the gap between cooperatives and markets.",
    empoweringTitle: "Empowering Cooperatives",
    empoweringDesc:
      "We support farmer groups to formalise and access new market opportunities.",
    buildingTitle: "Building Team",
    buildingDesc:
      "Helping farmers and buyers build lasting partnerships and trust in the ecosystem.",

    missionBadge: "Our Purpose",
    missionHeading: "Mission & Vision",
    mission: "Our Mission",
    missionText:
      "To empower Rwandan farmer cooperatives by connecting them with markets, technology, transparency, and sustainable value chains.",
    vision: "Our Vision",
    visionText:
      "A thriving digital agricultural ecosystem where every Rwandan farmer and every buyer can trade fairly, simply, and with confidence.",

    processBadge: "Process",
    processHeading: "How We Connect Agriculture",

    valueBadge: "Our Value",
    valueHeading: "Why Choose AgriConnect?",

    impactBadge: "Our Impact",
    impactHeading: "Growing Together Across Rwanda",

    communityBadge: "Community",
    communityHeading: "Meet The Community",

    ctaBadge: "Get Started",
    ctaHeading: "Join the Future of Agriculture",
    ctaDesc:
      "Whether you are a cooperative looking for new markets or a buyer who wants trusted suppliers, AgriConnect helps you build meaningful agricultural connections.",
    ctaJoin: "Join AgriConnect",
    ctaExplore: "Explore Products",
  },

  // Products Page
  productsPage: {
    title: "All Products",
    subtitle: "Certified produce from cooperatives across Rwanda's 30 districts.",
    searchPlaceholder: "Search products...",
    allCategories: "All Categories",
  },

  // Product Detail
  productDetail: {
    backToProducts: "Back to Products",
    availableQuantity: "Available Quantity",
    unitPrice: "Unit Price",
    district: "District",
    postedOn: "Posted On",
    contactCooperative: "Contact Cooperative",
  },

  // Product Grid
  productGrid: {
    viewDetails: "View Details",
    noProducts: "No products found matching your criteria.",
  },

  // Login Page
  login: {
    title: "AgriConnect",
    subtitle: "Rwanda",
    description: "Rwanda's most trusted platform connecting farmer cooperatives to markets.",
    whyJoin: "Why join AgriConnect?",
    benefits: [
      "Reach thousands of buyers nationwide",
      "Real-time order and inventory management",
      "Secure mobile money payments (MTN, Airtel)",
      "Government-backed quality certification",
      "Full Kinyarwanda & English support"
    ],
    formTitle: "Cooperative Login",
    formSubtitle: "Access your cooperative dashboard",
    coopName: "Cooperative Name",
    coopNamePlaceholder: "e.g. Musanze Farmers Cooperative",
    email: "Email Address",
    emailPlaceholder: "admin@coop.rw",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    register: "Register your cooperative",
  },

  // Dashboard Page
  dashboard: {
    portal: "AgriConnect Cooperative Portal",
    title: "Dashboard",
    home: "Home",
    welcomeBack: "WELCOME BACK",
    urgentRequests: "urgent",
    requestsPending: "requests pending review today",
    monthlyRevenue: "Monthly Revenue",
    august: "August 2025",
    // Stats Card labels
    totalProducts: "Total Products",
    inventoryAvailable: "Inventory Available",
    newRequests: "New Requests",
    monthlyRevenueStat: "Monthly Revenue",
    pendingDeliveries: "Pending Deliveries",
    // Stats trends
    trendUp: "+3 this week",
    trendDown: "-1 scheduled",
    // RevenueChart
    revenueChartTitle: "Monthly Revenue (RWF)",
    revenueChartPeriod: "Aug 2024 — Jan 2025",
    // BuyerMatchCard
    smartBuyerMatching: "Smart Buyer Matching",
    viewAllMatches: "View all matches →"
  },
};

export type Translations = typeof en;
export default en;
