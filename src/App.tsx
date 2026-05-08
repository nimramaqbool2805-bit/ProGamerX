import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BackgroundBeamsWithCollision } from './components/ui/BackgroundBeamsWithCollision';
import { FeatureCard } from './components/ui/GridFeatureCards';
import { TextParallaxContent } from './components/ui/TextParallaxContent';
import { Banner } from './components/ui/Banner';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { Zap, Cpu, Target, Shield, Sparkles, Menu, X, ChevronDown, Check, Globe, Users, Trophy, TrendingUp, PlayCircle, Award, MousePointer2, Mail, MessageSquare, Share2, Camera, Play, Flame } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from './lib/utils';

// Pages
import SettingsGenerator from './pages/SettingsGenerator';
import RankPlanner from './pages/RankPlanner';
import AIChat from './pages/AIChat';
import Login from './pages/Login';

// Assets
const HERO_BG = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920";
const VALORANT_IMG = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1920";
const PUBG_IMG = "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1920";
const CS2_IMG = "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&q=80&w=1920";

const features = [
  { title: 'AI Coaching', icon: Sparkles, description: 'Get real-time feedback on your gameplay from our advanced AI model.' },
  { title: 'Performance Optimization', icon: Cpu, description: 'Hardware-aware settings optimization for maximum FPS and minimal lag.' },
  { title: 'Rank Planner', icon: Target, description: 'Structured daily drills tailored to your current skill level and goals.' },
  { title: 'Anti-Lag Engine', icon: Zap, description: 'Custom network protocols to reduce ping and eliminate packet loss.' },
  { title: 'Pro Insights', icon: Zap, description: 'Direct strategies from top-tier professional players across all games.' },
  { title: 'Secure Account', icon: Shield, description: 'Military-grade encryption for all your gaming data and stats.' },
];

const pricing = [
  { name: 'Starter', price: 'Free', features: ['Basic Settings Generator', '3 AI Queries / Day', 'CS2 & Valorant Guides'], cta: 'Get Started', highlighted: false },
  { name: 'Pro Gamer', price: '$12.99', features: ['Full AI Coaching', 'Unlimited Tools', 'Rank Improvement Planner', 'Early Access to New Games'], cta: 'Go Pro', highlighted: true },
  { name: 'Esports Elite', price: '$29.99', features: ['1-on-1 Pro Review', 'Private Discord Access', 'Advanced VOD Analysis', 'Team Management Tools'], cta: 'Join Elite', highlighted: false },
];

const testimonials = [
  { name: "ApexPredator", rank: "Radiant", text: "ProGamerX changed my entire approach to training. The Rank Planner is a game changer.", stats: "K/D: 1.85", image: "https://i.pravatar.cc/150?u=12" },
  { name: "LiquidLuck", rank: "Global Elite", text: "The settings optimizer alone added 40 FPS to my rig. Unbelievable precision.", stats: "Win Rate: 68%", image: "https://i.pravatar.cc/150?u=24" },
  { name: "SilentAim", rank: "Diamond I", text: "The AI Coach is like having a pro sitting right next to you during every match.", stats: "Headshot %: 42", image: "https://i.pravatar.cc/150?u=35" },
  { name: "NeonNight", rank: "Immortal", text: "Finally a tool that doesn't just promise results but delivers data-backed improvements.", stats: "ADR: 165", image: "https://i.pravatar.cc/150?u=47" },
  { name: "ViperMain99", rank: "Ascendant", text: "The predictive routing on the AI coach gave me map control I never knew I could have.", stats: "Win Rate: 62%", image: "https://i.pravatar.cc/150?u=59" },
  { name: "ClutchKing", rank: "Faceit Lvl 10", text: "My ping dropped by 15ms instantly. The anti-lag tech is legitimate black magic.", stats: "HS%: 58", image: "https://i.pravatar.cc/150?u=61" },
  { name: "GhostSniper", rank: "Predator", text: "No more guessing my drop spots. The meta trends tell me exactly where to rotate.", stats: "Win Rate: 45%", image: "https://i.pravatar.cc/150?u=72" },
  { name: "ZeroFrame", rank: "Challenger", text: "Used the hardware tuning to eliminate micro-stutters. Game feels like butter now.", stats: "K/D: 2.1", image: "https://i.pravatar.cc/150?u=83" },
];

const communityFeedbacks = [
  "Best investment for my setup this year.",
  "The AI Coach is spooky accurate.",
  "Hit Immortal in 3 weeks using the planner.",
  "Low ping engine actually works. No more packet loss.",
  "Cleanest UI I've ever seen in a gaming app.",
  "Ranked grind feels less like a chore now.",
  "Hardware optimization literally saved me from buying a new GPU.",
  "Never playing another ranked match without ProGamerX intel.",
  "The meta trends are updated faster than the actual patch notes.",
];

function ModernLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 group cursor-pointer", className)}>
      <div className="relative size-10 md:size-14">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FF" />
              <stop offset="100%" stopColor="#B026FF" />
            </linearGradient>
            <filter id="logo-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <motion.path
            d="M20 20 L80 80 M80 20 L20 80"
            stroke="url(#logo-grad)"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            filter="url(#logo-glow)"
          />
          <motion.path
            d="M30 30 C 30 30, 60 30, 60 45 C 60 60, 30 60, 30 60 L 30 80"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
          />
        </svg>
        <div className="absolute inset-0 bg-neon-cyan/20 blur-2xl group-hover:bg-neon-cyan/40 transition-all rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl md:text-4xl font-bebas-neue text-white tracking-[0.2em] leading-none group-hover:text-neon-cyan transition-colors">
          PRO<span className="text-neon-cyan group-hover:text-white transition-colors">GAMER</span>X
        </span>
        <div className="hidden md:flex items-center gap-2 mt-1">
          <div className="h-px w-8 bg-neon-cyan/50" />
          <span className="text-[7px] uppercase tracking-[0.8em] font-black text-neutral-500">Elite Tactical Engine</span>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
        <Link to="/">
          <ModernLogo />
        </Link>
        
        <div className="hidden md:flex items-center gap-12">
          <NavLink to="/" active={location.pathname === '/'}>Arena</NavLink>
          <NavLink to="/settings" active={location.pathname === '/settings'}>Tuning</NavLink>
          <NavLink to="/planner" active={location.pathname === '/planner'}>Academy</NavLink>
          <NavLink to="/login" active={location.pathname === '/chat' || location.pathname === '/login'}>AI Coach</NavLink>
          <Link to="/login" className="relative group px-10 py-3 overflow-hidden bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] transition-all rounded-sm">
            <span className="relative z-10 group-hover:text-white">Join Elite</span>
            <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10 p-6 flex flex-col gap-6"
          >
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Arena</MobileNavLink>
            <MobileNavLink to="/settings" onClick={() => setIsOpen(false)}>Tuning</MobileNavLink>
            <MobileNavLink to="/planner" onClick={() => setIsOpen(false)}>Academy</MobileNavLink>
            <MobileNavLink to="/login" onClick={() => setIsOpen(false)}>AI Coach</MobileNavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const NavLink = ({ to, children, active }: any) => (
  <Link 
    to={to} 
    className={cn(
      "text-[10px] uppercase tracking-[0.3em] font-bold transition-all hover:text-neon-cyan relative py-2",
      active ? "text-neon-cyan" : "text-neutral-500"
    )}
  >
    {children}
    {active && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-cyan" />}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }: any) => (
  <Link to={to} onClick={onClick} className="text-2xl font-bebas-neue text-white tracking-[0.2em] hover:text-neon-cyan transition-colors">
    {children}
  </Link>
);

const GlobalBoxTrail = () => {
  const [boxes, setBoxes] = useState<Array<{ id: number, x: number, y: number, rotation: number }>>([]);
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const nextId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const distance = Math.hypot(
        clientX - lastRenderPosition.current.x,
        clientY - lastRenderPosition.current.y
      );

      if (distance > 100) {
        const newBox = {
          id: nextId.current++,
          x: clientX,
          y: clientY,
          rotation: Math.random() * 30 - 15,
        };
        
        setBoxes((prev) => [...prev, newBox]);
        lastRenderPosition.current = { x: clientX, y: clientY };

        setTimeout(() => {
          setBoxes((prev) => prev.filter(box => box.id !== newBox.id));
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {boxes.map((box) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, scale: 0.2, rotate: box.rotation - 10, y: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: box.rotation, y: -40 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", y: -80 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute pointer-events-none"
            style={{ left: box.x - 96, top: box.y - 64 }}
          >
            <div className="relative w-48 h-32 bg-neon-cyan/5 backdrop-blur-xl rounded-2xl border border-neon-cyan/20 shadow-[0_0_50px_rgba(0,242,255,0.1)] flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan rounded-br-xl" />
               </div>
               <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

function Home() {
  return (
    <div className="relative">
      <MeshBackground />
      <Hero />
      <ScrollingLogos />
      <InspirationalManifesto />
      <StatsTicker />
      <FeaturesSection />
      <GameParallaxSection />
      <MetaTrendsSection />
      <CommunityWall />
      <ComparisonSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

const MeshBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-cyan/5 rounded-full blur-[120px] animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-violet/5 rounded-full blur-[120px] animate-pulse-slow [animation-delay:2s]" />
  </div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/90 to-background z-10" />
        <img src={HERO_BG} alt="Hero" className="w-full h-full object-cover" />
      </motion.div>

      <BackgroundBeamsWithCollision className="bg-transparent!">
        <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12 w-full">
               <h1 className="text-6xl md:text-7xl lg:text-8xl font-bebas-neue text-white leading-[0.8] tracking-tighter mb-2 md:mb-4 relative group w-full text-center max-w-5xl">
                  <span className="relative z-10">LEVEL UP YOUR GAME WITH <span className="text-neon-cyan">PROGAMERX</span></span>
                  <div className="absolute inset-0 text-outline opacity-20 translate-y-2 md:translate-y-4 group-hover:translate-y-3 md:group-hover:translate-y-6 transition-transform duration-1000 hidden md:block">LEVEL UP YOUR GAME WITH PROGAMERX</div>
               </h1>
               <div className="w-32 md:w-60 h-1 md:h-2 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-green rounded-full shadow-[0_0_40px_rgba(0,242,255,0.4)]" />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mt-8 md:mt-16 w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm md:border-l-4 border-neon-cyan md:pl-10">
                <span className="text-neon-cyan font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-[10px] mb-2 md:mb-4 flex items-center gap-2">
                  <Flame size={12} /> Neural Engine v3
                </span>
                <p className="text-neutral-400 text-sm md:text-lg leading-relaxed font-dm-sans">
                  The world's most advanced tactical intelligence system, optimized for frame-perfect decision making.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <Link to="/login" className="w-full sm:w-auto group relative px-12 md:px-20 py-5 md:py-8 bg-white text-black font-black uppercase text-xs md:text-sm tracking-[0.3em] transition-all overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.1)] rounded-sm text-center">
                  <span className="relative z-10 group-hover:text-white">Start Mission</span>
                  <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
                <button className="w-full sm:w-auto px-12 md:px-16 py-5 md:py-8 border-2 border-white/10 text-white font-black uppercase text-xs md:text-sm tracking-widest hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all rounded-sm">
                  Briefing
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
};

const ScrollingLogos = () => (
  <div className="py-10 md:py-16 bg-black/50 backdrop-blur-md border-y border-white/5 whitespace-nowrap overflow-hidden">
    <div className="flex w-max animate-marquee gap-20 md:gap-32 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-20 md:gap-32 items-center">
          <LogoItem name="NAVI" />
          <LogoItem name="FAZE" />
          <LogoItem name="G2" />
          <LogoItem name="LIQUID" />
          <LogoItem name="SENTINELS" />
          <LogoItem name="T1" />
          <LogoItem name="VITALITY" />
        </div>
      ))}
    </div>
  </div>
);

const LogoItem = ({ name }: { name: string }) => (
  <span className="text-3xl md:text-5xl font-bebas-neue text-white tracking-[0.3em]">{name}</span>
);

const InspirationalManifesto = () => (
  <section className="py-32 md:py-60 bg-background relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,242,255,0.05),transparent_60%)] pointer-events-none" />
    <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 md:space-y-12"
      >
        <Flame className="text-neon-cyan size-12 md:size-16 mx-auto opacity-80" />
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-rajdhani uppercase text-white leading-tight md:leading-snug tracking-wider">
          Every legend was once a beginner. <br className="hidden md:block" />
          <span className="text-neon-cyan">Every champion was once defeated.</span>
        </h2>
        <p className="text-lg md:text-2xl text-neutral-400 font-dm-sans leading-relaxed max-w-3xl mx-auto">
          The difference between the lobby and the podium is the relentless pursuit of perfection. ProGamerX is your catalyst. We don't just give you tools; we forge your discipline. Step into the arena, transcend your limits, and become the player they fear.
        </p>
        <div className="w-24 h-1 bg-neon-cyan/50 mx-auto rounded-full" />
      </motion.div>
    </div>
  </section>
);

const StatsTicker = () => (
  <div className="py-6 md:py-10 bg-neon-cyan text-black overflow-hidden whitespace-nowrap shadow-[0_0_50px_rgba(0,242,255,0.3)] relative z-20">
    <div className="flex w-max animate-marquee-reverse gap-16 md:gap-32 items-center">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-16 md:gap-32 items-center">
          <StatItemBlack icon={Users} label="Active Operatives" value="1.2M+" />
          <StatItemBlack icon={Trophy} label="Rank-Up Probability" value="94.2%" />
          <StatItemBlack icon={Globe} label="Region Coverage" value="GLOBAL" />
          <StatItemBlack icon={TrendingUp} label="K/D Delta" value="+0.45 avg" />
        </div>
      ))}
    </div>
  </div>
);

const StatItemBlack = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-4 md:gap-6">
    <Icon className="size-6 md:size-8" />
    <span className="font-bebas-neue text-2xl md:text-4xl tracking-wide">{value}</span>
    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black opacity-70">{label}</span>
  </div>
);

const FeaturesSection = () => (
  <section className="py-32 md:py-60 bg-background relative">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 md:mb-32 gap-8 md:gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="text-neon-cyan font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] md:text-xs">The Tactical Core</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas-neue text-white mt-4 md:mt-6 leading-[0.8] tracking-tighter">
            EVERY VARIABLE <br className="hidden md:block" /> <span className="text-outline">DECODED</span>
          </h2>
        </motion.div>
        <p className="text-neutral-500 max-w-md text-sm md:text-lg uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold leading-relaxed border-l-4 border-neon-cyan/50 pl-6 md:pl-10">
          Advanced neuro-processing that decodes game state in real-time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/5 divide-y md:divide-y-0 md:divide-x lg:divide-x lg:divide-y divide-white/5 glass shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden">
        {features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} className="hover:bg-white/5 transition-all duration-500 group p-10 md:p-16 border-b md:border-b-0 lg:border-b border-white/5" />
        ))}
      </div>
    </div>
  </section>
);

const GameParallaxSection = () => (
  <section className="relative">
    <TextParallaxContent
      imgUrl={VALORANT_IMG}
      subheading="Tactical Precision"
      heading="VALORANT"
    >
      <ExampleContent 
        title="Predictive Aiming" 
        desc="Our AI anticipates enemy movement patterns based on high-rank heatmaps, giving you a millisecond advantage that wins rounds."
      />
    </TextParallaxContent>

    <TextParallaxContent
      imgUrl={PUBG_IMG}
      subheading="Survival Strategy"
      heading="PUBG MOBILE"
    >
      <ExampleContent 
        title="Zone Control" 
        desc="Predict the circle before it shifts. Our neural engine analyzes 50+ terrain variables to find the perfect rotation path."
      />
    </TextParallaxContent>

    <TextParallaxContent
      imgUrl={CS2_IMG}
      subheading="Legacy Performance"
      heading="COUNTER STRIKE 2"
    >
      <ExampleContent 
        title="Zero Latency Meta" 
        desc="Optimized network stacks and frame-timing adjustments that make 60Hz feel like 240Hz. No more getting CS2'd."
      />
    </TextParallaxContent>
  </section>
);

const MetaTrendsSection = () => (
  <section className="py-32 md:py-60 bg-neutral-950 relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
        <div>
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bebas-neue text-white mb-12 md:mb-16 tracking-tighter leading-[0.8]">LIVE META <br className="hidden md:block"/> <span className="text-neon-green">TRENDS</span></h2>
          <div className="space-y-6 md:space-y-8">
            <MetaItem game="Valorant" trend="Double Controller Dominance" intensity={85} />
            <MetaItem game="CS2" trend="AWP Pick Rate Decline" intensity={42} />
            <MetaItem game="PUBG" trend="Urban Stealth Meta" intensity={68} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          <div className="aspect-square glass-cyan rounded-[2rem] md:rounded-[4rem] flex flex-col items-center justify-center gap-4 md:gap-6 group hover:border-neon-cyan/50 transition-all cursor-crosshair p-8">
            <TrendingUp className="text-neon-cyan size-12 md:size-20 group-hover:scale-110 transition-transform" />
            <span className="text-white font-bebas-neue text-2xl md:text-3xl tracking-widest">RANK UP FAST</span>
          </div>
          <div className="aspect-square glass p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] flex flex-col justify-end">
            <Award className="text-neon-violet size-12 md:size-16 mb-4 md:mb-8" />
            <div className="text-white font-bebas-neue text-5xl md:text-7xl">100%</div>
            <div className="text-neutral-500 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black">Pro Verified</div>
          </div>
          <div className="col-span-1 sm:col-span-2 p-8 md:p-12 glass rounded-[2rem] md:rounded-[4rem] flex items-center justify-between group cursor-pointer border-white/5 hover:border-white/20 transition-all">
            <div className="flex items-center gap-6 md:gap-10">
              <div className="size-16 md:size-24 rounded-2xl md:rounded-[2.5rem] bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan/10 transition-colors">
                <PlayCircle className="text-white group-hover:text-neon-cyan transition-colors" size={32} />
              </div>
              <div>
                <div className="text-white font-bebas-neue text-2xl md:text-4xl tracking-wider">WATCH PRO RECAP</div>
                <div className="text-neutral-500 text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-black mt-1">Daily meta breakdown</div>
              </div>
            </div>
            <MousePointer2 className="text-neutral-500 group-hover:text-neon-cyan transition-all hidden sm:block" size={32} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MetaItem = ({ game, trend, intensity }: any) => (
  <div className="p-6 md:p-10 glass border-l-4 md:border-l-8 border-l-neon-cyan rounded-r-[2rem] md:rounded-r-[3rem] hover:bg-white/5 transition-colors">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-8 gap-2">
      <span className="text-neutral-500 text-[8px] md:text-[10px] uppercase font-black tracking-[0.5em]">{game}</span>
      <span className="text-white font-bebas-neue text-2xl md:text-4xl tracking-wide">{trend}</span>
    </div>
    <div className="h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${intensity}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-full bg-neon-cyan shadow-[0_0_20px_rgba(0,242,255,0.8)]"
      />
    </div>
  </div>
);

const CommunityWall = () => (
  <section className="py-32 md:py-60 bg-background overflow-hidden relative">
    <div className="container mx-auto px-4 max-w-7xl">
      <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bebas-neue text-white mb-16 md:mb-32 tracking-tighter text-center leading-none">COMMUNITY <br className="hidden md:block"/> <span className="text-outline">INTEL</span></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {communityFeedbacks.map((text, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10, scale: 1.02 }}
            className="p-8 md:p-12 glass rounded-[2rem] md:rounded-[3rem] text-neutral-400 text-lg md:text-xl border-white/5 font-rajdhani uppercase tracking-widest leading-relaxed flex items-center justify-center text-center h-full min-h-[160px]"
          >
            "{text}"
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section className="py-32 md:py-60 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-24 md:mb-32">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas-neue text-white leading-[0.8] tracking-tighter">THE PRO <br className="hidden md:block"/> <span className="text-neon-cyan">WAY</span></h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        <ComparisonCard 
          title="The Old Way" 
          items={["Watching generic YouTube videos", "Practice without data feedback", "Manual settings troubleshooting", "Frustrating rank plateaus"]} 
          bad 
        />
        <ComparisonCard 
          title="The Pro Way" 
          items={["Instant AI-tailored strategy clips", "Data-driven performance feedback", "1-Click automated hardware tuning", "Guaranteed rank progression"]} 
        />
      </div>
    </div>
  </section>
);

const ComparisonCard = ({ title, items, bad }: any) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className={cn(
      "p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] border transition-all duration-700",
      bad ? "border-white/5 bg-neutral-900/5 grayscale" : "border-neon-cyan/50 bg-neon-cyan/5 shadow-[0_0_100px_rgba(0,242,255,0.05)] md:shadow-[0_0_200px_rgba(0,242,255,0.05)]"
    )}
  >
    <h3 className={cn("text-4xl md:text-6xl font-bebas-neue mb-12 md:mb-20 tracking-[0.2em] md:tracking-[0.3em]", bad ? "text-neutral-700" : "text-neon-cyan")}>
      {title}
    </h3>
    <ul className="space-y-8 md:space-y-12">
      {items.map((item: any, i: any) => (
        <li key={i} className="flex items-start gap-6 md:gap-10 text-neutral-400 font-rajdhani text-2xl md:text-4xl leading-tight">
          <div className={cn("mt-2 md:mt-3 size-3 md:size-4 rounded-full shrink-0", bad ? "bg-red-500/10" : "bg-neon-cyan shadow-[0_0_15px_rgba(0,242,255,1)]")} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const TestimonialsSection = () => (
  <section className="py-32 md:py-60 bg-neutral-950 relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-7xl">
      <h2 className="text-5xl md:text-7xl font-bebas-neue text-white text-center mb-20 md:mb-40 tracking-[0.2em] md:tracking-[0.4em]">ELITE ENDORSEMENTS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {testimonials.map((t, i) => (
          <div key={i} className="p-8 md:p-10 glass rounded-[2rem] md:rounded-[3rem] relative group hover:border-neon-violet/50 transition-all flex flex-col h-full hover:bg-white/5">
            <div className="absolute top-0 right-8 md:right-10 -translate-y-1/2 px-6 py-2 bg-neon-violet text-white font-bebas-neue text-lg md:text-xl rounded-full uppercase tracking-widest shadow-2xl z-10">
              {t.rank}
            </div>

            <div className="flex items-center gap-4 mb-4">
               <img src={t.image} alt={t.name} className="size-16 rounded-full object-cover border-2 border-white/10 group-hover:border-neon-cyan transition-colors" />
               <div className="text-white font-bebas-neue text-2xl tracking-widest">{t.name}</div>
            </div>

            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-10 italic font-dm-sans flex-1 mt-2">"{t.text}"</p>
            <div className="flex justify-between items-end border-t border-white/5 pt-8">
              <div>
                <div className="text-neon-cyan text-[8px] md:text-[10px] uppercase font-black tracking-[0.3em] md:tracking-[0.5em] mt-2">Verified Elite</div>
              </div>
              <div className="text-neon-violet font-mono text-xs md:text-sm font-black">{t.stats}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section className="py-32 md:py-60 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-24 md:mb-48">
        <h2 className="text-6xl md:text-9xl lg:text-[12rem] font-bebas-neue text-white tracking-tighter mb-4 md:mb-8 leading-none">JOIN THE CORE</h2>
        <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] md:tracking-[0.8em] font-black">Cancel anytime. Win forever.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        {pricing.map((tier, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={cn(
              "p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] border flex flex-col transition-all duration-700 relative group overflow-hidden",
              tier.highlighted ? "border-neon-violet bg-neon-violet/5 lg:scale-105 z-10 shadow-[0_0_100px_rgba(176,38,255,0.1)] md:shadow-[0_0_150px_rgba(176,38,255,0.15)]" : "border-white/5 hover:border-white/20 bg-neutral-900/10"
            )}
          >
            {tier.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 md:px-12 py-2 md:py-3 bg-neon-violet text-white font-black text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] rounded-full shadow-2xl w-max">
                Most Popular
              </div>
            )}
            <div className="text-neutral-700 text-[10px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-black mb-6 md:mb-8">{tier.name}</div>
            <div className="text-7xl md:text-9xl font-bebas-neue text-white mb-12 md:mb-20">{tier.price}<span className="text-lg md:text-xl font-dm-sans text-neutral-800 ml-4 md:ml-6">/mo</span></div>
            <ul className="space-y-6 md:space-y-10 mb-16 md:mb-24 flex-1">
              {tier.features.map((f, j) => (
                <li key={j} className="text-neutral-400 text-lg md:text-xl flex items-start gap-4 md:gap-8 leading-tight">
                  <Check className="text-neon-cyan size-6 md:size-8 mt-0.5 md:mt-1 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button className={cn(
              "w-full py-6 md:py-8 font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm transition-all shadow-2xl rounded-sm",
              tier.highlighted ? "bg-neon-violet text-white hover:bg-white hover:text-black" : "bg-white text-black hover:bg-neon-cyan"
            )}>
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="py-32 md:py-60 bg-neutral-950 relative overflow-hidden border-y border-white/5">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-20 md:gap-32 lg:gap-40 items-center">
        <div className="flex-1 w-full text-center lg:text-left">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas-neue text-white mb-10 md:mb-16 tracking-tighter leading-[0.8]">DIRECT <br className="hidden md:block"/> <span className="text-neon-cyan">INTEL</span></h2>
          <p className="text-neutral-500 mb-16 md:mb-24 font-dm-sans text-xl md:text-3xl leading-relaxed max-w-2xl mx-auto lg:mx-0">Have questions about your deployment? Our tactical support team is standing by.</p>
          <div className="space-y-8 md:space-y-12 flex flex-col items-center lg:items-start">
            <ContactInfo icon={Mail} label="Transmission Channel" value="support@progamerx.com" />
            <ContactInfo icon={MessageSquare} label="Tactical Comms" value="Join Elite Discord" />
            <div className="flex gap-6 md:gap-10 mt-12 md:mt-24">
              <SocialIcon icon={Share2} />
              <SocialIcon icon={Camera} />
              <SocialIcon icon={Play} />
            </div>
          </div>
        </div>
        <div className="flex-1 w-full glass p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] lg:shadow-[0_0_150px_rgba(0,0,0,0.8)]">
          <form className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <label className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black text-neutral-600">Callsign</label>
              <input type="text" className="w-full bg-black/50 border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white font-rajdhani text-2xl md:text-3xl uppercase tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800" placeholder="Enter name..." />
            </div>
            <div className="space-y-4 md:space-y-6">
              <label className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black text-neutral-600">Signal (Email)</label>
              <input type="email" className="w-full bg-black/50 border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white font-rajdhani text-2xl md:text-3xl uppercase tracking-widest focus:border-neon-cyan outline-none transition-all placeholder:text-neutral-800" placeholder="Enter email..." />
            </div>
            <div className="space-y-4 md:space-y-6">
              <label className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.6em] font-black text-neutral-600">Message</label>
              <textarea className="w-full bg-black/50 border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white font-rajdhani text-2xl md:text-3xl uppercase tracking-widest focus:border-neon-cyan outline-none transition-all h-40 md:h-52 placeholder:text-neutral-800 resize-none" placeholder="Describe your mission..."></textarea>
            </div>
            <button className="w-full py-6 md:py-8 bg-neon-cyan text-black font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-xs md:text-sm hover:bg-white transition-all shadow-xl rounded-sm">Send Transmission</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const ContactInfo = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-6 md:gap-10 group">
    <div className="size-16 md:size-20 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-neon-cyan transition-all duration-500 group-hover:scale-110 shrink-0">
      <Icon className="text-neon-cyan size-6 md:size-8" />
    </div>
    <div className="text-left">
      <div className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black text-neutral-600 mb-1 md:mb-2">{label}</div>
      <div className="text-white font-bebas-neue text-3xl md:text-4xl lg:text-5xl tracking-[0.1em] md:tracking-[0.2em]">{value}</div>
    </div>
  </div>
);

const SocialIcon = ({ icon: Icon }: any) => (
  <div className="size-14 md:size-16 rounded-[1.5rem] md:rounded-[2rem] glass flex items-center justify-center text-neutral-700 hover:text-neon-cyan hover:border-neon-cyan hover:scale-110 transition-all cursor-pointer">
    <Icon size={24} className="md:w-8 md:h-8" />
  </div>
);

const faqs = [
  { q: "How does the AI coaching work?", a: "Our AI analyzes meta trends and common player mistakes across millions of matches to provide personalized feedback based on your specific rank and playstyle." },
  { q: "Will this get me banned?", a: "Absolutely not. ProGamerX does not interact with game files or memory. It provides external strategy and optimization advice that is 100% compliant with all anti-cheat systems." },
  { q: "Can I use it on console?", a: "Yes! While our settings generator has specific PC/Mobile modes, our AI Coach and Rank Planner are universal and work for console players as well." },
];

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-32 md:py-60 bg-neutral-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-6xl md:text-8xl font-bebas-neue text-white text-center mb-24 md:mb-40 tracking-[0.2em] md:tracking-[0.4em]">INTEL BRIEFING</h2>
        <div className="space-y-6 md:space-y-10">
          {faqs.map((faq, i) => (
            <div key={i} className={cn(
              "rounded-[2rem] md:rounded-[3rem] border transition-all duration-500 overflow-hidden",
              active === i ? "border-neon-cyan bg-neon-cyan/5" : "border-white/5 hover:border-white/20"
            )}>
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full p-8 md:p-12 flex justify-between items-center text-left gap-6"
              >
                <span className="text-2xl md:text-4xl font-rajdhani text-white uppercase tracking-[0.1em]">{faq.q}</span>
                <ChevronDown className={cn("text-neutral-700 transition-transform duration-500 shrink-0", active === i && "rotate-180 text-neon-cyan")} size={32} />
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="px-8 md:px-12 pb-12 md:pb-16 text-neutral-500 text-lg md:text-2xl leading-relaxed font-dm-sans max-w-3xl">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-40 md:py-80 relative overflow-hidden bg-background">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.1),transparent_70%)] pointer-events-none" />
    <div className="container mx-auto px-4 relative z-10 text-center max-w-7xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-bebas-neue text-white mb-10 md:mb-16 leading-[0.7] tracking-tighter break-words">
          SECURE <br className="hidden md:block"/>
          <span className="text-neon-cyan glow-cyan shadow-[0_0_100px_rgba(0,242,255,0.2)] md:shadow-[0_0_150px_rgba(0,242,255,0.3)] block mt-2 md:mt-0">VICTORY</span>
        </h2>
        <p className="text-neutral-600 mb-16 md:mb-24 max-w-4xl mx-auto uppercase tracking-[0.4em] md:tracking-[0.8em] text-[10px] md:text-xs font-black leading-loose px-4">
          Join the elite circle of 1.2M+ verified champions worldwide.
        </p>
        <Link to="/login" className="group relative px-16 md:px-32 py-8 md:py-10 bg-neon-cyan text-black font-black text-xl md:text-2xl uppercase tracking-[0.3em] md:tracking-[0.5em] hover:bg-white hover:scale-105 transition-all inline-block shadow-[0_0_80px_rgba(0,242,255,0.3)] md:shadow-[0_0_150px_rgba(0,242,255,0.5)] rounded-sm">
          Join ProGamerX
          <div className="absolute -inset-6 md:-inset-10 bg-neon-cyan opacity-20 blur-[60px] md:blur-[100px] animate-pulse-slow pointer-events-none" />
        </Link>
      </motion.div>
    </div>
  </section>
);

function App() {
  return (
    <Router>
      <SmoothScroll>
        <div className="relative min-h-screen bg-background text-white selection:bg-neon-cyan selection:text-black">
          <GlobalBoxTrail />
          <Banner id="launch-sale-v7" variant="rainbow" className="shadow-lg h-auto py-2 md:py-0 md:h-12 z-50">
            <span className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.5em] text-center px-4">
              <span className="hidden md:inline-block"><Sparkles size={14} className="animate-pulse" /></span>
              <span>PRIORITY DEPLOYMENT: SECURE YOUR ELITE STATUS FOR $99 — QUANTITY: 03 REMAINING</span>
              <span className="hidden md:inline-block"><Sparkles size={14} className="animate-pulse" /></span>
            </span>
          </Banner>
          <Navbar />
          
          <main className="relative z-10 w-full overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<SettingsGenerator />} />
              <Route path="/planner" element={<RankPlanner />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          <footer className="py-32 md:py-60 bg-black border-t border-white/5 relative z-20 overflow-hidden w-full">
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 md:gap-24 mb-24 md:mb-40">
                <div className="col-span-1 lg:col-span-2">
                  <ModernLogo className="mb-10 md:mb-16" />
                  <p className="text-neutral-600 max-w-md mb-12 md:mb-20 font-dm-sans text-lg md:text-xl leading-relaxed">
                    The absolute frontier of gaming performance. AI-driven strategy, hardware-level optimization, and pro-grade training modules.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-bebas-neue tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12 text-xl md:text-2xl">Intelligence</h4>
                  <ul className="space-y-6 md:space-y-8 text-neutral-600 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-black">
                    <li><Link to="/settings" className="hover:text-neon-cyan transition-colors">Tuning</Link></li>
                    <li><Link to="/planner" className="hover:text-neon-cyan transition-colors">Academy</Link></li>
                    <li><Link to="/login" className="hover:text-neon-cyan transition-colors">AI Coach</Link></li>
                    <li><Link to="/" className="hover:text-neon-cyan transition-colors">Meta Data</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bebas-neue tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-12 text-xl md:text-2xl">Tactical</h4>
                  <ul className="space-y-6 md:space-y-8 text-neutral-600 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-black">
                    <li><a href="#" className="hover:text-neon-cyan transition-colors">Deployments</a></li>
                    <li><a href="#" className="hover:text-neon-cyan transition-colors">Intel</a></li>
                    <li><a href="#" className="hover:text-neon-cyan transition-colors">Protocols</a></li>
                    <li><a href="#" className="hover:text-neon-cyan transition-colors">Support</a></li>
                  </ul>
                </div>
              </div>
              <div className="pt-16 md:pt-24 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-20 text-center lg:text-left">
                <p className="text-neutral-800 text-[8px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.8em] font-black">
                  PROGAMERX // SECTOR 01 // ALL SYSTEMS NOMINAL
                </p>
                <div className="flex gap-10 md:gap-16 items-center grayscale opacity-30 hover:opacity-100 transition-all duration-700">
                  <div className="text-white font-bebas-neue text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] cursor-pointer hover:text-neon-cyan transition-colors">DISCORD</div>
                  <div className="text-white font-bebas-neue text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] cursor-pointer hover:text-neon-cyan transition-colors">TWITCH</div>
                  <div className="text-white font-bebas-neue text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] cursor-pointer hover:text-neon-cyan transition-colors">X.COM</div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </Router>
  );
}

const ExampleContent = ({ title, desc }: { title: string; desc: string }) => (
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:gap-24 px-4 pb-40 md:pb-60 pt-24 md:pt-40 lg:grid-cols-12 relative overflow-hidden">
    <div className="absolute top-0 left-4 w-40 md:w-80 h-1 bg-gradient-to-r from-neon-cyan to-transparent" />
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="col-span-1 lg:col-span-5"
    >
      <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bebas-neue text-white tracking-tighter leading-[0.8] mb-8 md:mb-12">
        {title}
      </h2>
      <div className="w-32 md:w-48 h-2 md:h-3 bg-neon-cyan mb-8 md:mb-12 shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
    </motion.div>
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="col-span-1 lg:col-span-7 flex flex-col justify-center"
    >
      <p className="mb-12 md:mb-20 text-2xl md:text-5xl lg:text-6xl leading-[1.1] md:leading-[1] font-rajdhani uppercase tracking-tighter text-neutral-300">
        {desc}
      </p>
      <Link to="/login" className="group relative w-fit px-12 md:px-20 py-6 md:py-8 border-2 md:border-4 border-white text-white font-black text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] hover:bg-white hover:text-black transition-all shadow-xl rounded-sm">
        Access Intel
      </Link>
    </motion.div>
  </div>
);

export default App;
