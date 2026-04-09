export type BadgeType = "event" | "perk" | "project" | "hot" | "open" | "closing soon" | "exclusive";

export interface Item {
  id: string;
  type: "event" | "project";
  title: string;
  description?: string;
  image?: string;
  gallery?: string[];
  isLocked: boolean;
  badges: string[];
  // Event specific
  date?: string;
  venue?: string;
  // Project specific
  raised?: number;
  target?: number;
  irr?: number;
  minInvestment?: number;
  partnerLogos?: string[];
  location?: string;
}

export const featuredItems: Item[] = [
  {
    id: "evt_001",
    type: "event",
    title: "Scale Up Conclave 2026",
    description: "A premium networking and growth summit for founders, investors, and business leaders.",
    date: "Sun, 10 May · 9:00 AM",
    venue: "Le Meridien, Kochi",
    image: "/events_posters/scale_up.webp",
    isLocked: false,
    badges: ["event", "exclusive"],
  },
  {
    id: "evt_003",
    type: "event",
    title: "Dubai Expo Investor Meet",
    description: "International investor meet bringing together global real estate developers and entrepreneurs.",
    date: "Fri, 05 Jun · 10:00 AM",
    venue: "World Trade Centre, Dubai",
    image: "/events_posters/dubai_expo.webp",
    isLocked: false,
    badges: ["partner", "investment"],
  },
  {
    id: "evt_002",
    type: "event",
    title: "Madhyamam Edu Cafe",
    description: "Interactive educational meetup for students and professionals featuring higher education talks.",
    date: "Mon, 20 Apr · 2:00 PM",
    venue: "Madhyamam Hall, Kozhikode",
    image: "/events_posters/edu_cafe.jpg",
    isLocked: false,
    badges: ["partner", "education"],
  },
  {
    id: "evt_004",
    type: "event",
    title: "KSUM Women Startup Summit",
    description: "Summit empowering women entrepreneurs with mentorship and funding opportunities.",
    date: "Tue, 28 Apr · 9:30 AM",
    venue: "KSUM Campus, Thiruvananthapuram",
    image: "/events_posters/women_startup_summit.jpg",
    isLocked: false,
    badges: ["partner", "women"],
  }
];

export const hotProjects: Item[] = [
  {
    id: "p_luxury_hotel",
    type: "project",
    title: "Luxury Riverside Hotel",
    description: "Ultra-luxury waterfront hospitality development along the Periyar riverfront in Kochi, targeting premium business and leisure travellers with world-class amenities.",
    image: "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140204.png",
    gallery: [
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140204.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140218.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140228.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140238.png",
    ],
    isLocked: false,
    badges: ["open for investor", "hot", "real estate"],
    raised: 24,
    target: 30,
    irr: 18.5,
    minInvestment: 1000000,
    location: "Marine Drive, Kochi, Kerala",
    partnerLogos: [
      "/projects_gallery/luxury_hotel/partner logos/Screenshot 2026-04-02 222431.png",
      "/projects_gallery/luxury_hotel/partner logos/Screenshot 2026-04-02 222446.png",
      "/projects_gallery/luxury_hotel/partner logos/Screenshot 2026-04-02 222530.png",
    ],
  },
  {
    id: "p_olympus_apartment",
    type: "project",
    title: "Olympus Sky Residences",
    description: "Premium high-rise luxury apartment complex in Calicut's emerging smart city corridor, designed for NRIs and high-net-worth residents seeking elevated urban living.",
    image: "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175754.png",
    gallery: [
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175754.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175807.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175819.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175832.png",
    ],
    isLocked: false,
    badges: ["project", "premium"],
    raised: 65,
    target: 100,
    irr: 21.2,
    minInvestment: 500000,
    location: "Cyber Park Road, Kozhikode, Kerala",
    partnerLogos: [
      "/projects_gallery/olympus_apartment/partner logos/aecom logo.png",
      "/projects_gallery/olympus_apartment/partner logos/hilite builders logo.png",
    ],
  },
  {
    id: "p_skin_care",
    type: "project",
    title: "Aura Glow Skin Labs",
    description: "Scaling a direct-to-consumer ayurvedic-biotech skincare brand rooted in Kerala's herbal traditions, blending patented organic formulas with modern dermatology.",
    image: "/projects_gallery/skin_care/Screenshot 2026-04-02 135743.png",
    gallery: [
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135743.png",
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135816.png",
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135829.png",
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135846.png",
    ],
    isLocked: false,
    badges: ["hot", "consumer tech"],
    raised: 8,
    target: 15,
    irr: 28.5,
    minInvestment: 250000,
    location: "Technopark, Thiruvananthapuram, Kerala",
    partnerLogos: [
      "/projects_gallery/skin_care/partner logos/Screenshot 2026-04-02 222327.png",
      "/projects_gallery/skin_care/partner logos/olay logo.png",
    ],
  }
];

export const exploreProjects: Item[] = hotProjects;

// ─── Rewards & Perks ──────────────────────────────────────────────────────────

export const userRewards = {
  points: 8420,
  tier: "GOLD" as const,
  nextTier: "PLATINUM" as const,
  pointsToNextTier: 1580,
};

export interface HomePerk {
  id: string;
  partner: string;
  category: string;
  headline: string;
  sub: string;
  accentColor: string;
  logoText: string;
  isNew?: boolean;
}

export const homePerks: HomePerk[] = [
  {
    id: "perk_priority_pass",
    partner: "Priority Pass",
    category: "Travel",
    headline: "Unlimited Lounge Access",
    sub: "1,300+ airports worldwide",
    accentColor: "#1a4f8c",
    logoText: "PP",
  },
  {
    id: "perk_taj",
    partner: "Taj Epicure",
    category: "Dining",
    headline: "25% off + welcome amenities",
    sub: "100+ Taj properties",
    accentColor: "#7a5010",
    logoText: "TAJ",
  },
  {
    id: "perk_exigo",
    partner: "Exigo Cowork",
    category: "Lifestyle",
    headline: "50% off workspace",
    sub: "200+ locations, 40 cities",
    accentColor: "#1a3d28",
    logoText: "EXG",
  },
  {
    id: "perk_forex",
    partner: "Zero Forex",
    category: "Finance",
    headline: "0% markup globally",
    sub: "Exact interbank rate always",
    accentColor: "#2d1a52",
    logoText: "FX",
    isNew: true,
  },
  {
    id: "perk_concierge",
    partner: "Global Concierge",
    category: "Lifestyle",
    headline: "Personal RM, always on",
    sub: "24/7 dedicated relationship mgr",
    accentColor: "#1a2e3d",
    logoText: "RM",
  },
  {
    id: "perk_travel_rewards",
    partner: "Luxury Travel",
    category: "Travel",
    headline: "5× reward points",
    sub: "On all luxury bookings",
    accentColor: "#3d1a1a",
    logoText: "5×",
  },
];

// ─── Portfolio ────────────────────────────────────────────────────────────────

export interface PortfolioInvestment {
  projectId: string;
  shortTitle: string;
  invested: number;
  currentValue: number;
  irr: number;
  status: "Active" | "Exited" | "Pending";
  color: string;
}

export const userPortfolio = {
  totalInvested: 4000000,
  currentValue: 4810000,
  returns: 810000,
  returnPercent: 20.3,
  activeCount: 3,
  avgIRR: 22.7,
};

export const portfolioInvestments: PortfolioInvestment[] = [
  {
    projectId: "p_luxury_hotel",
    shortTitle: "Riverside Hotel",
    invested: 2500000,
    currentValue: 2962500,
    irr: 18.5,
    status: "Active",
    color: "#3B82F6",
  },
  {
    projectId: "p_olympus_apartment",
    shortTitle: "Olympus Sky",
    invested: 1000000,
    currentValue: 1212000,
    irr: 21.2,
    status: "Active",
    color: "#10B981",
  },
  {
    projectId: "p_skin_care",
    shortTitle: "Aura Glow",
    invested: 500000,
    currentValue: 642500,
    irr: 28.5,
    status: "Active",
    color: "#F59E0B",
  },
];

