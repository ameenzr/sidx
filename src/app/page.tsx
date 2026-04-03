"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Card } from "@/components/ui/Card";
import { featuredItems, exploreProjects, type Item } from "@/lib/mock-data";
import { Badge } from "@/components/ui/Badge";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import { motion, AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/ui/BottomNav";
import { EventsTab } from "@/components/EventsTab";
import { ProjectsTab } from "@/components/ProjectsTab";
import { BenefitsTab } from "@/components/BenefitsTab";
import { ProfileDrawer } from "@/components/ProfileDrawer";
import { DetailDrawer } from "@/components/DetailDrawer";
import { LaunchAnimation } from "@/components/LaunchAnimation";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedHomeItem, setSelectedHomeItem] = useState<Item | null>(null);
  const [homeItemType, setHomeItemType] = useState<"event" | "project">("event");
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const benefitsList = [
    "avail 50% off on Exigo",
    "unlimited lounge with priority pass",
    "5x reward points on luxury travel",
    "zero forex markup on global bookings",
    "complimentary taj epicure membership",
    "24/7 personalized global concierge"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBenefitIndex((prev) => (prev + 1) % benefitsList.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const [isExploreVisible, setIsExploreVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const exploreSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExploreVisible(entry.isIntersecting);
      },
      { threshold: 0.8 }
    );

    if (exploreSectionRef.current) {
      observer.observe(exploreSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Reset gallery index when switching projects
    setActiveGalleryIndex(0);
  }, [activeProjectIndex]);

  useEffect(() => {
    if (!isExploreVisible) return;

    const project = exploreProjects[activeProjectIndex];
    if (!project || !project.gallery || project.gallery.length <= 1) return;

    const timer = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % (project.gallery?.length || 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [activeProjectIndex, isExploreVisible]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const posterGradients = [
    // Scale Up Conclave — dark steel #1B1F24 tones
    "radial-gradient(ellipse 160% 60% at 50% 0%, rgba(40,50,70,0.38) 0%, rgba(27,31,36,0.18) 50%, transparent 80%)",
    // Dubai Expo — deep teal & indigo luxury tones
    "radial-gradient(ellipse 160% 60% at 50% 0%, rgba(30,120,160,0.38) 0%, rgba(10,30,80,0.18) 50%, transparent 80%)",
    // Madhyamam Edu Cafe — warm terracotta & clay
    "radial-gradient(ellipse 160% 60% at 50% 0%, rgba(180,90,50,0.38) 0%, rgba(100,50,20,0.18) 50%, transparent 80%)",
    // KSUM Women Startup Summit — fuchsia & plum
    "radial-gradient(ellipse 160% 60% at 50% 0%, rgba(190,50,130,0.38) 0%, rgba(90,30,70,0.18) 50%, transparent 80%)",
  ];

  const featuredStackItems = useMemo(() => featuredItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imageSrc: item.image,
    href: "#",
  })), []);

  return (
    <>
      <LaunchAnimation onComplete={() => setHasLaunched(true)} />
      <div
        data-testid="home-page-container"
        className="flex flex-col min-h-full pt-14 overflow-x-hidden"
        style={{
          opacity: hasLaunched ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          pointerEvents: hasLaunched ? "auto" : "none",
        }}
      >
      {/* 1. Header — Using fixed for better mobile support */}
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 right-0 z-[150] flex justify-between items-center pl-3 pr-6 py-3 bg-gradient-to-b from-[#0a0805] via-[#0a0805]/90 to-transparent transition-all duration-300`}
      >
        {/* Logo Container */}
        <div
          data-testid="logo-container"
          className="h-20 transition-all duration-300 ml-[-18px]"
        >
          <img src="/projx_logo.png" alt="PROJX" className="h-full object-contain" />
        </div>

        {/* User Avatar — opens profile drawer */}
        <button
          data-testid="user-avatar"
          onClick={() => setIsProfileOpen(true)}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--gold)] to-amber-700 border-2 border-[var(--gold)]/60 flex items-center justify-center text-black font-bold text-[12px] shadow-[0_0_12px_rgba(251,191,36,0.25)] transition-all duration-300 active:scale-90"
        >
          FZ
        </button>
      </header>

      {/* --- HOME TAB CONTENT --- */}
      {activeTab === "Home" && (
        <div className="flex flex-col w-full transition-opacity duration-300">
          {/* Fix 2: Opacity cross-fade between gradient layers.
              CSS cannot interpolate between gradient() values, but opacity is always animatable. */}
          {posterGradients.map((gradient, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="fixed inset-0 pointer-events-none z-0"
              style={{
                background: gradient,
                opacity: activeFeaturedIndex === i ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          ))}

          {/* 4. Upcoming Events Section */}
          <section data-testid="featured-section" className="relative mt-12 mb-2">
            <div className="px-6 mb-3">
              <h2
                data-testid="hot-events-header"
                className="text-[22px] font-bold tracking-tight text-[#fdfaf5]"
              >
                Upcoming events
              </h2>
            </div>
            <div className="mx-auto w-full max-w-[500px] px-6 mt-0">
              <CardStack
                items={featuredStackItems}
                initialIndex={0}
                onChangeIndex={(index) => setActiveFeaturedIndex(index)}
                autoAdvance
                intervalMs={4000}
                pauseOnHover
                showDots={false}
                cardWidth={isMobile ? 280 : 340}
                cardHeight={isMobile ? 158 : 191}
                maxVisible={3}
                spreadDeg={0}
                overlap={isMobile ? 0.65 : 0.28}
                activeScale={1.12}
                inactiveScale={0.8}
                renderCard={(item, { active }) => {
                  const itemIndex = featuredItems.findIndex(fi => fi.id === item.id);
                  const originalItem = featuredItems[itemIndex];
                  const isExclusive = originalItem?.badges.some(b => b.toLowerCase() === 'exclusive');

                  // Color mapping based on posterGradients
                  const themes = [
                    { color: "rgba(40,50,70", shadow: "rgba(40,50,70,0.3)" }, // Dark Steel (#1B1F24)
                    { color: "rgba(30,120,160", shadow: "rgba(30,120,160,0.3)" }, // Deep Teal (Dubai)
                    { color: "rgba(180,90,50", shadow: "rgba(180,90,50,0.3)" }, // Terracotta (Edu Cafe)
                    { color: "rgba(190,50,130", shadow: "rgba(190,50,130,0.3)" }, // Fuchsia (Summit)
                  ];
                  const theme = themes[itemIndex % themes.length];

                  const borderColor = active
                    ? `border-[${theme.color},0.8)] shadow-[0_0_35px_${theme.shadow}]`
                    : `border-[${theme.color},0.25)]`;

                  const grayscaleClass = !isExclusive && !active ? 'grayscale-[30%]' : '';

                  return (
                    <div
                      className={`relative h-full w-full rounded-2xl overflow-hidden border-2 ${grayscaleClass} ${!active ? 'opacity-40 scale-90' : 'opacity-100'}`}
                      style={{
                        borderColor: active ? `${theme.color},0.35)` : `${theme.color},0.1)`,
                        boxShadow: active ? `0 0 20px ${theme.shadow.replace('0.3', '0.15')}` : 'none'
                      }}
                    >
                      {item.imageSrc && (
                        <img src={item.imageSrc} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                    </div>
                  );
                }}
              />

              {/* 4.1 Independent Event Details — clickable to open detail drawer */}
              <div className="flex items-start justify-center">
                <motion.button
                  key={activeFeaturedIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  onClick={() => {
                    setSelectedHomeItem(featuredItems[activeFeaturedIndex]);
                    setHomeItemType("event");
                  }}
                  className="mt-8 flex flex-col items-center text-center group w-full active:scale-[0.98] transition-transform"
                >
                  <div className="flex gap-2 mb-2 items-center flex-wrap justify-center">
                    {featuredItems[activeFeaturedIndex]?.badges.map((b, i) => (
                      <Badge key={i} label={b} />
                    ))}

                    {/* Registration Closing Soon Animated Disclaimer */}
                    {featuredItems[activeFeaturedIndex]?.title.toLowerCase().includes("dubai expo") && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#B91C1C] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20"
                      >
                        <motion.span
                          animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_#fff]"
                        />
                        closing soon
                      </motion.div>
                    )}
                  </div>
                  <h3 className="text-[17px] font-bold text-white mb-1.5 uppercase tracking-wide">
                    {featuredItems[activeFeaturedIndex]?.title}
                  </h3>
                  <p className="text-[12px] text-white/50 px-8 leading-relaxed line-clamp-1 mb-6">
                    {featuredItems[activeFeaturedIndex]?.description}
                  </p>

                  <div className="flex flex-col gap-1 text-[10px] font-medium text-[var(--gold-text)]">
                    {featuredItems[activeFeaturedIndex]?.date && (
                      <span className="flex items-center justify-center gap-1.5 opacity-80">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                        {featuredItems[activeFeaturedIndex].date}
                      </span>
                    )}
                    {featuredItems[activeFeaturedIndex]?.venue && (
                      <span className="flex items-center justify-center gap-1.5 opacity-80">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                        {featuredItems[activeFeaturedIndex].venue}
                      </span>
                    )}
                  </div>
                  {/* Tap hint */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-60 transition-opacity">
                    <span className="text-[10px] font-mono text-[var(--gold-text)]">tap for details</span>
                    <svg className="w-3 h-3 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </div>
                </motion.button>
              </div>

              <div className="px-6 mt-0 mb-4 text-center">
                <button
                  onClick={() => setActiveTab("Events")}
                  className="inline-flex flex-col items-center gap-1.5 group"
                >
                  <div className="w-full max-w-[110px] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-text)]/20 to-transparent opacity-[0.4] group-hover:via-[var(--gold-text)]/60 transition-all duration-500" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[var(--gold-text)] opacity-20 group-hover:opacity-100 transition-opacity">
                    more events
                  </span>
                  <div className="w-full max-w-[110px] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-text)]/20 to-transparent opacity-[0.4] group-hover:via-[var(--gold-text)]/60 transition-all duration-500" />
                </button>
              </div>
            </div>
          </section>

          {/* 6. Benefits Ticker — Single-line ultra-minimal light band */}
          <section data-testid="benefits-ticker-section" className="relative h-auto py-[4px] bg-[#fdfaf5]/90 border-y border-[var(--gold)]/10 shadow-[inner_0_0_10px_rgba(251,191,36,0.02)] overflow-hidden scale-[1.02] z-[10] flex items-center justify-center group">
            {/* Subtle Light-Glow/Gradient */}
            <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-transparent via-[#f3e9d8] to-transparent pointer-events-none" />

            <div className="relative z-10 w-full flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeBenefitIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-[11px] font-black tracking-[0.2em] uppercase text-[#4a3a1a] text-center whitespace-nowrap px-4"
                >
                  {benefitsList[activeBenefitIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </section>



          {/* 7. Explore List — Enhanced Showcase with Dynamic Background */}
          <section
            data-testid="explore-projects-section"
            ref={exploreSectionRef}
            className={`relative pt-0 pb-24 z-10 overflow-hidden flex flex-col transition-all duration-1000 ease-in-out ${scrolled ? 'opacity-100 grayscale-0 blur-none scale-100' : 'opacity-85 grayscale-[20%] blur-[1px] scale-[0.995]'}`}
          >
            {/* Dynamic Background Layer */}
            <div className="absolute inset-0 z-0">
              {exploreProjects.map((project, pIdx) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${pIdx === activeProjectIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                >
                  {project.gallery?.map((img, iIdx) => (
                    <div
                      key={iIdx}
                      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ease-in-out ${iIdx === activeGalleryIndex ? 'opacity-30' : 'opacity-0'}`}
                      style={{ backgroundImage: `url("${img}")` }}
                    />
                  ))}
                  {/* Radial gradient to focus attention */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/80 via-transparent to-[var(--bg-base)]" />
                </div>
              ))}
            </div>

            {/* Grain and Texture Overlay */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none opacity-[0.15] mix-blend-overlay"
              style={{
                backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
                backgroundSize: "200px"
              }}
            />

            <div className="relative z-10">
              <div className="px-6 mb-10 pt-8 flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <h2
                    data-testid="explore-projects-header"
                    className="text-[22px] font-bold tracking-tight text-[#fdfaf5]"
                  >
                    Explore latest projects
                  </h2>
                  <p className="text-[14px] text-[var(--text-2)] font-medium">Curated high-yield opportunities</p>
                </div>

                <div className="flex gap-1.5 pb-2">
                  {exploreProjects.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${i === activeProjectIndex ? 'w-8 bg-[var(--gold)]' : 'w-2 bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>

              <div
                data-testid="project-showcase-slider"
                className="flex gap-0 overflow-x-auto scrollbar-none snap-x snap-mandatory"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const width = el.offsetWidth;
                  const newIndex = Math.round(el.scrollLeft / width);
                  if (newIndex !== activeProjectIndex && newIndex < exploreProjects.length) {
                    setActiveProjectIndex(newIndex);
                  }
                }}
              >
                {exploreProjects.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedHomeItem(item);
                      setHomeItemType("project");
                    }}
                    className="w-full shrink-0 snap-center px-6 flex items-center justify-center active:scale-[0.97] transition-transform"
                  >
                    <div className="w-full max-w-[500px] aspect-[4/5] relative rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl flex flex-col justify-end p-8 group">
                      {/* Project Content Overlay */}
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-auto">
                          <div className="flex flex-wrap gap-2">
                            {item.badges.map((b, i) => <Badge key={i} label={b} />)}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </div>
                        </div>

                        <div className="mt-auto">
                          {item.partnerLogos && item.partnerLogos.length > 0 && (
                            <div
                              data-testid="partner-logos-container"
                              className="flex gap-2.5 mb-5 items-center flex-wrap"
                            >
                              {item.partnerLogos.map((logo, lIdx) => (
                                <div
                                  key={lIdx}
                                  data-testid={`partner-logo-box-${lIdx}`}
                                  className="bg-white/10 backdrop-blur-md rounded-md overflow-hidden h-7 w-auto border border-white/10 flex items-center justify-center shadow-lg"
                                >
                                  <img
                                    src={logo}
                                    alt="Partner"
                                    data-testid={`partner-logo-img-${lIdx}`}
                                    className="h-full w-auto object-contain opacity-90"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                            {item.title}
                          </h3>
                          {item.location && (
                            <div className="flex items-center gap-1.5 mb-3 text-[11px] font-mono text-[var(--gold-text)]/70">
                              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              {item.location}
                            </div>
                          )}
                          <p className="text-[13px] text-white/60 leading-relaxed mb-6 line-clamp-2 font-medium">
                            {item.description}
                          </p>
                          {/* Tap hint */}
                          <div className="flex items-center gap-1.5 opacity-50">
                            <span className="text-[10px] font-mono text-[var(--gold-text)]">tap for details</span>
                            <svg className="w-3 h-3 text-[var(--gold-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic explore-more link at section base */}
            <div className="px-6 mt-6 mb-10 text-center">
              <button
                onClick={() => setActiveTab("Projects")}
                className="inline-flex flex-col items-center gap-1.5 group"
              >
                <div className="w-full max-w-[130px] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-text)]/20 to-transparent opacity-[0.4] group-hover:via-[var(--gold-text)]/60 transition-all duration-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[var(--gold-text)] opacity-20 group-hover:opacity-100 transition-opacity">
                  more projects
                </span>
                <div className="w-full max-w-[130px] h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-text)]/20 to-transparent opacity-[0.4] group-hover:via-[var(--gold-text)]/60 transition-all duration-500" />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* --- DEDICATED TABS --- */}
      {activeTab === "Events" && <EventsTab />}
      {activeTab === "Projects" && <ProjectsTab />}
      {activeTab === "Benefits" && <BenefitsTab />}

      {/* Profile Drawer — global overlay */}
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Home Detail Drawer — for event/project cards on Home tab */}
      <DetailDrawer
        item={selectedHomeItem}
        onClose={() => setSelectedHomeItem(null)}
        type={homeItemType}
      />

      {/* 8. Bottom Nav */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}
