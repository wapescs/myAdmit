"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Menu, X, Star, Lock, Bell, User, Moon, Sun,
  DollarSign, GraduationCap, CheckCircle, Calendar, FileText,
  Award, ArrowRight, Heart, ChevronDown, Bot, Send, Users,
  Building, Shield, Settings, CreditCard, LogOut, BarChart2,
  Target, Globe, BookOpen, Bookmark, Sparkles,
  Plus, TrendingUp, ExternalLink, Filter, Upload,
  AlertCircle, LayoutDashboard, Twitter, Linkedin, Instagram,
  Facebook, Youtube, MapPin
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
type UserState = "anonymous" | "logged-in" | "complete";
type Page = "home" | "chat" | "dashboard" | "comparison" | "scholarships" | "university" | "booking" | "profile";
type Message = { id: number; role: "assistant" | "user"; content: string; timestamp: Date };

// ─── Data ──────────────────────────────────────────────────────────────────
const UNIVERSITIES = [
  {
    id: 1, name: "Massachusetts Institute of Technology", shortName: "MIT",
    country: "USA", flag: "🇺🇸", ranking: 1,
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&h=400&fit=crop&auto=format",
    tuition: "$57,986/yr", acceptanceRate: "4%", scholarships: true, type: "Private",
    programs: ["Engineering", "CS", "Physics", "Management"], ieltsRequired: "7.0",
    description: "World-leading research university with cutting-edge STEM and management programs.",
  },
  {
    id: 2, name: "University of Oxford", shortName: "Oxford",
    country: "UK", flag: "🇬🇧", ranking: 2,
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&h=400&fit=crop&auto=format",
    tuition: "£28,950/yr", acceptanceRate: "17%", scholarships: true, type: "Public",
    programs: ["Law", "Medicine", "Philosophy", "Economics"], ieltsRequired: "7.5",
    description: "One of the oldest and most prestigious universities in the world.",
  },
  {
    id: 3, name: "University of Toronto", shortName: "UofT",
    country: "Canada", flag: "🇨🇦", ranking: 18,
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&h=400&fit=crop&auto=format",
    tuition: "CAD $58,160/yr", acceptanceRate: "43%", scholarships: true, type: "Public",
    programs: ["Business", "Engineering", "Life Sciences", "Arts"], ieltsRequired: "6.5",
    description: "Canada's top research university with a diverse and vibrant campus life.",
  },
  {
    id: 4, name: "TU Munich", shortName: "TUM",
    country: "Germany", flag: "🇩🇪", ranking: 37,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&h=400&fit=crop&auto=format",
    tuition: "€0–3,000/yr", acceptanceRate: "22%", scholarships: true, type: "Public",
    programs: ["Engineering", "Sciences", "Business", "Informatics"], ieltsRequired: "6.5",
    description: "Germany's leading technical university offering world-class education at minimal cost.",
  },
  {
    id: 5, name: "University of Melbourne", shortName: "UniMelb",
    country: "Australia", flag: "🇦🇺", ranking: 33,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&auto=format",
    tuition: "AUD $42,000/yr", acceptanceRate: "70%", scholarships: true, type: "Public",
    programs: ["Medicine", "Law", "Business", "Science"], ieltsRequired: "6.5",
    description: "Australia's #1 university and one of the world's top 50 institutions.",
  },
  {
    id: 6, name: "Trinity College Dublin", shortName: "TCD",
    country: "Ireland", flag: "🇮🇪", ranking: 98,
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&h=400&fit=crop&auto=format",
    tuition: "€20,000/yr", acceptanceRate: "36%", scholarships: true, type: "Public",
    programs: ["Business", "Medicine", "Engineering", "Arts"], ieltsRequired: "6.5",
    description: "Ireland's oldest university with excellent post-study work opportunities.",
  },
];

const COUNTRIES = [
  { name: "USA", flag: "🇺🇸", students: "1.2M+", avgFees: "$30–60K/yr", topUnis: 200 },
  { name: "Canada", flag: "🇨🇦", students: "800K+", avgFees: "CAD $20–40K", topUnis: 96 },
  { name: "UK", flag: "🇬🇧", students: "600K+", avgFees: "£15–35K/yr", topUnis: 154 },
  { name: "Germany", flag: "🇩🇪", students: "400K+", avgFees: "€0–3K/yr", topUnis: 87 },
  { name: "Australia", flag: "🇦🇺", students: "500K+", avgFees: "AUD $25–50K", topUnis: 43 },
  { name: "Ireland", flag: "🇮🇪", students: "200K+", avgFees: "€15–25K/yr", topUnis: 22 },
  { name: "New Zealand", flag: "🇳🇿", students: "100K+", avgFees: "NZD $25–40K", topUnis: 8 },
];

const TESTIMONIALS = [
  {
    id: 1, name: "Priya Sharma", from: "India", university: "University of Toronto",
    program: "MBA", rating: 5,
    quote: "EduPath's AI counselor understood my profile perfectly and recommended universities I hadn't even considered. Got into my dream school with a scholarship!",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e3?w=100&h=100&fit=crop&auto=format",
    countryFlag: "🇨🇦",
  },
  {
    id: 2, name: "Arjun Mehta", from: "India", university: "TU Munich",
    program: "M.Sc. Computer Science", rating: 5,
    quote: "The scholarship guidance was incredible. Saved over €15,000 in tuition fees through scholarships I discovered on this platform. Highly recommend!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    countryFlag: "🇩🇪",
  },
  {
    id: 3, name: "Fatima Al-Hassan", from: "Nigeria", university: "University of Melbourne",
    program: "Master of Engineering", rating: 5,
    quote: "From profile creation to visa approval, EduPath guided me at every single step. The counselors are world-class and genuinely care about your success.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format",
    countryFlag: "🇦🇺",
  },
];

const SCHOLARSHIPS = [
  {
    id: 1, name: "Chevening Scholarship", country: "UK", flag: "🇬🇧",
    amount: "Full Funding", deadline: "Nov 7, 2025", category: "Government",
    eligibility: "Bachelor's degree, 2yr work experience",
    coverage: ["Tuition", "Living Allowance", "Return Flights"], saved: false,
  },
  {
    id: 2, name: "Vanier Canada Graduate", country: "Canada", flag: "🇨🇦",
    amount: "CAD $50,000/yr", deadline: "Nov 1, 2025", category: "Government",
    eligibility: "PhD students with high academic standing",
    coverage: ["Living Expenses", "Research Support"], saved: true,
  },
  {
    id: 3, name: "Australia Awards", country: "Australia", flag: "🇦🇺",
    amount: "Full Funding", deadline: "Apr 30, 2025", category: "Government",
    eligibility: "Developing country citizens",
    coverage: ["Tuition", "Living Allowance", "Health Cover"], saved: false,
  },
  {
    id: 4, name: "DAAD Scholarship", country: "Germany", flag: "🇩🇪",
    amount: "€750–1,200/month", deadline: "Oct 15, 2025", category: "Academic",
    eligibility: "Graduates with strong academic record",
    coverage: ["Monthly Stipend", "Travel Allowance"], saved: false,
  },
  {
    id: 5, name: "Gates Cambridge Scholarship", country: "UK", flag: "🇬🇧",
    amount: "Full Funding", deadline: "Dec 4, 2024", category: "University",
    eligibility: "Non-UK citizens applying to Cambridge",
    coverage: ["Full Tuition", "Maintenance", "Visa"], saved: true,
  },
  {
    id: 6, name: "NZ Excellence Award", country: "New Zealand", flag: "🇳🇿",
    amount: "NZD $10,000", deadline: "Jul 1, 2025", category: "University",
    eligibility: "High achieving international students",
    coverage: ["Partial Tuition"], saved: false,
  },
];

const PROCESS_STEPS = [
  { step: 1, title: "Create Profile", desc: "Tell us about your academics, goals, and preferences", icon: User },
  { step: 2, title: "AI Assessment", desc: "Our AI analyzes your profile and identifies the best match universities", icon: Bot },
  { step: 3, title: "Book Counselor", desc: "Schedule a 1-on-1 session with a certified education counselor", icon: Calendar },
  { step: 4, title: "Shortlist Universities", desc: "Receive a personalized list of dream, reach, and safe universities", icon: GraduationCap },
  { step: 5, title: "Submit Applications", desc: "Get expert help crafting SOPs, LORs, and application forms", icon: FileText },
  { step: 6, title: "Visa Guidance", desc: "Complete visa documentation with expert guidance and mock interviews", icon: Shield },
  { step: 7, title: "Fly Abroad", desc: "Pre-departure briefing and alumni connect in your destination", icon: Globe },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1, role: "assistant",
    content: "Hello! I'm your AI Admission Counselor. I can help with university recommendations, scholarship guidance, admission probability assessment, and visa support.\n\nHow can I help you today?",
    timestamp: new Date(),
  },
];

const AI_REPLIES = [
  "Based on your profile, I recommend **University of Toronto** (safe — 72% probability), **University of Edinburgh** (reach — 45%), and **TU Munich** (match — 58%).\n\nWould you like me to:\n- Generate a complete shortlist with match scores\n- Find scholarships for these universities\n- Draft your Statement of Purpose",
  "Great question! For students with 85%+ academics and 7.0 IELTS, Germany offers **free or near-free education** at world-class institutions.\n\nTop picks:\n- TU Munich (Rank #37)\n- RWTH Aachen (Rank #106)\n- Heidelberg University (Rank #58)\n\n**Key requirements:** Transcripts, motivation letter, APS certificate (India), IELTS 6.5+",
  "Looking at your budget and academic profile, here's my analysis:\n\n| University | Probability | Tuition |\n|---|---|---|\n| UniMelb | 68% | AUD $42K |\n| UofT | 55% | CAD $58K |\n| TCD Dublin | 79% | €20K |\n\nShall I create a detailed application timeline?",
];

// ─── Fonts helper ──────────────────────────────────────────────────────────
const serif = { fontFamily: "'Playfair Display', serif" } as const;
const sans = { fontFamily: "'Plus Jakarta Sans', sans-serif" } as const;

// ─── Reusable primitives ───────────────────────────────────────────────────
function Pill({ children, variant = "crimson" }: { children: React.ReactNode; variant?: "crimson" | "gold" | "green" | "muted" }) {
  const styles = {
    crimson: "bg-[#8B2626]/8 text-[#8B2626] border-[#8B2626]/20",
    gold: "bg-[#CFA56A]/10 text-[#CFA56A] border-[#CFA56A]/20",
    green: "bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/20",
    muted: "bg-[#EDE8DF] text-[#666666] border-[#E8DDD0]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
}

function Btn({ children, variant = "primary", size = "md", className = "", onClick, disabled }: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg"; className?: string; onClick?: () => void; disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes = { sm: "px-4 py-2 text-xs rounded-xl", md: "px-5 py-2.5 text-sm rounded-xl", lg: "px-7 py-3.5 text-base rounded-xl" };
  const variants = {
    primary: "bg-[#8B2626] text-white hover:bg-[#6E1E1E] shadow-sm hover:shadow-md hover:-translate-y-px",
    secondary: "bg-white text-[#333333] border border-[#E8DDD0] hover:border-[#8B2626]/30 hover:bg-[#FAF6EE]",
    ghost: "text-[#666666] hover:text-[#333333] hover:bg-black/5",
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar({ currentPage, setCurrentPage, userState, setUserState, isDark, setIsDark }: {
  currentPage: Page; setCurrentPage: (p: Page) => void;
  userState: UserState; setUserState: (s: UserState) => void;
  isDark: boolean; setIsDark: (d: boolean) => void;
}) {
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = [
    { label: "Home", page: "home" as Page },
    { label: "Universities", page: "comparison" as Page },
    { label: "Scholarships", page: "scholarships" as Page },
    { label: "AI Advisor", page: "chat" as Page },
    { label: "Counseling", page: "booking" as Page },
  ];

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-[#1A0E0A]/95 backdrop-blur-xl border-b border-[#E8DDD0] dark:border-[#E8DDD0]/10 shadow-sm" : ""}`}
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <button onClick={() => setCurrentPage("home")} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#8B2626] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] tracking-tight" style={serif}>
            Edu<span className="text-[#8B2626]">Path</span>
          </span>
        </button>

        {/* Center nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map(n => (
            <button
              key={n.page}
              onClick={() => setCurrentPage(n.page)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === n.page ? "text-[#8B2626] bg-[#8B2626]/8" : "text-[#666666] hover:text-[#333333] hover:bg-black/5"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="p-2 rounded-xl text-[#666666] hover:text-[#333333] hover:bg-black/5 transition-all"><Search size={18} /></button>
          {userState !== "anonymous" && (
            <button className="p-2 rounded-xl text-[#666666] hover:text-[#333333] hover:bg-black/5 transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#8B2626] rounded-full" />
            </button>
          )}
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-xl text-[#666666] hover:text-[#333333] hover:bg-black/5 transition-all">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {userState === "anonymous" ? (
            <>
              <button onClick={() => setUserState("logged-in")} className="px-4 py-2 text-sm font-medium text-[#333333] hover:text-[#8B2626] transition-colors">Login</button>
              <Btn onClick={() => setCurrentPage("booking")}>Book Counseling</Btn>
            </>
          ) : (
            <button onClick={() => setCurrentPage("dashboard")} className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-[#F3EDE3] hover:bg-[#EDE8DF] transition-all">
              <div className="w-7 h-7 rounded-full bg-[#8B2626] flex items-center justify-center"><User size={13} className="text-white" /></div>
              <span className="text-sm font-semibold text-[#333333]">My Account</span>
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobile(!mobile)} className="lg:hidden p-2 rounded-xl text-[#666666] hover:bg-black/5">
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#1A0E0A] border-t border-[#E8DDD0] dark:border-white/10 overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {nav.map(n => (
                <button key={n.page} onClick={() => { setCurrentPage(n.page); setMobile(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${currentPage === n.page ? "bg-[#8B2626]/8 text-[#8B2626]" : "text-[#333333] hover:bg-[#FAF6EE]"}`}>
                  {n.label}
                </button>
              ))}
              <div className="pt-3 border-t border-[#E8DDD0] flex flex-col gap-2">
                {userState === "anonymous" ? (
                  <>
                    <button onClick={() => { setUserState("logged-in"); setMobile(false); }} className="w-full py-3 text-sm font-semibold text-[#333333] border border-[#E8DDD0] rounded-xl hover:bg-[#FAF6EE]">Login</button>
                    <button onClick={() => { setCurrentPage("booking"); setMobile(false); }} className="w-full py-3 text-sm font-semibold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E]">Book Counseling</button>
                  </>
                ) : (
                  <button onClick={() => { setCurrentPage("dashboard"); setMobile(false); }} className="w-full py-3 text-sm font-semibold text-white bg-[#8B2626] rounded-xl">My Dashboard</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── University Card ────────────────────────────────────────────────────────
function UniversityCard({ uni, saved, onSave, onView }: {
  uni: typeof UNIVERSITIES[0]; saved: boolean; onSave: () => void; onView: () => void;
}) {
  return (
    <motion.div
      className="bg-white dark:bg-[#241410] rounded-[20px] overflow-hidden border border-[#E8DDD0] dark:border-white/8 group cursor-pointer"
      whileHover={{ y: -5, boxShadow: "0 24px 48px rgba(139,38,38,0.09)" }}
      transition={{ duration: 0.22 }}
    >
      <div className="relative h-44 overflow-hidden bg-[#EDE8DF]">
        <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-107" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#8B2626] text-white text-[11px] font-bold rounded-lg">#{uni.ranking} World</div>
        <button onClick={e => { e.stopPropagation(); onSave(); }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${saved ? "bg-[#8B2626] text-white" : "bg-white/80 text-[#666666] hover:bg-white"}`}>
          <Heart size={13} fill={saved ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          <span className="text-lg">{uni.flag}</span>
          <span className="text-sm font-medium">{uni.country}</span>
        </div>
        {uni.scholarships && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#CFA56A] text-white text-[10px] font-semibold rounded-md">Scholarships</div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-base leading-snug mb-1 line-clamp-1" style={serif}>{uni.name}</h3>
        <p className="text-[#666666] text-xs leading-relaxed mb-4 line-clamp-2">{uni.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl p-2.5">
            <div className="text-[10px] text-[#999] mb-0.5">Annual Tuition</div>
            <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0]">{uni.tuition}</div>
          </div>
          <div className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl p-2.5">
            <div className="text-[10px] text-[#999] mb-0.5">Acceptance</div>
            <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0]">{uni.acceptanceRate}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onView} className="flex-1 py-2.5 text-xs font-bold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all">View Details</button>
          <button onClick={e => e.stopPropagation()} className="px-3 py-2.5 text-xs font-semibold text-[#8B2626] border border-[#8B2626]/25 rounded-xl hover:bg-[#8B2626]/5 transition-all">Compare</button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────
function HeroSection({ setCurrentPage, userState }: { setCurrentPage: (p: Page) => void; userState: UserState }) {
  return (
    <section className="relative pt-28 lg:pt-40 pb-16 lg:pb-28 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-[#8B2626]/6 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#CFA56A]/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-[#8B2626]/4 blur-3xl" />
        {/* Decorative grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B2626" strokeWidth="1"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Pill variant="crimson"><Sparkles size={12} />AI-Powered Admission Counseling</Pill>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
          className="mt-6 text-[2.6rem] md:text-6xl lg:text-[4.5rem] font-bold text-[#333333] dark:text-[#F5EDE0] leading-[1.1] tracking-tight"
          style={serif}
        >
          Find Your Dream<br />
          <span className="text-[#8B2626]">University Abroad</span><br />
          <span className="text-[2rem] md:text-4xl lg:text-5xl text-[#888]">with AI-Powered Guidance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 text-lg md:text-xl text-[#666666] max-w-2xl mx-auto leading-relaxed"
        >
          Navigate your international education journey with personalized AI counseling,
          expert guidance, and access to 500+ universities across 50+ countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Btn size="lg" onClick={() => setCurrentPage("comparison")}>
            Find Universities <ArrowRight size={18} />
          </Btn>
          <Btn size="lg" variant="secondary" onClick={() => userState !== "anonymous" && setCurrentPage("chat")}>
            {userState === "anonymous" && <Lock size={15} className="text-[#999]" />}
            <Bot size={18} className="text-[#8B2626]" />
            Talk to AI Counselor
          </Btn>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.46 }}
          className="mt-14 flex flex-wrap justify-center gap-10 md:gap-20"
        >
          {[
            { val: "500+", label: "Universities" },
            { val: "50+", label: "Countries" },
            { val: "10K+", label: "Students Helped" },
            { val: "95%", label: "Success Rate" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#8B2626]" style={serif}>{s.val}</div>
              <div className="text-sm text-[#666666] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating university cards */}
        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 top-0 -translate-x-8">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-48 text-left">
              <div className="text-xs text-[#999] mb-1">Acceptance Rate</div>
              <div className="text-2xl font-bold text-[#2E7D32]" style={serif}>68%</div>
              <div className="text-xs text-[#333333] font-medium">University of Toronto</div>
            </motion.div>
          </div>
          <div className="absolute right-0 top-0 translate-x-8">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-48 text-left">
              <div className="text-xs text-[#999] mb-1">Scholarship Found</div>
              <div className="text-2xl font-bold text-[#CFA56A]" style={serif}>$24K</div>
              <div className="text-xs text-[#333333] font-medium">Chevening Award</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchSection() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [course, setCourse] = useState("All Courses");
  const [budget, setBudget] = useState("Any Budget");

  return (
    <section className="pb-16">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white dark:bg-[#241410] rounded-[24px] shadow-xl border border-[#E8DDD0] dark:border-white/8 p-7 md:p-9">
          <p className="text-center text-base font-semibold text-[#333333] dark:text-[#F5EDE0] mb-6" style={serif}>
            Search from 500+ universities worldwide
          </p>
          <div className="relative mb-4">
            <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search universities, courses, or countries..."
              className="w-full pl-12 pr-5 py-3.5 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-[#333333] dark:text-[#F5EDE0] placeholder-[#999] focus:outline-none focus:border-[#8B2626]/50 focus:ring-2 focus:ring-[#8B2626]/10 text-sm transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {([
                { label: "Country", val: country, set: setCountry, opts: ["All Countries", "USA", "Canada", "UK", "Germany", "Australia", "Ireland", "New Zealand"] },
                { label: "Course", val: course, set: setCourse, opts: ["All Courses", "Engineering", "Business", "Medicine", "Law", "CS", "Arts"] },
                { label: "Budget", val: budget, set: setBudget, opts: ["Any Budget", "Under $20K", "$20K–$40K", "$40K–$60K", "$60K+"] },
              ] as const).map(f => (
                <div key={f.label} className="relative">
                  <select value={f.val} onChange={e => f.set(e.target.value as string)}
                    className="appearance-none pl-4 pr-8 py-2.5 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none cursor-pointer">
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
                </div>
              ))}
              <button className="flex items-center gap-1.5 pl-4 pr-3 py-2.5 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] rounded-xl text-sm text-[#333333] hover:border-[#8B2626]/40 transition-all">
                <Filter size={13} />More Filters
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2.5 text-sm text-[#666666] hover:text-[#333333] transition-colors">Reset</button>
              <Btn><Search size={15} />Search</Btn>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[#E8DDD0] dark:border-white/8">
            <span className="text-xs text-[#999] mr-1 mt-1">Popular:</span>
            {["Canada PR Route", "Germany Free Education", "UK Scholarships", "Australia PR", "IELTS Waiver"].map(t => (
              <button key={t} className="px-3 py-1 text-xs text-[#666666] bg-[#FAF6EE] border border-[#E8DDD0] rounded-full hover:border-[#8B2626]/40 hover:text-[#8B2626] transition-all">{t}</button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedUniversities({ setCurrentPage, userState }: { setCurrentPage: (p: Page) => void; userState: UserState }) {
  const [saved, setSaved] = useState<number[]>([]);
  const toggle = (id: number) => {
    if (userState === "anonymous") return;
    setSaved(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  };
  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Top Picks</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Featured Universities</h2>
            <p className="text-[#666666] mt-2">Handpicked institutions with excellent placement records</p>
          </div>
          <button onClick={() => setCurrentPage("comparison")} className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#8B2626] hover:gap-3 transition-all">
            View All <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSITIES.map((uni, i) => (
            <motion.div key={uni.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.09 }}>
              <UniversityCard uni={uni} saved={saved.includes(uni.id)} onSave={() => toggle(uni.id)} onView={() => setCurrentPage("university")} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountriesSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#1F1208]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Destinations</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-3" style={serif}>Study in Your Dream Country</h2>
          <p className="text-[#666666] max-w-lg mx-auto">Explore education opportunities across the world's most sought-after study destinations</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {COUNTRIES.map((c, i) => (
            <motion.button key={c.name} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -5 }}
              className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-[20px] p-4 text-center border border-[#E8DDD0] dark:border-white/8 hover:border-[#8B2626]/40 hover:shadow-lg transition-all group">
              <div className="text-4xl mb-2">{c.flag}</div>
              <div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm">{c.name}</div>
              <div className="text-[11px] text-[#666666] mt-0.5">{c.students}</div>
              <div className="text-[11px] text-[#8B2626] font-semibold mt-0.5">{c.topUnis} Unis</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIAdvisorSection({ setCurrentPage, userState }: { setCurrentPage: (p: Page) => void; userState: UserState }) {
  const features = [
    { icon: Target, title: "Personalized Recommendations", desc: "Universities matched exactly to your profile" },
    { icon: BarChart2, title: "Admission Probability", desc: "Know your chances with AI-powered prediction" },
    { icon: Award, title: "Scholarship Matching", desc: "Auto-discover scholarships you qualify for" },
    { icon: Shield, title: "Visa Guidance", desc: "Step-by-step support with document checklist" },
    { icon: FileText, title: "SOP & Essay Help", desc: "AI assistance for compelling application essays" },
    { icon: Globe, title: "24/7 Availability", desc: "Instant answers anytime, anywhere" },
  ];
  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – AI showcase */}
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="bg-gradient-to-br from-[#8B2626] to-[#5C1717] rounded-[32px] p-8 text-white relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/8" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#CFA56A]/15" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6"><Bot size={28} /></div>
                <h3 className="text-2xl font-bold mb-5" style={serif}>Your AI Admission Counselor</h3>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-xl p-3.5 text-sm">
                    <div className="text-white/50 text-xs mb-1">You asked</div>
                    <div>"What universities should I apply to with 85% marks and 7.0 IELTS?"</div>
                  </div>
                  <div className="bg-white rounded-xl p-3.5 text-sm text-[#333333]">
                    <div className="text-[#8B2626] text-xs font-bold mb-1">EduPath AI</div>
                    <div>Based on your profile, I recommend University of Toronto (safe), University of Melbourne (match), and University of Edinburgh (reach)...</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/15">
                  <div className="flex -space-x-2">
                    {["🧑", "👩", "👨"].map((e, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-[#CFA56A] border-2 border-[#8B2626] flex items-center justify-center text-xs">{e}</div>
                    ))}
                  </div>
                  <div className="text-sm text-white/70">10,000+ students counseled</div>
                </div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 top-10 bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-44">
              <div className="text-[10px] text-[#999] mb-0.5">Acceptance Probability</div>
              <div className="text-2xl font-bold text-[#2E7D32]" style={serif}>78%</div>
              <div className="text-xs text-[#333333]">University of Toronto</div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -left-5 bottom-16 bg-white rounded-2xl p-4 shadow-xl border border-[#E8DDD0] w-44">
              <div className="text-[10px] text-[#999] mb-0.5">Scholarship Found</div>
              <div className="text-2xl font-bold text-[#CFA56A]" style={serif}>$24K</div>
              <div className="text-xs text-[#333333]">Available for you</div>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">AI-Powered</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>
              Meet Your Personal AI<br />Admission Counselor
            </h2>
            <p className="text-[#666666] mb-8 leading-relaxed">
              Our AI has helped 10,000+ students navigate the complex international admissions process with personalized, data-driven guidance available 24/7.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="flex gap-3 p-3.5 rounded-xl hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12] transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#8B2626]/10 flex items-center justify-center flex-shrink-0"><f.icon size={17} className="text-[#8B2626]" /></div>
                  <div>
                    <div className="text-sm font-bold text-[#333333] dark:text-[#F5EDE0]">{f.title}</div>
                    <div className="text-xs text-[#666666] mt-0.5">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Btn size="lg" onClick={() => setCurrentPage("chat")}>
                <Sparkles size={17} /> Start AI Chat
                {userState === "anonymous" && <Lock size={13} />}
              </Btn>
              <Btn size="lg" variant="secondary">Watch Demo</Btn>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#1F1208]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Success Stories</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Students Who Made It Abroad</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.14 }}
              className="bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-[24px] p-7 border border-[#E8DDD0] dark:border-white/8 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-[#CFA56A] text-[#CFA56A]" />
                ))}
              </div>
              <p className="text-[#333333] dark:text-[#F5EDE0] text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E8DDD0] dark:border-white/10">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-[#EDE8DF]" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm">{t.name}</div>
                  <div className="text-xs text-[#666666] truncate">{t.program} · {t.university}</div>
                </div>
                <span className="text-xl">{t.countryFlag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-24">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">How It Works</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Your Journey to Studying Abroad</h2>
          <p className="text-[#666666] mt-3 max-w-lg mx-auto">From profile creation to landing abroad — we guide you through every step</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B2626] via-[#CFA56A] to-[#8B2626]/20" />
          <div className="space-y-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                className="flex gap-5 relative pl-14">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-[#8B2626] flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-[#FAF6EE] dark:ring-[#1A0E0A]">
                  {step.step}
                </div>
                <div className="flex-1 bg-white dark:bg-[#241410] rounded-[20px] p-5 border border-[#E8DDD0] dark:border-white/8 hover:border-[#8B2626]/30 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#8B2626]/10 flex items-center justify-center"><step.icon size={14} className="text-[#8B2626]" /></div>
                    <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>{step.title}</h3>
                  </div>
                  <p className="text-[#666666] text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  return (
    <section className="py-20">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-[#8B2626] via-[#6E1E1E] to-[#4A1010] rounded-[32px] p-12 md:p-16 text-white text-center relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/6" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#CFA56A]/12" />
          </div>
          <div className="relative">
            <Pill variant="gold"><Sparkles size={12} />Limited spots available</Pill>
            <h2 className="mt-5 text-3xl md:text-5xl font-bold" style={serif}>Start Your Journey Today</h2>
            <p className="mt-4 text-white/75 text-lg max-w-xl mx-auto">
              Join 10,000+ students who've achieved their dream of studying abroad with EduPath's expert AI guidance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setCurrentPage("profile")} className="px-8 py-4 bg-white text-[#8B2626] font-bold rounded-xl hover:bg-[#FAF6EE] transition-all text-sm">
                Create Free Profile
              </button>
              <button onClick={() => setCurrentPage("booking")} className="px-8 py-4 bg-white/10 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm">
                Book a Counselor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FooterSection({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-[#2A1A10] text-white py-16">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#8B2626] flex items-center justify-center"><GraduationCap size={17} className="text-white" /></div>
              <span className="text-xl font-bold" style={serif}>EduPath</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              AI-powered abroad education counseling platform helping students achieve their international university dreams.
            </p>
            <div className="flex gap-2">
              {[Twitter, Linkedin, Instagram, Facebook, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center hover:bg-[#8B2626] transition-all"><Icon size={13} /></button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-5 text-white/45">Platform</h4>
            <ul className="space-y-3">
              {[{ l: "Universities", p: "comparison" }, { l: "Scholarships", p: "scholarships" }, { l: "AI Advisor", p: "chat" }, { l: "Book Counseling", p: "booking" }, { l: "Dashboard", p: "dashboard" }].map(n => (
                <li key={n.l}><button onClick={() => setCurrentPage(n.p as Page)} className="text-white/60 hover:text-white text-sm transition-colors">{n.l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-5 text-white/45">Study Destinations</h4>
            <ul className="space-y-3">
              {COUNTRIES.map(c => (
                <li key={c.name}><button className="text-white/60 hover:text-white text-sm transition-colors">{c.flag} {c.name}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-5 text-white/45">Newsletter</h4>
            <p className="text-white/55 text-sm mb-4">Get the latest scholarships and admission tips in your inbox.</p>
            <div className="flex gap-2">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-white/8 border border-white/15 rounded-xl text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/30" />
              <button className="px-4 py-2.5 bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all flex-shrink-0"><ArrowRight size={16} /></button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/55"><CheckCircle size={13} className="text-[#CFA56A]" />Free forever plan</div>
              <div className="flex items-center gap-2 text-sm text-white/55"><CheckCircle size={13} className="text-[#CFA56A]" />No credit card required</div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/35 text-sm">© 2025 EduPath. All rights reserved.</div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <button key={l} className="text-white/35 text-sm hover:text-white/70 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ setCurrentPage, userState }: { setCurrentPage: (p: Page) => void; userState: UserState }) {
  return (
    <>
      <HeroSection setCurrentPage={setCurrentPage} userState={userState} />
      <SearchSection />
      <FeaturedUniversities setCurrentPage={setCurrentPage} userState={userState} />
      <CountriesSection />
      <AIAdvisorSection setCurrentPage={setCurrentPage} userState={userState} />
      <TestimonialsSection />
      <ProcessSection />
      <CTABanner setCurrentPage={setCurrentPage} />
    </>
  );
}

// ─── AI Chat ───────────────────────────────────────────────────────────────
function AIChatPage({ userState }: { userState: UserState }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  const isLocked = userState === "anonymous";
  const isLimited = userState === "logged-in" && dailyCount >= 3;

  const send = () => {
    if (!input.trim() || isLocked || isLimited) return;
    const userMsg: Message = { id: messages.length + 1, role: "user", content: input, timestamp: new Date() };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setTyping(true);
    setDailyCount(p => p + 1);
    setTimeout(() => {
      const reply: Message = { id: messages.length + 2, role: "assistant", content: AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)], timestamp: new Date() };
      setMessages(p => [...p, reply]);
      setTyping(false);
    }, 1600);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const convos = [
    { title: "University recommendations for CS", date: "Today", active: true },
    { title: "Scholarship guidance UK", date: "Yesterday", active: false },
    { title: "SOP review – Canada MBA", date: "Jul 8", active: false },
    { title: "Visa requirements Germany", date: "Jul 5", active: false },
  ];

  return (
    <div className="flex h-screen pt-16 lg:pt-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-[#241410] border-r border-[#E8DDD0] dark:border-white/8 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Conversations</h3>
          <button className="p-1.5 rounded-lg hover:bg-[#FAF6EE] text-[#666666]"><Plus size={16} /></button>
        </div>
        {userState !== "complete" && (
          <div className="mb-4 p-3 bg-[#8B2626]/8 border border-[#8B2626]/20 rounded-xl">
            <div className="text-xs font-bold text-[#8B2626] mb-0.5">Complete your profile</div>
            <div className="text-xs text-[#666666]">Unlock personalized AI recommendations</div>
          </div>
        )}
        <div className="space-y-1 flex-1 overflow-y-auto">
          {convos.map((c, i) => (
            <button key={i} className={`w-full text-left px-3 py-3 rounded-xl transition-all ${c.active ? "bg-[#8B2626]/8 border border-[#8B2626]/20" : "hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12]"}`}>
              <div className={`text-sm font-medium truncate ${c.active ? "text-[#8B2626]" : "text-[#333333] dark:text-[#F5EDE0]"}`}>{c.title}</div>
              <div className="text-xs text-[#999] mt-0.5">{c.date}</div>
            </button>
          ))}
        </div>
        {userState === "logged-in" && (
          <div className="mt-4 p-3 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0]">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">Daily Questions</span>
              <span className="font-bold text-[#8B2626]">{dailyCount}/3</span>
            </div>
            <div className="h-1.5 bg-[#E8DDD0] rounded-full">
              <div className="h-full bg-[#8B2626] rounded-full transition-all" style={{ width: `${(dailyCount / 3) * 100}%` }} />
            </div>
            <div className="text-xs text-[#666666] mt-1.5">Upgrade for unlimited access</div>
          </div>
        )}
      </aside>

      {/* Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white dark:bg-[#241410] border-b border-[#E8DDD0] dark:border-white/8 px-5 py-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8B2626] flex items-center justify-center flex-shrink-0"><Bot size={17} className="text-white" /></div>
          <div>
            <div className="font-bold text-sm text-[#333333] dark:text-[#F5EDE0]">EduPath AI Counselor</div>
            <div className="text-xs text-[#2E7D32] flex items-center gap-1"><div className="w-1.5 h-1.5 bg-[#2E7D32] rounded-full" />Online</div>
          </div>
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#666666] border border-[#E8DDD0] rounded-xl hover:bg-[#FAF6EE]">
            <Upload size={12} />Upload Docs
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
          {isLocked && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#8B2626]/10 flex items-center justify-center mx-auto mb-4"><Lock size={28} className="text-[#8B2626]" /></div>
              <h3 className="font-bold text-[#333333] text-xl mb-2" style={serif}>Sign in to Chat with AI</h3>
              <p className="text-[#666666] text-sm max-w-xs mx-auto">Create a free account to access your personal AI admission counselor.</p>
            </motion.div>
          )}
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-[#8B2626] flex items-center justify-center flex-shrink-0 mt-0.5"><Bot size={15} className="text-white" /></div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-[#8B2626] text-white rounded-tr-sm" : "bg-white dark:bg-[#241410] border border-[#E8DDD0] dark:border-white/8 text-[#333333] dark:text-[#F5EDE0] rounded-tl-sm"}`}>
                <div className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</div>
                <div className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/55" : "text-[#999]"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#8B2626] flex items-center justify-center flex-shrink-0"><Bot size={15} className="text-white" /></div>
              <div className="bg-white dark:bg-[#241410] border border-[#E8DDD0] rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <motion.div key={i} className="w-1.5 h-1.5 bg-[#8B2626] rounded-full"
                      animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && !isLocked && (
          <div className="px-4 md:px-8 pb-3">
            <div className="text-xs text-[#999] mb-2">Suggested questions:</div>
            <div className="flex flex-wrap gap-2">
              {["Which universities suit my CS profile?", "Best scholarships for Indian students?", "Compare MIT vs Stanford for MBA"].map(p => (
                <button key={p} onClick={() => setInput(p)} className="px-3 py-1.5 text-xs text-[#666666] bg-white border border-[#E8DDD0] rounded-full hover:border-[#8B2626]/40 hover:text-[#8B2626] transition-all">{p}</button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white dark:bg-[#241410] border-t border-[#E8DDD0] dark:border-white/8 px-4 md:px-8 py-4">
          {isLimited && (
            <div className="mb-3 p-3 bg-[#F9A825]/8 border border-[#F9A825]/25 rounded-xl flex items-center gap-2">
              <AlertCircle size={15} className="text-[#F9A825] flex-shrink-0" />
              <div className="text-sm text-[#333333]">Daily limit reached. <button className="text-[#8B2626] font-semibold underline">Upgrade for unlimited access.</button></div>
            </div>
          )}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-2xl px-4 py-3 focus-within:border-[#8B2626]/50 focus-within:ring-2 focus-within:ring-[#8B2626]/10 transition-all">
              <input
                value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
                disabled={isLocked || isLimited}
                placeholder={isLocked ? "Sign in to chat…" : isLimited ? "Daily limit reached…" : "Ask about universities, scholarships, visas…"}
                className="flex-1 bg-transparent text-sm text-[#333333] dark:text-[#F5EDE0] placeholder-[#999] focus:outline-none"
              />
            </div>
            <button onClick={send} disabled={!input.trim() || isLocked || isLimited}
              className="w-12 h-12 bg-[#8B2626] text-white rounded-2xl flex items-center justify-center hover:bg-[#6E1E1E] transition-all disabled:opacity-35 disabled:cursor-not-allowed">
              <Send size={17} />
            </button>
          </div>
          <p className="text-[10px] text-center text-[#999] mt-2">EduPath AI may make mistakes. Verify important information with official sources.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────
function DashboardPage({ userState, setCurrentPage }: { userState: UserState; setCurrentPage: (p: Page) => void }) {
  const stats = [
    { label: "Saved Universities", value: "12", icon: Bookmark, color: "bg-[#8B2626]/10 text-[#8B2626]" },
    { label: "Applications", value: "3", icon: FileText, color: "bg-[#CFA56A]/10 text-[#CFA56A]" },
    { label: "Upcoming Deadlines", value: "5", icon: Calendar, color: "bg-[#F9A825]/10 text-[#F9A825]" },
    { label: "Scholarships Found", value: "8", icon: Award, color: "bg-[#2E7D32]/10 text-[#2E7D32]" },
  ];
  const apps = [
    { uni: "University of Toronto", prog: "MBA", status: "In Progress", deadline: "Jan 15", flag: "🇨🇦", pct: 65 },
    { uni: "TU Munich", prog: "M.Sc. CS", status: "Documents Pending", deadline: "Dec 1", flag: "🇩🇪", pct: 30 },
    { uni: "University of Melbourne", prog: "M.Eng", status: "Submitted", deadline: "Nov 30", flag: "🇦🇺", pct: 100 },
  ];
  const navItems = [
    { l: "Dashboard", Icon: LayoutDashboard, active: true },
    { l: "Saved Universities", Icon: Bookmark },
    { l: "Applications", Icon: FileText },
    { l: "Scholarships", Icon: Award, action: () => setCurrentPage("scholarships") },
    { l: "AI Advisor", Icon: Bot, action: () => setCurrentPage("chat") },
    { l: "Documents", Icon: Upload },
    { l: "Counseling", Icon: Calendar, action: () => setCurrentPage("booking") },
    { l: "Payments", Icon: CreditCard },
    { l: "Profile", Icon: User, action: () => setCurrentPage("profile") },
    { l: "Settings", Icon: Settings },
  ];
  return (
    <div className="flex min-h-screen pt-16 lg:pt-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#241410] border-r border-[#E8DDD0] dark:border-white/8 pt-6 pb-6 px-4">
        <div className="flex items-center gap-3 px-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#8B2626] flex items-center justify-center"><User size={17} className="text-white" /></div>
          <div>
            <div className="font-bold text-sm text-[#333333] dark:text-[#F5EDE0]">Arjun Mehta</div>
            <div className="text-xs text-[#666666]">{userState === "complete" ? "Profile Complete ✓" : "Profile Incomplete"}</div>
          </div>
        </div>
        {userState !== "complete" && (
          <div className="mb-4 mx-3 p-3 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0]">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">Profile</span>
              <span className="font-bold text-[#8B2626]">60%</span>
            </div>
            <div className="h-1.5 bg-[#E8DDD0] rounded-full mb-2"><div className="h-full bg-[#8B2626] rounded-full w-[60%]" /></div>
            <button onClick={() => setCurrentPage("profile")} className="text-xs text-[#8B2626] font-semibold">Complete profile →</button>
          </div>
        )}
        <nav className="space-y-0.5 flex-1">
          {navItems.map(n => (
            <button key={n.l} onClick={n.action}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${n.active ? "bg-[#8B2626]/8 text-[#8B2626] font-semibold" : "text-[#666666] hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12] hover:text-[#333333] dark:hover:text-[#F5EDE0]"}`}>
              <n.Icon size={15} />{n.l}
            </button>
          ))}
        </nav>
        <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#666666] hover:text-[#D32F2F] transition-colors"><LogOut size={15} />Sign Out</button>
      </aside>

      {/* Main */}
      <div className="flex-1 p-5 lg:p-8 overflow-auto">
        <div className="max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Good morning, Arjun 👋</h1>
            <p className="text-[#666666] mt-1">Here's your admission journey overview</p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
                className="bg-white dark:bg-[#241410] rounded-[20px] p-5 border border-[#E8DDD0] dark:border-white/8 hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={19} /></div>
                <div className="text-2xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>{s.value}</div>
                <div className="text-xs text-[#666666] mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>
          {/* Applications */}
          <div className="bg-white dark:bg-[#241410] rounded-[24px] border border-[#E8DDD0] dark:border-white/8 mb-6 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[#E8DDD0] dark:border-white/8">
              <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>My Applications</h2>
              <button className="text-xs text-[#8B2626] font-semibold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-[#E8DDD0] dark:divide-white/8">
              {apps.map((a, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12] transition-all">
                  <span className="text-2xl">{a.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#333333] dark:text-[#F5EDE0] text-sm">{a.uni}</div>
                    <div className="text-xs text-[#666666]">{a.prog}</div>
                  </div>
                  <span className={`hidden md:inline-flex text-xs px-2.5 py-1 rounded-full font-semibold ${a.status === "Submitted" ? "bg-[#2E7D32]/10 text-[#2E7D32]" : a.status === "In Progress" ? "bg-[#CFA56A]/10 text-[#CFA56A]" : "bg-[#F9A825]/10 text-[#F9A825]"}`}>
                    {a.status}
                  </span>
                  <div className="hidden lg:flex flex-col items-end gap-1.5 w-36">
                    <div className="text-xs text-[#666666]">Deadline: {a.deadline}</div>
                    <div className="w-full h-1.5 bg-[#E8DDD0] rounded-full">
                      <div className={`h-full rounded-full ${a.pct === 100 ? "bg-[#2E7D32]" : "bg-[#8B2626]"}`} style={{ width: `${a.pct}%` }} />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#333333] dark:text-[#F5EDE0] w-8 text-right">{a.pct}%</div>
                </div>
              ))}
            </div>
          </div>
          {/* AI Banner */}
          <div className="bg-gradient-to-r from-[#8B2626] to-[#5C1717] rounded-[24px] p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0"><Sparkles size={22} /></div>
              <div>
                <div className="font-bold text-base" style={serif}>{userState === "complete" ? "8 new AI recommendations ready" : "Complete your profile for AI recommendations"}</div>
                <div className="text-white/65 text-sm">Personalized university matches based on your profile</div>
              </div>
            </div>
            <button onClick={() => setCurrentPage("chat")} className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-white text-[#8B2626] text-sm font-bold rounded-xl hover:bg-[#FAF6EE] transition-all">
              View <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scholarships ──────────────────────────────────────────────────────────
function ScholarshipsPage({ userState }: { userState: UserState }) {
  const [savedIds, setSavedIds] = useState<number[]>([2, 5]);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterCat, setFilterCat] = useState("All");
  const filtered = SCHOLARSHIPS.filter(s =>
    (filterCountry === "All" || s.country === filterCountry) &&
    (filterCat === "All" || s.category === filterCat)
  );
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="mb-10">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Funding</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Scholarship Explorer</h1>
          <p className="text-[#666666]">Discover scholarships worth millions — filtered for your profile</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-[#241410] p-4 rounded-[20px] border border-[#E8DDD0] dark:border-white/8 shadow-sm items-center">
          <div className="flex items-center gap-2 text-sm text-[#666666] font-semibold mr-2"><Filter size={15} />Filter:</div>
          {["All", "UK", "Canada", "Australia", "Germany", "New Zealand"].map(c => (
            <button key={c} onClick={() => setFilterCountry(c)} className={`px-3 py-1.5 text-xs rounded-full border transition-all font-medium ${filterCountry === c ? "bg-[#8B2626] text-white border-[#8B2626]" : "border-[#E8DDD0] text-[#666666] hover:border-[#8B2626]/40"}`}>{c}</button>
          ))}
          <div className="w-px h-6 bg-[#E8DDD0] hidden md:block" />
          {["All", "Government", "Academic", "University"].map(c => (
            <button key={c} onClick={() => setFilterCat(c)} className={`px-3 py-1.5 text-xs rounded-full border transition-all font-medium ${filterCat === c ? "bg-[#CFA56A] text-white border-[#CFA56A]" : "border-[#E8DDD0] text-[#666666] hover:border-[#CFA56A]/40"}`}>{c}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-[#241410] rounded-[20px] p-6 border border-[#E8DDD0] dark:border-white/8 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.flag}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.category === "Government" ? "bg-blue-50 text-blue-600" : s.category === "Academic" ? "bg-purple-50 text-purple-600" : "bg-[#CFA56A]/10 text-[#CFA56A]"}`}>{s.category}</span>
                </div>
                <button onClick={() => setSavedIds(p => p.includes(s.id) ? p.filter(x => x !== s.id) : [...p, s.id])}
                  className={`p-2 rounded-full transition-all ${savedIds.includes(s.id) ? "text-[#8B2626] bg-[#8B2626]/10" : "text-[#999] hover:bg-[#FAF6EE]"}`}>
                  <Bookmark size={15} fill={savedIds.includes(s.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-base mb-1" style={serif}>{s.name}</h3>
              <div className="text-xl font-bold text-[#2E7D32] mb-3" style={serif}>{s.amount}</div>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#666666]">
                  <Calendar size={11} className="text-[#CFA56A] flex-shrink-0" />
                  Deadline: <span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">{s.deadline}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#666666]">
                  <CheckCircle size={11} className="text-[#CFA56A] flex-shrink-0" />{s.eligibility}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {s.coverage.map(c => (
                  <span key={c} className="text-xs px-2 py-0.5 bg-[#FAF6EE] dark:bg-[#2E1A12] text-[#666666] rounded-md border border-[#E8DDD0]">{c}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 text-xs font-bold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all">Apply Now</button>
                <button className="px-3 py-2.5 text-[#666666] border border-[#E8DDD0] rounded-xl hover:bg-[#FAF6EE] transition-all"><ExternalLink size={13} /></button>
              </div>
              {userState === "anonymous" && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#999]"><Lock size={10} />Sign in to track this scholarship</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Comparison ─────────────────────────────────────────────────────────────
function ComparisonPage({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  const [sel, setSel] = useState([0, 1, 2]);
  const unis = sel.map(i => UNIVERSITIES[i]);
  const rows = [
    { label: "Global Ranking", get: (u: typeof UNIVERSITIES[0]) => `#${u.ranking}` },
    { label: "Country", get: (u: typeof UNIVERSITIES[0]) => `${u.flag} ${u.country}` },
    { label: "Annual Tuition", get: (u: typeof UNIVERSITIES[0]) => u.tuition },
    { label: "Acceptance Rate", get: (u: typeof UNIVERSITIES[0]) => u.acceptanceRate },
    { label: "IELTS Required", get: (u: typeof UNIVERSITIES[0]) => u.ieltsRequired },
    { label: "Scholarships", get: (u: typeof UNIVERSITIES[0]) => u.scholarships ? "✓ Available" : "✗ None" },
    { label: "University Type", get: (u: typeof UNIVERSITIES[0]) => u.type },
    { label: "Top Programs", get: (u: typeof UNIVERSITIES[0]) => u.programs.slice(0, 2).join(", ") },
  ];
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="mb-8">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Side-by-Side</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Compare Universities</h1>
          <p className="text-[#666666]">Make informed decisions with detailed comparisons</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[0, 1, 2].map(slot => (
            <div key={slot} className="relative">
              <select value={sel[slot]} onChange={e => { const n = [...sel]; n[slot] = +e.target.value; setSel(n); }}
                className="w-full px-4 py-3 bg-white dark:bg-[#241410] border border-[#E8DDD0] dark:border-white/8 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none focus:border-[#8B2626]/50 appearance-none cursor-pointer">
                {UNIVERSITIES.map((u, i) => <option key={u.id} value={i}>{u.shortName} — {u.country}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] pointer-events-none" />
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-[#241410] rounded-[24px] border border-[#E8DDD0] dark:border-white/8 overflow-hidden shadow-sm">
          <div className="grid grid-cols-4 border-b border-[#E8DDD0] dark:border-white/8">
            <div className="p-5 border-r border-[#E8DDD0] dark:border-white/8 flex items-center">
              <span className="text-xs font-bold text-[#666666] uppercase tracking-wider">Criteria</span>
            </div>
            {unis.map(u => (
              <div key={u.id} className="p-4 text-center border-r border-[#E8DDD0] dark:border-white/8 last:border-r-0">
                <img src={u.image} alt={u.name} className="w-full h-20 object-cover rounded-xl mb-2.5 bg-[#EDE8DF]" />
                <div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm leading-tight" style={serif}>{u.shortName}</div>
                <div className="text-xs text-[#666666] mt-0.5">{u.flag} {u.country}</div>
              </div>
            ))}
          </div>
          {rows.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-4 border-b border-[#E8DDD0] dark:border-white/8 last:border-b-0 ${i % 2 === 0 ? "" : "bg-[#FAF6EE] dark:bg-[#2E1A12]/50"}`}>
              <div className="p-4 border-r border-[#E8DDD0] dark:border-white/8 flex items-center">
                <span className="text-sm text-[#666666] font-medium">{row.label}</span>
              </div>
              {unis.map(u => (
                <div key={u.id} className="p-4 text-center border-r border-[#E8DDD0] dark:border-white/8 last:border-r-0 flex items-center justify-center">
                  <span className={`text-sm font-bold ${row.get(u).includes("✓") ? "text-[#2E7D32]" : row.get(u).includes("✗") ? "text-[#D32F2F]" : "text-[#333333] dark:text-[#F5EDE0]"}`}>
                    {row.get(u)}
                  </span>
                </div>
              ))}
            </div>
          ))}
          <div className="grid grid-cols-4 bg-[#FAF6EE] dark:bg-[#2E1A12]/50">
            <div className="p-4 border-r border-[#E8DDD0] dark:border-white/8 flex items-center">
              <span className="text-sm text-[#666666] font-semibold">Actions</span>
            </div>
            {unis.map(u => (
              <div key={u.id} className="p-3 flex flex-col gap-2 border-r border-[#E8DDD0] last:border-r-0">
                <button onClick={() => setCurrentPage("university")} className="py-2 text-xs font-bold text-white bg-[#8B2626] rounded-xl hover:bg-[#6E1E1E] transition-all">Apply</button>
                <button className="py-2 text-xs font-semibold text-[#666666] border border-[#E8DDD0] rounded-xl hover:bg-white transition-all">Save</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── University Detail ─────────────────────────────────────────────────────
function UniversityDetailPage({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) {
  const uni = UNIVERSITIES[0];
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Programs", "Admissions", "Scholarships", "Reviews"];
  return (
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#1A0E0A] pt-16 lg:pt-20">
      <div className="relative h-72 md:h-96 overflow-hidden bg-[#333333]">
        <img src={uni.image} alt={uni.name} className="w-full h-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-5 right-5 max-w-[1280px] mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-[#8B2626] text-white text-xs font-bold rounded-lg">#{uni.ranking} World</span>
                <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-lg backdrop-blur-sm">{uni.flag} {uni.country}</span>
                <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-lg backdrop-blur-sm">{uni.type}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white" style={serif}>{uni.name}</h1>
              <p className="text-white/65 text-sm mt-1 flex items-center gap-1"><MapPin size={12} />Cambridge, Massachusetts, USA</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSaved(!saved)} className={`p-3 rounded-xl backdrop-blur-sm transition-all ${saved ? "bg-[#8B2626] text-white" : "bg-white/20 text-white hover:bg-white/30"}`}>
                <Heart size={17} fill={saved ? "currentColor" : "none"} />
              </button>
              <button className="px-5 py-2.5 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all text-sm">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
      {/* Quick stats */}
      <div className="bg-white dark:bg-[#241410] border-b border-[#E8DDD0] dark:border-white/8">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { l: "Annual Tuition", v: uni.tuition, Icon: DollarSign },
              { l: "Acceptance Rate", v: uni.acceptanceRate, Icon: TrendingUp },
              { l: "IELTS Required", v: uni.ieltsRequired, Icon: BookOpen },
              { l: "Scholarships", v: "Available", Icon: Award },
            ].map(s => (
              <div key={s.l} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B2626]/10 flex items-center justify-center"><s.Icon size={17} className="text-[#8B2626]" /></div>
                <div><div className="text-xs text-[#666666]">{s.l}</div><div className="font-bold text-[#333333] dark:text-[#F5EDE0] text-sm">{s.v}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white dark:bg-[#241410] border-b border-[#E8DDD0] dark:border-white/8 sticky top-16 lg:top-20 z-40">
        <div className="max-w-[1280px] mx-auto px-5 lg:px-8 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${tab === t ? "border-[#8B2626] text-[#8B2626]" : "border-transparent text-[#666666] hover:text-[#333333]"}`}>{t}</button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>About MIT</h2>
              <p className="text-[#666666] leading-relaxed text-sm">
                The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. Established in 1861, MIT has since played a key role in the development of modern technology and science, and is consistently ranked among the world's top universities. MIT is renowned for its rigorous academics, cutting-edge research, and culture of innovation and entrepreneurship.
              </p>
            </div>
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>Top Programs</h2>
              <div className="grid grid-cols-2 gap-3">
                {["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Management", "Physics", "Mathematics"].map(p => (
                  <div key={p} className="flex items-center gap-2.5 p-3 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0]">
                    <CheckCircle size={15} className="text-[#2E7D32] flex-shrink-0" /><span className="text-sm text-[#333333] dark:text-[#F5EDE0] font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-xl mb-4" style={serif}>Admission Requirements</h2>
              <div className="space-y-0 divide-y divide-[#E8DDD0] dark:divide-white/8">
                {[
                  ["Academic Score", "90%+ or equivalent"],
                  ["IELTS / TOEFL", "7.0+ / 100+"],
                  ["GRE / GMAT", "Required for most programs"],
                  ["Statement of Purpose", "750–1000 words"],
                  ["Letters of Recommendation", "3 letters required"],
                  ["Application Deadline", "Dec 1 (Early) / Jan 15 (Regular)"],
                ].map(([req, val]) => (
                  <div key={req} className="flex items-center justify-between py-3">
                    <span className="text-sm text-[#666666]">{req}</span>
                    <span className="text-sm font-bold text-[#333333] dark:text-[#F5EDE0] text-right ml-4">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-3" style={serif}>Book Counseling</h3>
              <p className="text-sm text-[#666666] mb-4">Personalized MIT application guidance from certified counselors.</p>
              <button onClick={() => setCurrentPage("booking")} className="w-full py-3 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all text-sm">Book a Session</button>
            </div>
            <div className="bg-gradient-to-br from-[#8B2626] to-[#5C1717] rounded-[24px] p-6 text-white">
              <div className="flex items-center gap-2.5 mb-3"><Bot size={18} /><h3 className="font-bold" style={serif}>Ask AI about MIT</h3></div>
              <p className="text-white/65 text-sm mb-4">Instant answers about programs, requirements, and your admission chances.</p>
              <button onClick={() => setCurrentPage("chat")} className="w-full py-2.5 bg-white/15 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/25 transition-all text-sm">Start Chat</button>
            </div>
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <h3 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>Admission Timeline</h3>
              <div className="space-y-0">
                {[["Sep", "Application opens"], ["Nov", "Early application deadline"], ["Jan", "Regular deadline"], ["Mar", "Decisions released"], ["May", "Enrollment confirmation"], ["Sep", "Classes begin"]].map(([mo, ev]) => (
                  <div key={mo + ev} className="flex gap-3 py-2.5 border-b border-[#E8DDD0] dark:border-white/8 last:border-b-0">
                    <div className="w-9 h-9 rounded-lg bg-[#8B2626]/10 flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-[#8B2626]">{mo}</span></div>
                    <div className="flex-1 flex items-center"><span className="text-sm text-[#333333] dark:text-[#F5EDE0]">{ev}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Booking ────────────────────────────────────────────────────────────────
function BookingPage() {
  const [selDate, setSelDate] = useState(15);
  const [selTime, setSelTime] = useState("10:00 AM");
  const [selCounselor, setSelCounselor] = useState(0);
  const counselors = [
    { name: "Dr. Sarah Mitchell", spec: "USA & Canada", langs: ["English", "Hindi"], rating: 4.9, sessions: 1240, img: "https://images.unsplash.com/photo-1494790108755-2616b612b1e3?w=100&h=100&fit=crop&auto=format" },
    { name: "Prof. James Harrison", spec: "UK & Ireland", langs: ["English"], rating: 4.8, sessions: 980, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format" },
    { name: "Dr. Anika Patel", spec: "Germany & Europe", langs: ["English", "Hindi"], rating: 4.9, sessions: 1560, img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format" },
  ];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  const unavail = [1, 2, 3, 5, 10, 12, 18, 20, 25, 26, 27];
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-8">
        <div className="mb-10">
          <div className="text-sm font-semibold text-[#8B2626] mb-2 uppercase tracking-wider">Expert Guidance</div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Book a Counseling Session</h1>
          <p className="text-[#666666]">Connect with certified education counselors for personalized guidance</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Counselors */}
          <div>
            <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] text-lg mb-4" style={serif}>Select Counselor</h2>
            <div className="space-y-3">
              {counselors.map((c, i) => (
                <button key={i} onClick={() => setSelCounselor(i)}
                  className={`w-full text-left p-4 rounded-[20px] border-2 transition-all ${selCounselor === i ? "border-[#8B2626] bg-[#8B2626]/5" : "border-[#E8DDD0] bg-white dark:bg-[#241410] hover:border-[#8B2626]/40"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={c.img} alt={c.name} className="w-11 h-11 rounded-full object-cover bg-[#EDE8DF]" />
                    <div>
                      <div className="font-bold text-sm text-[#333333] dark:text-[#F5EDE0]">{c.name}</div>
                      <div className="text-xs text-[#8B2626] font-medium">{c.spec}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1"><Star size={11} className="fill-[#CFA56A] text-[#CFA56A]" /><span className="font-bold text-[#333333] dark:text-[#F5EDE0]">{c.rating}</span><span className="text-[#666666]">({c.sessions})</span></div>
                    <div className="flex gap-1">{c.langs.map(l => <span key={l} className="px-1.5 py-0.5 bg-[#FAF6EE] border border-[#E8DDD0] rounded text-[#666666] text-[10px]">{l}</span>)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Calendar + Time + Confirm */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>July 2025</h2>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className="text-[10px] text-center text-[#999] py-1 font-bold uppercase tracking-wider">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[0, 1].map(i => <div key={i} />)}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <button key={day} disabled={unavail.includes(day)} onClick={() => setSelDate(day)}
                    className={`h-9 w-full rounded-xl text-sm font-semibold transition-all ${selDate === day ? "bg-[#8B2626] text-white shadow-sm" : unavail.includes(day) ? "text-[#CCC] cursor-not-allowed" : "text-[#333333] dark:text-[#F5EDE0] hover:bg-[#FAF6EE] dark:hover:bg-[#2E1A12]"}`}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>Available Slots</h2>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {times.map(t => (
                  <button key={t} onClick={() => setSelTime(t)}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${selTime === t ? "bg-[#8B2626] text-white shadow-sm" : "bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/8 text-[#333333] dark:text-[#F5EDE0] hover:border-[#8B2626]/40"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-[#241410] rounded-[24px] p-6 border border-[#E8DDD0] dark:border-white/8">
              <h2 className="font-bold text-[#333333] dark:text-[#F5EDE0] mb-4" style={serif}>Session Mode</h2>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[{ l: "Google Meet", I: Globe }, { l: "Zoom", I: Users }, { l: "Offline", I: Building }].map((o, i) => (
                  <button key={o.l} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/5" : "border-[#E8DDD0] hover:border-[#8B2626]/40"}`}>
                    <o.I size={19} className={i === 0 ? "text-[#8B2626]" : "text-[#666666]"} />
                    <span className="text-xs font-semibold text-[#333333] dark:text-[#F5EDE0]">{o.l}</span>
                  </button>
                ))}
              </div>
              <div className="p-4 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0] mb-4 space-y-2.5">
                {[
                  ["Counselor", counselors[selCounselor].name],
                  ["Date", `July ${selDate}, 2025`],
                  ["Time", `${selTime} IST`],
                  ["Duration", "60 minutes"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-[#666666]">{k}</span><span className="font-semibold text-[#333333] dark:text-[#F5EDE0]">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm pt-2 border-t border-[#E8DDD0] dark:border-white/10">
                  <span className="font-bold text-[#333333] dark:text-[#F5EDE0]">Session Fee</span>
                  <span className="font-bold text-[#333333] dark:text-[#F5EDE0]">₹2,999</span>
                </div>
              </div>
              <button className="w-full py-4 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all">Confirm & Pay ₹2,999</button>
              <p className="text-xs text-center text-[#999] mt-2">Secure payment · Instant confirmation · Free rescheduling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Wizard ────────────────────────────────────────────────────────
function ProfileWizardPage({ setUserState, setCurrentPage }: { setUserState: (s: UserState) => void; setCurrentPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const total = 6;
  const labels = ["Personal Info", "Education", "Budget & Country", "English Scores", "Career Goals", "Review"];
  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#FAF6EE] dark:bg-[#1A0E0A]">
      <div className="max-w-2xl mx-auto px-5">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-[#333333] dark:text-[#F5EDE0]" style={serif}>Complete Your Profile</h1>
            <span className="text-sm text-[#666666]">Step {step} of {total}</span>
          </div>
          <div className="flex gap-1.5 mb-4">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${i < step ? "bg-[#8B2626]" : "bg-[#E8DDD0]"}`} />
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {labels.map((l, i) => (
              <span key={l} className={`text-xs px-2.5 py-1 rounded-full font-medium ${i + 1 === step ? "bg-[#8B2626] text-white" : i + 1 < step ? "bg-[#2E7D32]/10 text-[#2E7D32]" : "bg-[#E8DDD0] text-[#666666]"}`}>
                {i + 1 < step ? "✓ " : ""}{l}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }}
            className="bg-white dark:bg-[#241410] rounded-[24px] border border-[#E8DDD0] dark:border-white/8 p-7 shadow-sm">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[["First Name", "Arjun"], ["Last Name", "Mehta"], ["Email", "arjun@email.com"], ["Phone", "+91 98765 43210"], ["Date of Birth", "15/08/2000"], ["Nationality", "Indian"]].map(([l, v], i) => (
                    <div key={l} className={i >= 2 ? "col-span-2 md:col-span-1" : ""}>
                      <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">{l}</label>
                      <input defaultValue={v} className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none focus:border-[#8B2626]/50 focus:ring-2 focus:ring-[#8B2626]/8 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Educational Background</h2>
                <div className="space-y-4">
                  {[["10th Grade Score", "92%"], ["12th Grade Score / GPA", "88%"], ["Bachelor's Degree", "B.Tech Computer Science"], ["University / College", "IIT Delhi"], ["Bachelor's GPA / Percentage", "8.5 / 10"], ["Graduation Year", "2024"]].map(([l, v]) => (
                    <div key={l}>
                      <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">{l}</label>
                      <input defaultValue={v} className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm text-[#333333] dark:text-[#F5EDE0] focus:outline-none focus:border-[#8B2626]/50 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Budget & Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-2">Annual Budget</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Under $30K", "$30K–$50K", "$50K–$80K", "$80K+", "Any Budget", "Free Only"].map((b, i) => (
                        <button key={b} className={`py-2.5 text-xs rounded-xl border font-semibold transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/8 text-[#8B2626]" : "border-[#E8DDD0] text-[#666666] hover:border-[#8B2626]/40"}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-2">Preferred Countries</label>
                    <div className="grid grid-cols-4 gap-2">
                      {COUNTRIES.map((c, i) => (
                        <button key={c.name} className={`flex flex-col items-center gap-1 py-3 text-xs border-2 rounded-xl transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/5" : "border-[#E8DDD0] hover:border-[#8B2626]/40"}`}>
                          <span className="text-xl">{c.flag}</span><span className="font-medium">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>English Proficiency</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">Test Type</label>
                    <select className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none">
                      {["IELTS", "TOEFL", "PTE", "Duolingo English Test", "Not Yet Taken"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[["Overall Score", "7.5"], ["Reading", "8.0"], ["Writing", "7.0"], ["Listening", "7.5"], ["Speaking", "7.5"]].map(([l, v]) => (
                      <div key={l}>
                        <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">{l}</label>
                        <input defaultValue={v} className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#8B2626]/50 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div>
                <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-5" style={serif}>Career Goals</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">Career Objective</label>
                    <textarea rows={4} defaultValue="I want to pursue a career in AI/ML research and eventually work at a leading tech company or start my own AI startup."
                      className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#8B2626]/50 transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-1.5">Work Experience</label>
                    <input defaultValue="2 years at Infosys as Software Engineer" className="w-full px-4 py-3 bg-[#FAF6EE] dark:bg-[#2E1A12] border border-[#E8DDD0] dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#8B2626]/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#333333] dark:text-[#F5EDE0] mb-2">Target Intake</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Fall 2025", "Spring 2026", "Fall 2026"].map((t, i) => (
                        <button key={t} className={`py-2.5 text-sm rounded-xl border-2 font-semibold transition-all ${i === 0 ? "border-[#8B2626] bg-[#8B2626]/8 text-[#8B2626]" : "border-[#E8DDD0] text-[#666666] hover:border-[#8B2626]/40"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {step === 6 && (
              <div>
                <h2 className="text-xl font-bold text-[#333333] dark:text-[#F5EDE0] mb-2" style={serif}>Profile Complete! 🎉</h2>
                <p className="text-[#666666] text-sm mb-6">Your profile is ready. Our AI will generate personalized recommendations.</p>
                <div className="space-y-2.5 mb-5">
                  {labels.slice(0, 5).map(l => (
                    <div key={l} className="flex items-center justify-between p-3.5 bg-[#FAF6EE] dark:bg-[#2E1A12] rounded-xl border border-[#E8DDD0] dark:border-white/8">
                      <span className="text-sm font-medium text-[#333333] dark:text-[#F5EDE0]">{l}</span>
                      <div className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#2E7D32]" /><span className="text-xs font-bold text-[#2E7D32]">Complete</span></div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-[#8B2626]/8 border border-[#8B2626]/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-1.5"><Sparkles size={15} className="text-[#8B2626]" /><span className="text-sm font-bold text-[#8B2626]">AI Analysis Ready</span></div>
                  <p className="text-xs text-[#666666]">Based on your profile, we've identified 12 universities with an average 68% acceptance probability and $18K in scholarship opportunities.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-5">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-[#E8DDD0] text-[#333333] dark:text-[#F5EDE0] font-semibold rounded-xl hover:bg-white dark:hover:bg-[#241410] transition-all">Back</button>
          )}
          <button onClick={() => { if (step === total) { setUserState("complete"); setCurrentPage("dashboard"); } else setStep(step + 1); }}
            className="flex-1 py-3 bg-[#8B2626] text-white font-bold rounded-xl hover:bg-[#6E1E1E] transition-all flex items-center justify-center gap-2">
            {step === total ? "View My Recommendations" : "Continue"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [userState, setUserState] = useState<UserState>("anonymous");
  const [isDark, setIsDark] = useState(false);

  const hasFooter = ["home", "comparison", "scholarships", "university"].includes(page);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDark ? "dark" : ""}`} style={sans}>
      <Navbar currentPage={page} setCurrentPage={setPage} userState={userState} setUserState={setUserState} isDark={isDark} setIsDark={setIsDark} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {page === "home" && <HomePage setCurrentPage={setPage} userState={userState} />}
            {page === "chat" && <AIChatPage userState={userState} />}
            {page === "dashboard" && <DashboardPage userState={userState} setCurrentPage={setPage} />}
            {page === "comparison" && <ComparisonPage setCurrentPage={setPage} />}
            {page === "scholarships" && <ScholarshipsPage userState={userState} />}
            {page === "university" && <UniversityDetailPage setCurrentPage={setPage} />}
            {page === "booking" && <BookingPage />}
            {page === "profile" && <ProfileWizardPage setUserState={setUserState} setCurrentPage={setPage} />}
          </motion.div>
        </AnimatePresence>
      </main>
      {hasFooter && <FooterSection setCurrentPage={setPage} />}
    </div>
  );
}
