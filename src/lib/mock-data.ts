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

// ─── Events ───────────────────────────────────────────────────────────────────

export const featuredItems: Item[] = [
  {
    id: "evt_001",
    type: "event",
    title: "SID-X Investor Summit 2026",
    description: "Annual flagship summit bringing together NRK investors, project founders, and advisors for live deal showcases, one-on-one sessions, and exclusive networking.",
    date: "Sun, 18 May · 10:00 AM",
    venue: "Le Meridien, Kochi",
    image: "/events_posters/scale_up.webp",
    isLocked: false,
    badges: ["exclusive", "networking"],
  },
  {
    id: "evt_002",
    type: "event",
    title: "Eala Stays Site Visit Weekend",
    description: "Members-only immersive weekend at Eala Stays, Wayanad — guided plantation tour, overnight farm-stay, and exclusive investor briefing in the heart of the estate.",
    date: "Sat, 26 Apr · 8:00 AM",
    venue: "Eala Stays Resort, Wayanad",
    image: "/events_posters/women_startup_summit.jpg",
    isLocked: false,
    badges: ["exclusive", "site visit", "closing soon"],
  },
  {
    id: "evt_003",
    type: "event",
    title: "NRK Investment Roadshow — Dubai",
    description: "International investor briefing for the Kerala diaspora in the UAE, featuring live project walkthroughs, Q&A with founders, and one-on-one advisory slots.",
    date: "Fri, 12 Jun · 10:00 AM",
    venue: "World Trade Centre, Dubai",
    image: "/events_posters/dubai_expo.webp",
    isLocked: false,
    badges: ["investment", "partner"],
  },
  {
    id: "evt_004",
    type: "event",
    title: "Azraya Concept Launch & Investor Preview",
    description: "Exclusive first look at Azraya — SID-X's postpartum care and healthcare-tourism venture. Founder Q&A, financial model walkthrough, and early-investor privileges.",
    date: "Sat, 03 May · 2:00 PM",
    venue: "Hotel Mascot, Thiruvananthapuram",
    image: "/events_posters/edu_cafe.jpg",
    isLocked: false,
    badges: ["investment", "healthcare"],
  },
];

// ─── Investment Projects ───────────────────────────────────────────────────────

export const hotProjects: Item[] = [
  {
    id: "eala_stays",
    type: "project",
    title: "Eala Stays",
    description: "Agri-tourism resort in the highlands of Wayanad — 11 acres of lush terrain, 9 acres of organic Ela coffee estate, and a 20,000 sqft premium resort with wellness facilities. Multiple income streams: hospitality, organic produce, and curated retreat packages.",
    image: "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140204.png",
    gallery: [
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140204.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140218.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140228.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140238.png",
    ],
    isLocked: false,
    badges: ["agri-tourism", "hot", "open for investor"],
    raised: 5.6,
    target: 8,
    irr: 18.5,
    minInvestment: 500000,
    location: "Kalpetta, Wayanad, Kerala",
    partnerLogos: [
      "/projects_gallery/luxury_hotel/partner logos/Screenshot 2026-04-02 222431.png",
      "/projects_gallery/luxury_hotel/partner logos/Screenshot 2026-04-02 222446.png",
    ],
  },
  {
    id: "elite_homes",
    type: "project",
    title: "Elite Homes Villa Project",
    description: "Semi-luxury gated villa community near Perinthalmanna, Malappuram — Phase 1 of 12 designer villas with landscaped gardens, modern amenities, and a secure gated perimeter. Targeted at NRK families and premium Kerala home buyers.",
    image: "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175754.png",
    gallery: [
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175754.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175807.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175819.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175832.png",
    ],
    isLocked: false,
    badges: ["residential", "premium"],
    raised: 9,
    target: 15,
    irr: 21,
    minInvestment: 1000000,
    location: "Perinthalmanna, Malappuram, Kerala",
    partnerLogos: [
      "/projects_gallery/olympus_apartment/partner logos/aecom logo.png",
      "/projects_gallery/olympus_apartment/partner logos/hilite builders logo.png",
    ],
  },
  {
    id: "azraya",
    type: "project",
    title: "Azraya Postpartum Care",
    description: "Healthcare-tourism venture establishing premium postpartum and new-mother wellness centres across Kerala metros and South Indian cities. Blends traditional Ayurvedic recovery protocols with clinical care — an underserved, rapidly growing segment.",
    image: "/projects_gallery/skin_care/Screenshot 2026-04-02 135743.png",
    gallery: [
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135743.png",
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135816.png",
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135829.png",
      "/projects_gallery/skin_care/Screenshot 2026-04-02 135846.png",
    ],
    isLocked: false,
    badges: ["healthcare", "hot", "open for investor"],
    raised: 8,
    target: 30,
    irr: 24,
    minInvestment: 2000000,
    location: "Kochi · Kozhikode · Thiruvananthapuram",
    partnerLogos: [
      "/projects_gallery/skin_care/partner logos/Screenshot 2026-04-02 222327.png",
      "/projects_gallery/skin_care/partner logos/olay logo.png",
    ],
  },
  {
    id: "babel_aspen_glow",
    type: "project",
    title: "Babel Aspen Glow",
    description: "Luxury multi-purpose convention and entertainment venue in Kannur City — 30,000 sqft facility designed for 2,000–4,000 attendees. Hosts exhibitions, business conferences, premium weddings, and regional summits. Kerala's flagship events infrastructure.",
    image: "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140218.png",
    gallery: [
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140218.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140204.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140228.png",
      "/projects_gallery/luxury_hotel/Screenshot 2026-04-02 140238.png",
    ],
    isLocked: false,
    badges: ["commercial", "premium"],
    raised: 14,
    target: 25,
    irr: 22,
    minInvestment: 1500000,
    location: "Kannur City, Kerala",
    partnerLogos: [
      "/projects_gallery/luxury_hotel/partner logos/Screenshot 2026-04-02 222530.png",
    ],
  },
  {
    id: "wynad_eco_township",
    type: "project",
    title: "Wynad Eco-Township",
    description: "SID-X's flagship sustainable mixed-use township in Wayanad — a self-contained smart community with residential zones, walkable commercial districts, schools, healthcare, green energy, and integrated security. Kerala's most ambitious eco-development.",
    image: "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175819.png",
    gallery: [
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175819.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175832.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175754.png",
      "/projects_gallery/olympus_apartment/Screenshot 2026-04-02 175807.png",
    ],
    isLocked: false,
    badges: ["eco", "flagship"],
    raised: 35,
    target: 120,
    irr: 26,
    minInvestment: 2500000,
    location: "Vythiri, Wayanad, Kerala",
    partnerLogos: [
      "/projects_gallery/olympus_apartment/partner logos/aecom logo.png",
    ],
  },
];

export const exploreProjects: Item[] = hotProjects;

// ─── Rewards & Member Perks ────────────────────────────────────────────────────

export const userRewards = {
  points: 12450,
  tier: "GOLD" as const,
  nextTier: "PLATINUM" as const,
  pointsToNextTier: 2550,
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
    id: "perk_priority_deals",
    partner: "SID-X Investment Club",
    category: "Investment",
    headline: "First-Look Deal Access",
    sub: "Priority window before public launch",
    accentColor: "#7a5010",
    logoText: "FLD",
  },
  {
    id: "perk_eala_stays",
    partner: "Eala Stays",
    category: "Lifestyle",
    headline: "20% Off Farm Stays",
    sub: "Resort stays + organic dining",
    accentColor: "#1a3d28",
    logoText: "ELA",
    isNew: true,
  },
  {
    id: "perk_babel",
    partner: "Babel Aspen Glow",
    category: "Lifestyle",
    headline: "Complimentary Event Passes",
    sub: "2 passes per quarter at Kannur venue",
    accentColor: "#1a2e4f",
    logoText: "BAG",
  },
  {
    id: "perk_travel",
    partner: "SID-X Travel",
    category: "Travel",
    headline: "NRK Holiday Packages",
    sub: "Curated Kerala & international tours",
    accentColor: "#2d1a3d",
    logoText: "TRV",
  },
  {
    id: "perk_legal",
    partner: "SID-X Legal",
    category: "Finance",
    headline: "Free Property Legal Review",
    sub: "Investment & property doc consultation",
    accentColor: "#1a2e3d",
    logoText: "LEG",
  },
  {
    id: "perk_norka",
    partner: "NORKA Connect",
    category: "Finance",
    headline: "NORKA Scheme Navigator",
    sub: "Government scheme eligibility & filing",
    accentColor: "#1c2a1a",
    logoText: "NRK",
    isNew: true,
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
  totalInvested: 10000000,
  currentValue: 12112500,
  returns: 2112500,
  returnPercent: 21.1,
  activeCount: 3,
  avgIRR: 21.2,
};

export const portfolioInvestments: PortfolioInvestment[] = [
  {
    projectId: "eala_stays",
    shortTitle: "Eala Stays",
    invested: 2500000,
    currentValue: 2962500,
    irr: 18.5,
    status: "Active",
    color: "#3B82F6",
  },
  {
    projectId: "elite_homes",
    shortTitle: "Elite Homes",
    invested: 5000000,
    currentValue: 6050000,
    irr: 21,
    status: "Active",
    color: "#10B981",
  },
  {
    projectId: "azraya",
    shortTitle: "Azraya",
    invested: 2500000,
    currentValue: 3100000,
    irr: 24,
    status: "Active",
    color: "#F59E0B",
  },
];
