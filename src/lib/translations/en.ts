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
} as const;

export type Translations = typeof en;
export default en;
