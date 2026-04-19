"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { FeedbackData } from "@/components/ActionFeedback";

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

const SERVICE_PHOTOS: Record<string, string> = {
  concierge: "/airport_services_photos/Personal%20Concierge%20Service.webp",
  pickup:    "/airport_services_photos/Priority%20Pickup%20or%20Drop.webp",
  lounge:    "/airport_services_photos/prioraty%20lounge%20accesss.webp",
  porter:    "/airport_services_photos/priority_porter_service.webp",
};

interface AirportService {
  id: string;
  title: string;
  tagline: string;
  accentColor: string;
  description: string;
  includes: string[];
  price: string;
  bookingNote: string;
}

interface Airport {
  code: string;
  name: string;
  fullName: string;
  region: "kerala" | "gcc" | "international";
  color: string;
  services: AirportService[];
}

/* ═══════════════════════════════════════════════════
   AIRPORT DATABASE
   ═══════════════════════════════════════════════════ */

const airports: Airport[] = [
  /* ── Kerala ── */
  {
    code: "COK", name: "Kochi", fullName: "Cochin International Airport (CIAL)", region: "kerala", color: "#60a5fa",
    services: [
      {
        id: "concierge", title: "Personal Airport Concierge", tagline: "Meet-and-assist, fast-track immigration, VIP escort", accentColor: "#60a5fa",
        description: "A dedicated Sid-X concierge meets you at the aircraft bridge or arrivals gate, handles immigration queuing, collects your baggage, and escorts you directly to your waiting vehicle — no waiting, no confusion.",
        includes: ["Meet-and-greet at gate or arrivals hall", "Fast-track immigration assistance", "Baggage collection & trolley escort", "Coordination with your pickup driver", "Wheelchair or mobility assist on request"],
        price: "From ₹2,500 per person",
        bookingNote: "Book at least 24 hours before arrival. Concierge contacts you 1 hour before landing.",
      },
      {
        id: "lounge", title: "CIAL Executive Lounge", tagline: "Complimentary meals, Wi-Fi, shower & rest area", accentColor: "#c9a84c",
        description: "Access the CIAL Executive Lounge on your departure day — a quiet, air-conditioned space with buffet meals, premium beverages, high-speed Wi-Fi, private shower cubicles, and international TV. Available for up to 3 hours pre-departure.",
        includes: ["Buffet breakfast / lunch / dinner (as applicable)", "Premium soft & hot beverages", "High-speed private Wi-Fi", "Private shower cubicle (30 min slot)", "Quiet work zone & recliner rest area"],
        price: "Complimentary for Sid-X Gold+ members · ₹1,800 per visit (others)",
        bookingNote: "Reserve your slot at least 2 hours before departure. Entry requires boarding pass.",
      },
      {
        id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "All Kerala districts — pre-scheduled for arrival", accentColor: "#4ade80",
        description: "A professional chauffeur in a clean, air-conditioned sedan or SUV waits at the arrivals exit with your name board. Pre-scheduled to your flight's arrival time with real-time flight tracking — if you're delayed, the driver waits.",
        includes: ["Name-board pickup at arrivals exit", "Real-time flight tracking — no extra charge for delays", "Air-conditioned sedan (Innova / Crysta / Camry)", "All Kerala districts covered", "Child seat on request (advance notice needed)"],
        price: "From ₹1,200 (city) · ₹3,500+ (outstation)",
        bookingNote: "Book at least 6 hours before landing. Outstation bookings need 24-hour advance notice.",
      },
      {
        id: "porter", title: "Priority Porter Service", tagline: "Dedicated baggage handling curb-to-check-in", accentColor: "#a78bfa",
        description: "A uniformed Sid-X porter meets you at the drop-off zone, takes complete charge of your luggage, and wheels it directly to the check-in counter — sparing you the strain of heavy bags through a busy terminal.",
        includes: ["Curb-to-check-in baggage handling", "Up to 4 pieces of luggage per booking", "Priority queue assistance at check-in", "Wrap/protect fragile items on request", "Available for arrivals & departures"],
        price: "₹800 per booking (up to 4 bags)",
        bookingNote: "Porter will be at departure drop-off zone. Share flight details when booking.",
      },
    ],
  },
  {
    code: "CCJ", name: "Calicut", fullName: "Calicut International Airport (Karipur)", region: "kerala", color: "#4ade80",
    services: [
      {
        id: "concierge", title: "Personal Airport Concierge", tagline: "Meet-and-greet, wheelchair assist, fast-track", accentColor: "#4ade80",
        description: "Your Sid-X concierge is at the arrivals hall the moment you land — handling immigration, baggage, and escorting you to your vehicle. Particularly popular with elderly NRKs returning from the Gulf.",
        includes: ["Meet-and-greet at arrivals hall", "Immigration & customs assistance", "Baggage trolley & escort to exit", "Wheelchair or mobility assist included", "Gulf flight specialist — Arabic-speaking staff available"],
        price: "From ₹2,000 per person",
        bookingNote: "Book 24 hours in advance. Concierge will call you before departure.",
      },
      {
        id: "lounge", title: "CCJ Café Lounge", tagline: "Snacks, beverages & quiet rest zone before boarding", accentColor: "#c9a84c",
        description: "A cosy pre-departure lounge at Karipur with curated Kerala snacks, hot beverages, and a calm atmosphere away from the main terminal crowd. Perfect for the 1–2 hours before your Gulf flight.",
        includes: ["Kerala snacks & light meals", "Chai, coffee & soft beverages", "Quiet seating away from main hall", "Phone charging stations", "Complimentary newspaper & magazines"],
        price: "₹600 per person (Sid-X members) · ₹950 (walk-in)",
        bookingNote: "Lounge access is on a first-come basis. Reserve to guarantee a seat.",
      },
      {
        id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "Malappuram, Kannur, Wayanad & all north Kerala", accentColor: "#60a5fa",
        description: "Chauffeur-driven transfers covering all of north Kerala — Malappuram, Kozhikode, Kannur, Wayanad, and Kasaragod. Real-time flight tracking ensures your driver is always on time.",
        includes: ["Name-board pickup at arrivals exit", "Flight-delay tracking included", "AC sedan or 7-seater SUV", "Malappuram, Kannur, Wayanad, Kasaragod coverage", "Night-time surcharge-free for Sid-X members"],
        price: "From ₹1,000 (Kozhikode city) · ₹3,000+ (Wayanad/Kannur)",
        bookingNote: "Minimum 6-hour advance booking. Night pickups require 12-hour notice.",
      },
      {
        id: "cargo", title: "Excess Baggage Cargo", tagline: "Door-delivery for unaccompanied luggage & gifts", accentColor: "#f472b6",
        description: "Bringing back appliances, gifts, or extra bags from the Gulf? We handle the paperwork, customs clearance, and last-mile delivery directly to your home anywhere in Kerala — you travel light, the cargo follows.",
        includes: ["Customs clearance & documentation", "Air-cargo or sea-cargo options", "Last-mile delivery anywhere in Kerala", "Fragile item packing service", "Real-time shipment tracking link"],
        price: "From ₹180/kg (air) · ₹60/kg (sea, 15-day transit)",
        bookingNote: "Raise a cargo request 48 hours before your flight. Weight limit: 500 kg per shipment.",
      },
    ],
  },
  {
    code: "TRV", name: "Trivandrum", fullName: "Trivandrum International Airport", region: "kerala", color: "#c9a84c",
    services: [
      {
        id: "concierge", title: "Personal Airport Concierge", tagline: "VIP meet-and-assist for Gulf & UK arrivals", accentColor: "#c9a84c",
        description: "Dedicated concierge service for Gulf and UK returnees — fast-tracking immigration, handling baggage, and providing a smooth exit from one of Kerala's busiest international airports.",
        includes: ["Meet-and-greet at arrival gate", "Priority immigration lane escort", "Baggage collection & trolley service", "Coordination with outstation transfer", "Special handling for elderly & medical passengers"],
        price: "From ₹2,500 per person",
        bookingNote: "Book 24 hours in advance with flight PNR.",
      },
      {
        id: "lounge", title: "TRV Premier Lounge", tagline: "Premium lounge with Kerala cuisine & shower", accentColor: "#60a5fa",
        description: "The TRV Premier Lounge offers pre-departure comfort with authentic Kerala cuisine, hot showers, recliner seating, and private work pods — a welcome retreat before long-haul Gulf or UK flights.",
        includes: ["Kerala sadya-style hot meals", "Premium shower cubicles (45 min slot)", "Recliner seating & private pods", "High-speed Wi-Fi & laptop charging", "Complimentary local SIM top-up (members)"],
        price: "Complimentary for Sid-X Gold+ · ₹2,200 per visit (others)",
        bookingNote: "Lounge is at International Departures, Level 2. Reserve 2 hours before departure.",
      },
      {
        id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "Kollam, Pathanamthitta, Kottayam & south Kerala", accentColor: "#4ade80",
        description: "Premium chauffeur service covering all of south Kerala — Thiruvananthapuram city, Kollam, Pathanamthitta, and Kottayam. All vehicles GPS-tracked and AC-equipped.",
        includes: ["Name-board airport pickup", "Real-time flight tracking", "All south Kerala districts covered", "AC sedan & premium SUV options", "Baby seat on advance request"],
        price: "From ₹1,100 (city) · ₹3,200+ (outstation)",
        bookingNote: "Book at least 6 hours before flight arrival.",
      },
      {
        id: "medical", title: "Medical Escort Service", tagline: "Paramedic-assisted transit for elderly passengers", accentColor: "#f87171",
        description: "A trained paramedic accompanies your elderly or medically fragile family member through every step — immigration, baggage, transit to vehicle, and onward to hospital or home if needed.",
        includes: ["Trained paramedic or nurse escort", "Wheelchair & oxygen equipment if needed", "Immigration & baggage assistance", "Coordination with receiving hospital/family", "24-hour availability for arrivals"],
        price: "From ₹4,500 per journey",
        bookingNote: "Minimum 48-hour advance booking. Please share medical history at time of booking.",
      },
      {
        id: "dutyfree", title: "Duty-Free Pre-Order", tagline: "Reserve & collect at departure — member pricing", accentColor: "#a78bfa",
        description: "Browse and pre-order from TRV's duty-free catalogue — perfumes, electronics, liquor, chocolates, and gifts — at exclusive Sid-X member pricing. Collect at the dedicated counter before your gate.",
        includes: ["Full duty-free catalogue access online", "Member pricing (10–25% off retail)", "Pre-order up to 72 hours before departure", "Dedicated collection counter at gate", "Gift-wrapping available for selected items"],
        price: "No service fee · member discount applied at checkout",
        bookingNote: "Pre-orders must be placed at least 6 hours before departure. Payment at collection.",
      },
    ],
  },
  {
    code: "CNN", name: "Kannur", fullName: "Kannur International Airport", region: "kerala", color: "#34d399",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Meet-and-assist for Malabar NRK arrivals", accentColor: "#34d399",
        description: "Personalised meet-and-assist at KIA for Malabar NRKs — a concierge who speaks your dialect, handles your bags, and gets you out of the terminal in under 20 minutes.",
        includes: ["Arrivals meet-and-greet", "Immigration & customs guidance", "Baggage collection & escort", "Malayalam & Arabic-speaking staff", "Vehicle coordination service"],
        price: "From ₹1,800 per person",
        bookingNote: "Book 24 hours in advance with flight details.",
      },
      {
        id: "pickup", title: "Chauffeur Pickup & Drop", tagline: "Kannur, Kasaragod, Wayanad districts", accentColor: "#60a5fa",
        description: "Reliable chauffeur transfers across Malabar — Kannur city, Thalassery, Mattannur, Kasaragod, and Wayanad. Night transfers available without surcharge for Sid-X members.",
        includes: ["Name-board airport pickup", "Flight delay tracking included", "AC sedan & SUV options", "Kannur, Kasaragod, Wayanad coverage", "No night surcharge for Sid-X members"],
        price: "From ₹900 (Kannur city) · ₹2,800+ (Kasaragod/Wayanad)",
        bookingNote: "Book at least 6 hours before arrival.",
      },
      {
        id: "cargo", title: "Excess Baggage Cargo", tagline: "Gulf return baggage delivery to doorstep", accentColor: "#f472b6",
        description: "Specialised in Gulf-return cargo — we handle Malabar-bound shipments with care, delivering appliances, gifts, and personal effects directly to your home in Kannur or Kasaragod.",
        includes: ["Gulf customs clearance documentation", "Air-cargo consolidation service", "Doorstep delivery in Kannur & Kasaragod", "Fragile & electronics packing", "WhatsApp shipment tracking"],
        price: "From ₹175/kg (air) · ₹55/kg (sea)",
        bookingNote: "Raise cargo request 48 hours before flight.",
      },
    ],
  },
  /* ── GCC ── */
  {
    code: "DXB", name: "Dubai", fullName: "Dubai International Airport", region: "gcc", color: "#f59e0b",
    services: [
      {
        id: "concierge", title: "Premium Concierge", tagline: "Fast-track immigration & dedicated escort", accentColor: "#f59e0b",
        description: "At the world's busiest airport, our DXB concierge is the difference between 20-minute transit and 2-hour queues. A dedicated agent escorts you through fast-track immigration, business-class check-in, and straight to departures.",
        includes: ["Fast-track immigration lane", "Business/first class check-in assistance", "Porter & baggage handling", "Escort through Terminal 1, 2, or 3", "Coordination with lounge & gate"],
        price: "From AED 350 per person",
        bookingNote: "Book 12 hours before flight. Available at all 3 DXB terminals.",
      },
      {
        id: "lounge", title: "Marhaba Lounge Access", tagline: "Complimentary entry for Sid-X Gold members", accentColor: "#c9a84c",
        description: "Access Dubai Airport's premium Marhaba Lounges — internationally recognised for world-class food, shower suites, and serene environments across Terminal 1 and Terminal 3.",
        includes: ["Complimentary buffet & à la carte", "Private shower suite (60 min slot)", "High-speed Wi-Fi & charging stations", "Prayer room access", "Children's play area (Terminal 3)"],
        price: "Complimentary for Sid-X Gold+ · AED 280 per visit (others)",
        bookingNote: "Show your Sid-X digital membership card at Marhaba reception.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Sedan & SUV transfers across Dubai & Sharjah", accentColor: "#60a5fa",
        description: "Professional chauffeur transfers from DXB to any Dubai address, Sharjah, or Abu Dhabi — with name-board pickup, meet-and-assist in arrivals, and real-time flight tracking.",
        includes: ["Meet-and-greet in arrivals hall", "Name-board pickup service", "Dubai, Sharjah & Abu Dhabi coverage", "AC sedan (Camry/Accord) or SUV (Land Cruiser/Innova)", "Baby seat on request"],
        price: "From AED 90 (Dubai) · AED 160 (Sharjah) · AED 250 (Abu Dhabi)",
        bookingNote: "Book at least 3 hours before arrival. Flight tracking included — no extra charge for delays.",
      },
      {
        id: "cargo", title: "Cargo & Courier", tagline: "Unaccompanied baggage to Kerala — door delivery", accentColor: "#4ade80",
        description: "Sending gifts, appliances, or surplus luggage back to Kerala? Our DXB cargo partner consolidates your shipment and delivers it to any Kerala address via air (4–6 days) or sea (20–25 days).",
        includes: ["Dubai customs documentation", "Air or sea freight options", "Consolidation for smaller shipments", "Kerala-wide doorstep delivery", "Online shipment tracking"],
        price: "From AED 18/kg (air) · AED 6/kg (sea)",
        bookingNote: "Drop off at our Deira consolidation centre. Home pickup available for 5+ kg.",
      },
    ],
  },
  {
    code: "AUH", name: "Abu Dhabi", fullName: "Zayed International Airport", region: "gcc", color: "#818cf8",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Meet-and-assist at Terminal A & departures", accentColor: "#818cf8",
        description: "Sid-X concierge service at the brand-new Zayed International Airport — guiding you through the futuristic Terminal A, fast-tracking immigration, and ensuring a seamless experience.",
        includes: ["Terminal A meet-and-assist", "Fast-track immigration lane", "Baggage handling & trolley escort", "Coordination with chauffeur or taxi", "Arabic & Malayalam-speaking agents"],
        price: "From AED 320 per person",
        bookingNote: "Book 12 hours before arrival/departure.",
      },
      {
        id: "lounge", title: "Al Dhabi Lounge", tagline: "Buffet dining, shower suites & prayer room", accentColor: "#c9a84c",
        description: "Unwind before your flight in AUH's Al Dhabi Lounge — internationally-inspired buffet, private shower suites, and a dedicated prayer room with ablution facilities.",
        includes: ["International & Arabic buffet", "Private shower suite", "Prayer room & ablution area", "Wi-Fi & device charging", "Children's corner & quiet zone"],
        price: "Complimentary for Sid-X Gold+ · AED 260 per visit",
        bookingNote: "Lounge is in Departures, post-security. Show membership card at reception.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Abu Dhabi, Al Ain & Dubai cross-emirate transfers", accentColor: "#60a5fa",
        description: "Chauffeur transfers from AUH across Abu Dhabi, Al Ain, and all the way to Dubai — with name-board pickup, real-time flight tracking, and a range of vehicles to suit your group size.",
        includes: ["Name-board arrivals pickup", "Abu Dhabi city, Al Ain & Dubai coverage", "AC sedan or 7-seater SUV", "Flight tracking — no delay charges", "Fixed rates — no metered surprises"],
        price: "From AED 100 (Abu Dhabi) · AED 180 (Al Ain) · AED 280 (Dubai)",
        bookingNote: "Book at least 3 hours before arrival.",
      },
    ],
  },
  {
    code: "SHJ", name: "Sharjah", fullName: "Sharjah International Airport", region: "gcc", color: "#f472b6",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Air Arabia & charter flight assistance", accentColor: "#f472b6",
        description: "Sharjah is the busiest Air Arabia hub serving Kerala — our concierge navigates the busy SHJ terminal with you, prioritising check-in, handling baggage, and getting you through fast-track in time.",
        includes: ["Air Arabia priority check-in assistance", "Fast-track immigration escort", "Baggage handling & trolley", "Charter flight coordination", "Meet-and-greet for arriving passengers"],
        price: "From AED 280 per person",
        bookingNote: "Book 12 hours before flight. Concierge waits at designated Sid-X meeting point.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Sharjah, Ajman & northern emirates coverage", accentColor: "#60a5fa",
        description: "Transfers from SHJ covering Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah — all northern emirates served with fixed rates and flight tracking.",
        includes: ["Arrivals name-board pickup", "All northern emirates covered", "AC sedan or MPV options", "Flight tracking included", "24/7 availability"],
        price: "From AED 60 (Sharjah) · AED 90 (Ajman) · AED 160 (RAK/Fujairah)",
        bookingNote: "Book 3 hours before arrival.",
      },
      {
        id: "cargo", title: "Cargo & Courier", tagline: "Excess baggage shipping to Kerala addresses", accentColor: "#4ade80",
        description: "Consolidate your excess Air Arabia baggage into a cargo shipment — cheaper than excess baggage fees for heavy loads. We deliver to any Kerala doorstep within 5 days.",
        includes: ["Air Arabia excess baggage conversion", "Sharjah cargo documentation", "Air freight (4–5 days to Kerala)", "Kerala doorstep delivery", "WhatsApp tracking updates"],
        price: "From AED 15/kg (air)",
        bookingNote: "Drop off at Sharjah cargo centre 24 hours before departure.",
      },
    ],
  },
  {
    code: "DOH", name: "Doha", fullName: "Hamad International Airport", region: "gcc", color: "#e879f9",
    services: [
      {
        id: "concierge", title: "Premium Concierge", tagline: "Qatar Airways premium check-in & escort", accentColor: "#e879f9",
        description: "At the award-winning Hamad International Airport, our concierge ensures you experience the world-class terminal without stress — fast-tracking immigration, accessing premium check-in, and escorting to lounge or gate.",
        includes: ["Qatar Airways premium check-in assist", "Fast-track immigration lane", "Baggage handling & porter", "Escort to Al Mourjan or Oryx Lounge", "Gate escort & boarding priority"],
        price: "From QAR 380 per person",
        bookingNote: "Book 12 hours before departure with PNR and QR number.",
      },
      {
        id: "lounge", title: "Al Mourjan Lounge", tagline: "World-class lounge with à la carte dining", accentColor: "#c9a84c",
        description: "Access the legendary Al Mourjan Business Lounge at HIA — consistently rated one of the world's best, featuring à la carte dining, spa treatments, infinity pool views, and exceptional Arabic hospitality.",
        includes: ["À la carte dining by top chefs", "Spa & wellness suite (advance booking)", "Private shower suites", "Panoramic tarmac views", "Full bar & mocktail counter"],
        price: "Complimentary for QR Business+ · QAR 600 per visit (others). Sid-X negotiated rate: QAR 420.",
        bookingNote: "Entry requires valid boarding pass. Reserve for meal service.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Doha, Al Khor & Industrial Area coverage", accentColor: "#60a5fa",
        description: "Professional chauffeur transfers from HIA to any Doha address — West Bay, Pearl, Industrial Area, Al Khor, and beyond — with name-board pickup and real-time flight tracking.",
        includes: ["Name-board arrivals pickup", "Doha city, Al Khor, Industrial Area coverage", "AC sedan or SUV", "Flight tracking — no delay fees", "Child seat on advance request"],
        price: "From QAR 90 (Doha city) · QAR 180 (Al Khor/outskirts)",
        bookingNote: "Book 3 hours before arrival.",
      },
    ],
  },
  {
    code: "MCT", name: "Muscat", fullName: "Muscat International Airport", region: "gcc", color: "#2dd4bf",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Oman Air priority check-in & meet-and-greet", accentColor: "#2dd4bf",
        description: "Muscat's modern airport is straightforward but busy — our concierge fast-tracks Oman Air and Air India Express check-ins, assists with immigration, and ensures a calm, efficient journey.",
        includes: ["Oman Air & Air India Express check-in assist", "Fast-track immigration", "Baggage handling & trolley", "Meet-and-greet for arrivals", "Coordination with transfer vehicle"],
        price: "From OMR 28 per person",
        bookingNote: "Book 12 hours before departure with PNR details.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Muscat, Sohar, Salalah & all Oman governorates", accentColor: "#60a5fa",
        description: "Chauffeur transfers from MCT covering all of Oman — Muscat, Sohar, Nizwa, and long-haul to Salalah. Fixed rates, real-time tracking, and professional drivers for Kerala-returnees.",
        includes: ["Name-board arrivals pickup", "All Oman governorates covered", "AC sedan & 7-seater SUV", "Flight tracking — no delay charges", "Malayalam-speaking driver available"],
        price: "From OMR 12 (Muscat) · OMR 45 (Sohar) · OMR 120 (Salalah)",
        bookingNote: "Book 6 hours before arrival. Outstation journeys need 24-hour advance booking.",
      },
      {
        id: "cargo", title: "Cargo & Courier", tagline: "Household & personal items to Kerala — sea & air", accentColor: "#f472b6",
        description: "Sending household items, electronics, or personal effects from Oman to Kerala? Our Muscat cargo partner handles documentation, Oman customs, and delivers to any Kerala address.",
        includes: ["Oman customs documentation", "Air freight (5–6 days) & sea freight (20–25 days)", "Consolidation for smaller loads", "Kerala doorstep delivery", "Fragile item packing service"],
        price: "From OMR 1.8/kg (air) · OMR 0.55/kg (sea)",
        bookingNote: "Pickup from your Muscat address available for 10+ kg shipments.",
      },
    ],
  },
  {
    code: "BAH", name: "Bahrain", fullName: "Bahrain International Airport", region: "gcc", color: "#fb7185",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Gulf Air priority boarding & meet-and-assist", accentColor: "#fb7185",
        description: "Bahrain's renovated international terminal is sleek but busy — our concierge fast-tracks Gulf Air check-in and immigration for a smooth start to your Kerala journey.",
        includes: ["Gulf Air priority check-in assistance", "Immigration fast-track escort", "Baggage handling & trolley service", "Arrivals meet-and-greet", "Vehicle coordination at exit"],
        price: "From BHD 18 per person",
        bookingNote: "Book 12 hours before departure.",
      },
      {
        id: "lounge", title: "Pearl Lounge", tagline: "Complimentary access with meal & Wi-Fi", accentColor: "#c9a84c",
        description: "Relax in Bahrain Airport's Pearl Lounge before your flight — a well-appointed space with hot meals, cold beverages, shower rooms, and reliable Wi-Fi to keep you connected.",
        includes: ["Hot meals & cold beverages", "Private shower room", "High-speed Wi-Fi", "International news channels", "Complimentary prayer room access"],
        price: "Complimentary for Sid-X Gold+ · BHD 22 per visit",
        bookingNote: "Lounge is in the main departures area. Show Sid-X membership card.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Sedan transfers across Bahrain island", accentColor: "#60a5fa",
        description: "Fixed-rate chauffeur transfers from BAH to any Bahrain address — Manama, Riffa, Muharraq, or the causeway. Clean vehicles, professional drivers, name-board pickup.",
        includes: ["Name-board arrivals pickup", "Bahrain island-wide coverage", "AC sedan or MPV", "Saudi Causeway transfers available", "Flight tracking — no delay charges"],
        price: "From BHD 8 (Manama) · BHD 14 (Riffa/outskirts) · BHD 35 (Saudi Causeway)",
        bookingNote: "Book 3 hours before arrival.",
      },
    ],
  },
  {
    code: "KWI", name: "Kuwait", fullName: "Kuwait International Airport", region: "gcc", color: "#38bdf8",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Terminal 4 & 1 meet-and-assist service", accentColor: "#38bdf8",
        description: "Kuwait Airport is undergoing major expansion — our concierge knows the current layouts, fast-track lanes, and ensures you clear immigration and baggage without confusion in any terminal.",
        includes: ["Terminal 1 & 4 meet-and-greet", "Immigration fast-track assistance", "Baggage handling & trolley", "Departures check-in support", "Arabic & Malayalam-speaking agents"],
        price: "From KWD 14 per person",
        bookingNote: "Book 12 hours in advance. Specify your terminal at booking.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Kuwait City, Fahaheel, Jahra & Ahmadi", accentColor: "#60a5fa",
        description: "Reliable chauffeur transfers from KWI to all parts of Kuwait — Kuwait City, Fahaheel, Ahmadi, Jahra, and Hawally — with name-board pickup and real-time flight tracking.",
        includes: ["Name-board arrivals pickup", "Kuwait City, Fahaheel, Jahra, Ahmadi coverage", "AC sedan & 7-seater SUV", "Flight tracking — no delay charge", "24/7 availability"],
        price: "From KWD 6 (Kuwait City) · KWD 12 (Ahmadi/Fahaheel) · KWD 18 (Jahra)",
        bookingNote: "Book 3 hours before arrival.",
      },
      {
        id: "cargo", title: "Cargo & Courier", tagline: "Household shifting & excess baggage to Kerala", accentColor: "#4ade80",
        description: "From small parcel shipments to full household-shifting containers — we handle Kuwait-to-Kerala cargo with proper customs documentation, consolidation, and doorstep delivery.",
        includes: ["Kuwait customs & export documentation", "Air freight (5–7 days) & sea freight (25 days)", "Household item packing service", "Kerala doorstep delivery", "Container sharing for smaller loads"],
        price: "From KWD 1.6/kg (air) · KWD 0.5/kg (sea)",
        bookingNote: "Home pickup from Kuwait available for 20+ kg.",
      },
    ],
  },
  {
    code: "RUH", name: "Riyadh", fullName: "King Khalid International Airport", region: "gcc", color: "#a3e635",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Saudia & flynas premium check-in assist", accentColor: "#a3e635",
        description: "At Riyadh's KKIA, our concierge handles Saudia and flynas priority check-in, immigration, and escorts you through the large multi-terminal airport smoothly and on time.",
        includes: ["Saudia & flynas priority check-in", "Immigration fast-track escort", "Baggage trolley & handling", "Terminal 1 & 5 coverage", "Arrivals meet-and-greet"],
        price: "From SAR 180 per person",
        bookingNote: "Book 12 hours before departure. Confirm terminal number at booking.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Riyadh metro area & KAFD district transfers", accentColor: "#60a5fa",
        description: "Transfers from KKIA to any Riyadh address — Olaya, KAFD, Al Nakheel, Diplomatic Quarter, and all districts — with fixed rates and flight tracking.",
        includes: ["Name-board arrivals pickup", "All Riyadh districts covered", "AC sedan & SUV options", "KAFD & Diplomatic Quarter access", "Flight tracking — no delay charges"],
        price: "From SAR 60 (central Riyadh) · SAR 100 (KAFD/outskirts)",
        bookingNote: "Book 3 hours before arrival.",
      },
    ],
  },
  {
    code: "JED", name: "Jeddah", fullName: "King Abdulaziz International Airport", region: "gcc", color: "#fbbf24",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Hajj/Umrah special assist & priority lanes", accentColor: "#fbbf24",
        description: "Jeddah KAIA is the gateway for Hajj and Umrah pilgrims — our concierge provides specialised assistance for pilgrim groups, families, and elderly passengers through dedicated lanes and priority handling.",
        includes: ["Hajj/Umrah pilgrim fast-track lanes", "Priority immigration & baggage", "Group concierge for 5+ passengers", "Elderly & wheelchair assistance", "Coordination with Makkah/Madinah transfers"],
        price: "From SAR 160 per person · SAR 120/person for groups 5+",
        bookingNote: "Book 24 hours before for Hajj/Umrah season. Standard bookings need 12 hours.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Jeddah, Makkah & Madinah — sedan & MPV", accentColor: "#60a5fa",
        description: "Chauffeur transfers from KAIA to Jeddah city, Makkah, and Madinah — the most important routes for Kerala pilgrims and NRK returnees working in the western province.",
        includes: ["Name-board arrivals pickup", "Jeddah, Makkah & Madinah coverage", "AC sedan, MPV & bus options", "Madinah: 4-hour express route", "Group vehicle for 10+ passengers"],
        price: "From SAR 70 (Jeddah) · SAR 160 (Makkah) · SAR 380 (Madinah)",
        bookingNote: "Book 6 hours before arrival. Makkah access requires passenger entry permit.",
      },
      {
        id: "cargo", title: "Cargo & Courier", tagline: "Zamzam & personal cargo to Kerala doorstep", accentColor: "#4ade80",
        description: "Shipping Zamzam water, prayer items, dates, and gifts from Jeddah or Makkah to Kerala — we handle Saudi customs, packaging (Zamzam-compliant containers), and deliver to any Kerala address.",
        includes: ["Zamzam-approved sealed containers", "Saudi customs export documentation", "Air freight (5–6 days) & sea freight (22 days)", "Kerala doorstep delivery", "Weight limit: up to 10L Zamzam per shipment"],
        price: "From SAR 22/kg (air) · SAR 7/kg (sea)",
        bookingNote: "Zamzam water must be in approved factory-sealed cans. Personal Zamzam fill not accepted by air.",
      },
    ],
  },
  {
    code: "DMM", name: "Dammam", fullName: "King Fahd International Airport", region: "gcc", color: "#67e8f9",
    services: [
      {
        id: "concierge", title: "Airport Concierge", tagline: "Meet-and-assist for Eastern Province NRKs", accentColor: "#67e8f9",
        description: "KFIA is one of the world's largest airports by area — navigating it alone can be daunting. Our concierge knows every shortcut, fast-track lane, and terminal layout to keep your journey smooth.",
        includes: ["Meet-and-greet at arrivals or departures", "Immigration & customs escort", "Baggage handling & trolley", "Coordination with transfer vehicle", "ARAMCO compound coordination on request"],
        price: "From SAR 170 per person",
        bookingNote: "Book 12 hours in advance. ARAMCO compound requests need 48-hour notice.",
      },
      {
        id: "pickup", title: "Airport Transfer", tagline: "Dammam, Khobar, Dhahran & Jubail", accentColor: "#60a5fa",
        description: "Transfers from KFIA to all Eastern Province cities — Dammam, Khobar, Dhahran, Jubail, and Qatif — with fixed rates, clean vehicles, and professional Kerala-NRK-friendly drivers.",
        includes: ["Name-board arrivals pickup", "Dammam, Khobar, Dhahran, Jubail coverage", "AC sedan & SUV options", "Flight tracking — no delay charges", "Malayalam-speaking driver available"],
        price: "From SAR 65 (Dammam/Khobar) · SAR 90 (Jubail) · SAR 140 (Qatif/outskirts)",
        bookingNote: "Book 3 hours before arrival.",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════
   SERVICE DETAIL SHEET
   ═══════════════════════════════════════════════════ */

function ServiceSheet({
  service,
  airport,
  onClose,
  onFeedback,
  onChangeAirport,
}: {
  service: AirportService | null;
  airport: Airport | null;
  onClose: () => void;
  onFeedback?: (data: FeedbackData) => void;
  onChangeAirport?: () => void;
}) {
  const y = useMotionValue(0);
  const bgOpacity = useTransform(y, [0, 300], [1, 0]);

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y > 100 || info.velocity.y > 400) onClose();
    else animate(y, 0, { type: "spring", stiffness: 400, damping: 30 });
  };

  const photo = service ? SERVICE_PHOTOS[service.id] : null;

  return (
    <AnimatePresence>
      {service && airport && (
        <>
          <motion.div
            key="sheet-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ opacity: bgOpacity }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-xl"
          />
          <motion.div
            key="sheet"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={handleDragEnd}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 260, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 z-[310] bg-[var(--c-card)] rounded-t-[28px] flex flex-col shadow-[0_-30px_100px_rgba(0,0,0,0.9)] touch-none overflow-hidden"
            style={{ y, maxHeight: "92vh" }}
          >
            {/* Drag pill */}
            <div className="absolute top-2.5 inset-x-0 flex justify-center z-10 pointer-events-none">
              <div className="w-9 h-[3.5px] bg-white/20 rounded-full" />
            </div>

            {/* Back button */}
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-5 left-4 z-20 flex items-center gap-1.5 bg-black/45 backdrop-blur-md border border-white/12 rounded-full pl-2 pr-3 py-1.5 active:scale-95 transition-transform"
            >
              <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="text-[12px] font-semibold text-white/80">Back</span>
            </motion.button>

            <div className="overflow-y-auto scrollbar-none flex-1 touch-auto">
              {/* Hero photo or colored band */}
              {photo ? (
                <div className="relative h-[220px] overflow-hidden shrink-0">
                  <img src={photo} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent" />
                  <div className="absolute inset-0 img-fade-bottom pointer-events-none" />
                  {/* Airport code badge */}
                  <div
                    className="absolute bottom-5 right-5 px-3 py-1.5 rounded-xl border text-[12px] font-black backdrop-blur-sm"
                    style={{ color: airport.color, borderColor: `${airport.color}40`, backgroundColor: `${airport.color}18` }}
                  >
                    {airport.code}
                  </div>
                </div>
              ) : (
                <div
                  className="h-[100px] shrink-0 relative"
                  style={{ background: `linear-gradient(135deg, ${service.accentColor}22 0%, transparent 100%)` }}
                >
                  <div className="absolute inset-x-0 top-0 h-full" style={{ background: `linear-gradient(to bottom, ${service.accentColor}15, transparent)` }} />
                  <div
                    className="absolute bottom-4 right-5 px-3 py-1.5 rounded-xl border text-[12px] font-black"
                    style={{ color: airport.color, borderColor: `${airport.color}40`, backgroundColor: `${airport.color}15` }}
                  >
                    {airport.code}
                  </div>
                </div>
              )}

              <div className="px-5 pt-4 pb-32">
                {/* Title block */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: `${service.accentColor}99` }}>
                    {airport.name} · {airport.fullName}
                  </p>
                  <button 
                    onClick={onChangeAirport}
                    className="flex items-center gap-1.5 text-[9px] font-bold text-white/40 uppercase tracking-[0.15em] mb-4 active:text-[var(--gold-text)] transition-colors"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    Change Airport
                  </button>
                  <h2 className="text-[22px] font-bold text-white tracking-tight leading-tight mb-1">{service.title}</h2>
                  <p className="text-[12px] text-white/45 leading-snug mb-5">{service.tagline}</p>
                </motion.div>

                {/* Price chip */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 }}
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 mb-5 border"
                  style={{ backgroundColor: `${service.accentColor}12`, borderColor: `${service.accentColor}30` }}
                >
                  <svg className="w-3.5 h-3.5" style={{ color: service.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[12px] font-semibold" style={{ color: service.accentColor }}>{service.price}</span>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.19 }}
                  className="text-[14px] text-white/55 leading-relaxed mb-6"
                >
                  {service.description}
                </motion.p>

                {/* What's included */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="mb-6">
                  <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em] mb-3">What&apos;s Included</p>
                  <div className="flex flex-col gap-2.5">
                    {service.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: service.accentColor }} />
                        <p className="text-[13px] text-white/65 leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Booking note */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5 mb-7"
                >
                  <svg className="w-4 h-4 text-white/30 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                  <p className="text-[12px] text-white/40 leading-relaxed">{service.bookingNote}</p>
                </motion.div>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  onClick={() => {
                    if (onFeedback) {
                      onFeedback({
                        title: "Booking Initiated",
                        message: "Our airport concierge has been notified. You will receive a confirmation call and WhatsApp details within 2 hours.",
                        type: "success",
                        primaryActionLabel: "Contact Concierge",
                        onPrimaryAction: () => window.open("tel:+919876543210"),
                      });
                    }
                    onClose();
                  }}
                  className="w-full py-4 text-[14px] font-bold rounded-2xl tracking-wide active:scale-[0.98] transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${service.accentColor} 0%, ${service.accentColor}cc 100%)`,
                    color: "#000",
                    boxShadow: `0 4px 24px ${service.accentColor}35`,
                  }}
                >
                  Book This Service
                </motion.button>

                <p className="text-center text-[10px] font-mono text-white/12 mt-5 tracking-wider">
                  A CONCIERGE WILL CONFIRM WITHIN 2 HOURS
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

interface AirportsScreenProps {
  onBack: () => void;
  initialAirport?: string;
  highlightService?: string;
  onFeedback?: (data: FeedbackData) => void;
}

export function AirportsScreen({ initialAirport = "COK", highlightService, onFeedback }: AirportsScreenProps) {
  const [selectedCode, setSelectedCode] = useState(initialAirport);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [activeService, setActiveService] = useState<AirportService | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const activeAirport = airports.find(a => a.code === selectedCode) ?? airports[0];

  useEffect(() => {
    if (highlightService && !activeService) {
      const svc = activeAirport.services.find(s => s.id === highlightService);
      if (svc) {
        setTimeout(() => {
          setActiveService(svc);
        }, 300);
      }
    }
  }, [highlightService, activeAirport.services]);

  useEffect(() => {
    if (highlightService && highlightRef.current) {
      setTimeout(() => highlightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    }
  }, [highlightService, selectedCode]);

  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  const filtered = searchQuery.trim()
    ? airports.filter(a =>
        a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : airports;

  const keralaAirports = filtered.filter(a => a.region === "kerala");
  const gccAirports = filtered.filter(a => a.region === "gcc");

  return (
    <>
      <div className="flex flex-col min-h-screen pt-[56px] pb-24 text-white relative">

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, var(--c-elevated) 0%, var(--c-surface) 40%, var(--c-base) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 15% 10%, rgba(96,165,250,0.06), transparent 50%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 85% 80%, rgba(201,168,76,0.05), transparent 50%)" }} />
        </div>




        {/* Airport selector */}
        <div className="px-5 mb-3 relative z-10">
          <button
            onClick={() => setShowSearch(s => !s)}
            className="w-full rounded-[14px] border border-white/8 p-3 flex items-center gap-3 active:scale-[0.99] transition-transform"
            style={{ background: `${activeAirport.color}0a` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
              style={{ borderColor: `${activeAirport.color}30`, backgroundColor: `${activeAirport.color}15` }}
            >
              <span className="text-[13px] font-black" style={{ color: activeAirport.color }}>{activeAirport.code}</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-[14px] font-bold text-white">{activeAirport.name}</p>
              <p className="text-[10px] font-mono text-white/30 truncate">{activeAirport.fullName}</p>
            </div>
            <svg
              className={`w-4 h-4 text-white/25 transition-transform duration-200 ${showSearch ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Search / dropdown */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              key="search"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
              className="relative z-10"
            >
              <div className="px-5 pb-4">
                <div className="relative mb-3">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search airport code or city…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/8 rounded-[14px] py-2.5 pl-10 pr-4 text-[13px] text-white placeholder-white/25 outline-none focus:border-white/20 transition-colors"
                  />
                </div>

                <div className="max-h-[300px] overflow-y-auto scrollbar-none flex flex-col gap-3">
                  {keralaAirports.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1.5 px-1">Kerala</p>
                      <div className="flex flex-col gap-1">
                        {keralaAirports.map(apt => (
                          <button
                            key={apt.code}
                            onClick={() => { setSelectedCode(apt.code); setShowSearch(false); setSearchQuery(""); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-colors text-left ${selectedCode === apt.code ? "bg-white/[0.06]" : "active:bg-white/[0.04]"}`}
                          >
                            <span className="text-[13px] font-black w-10" style={{ color: apt.color }}>{apt.code}</span>
                            <span className="text-[12px] text-white/60 flex-1">{apt.name}</span>
                            <span className="text-[9px] font-mono text-white/20">{apt.services.length} services</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {gccAirports.length > 0 && (
                    <div>
                      <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1.5 px-1">GCC</p>
                      <div className="flex flex-col gap-1">
                        {gccAirports.map(apt => (
                          <button
                            key={apt.code}
                            onClick={() => { setSelectedCode(apt.code); setShowSearch(false); setSearchQuery(""); }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-colors text-left ${selectedCode === apt.code ? "bg-white/[0.06]" : "active:bg-white/[0.04]"}`}
                          >
                            <span className="text-[13px] font-black w-10" style={{ color: apt.color }}>{apt.code}</span>
                            <span className="text-[12px] text-white/60 flex-1">{apt.name}</span>
                            <span className="text-[9px] font-mono text-white/20">{apt.services.length} services</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {filtered.length === 0 && (
                    <p className="text-center text-white/20 text-[12px] py-6">No airports found</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAirport.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="px-5 relative z-10"
          >
            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-2">
              {activeAirport.services.length} services available · tap to see details
            </p>

            <div className="flex flex-col gap-2">
              {activeAirport.services.map((svc, i) => {
                const isHighlighted = highlightService === svc.id;
                const photo = SERVICE_PHOTOS[svc.id];
                return (
                  <motion.div
                    key={svc.id}
                    ref={isHighlighted ? highlightRef : undefined}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.28 }}
                  >
                    <button
                      onClick={() => setActiveService(svc)}
                      className={`w-full text-left rounded-[20px] overflow-hidden border active:scale-[0.98] transition-all relative flex items-center gap-3.5 p-3.5 ${
                        isHighlighted ? "border-[var(--gold)]/40 ring-1 ring-[var(--gold)]/10" : "border-white/8"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${svc.accentColor}${isHighlighted ? "22" : "08"} 0%, var(--c-surface) 100%)`
                      }}
                    >
                      <div
                        className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border"
                        style={{ backgroundColor: `${svc.accentColor}15`, borderColor: `${svc.accentColor}25` }}
                      >
                         <svg className="w-5 h-5" style={{ color: svc.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                         </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-white leading-tight">{svc.title}</p>
                        <p className="text-[10px] text-white/35 mt-1 leading-snug line-clamp-1 truncate">{svc.tagline}</p>
                      </div>

                      <div className="shrink-0">
                        <svg className="w-4 h-4 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      <ServiceSheet
        service={activeService}
        airport={activeAirport}
        onClose={() => setActiveService(null)}
        onFeedback={onFeedback}
        onChangeAirport={() => {
          setActiveService(null);
          setTimeout(() => setShowSearch(true), 300);
        }}
      />
    </>
  );
}
