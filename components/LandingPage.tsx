import React, { useState, useEffect, useRef } from 'react';
import PartnershipCarousel from './PartnershipCarousel';
import { API_BASE_URL } from '../App';
import BlogPost from './Blog/BlogPost';
import PoweredByNext from './PoweredByNext';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
  onViewAllTrainers: () => void;
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Animated Counter ────────────────────────────────────────────────────────
const AnimatedNumber: React.FC<{ target: string; label: string }> = ({ target, label }) => {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || animated.current) return;
      animated.current = true;
      const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
      const suffix  = target.replace(/[0-9.,]/g, '');
      let cur = 0;
      const inc = numeric / (1800 / 16);
      const t = setInterval(() => {
        cur += inc;
        if (cur >= numeric) { setDisplayed(target); clearInterval(t); }
        else setDisplayed((numeric > 100 ? Math.floor(cur).toLocaleString() : cur.toFixed(1)) + suffix);
      }, 16);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-black text-white tracking-tighter tabular-nums">{displayed}</p>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mt-2">{label}</p>
    </div>
  );
};

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/80 bg-slate-800/60 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-5">
    {children}
  </div>
);

// ─── Section Heading ──────────────────────────────────────────────────────────
const SectionHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2
    className={`text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-5 ${className}`}
    style={{ fontFamily: '"Outfit", sans-serif' }}
  >
    {children}
  </h2>
);

const Accent: React.FC<{ children: React.ReactNode; gradient?: string }> = ({
  children,
  gradient = 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
}) => (
  <span style={{ background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    {children}
  </span>
);

// ─── Feature Card ─────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  glowColor: string;
  iconBg: string;
  delay: number;
}> = ({ icon, title, desc, glowColor, iconBg, delay }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 hover:border-slate-600 transition-colors duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s`,
      }}
    >
      {/* top-line accent */}
      <div className={`absolute top-0 left-0 right-0 h-px ${glowColor} opacity-60`} />
      {/* hover glow blob */}
      <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${iconBg} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconBg} bg-opacity-20 border border-white/5`}>
        {icon}
      </div>
      <h3 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm font-medium">{desc}</p>

      <div className="mt-6 flex items-center gap-1.5 text-xs font-black text-slate-500 group-hover:text-slate-300 transition-colors">
        Learn more
        <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
};

// ─── Ladder Step ─────────────────────────────────────────────────────────────
const LEVEL_COLORS: Record<number, { badge: string; glow: string; border: string }> = {
  1: { badge: 'bg-indigo-600',  glow: 'rgba(99,102,241,0.15)',  border: 'border-indigo-500/30' },
  2: { badge: 'bg-sky-600',     glow: 'rgba(14,165,233,0.15)',  border: 'border-sky-500/30'    },
  3: { badge: 'bg-emerald-600', glow: 'rgba(16,185,129,0.15)', border: 'border-emerald-500/30'},
  4: { badge: 'bg-orange-600',  glow: 'rgba(234,88,12,0.15)',   border: 'border-orange-500/30' },
};

const LadderStep: React.FC<{
  number: number; level: string; ages: string;
  skills: string; tools: string[]; highlight?: boolean;
}> = ({ number, level, ages, skills, tools, highlight }) => {
  const { ref, visible } = useReveal(0.1);
  const c = LEVEL_COLORS[number];

  return (
    <div
      ref={ref}
      className="flex gap-5 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-24px)',
        transition: `opacity 0.55s ease ${number * 100}ms, transform 0.55s ease ${number * 100}ms`,
      }}
    >
      {/* Spine */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow-lg ${c.badge}`}>
          {number}
        </div>
        {number < 4 && <div className="w-px flex-1 min-h-[3rem] bg-slate-800 mt-1" />}
      </div>

      {/* Card */}
      <div
        className={`flex-1 mb-5 p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
          highlight
            ? `${c.border} bg-slate-900/60`
            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
        }`}
        style={highlight ? { boxShadow: `inset 0 0 40px ${c.glow}` } : {}}
      >
        <div className="mb-3">
          <h4 className="text-white font-black text-lg leading-tight">{level}</h4>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{ages}</span>
        </div>
        <p className="text-slate-400 text-sm font-medium mb-4 leading-relaxed">{skills}</p>
        <div className="flex flex-wrap gap-2">
          {tools.map(t => (
            <span key={t} className="px-3 py-1 bg-slate-800/80 border border-slate-700/60 text-slate-300 text-[10px] font-bold uppercase tracking-wider rounded-lg">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Instructor Card ──────────────────────────────────────────────────────────
const InstructorCard: React.FC<{ inst: any; onEngage: () => void; delay: number }> = ({ inst, onEngage, delay }) => {
  const { ref, visible } = useReveal(0.1);
  const avatar = inst.avatarUrl
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(inst.fullName)}&background=4338ca&color=fff&size=160&bold=true&font-size=0.38`;

  return (
    <div
      ref={ref}
      className="group rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/50 hover:border-slate-600 transition-all duration-500 flex flex-col overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s`,
      }}
    >
      {/* Top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600/60 to-sky-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <div className="relative shrink-0">
          <img src={avatar} className="w-16 h-16 rounded-2xl object-cover border border-slate-700" alt={inst.fullName} />
          <div className="absolute -bottom-1.5 -right-1.5 flex items-center gap-1 px-2 py-0.5 bg-emerald-500 rounded-md text-white text-[10px] font-black border border-slate-900">
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {inst.instructorProfile?.rating || '4.9'}
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-black text-white tracking-tight truncate group-hover:text-indigo-400 transition-colors">
            {inst.fullName}
          </h3>
          <p className="text-indigo-400 text-[11px] font-black uppercase tracking-widest">
            {inst.instructorProfile?.yearsExperience || 2}+ Yrs Experience
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4 flex-1">
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 italic">
          "{inst.instructorProfile?.bio || 'Passionate about empowering the next generation of Nigerian tech talent.'}"
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(inst.instructorProfile?.specialties?.length
            ? inst.instructorProfile.specialties
            : ['Python', 'Robotics', 'Web Dev']
          ).slice(0, 4).map((s: string) => (
            <span key={s} className="px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-700/60">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mx-6 mb-6 pt-5 border-t border-slate-800 flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest">Monthly Rate</p>
          <p className="text-white text-xl font-black tracking-tight">
            ₦{(inst.instructorProfile?.monthlyRate || 20000).toLocaleString()}
          </p>
        </div>
        <button
          onClick={onEngage}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
        >
          Engage →
        </button>
      </div>
    </div>
  );
};

// ─── Testimonial ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "My daughter went from zero to building her own game in 3 months. FutureLab's structured ladder approach is unlike anything else out there.",
    name: "Mrs. Adeyemi", role: "Parent · Level 2 Student", avatar: "A",
    from: '#6366f1', to: '#4338ca',
  },
  {
    quote: "I finally understand machine learning and I'm only 14. My FutureLab instructor made it feel like a superpower — not just theory.",
    name: "Tunde O.", role: "Level 4 · Master Architect Student", avatar: "T",
    from: '#10b981', to: '#059669',
  },
  {
    quote: "We partnered FutureLab for our after-school program. The kids are more engaged than ever — competing to build the best projects every week.",
    name: "Mr. Chukwuemeka", role: "Academic Director · Zion Anglican School", avatar: "C",
    from: '#f59e0b', to: '#d97706',
  },
];

// ─── Process Step ─────────────────────────────────────────────────────────────
const ProcessStep: React.FC<{ n: number; title: string; desc: string; delay: number }> = ({ n, title, desc, delay }) => {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="text-[80px] font-black leading-none text-slate-800/60 select-none" style={{ fontFamily: '"Outfit", sans-serif' }}>
        0{n}
      </div>
      <div className="-mt-8 pl-2">
        <h4 className="text-lg font-black text-white mb-2">{title}</h4>
        <p className="text-slate-400 text-sm font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

// ─── Main Landing Page ────────────────────────────────────────────────────────
const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin, onViewAllTrainers }) => {
  const [posts, setPosts]             = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [selectedTrainer, setSelectedTrainer]   = useState<any | null>(null);
  const [scrolled, setScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIn, setHeroIn]           = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blog`)
      .then(r => r.json()).then(d => Array.isArray(d) && setPosts(d.slice(0, 3))).catch(() => {});
    fetch(`${API_BASE_URL}/api/user/instructors`)
      .then(r => r.json()).then(d => Array.isArray(d) && setInstructors(d)).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    setTimeout(() => setHeroIn(true), 80);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Blog post view ──────────────────────────────────────────────────────────
  if (selectedPostSlug) {
    return (
      <div className="min-h-screen bg-[#080c14] pt-20">
        <nav className="fixed top-0 w-full z-50 bg-[#080c14]/90 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <button onClick={() => setSelectedPostSlug(null)} className="flex flex-col items-end group">
              <img src="/logo.png" alt="FutureLab" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
              <PoweredByNext className="-mt-1 mr-1 opacity-50 group-hover:opacity-80 transition-opacity" />
            </button>
          </div>
        </nav>
        <BlogPost slug={selectedPostSlug} userData={null} onBack={() => setSelectedPostSlug(null)} />
      </div>
    );
  }

  const navDelay = (i: number) => `${heroIn ? i * 60 + 200 : 0}ms`;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30">

      {/* ══════════════════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 w-full z-50 px-6 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#080c14]/95 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/60'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-end group">
            <img src="/logo.png" alt="FutureLab" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            <PoweredByNext className="-mt-1 mr-1 opacity-40 group-hover:opacity-70 transition-opacity" />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[['Programs', '#programs'], ['Curriculum', '#ladder'], ['Trainers', '#trainers'], ['Blog', '#blog']].map(([l, h], i) => (
              <a
                key={l}
                href={h}
                className="text-sm font-bold text-slate-400 hover:text-white transition-colors duration-200"
                style={{ transitionDelay: navDelay(i), opacity: heroIn ? 1 : 0, transform: heroIn ? 'none' : 'translateY(-6px)', transition: 'opacity 0.4s ease, transform 0.4s ease, color 0.2s' }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div
            className="hidden md:flex items-center gap-2"
            style={{ opacity: heroIn ? 1 : 0, transition: 'opacity 0.5s ease 0.4s' }}
          >
            <button onClick={onLogin} className="px-5 py-2.5 text-sm font-black text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
              Log In
            </button>
            <button
              onClick={onStart}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-black rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              Get Started →
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-slate-300 hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d1220]/98 backdrop-blur-xl border-b border-white/[0.06] px-6 py-6 space-y-3">
            {[['Programs', '#programs'], ['Curriculum', '#ladder'], ['Trainers', '#trainers'], ['Blog', '#blog']].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 font-bold hover:text-white transition-colors">{l}</a>
            ))}
            <div className="flex gap-3 pt-3 border-t border-white/5">
              <button onClick={() => { setMobileMenuOpen(false); onLogin(); }} className="flex-1 py-3 text-sm font-black text-white rounded-xl bg-white/[0.08] border border-white/[0.1]">Log In</button>
              <button onClick={() => { setMobileMenuOpen(false); onStart(); }} className="flex-1 py-3 text-sm font-black text-white rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-20">
        {/* Grid bg */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Central glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 65%)' }} />
        </div>
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] -z-10" style={{ background: 'radial-gradient(circle at top right, rgba(52,211,153,0.07) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] -z-10" style={{ background: 'radial-gradient(circle at bottom left, rgba(99,102,241,0.08) 0%, transparent 65%)' }} />

        {/* Floating code fragments */}
        {[
          { code: 'def learn(): return "∞"',   s: { top:'13%',  left:'3%',  transform:'rotate(-7deg)', fontSize:12 } },
          { code: '<AI future={true} />',        s: { top:'18%',  right:'4%', transform:'rotate(5deg)',  fontSize:11 } },
          { code: 'while learning: level++',     s: { bottom:'32%',left:'2%', transform:'rotate(-5deg)', fontSize:11 } },
          { code: 'robot.think()',               s: { bottom:'22%',right:'3%',transform:'rotate(6deg)',  fontSize:12 } },
          { code: 'import future',               s: { top:'52%',  left:'1%', transform:'rotate(-9deg)', fontSize:10 } },
          { code: 'print("Hello, Engineer!")',    s: { top:'72%',  right:'2%',transform:'rotate(4deg)',  fontSize:10 } },
        ].map(({ code, s }, i) => (
          <div key={i} className="absolute font-mono font-bold text-emerald-400/[0.07] pointer-events-none select-none whitespace-nowrap" style={s}>
            {code}
          </div>
        ))}

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300 text-[11px] font-black uppercase tracking-[0.2em] mb-10"
            style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.65s ease 0.05s, transform 0.65s ease 0.05s' }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-glow-pulse" />
            Nigeria's #1 Youth Tech Academy
          </div>

          {/* H1 */}
          <h1
            className="font-black leading-[0.9] tracking-[-0.03em] mb-8"
            style={{
              fontFamily: '"Outfit", sans-serif',
              fontSize: 'clamp(56px, 9vw, 100px)',
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            <span className="block text-white">Build The</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 45%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Future, Today.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s' }}
          >
            From block-coding at age 5 to machine learning at 14. FutureLab's structured Coder's Ladder guides Nigeria's young minds from curious beginners to confident builders.
          </p>

          {/* CTA Row */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
            style={{ opacity: heroIn ? 1 : 0, transform: heroIn ? 'translateY(0)' : 'translateY(18px)', transition: 'opacity 0.7s ease 0.26s, transform 0.7s ease 0.26s' }}
          >
            <button
              onClick={onStart}
              className="group w-full sm:w-auto px-10 py-5 text-white font-black text-lg rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)' }}
            >
              <span className="flex items-center justify-center gap-3">
                Start Your Journey
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-10 py-5 font-black text-lg rounded-2xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white transition-all flex items-center justify-center gap-3"
            >
              <span className="w-8 h-8 rounded-full border border-white/[0.15] flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </span>
              Explore Programs
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/[0.06]"
            style={{ opacity: heroIn ? 1 : 0, transition: 'opacity 0.8s ease 0.45s' }}
          >
            {[
              { target: '50k+', label: 'Students Taught' },
              { target: '2.5M', label: 'Hours of Code' },
              { target: '1,200+', label: 'Camps Completed' },
              { target: '350+', label: 'Schools Partnered' },
            ].map(s => <AnimatedNumber key={s.label} {...s} />)}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 pointer-events-none">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PARTNERS CAROUSEL
      ══════════════════════════════════════════════════════════════════════ */}
      <PartnershipCarousel />

      {/* ══════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>The Process</SectionLabel>
            <SectionHeading>
              Simple Steps to<br />
              <Accent gradient="linear-gradient(135deg,#34d399,#38bdf8)">Greatness.</Accent>
            </SectionHeading>
            <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
              Getting started is effortless. Learning is structured. Progress is inevitable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            {[
              { n: 1, title: 'Sign Up Free',       desc: 'Create your account in under 60 seconds. No credit card required to explore.' },
              { n: 2, title: 'Find Your Level',     desc: 'Take a short placement quiz — or start at Level 1. There\'s no wrong answer.' },
              { n: 3, title: 'Learn & Build',       desc: 'Weekly live classes, self-paced modules, and hands-on project challenges.' },
              { n: 4, title: 'Level Up & Ship',     desc: 'Complete projects, earn XP, and advance the Coder\'s Ladder to Master Architect.' },
            ].map(({ n, title, desc }) => (
              <ProcessStep key={n} n={n} title={title} desc={desc} delay={n * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROGRAMS
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="programs" className="py-28 px-6 relative">
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>How We Teach</SectionLabel>
            <SectionHeading>
              Three Paths to<br />
              <Accent>Mastery.</Accent>
            </SectionHeading>
            <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
              Every learning style, every schedule. Built for Nigeria's brightest young engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              delay={0}
              glowColor="bg-gradient-to-r from-indigo-500 to-indigo-700"
              iconBg="bg-indigo-500/10"
              title="After-School Classes"
              desc="Weekly sessions through the school term. Build lasting skills, complete long-form projects, and steadily advance up the Coder's Ladder — one level at a time."
              icon={<svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
            <FeatureCard
              delay={100}
              glowColor="bg-gradient-to-r from-emerald-500 to-teal-600"
              iconBg="bg-emerald-500/10"
              title="Summer Camps"
              desc="Week-long deep dives into Game Dev, Robotics, AI, and Python. Intensive, project-driven, and genuinely fun. The fastest way to level up before school resumes."
              icon={<svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            />
            <FeatureCard
              delay={200}
              glowColor="bg-gradient-to-r from-sky-500 to-blue-600"
              iconBg="bg-sky-500/10"
              title="Private Tutoring"
              desc="1-on-1 sessions with a certified expert. Completely customized to your child's pace, interests, and goals. This is the elite path for serious young builders."
              icon={<svg className="w-7 h-7 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />
          </div>

          {/* Feature pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              { icon: '🏆', label: 'Certified Instructors' },
              { icon: '🤖', label: 'AI-Powered Tools'      },
              { icon: '📱', label: 'PWA Learning App'       },
              { icon: '🎯', label: 'Project-Based'          },
              { icon: '🌍', label: 'Online & In-Person'     },
              { icon: '⚡', label: 'Gamified XP System'     },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40 transition-all cursor-default">
                <span className="text-lg">{f.icon}</span>
                <span className="text-sm font-bold text-slate-300">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CODER'S LADDER
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="ladder" className="py-28 px-6 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] -z-10" style={{ background: 'radial-gradient(circle at top right, rgba(16,185,129,0.05) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] -z-10" style={{ background: 'radial-gradient(circle at bottom left, rgba(99,102,241,0.06) 0%, transparent 60%)' }} />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left sticky panel */}
            <div className="lg:sticky lg:top-28">
              <SectionLabel>The Curriculum</SectionLabel>
              <SectionHeading>
                The Coder's<br />
                <Accent gradient="linear-gradient(135deg,#34d399,#38bdf8)">Ladder.</Accent>
              </SectionHeading>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-6">
                Designed by CS experts. Inspired by martial arts belt systems. Each level unlocks new superpowers — and every child starts exactly where they should.
              </p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10">
                From dragging blocks in ScratchJr to deploying machine learning models — our proprietary 4-level curriculum covers the complete journey of a modern software engineer.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <button onClick={onStart} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 text-sm">
                  Find Your Level →
                </button>
                <button onClick={() => document.getElementById('trainers')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/[0.05] hover:bg-white/[0.08] text-white font-black rounded-2xl border border-white/[0.1] transition-all text-sm">
                  Meet Trainers
                </button>
              </div>

              {/* Subject grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '👾', title: 'Game Design',  sub: 'Build interactive worlds' },
                  { emoji: '🤖', title: 'Robotics',     sub: 'Hardware meets code'      },
                  { emoji: '🌐', title: 'Web Mastery',  sub: 'HTML, CSS, React'         },
                  { emoji: '🧠', title: 'AI & Data',    sub: 'Python & Machine Learning' },
                ].map(s => (
                  <div key={s.title} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/50 flex items-center gap-3 hover:border-slate-700 hover:bg-slate-800/40 transition-all group cursor-default">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{s.emoji}</span>
                    <div>
                      <div className="text-sm font-black text-white">{s.title}</div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Ladder */}
            <div>
              <LadderStep number={1} level="Little Coders" ages="Ages 5–7" highlight
                skills="Logic, sequences, patterns, and loops. No prior experience needed — we start with play and imagination."
                tools={['ScratchJr', 'Code.org', 'Block Coding']} />
              <LadderStep number={2} level="Junior Builders" ages="Ages 8–10"
                skills="Variables, conditionals, loops, and events. Students build real games, animations, and interactive stories."
                tools={['Scratch', 'Game Dev', 'Animations', 'Web Basics']} />
              <LadderStep number={3} level="Code Warriors" ages="Ages 11–13"
                skills="Syntax, algorithms, data structures. The leap from visual to text-based — Python and Web Dev begins."
                tools={['Python', 'HTML/CSS', 'Algorithms', 'APIs']} />
              <LadderStep number={4} level="Master Architects" ages="Ages 14+"
                skills="Full-stack, ML pipelines, AI models. Real engineers building real software for real problems."
                tools={['React', 'TensorFlow', 'Data Science', 'Node.js']} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INSTRUCTORS
      ══════════════════════════════════════════════════════════════════════ */}
      {instructors.length > 0 && (
        <section id="trainers" className="py-28 px-6 relative">
          <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 55%)' }} />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <SectionLabel>Expert Trainers</SectionLabel>
              <SectionHeading>
                Learn From the<br />
                <Accent gradient="linear-gradient(135deg,#f59e0b,#ef4444)">Best in the Field.</Accent>
              </SectionHeading>
              <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">
                Hand-picked, certified instructors. Each one a practitioner first, educator second — so your child learns from people actively building with the tools they teach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {instructors.slice(0, 6).map((inst, idx) => (
                <InstructorCard key={inst._id} inst={inst} delay={idx * 70} onEngage={() => {
                  localStorage.setItem('selectedInstructor', JSON.stringify({ id: inst._id, fullName: inst.fullName, rate: inst.instructorProfile?.monthlyRate || 20000 }));
                  onStart();
                }} />
              ))}
            </div>

            {instructors.length > 6 && (
              <div className="mt-12 text-center">
                <button onClick={onViewAllTrainers} className="inline-flex items-center gap-3 px-10 py-5 bg-white/[0.05] hover:bg-white/[0.08] text-white font-black rounded-2xl border border-white/[0.1] hover:border-white/[0.2] transition-all text-sm">
                  View All {instructors.length} Trainers
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <SectionLabel>Testimonials</SectionLabel>
            <SectionHeading>Real Stories.<br />Real Results.</SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => {
              const { ref, visible } = useReveal(0.1);
              return (
                <div
                  key={i}
                  ref={ref}
                  className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 hover:border-slate-700 transition-all duration-300"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(28px)',
                    transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms, border-color 0.3s`,
                  }}
                >
                  {/* Top gradient line */}
                  <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${t.from}, ${t.to})` }} />

                  {/* Quote mark */}
                  <svg className="w-9 h-9 text-slate-700 mb-6 fill-current" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="text-slate-300 text-base font-medium leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-black text-white">{t.name}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOG
      ══════════════════════════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section id="blog" className="py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
              <div>
                <SectionLabel>From the Lab</SectionLabel>
                <SectionHeading>Insights &<br />Updates.</SectionHeading>
              </div>
              <p className="text-slate-400 font-medium max-w-xs leading-relaxed text-sm">
                Articles, tutorials, and announcements from our instructors and the FutureLab team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {posts.map((post, idx) => {
                const bgs = [
                  'linear-gradient(135deg,#1e1b4b,#312e81)',
                  'linear-gradient(135deg,#064e3b,#065f46)',
                  'linear-gradient(135deg,#0c4a6e,#075985)',
                ];
                return (
                  <div
                    key={post._id}
                    onClick={() => setSelectedPostSlug(post.slug)}
                    className="group cursor-pointer rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden shrink-0">
                      {post.coverImage
                        ? <img src={post.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                        : <div className="w-full h-full flex items-center justify-center" style={{ background: bgs[idx % 3] }}>
                            <span className="text-6xl opacity-20 select-none">✦</span>
                          </div>
                      }
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent" />
                      {post.tags?.[0] && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                          {post.tags[0]}
                        </div>
                      )}
                    </div>

                    <div className="p-7 flex-1 flex flex-col">
                      <h3 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors leading-tight mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-800">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-black text-slate-500 group-hover:text-indigo-400 transition-colors">
                          Read
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative overflow-hidden rounded-[2rem] p-14 sm:p-20 text-center border"
            style={{
              background: 'linear-gradient(135deg,#1e1b4b 0%,#1a3a5c 50%,#064e3b 100%)',
              borderColor: 'rgba(99,102,241,0.2)',
            }}
          >
            {/* bg glows */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 25% 50%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 50%, rgba(16,185,129,0.12) 0%, transparent 55%)' }} />
            {/* decorative circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/[0.04] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full border border-white/[0.04] pointer-events-none" />

            <div className="relative">
              <SectionLabel>Enroll Today</SectionLabel>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                Your Child's Tech<br />Career Starts Here.
              </h2>
              <p className="text-slate-300 text-lg font-medium max-w-lg mx-auto mb-10 leading-relaxed">
                Join thousands of Nigerian students building real skills, real projects, and a real future in technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onStart}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-black text-lg rounded-2xl shadow-2xl shadow-black/30 hover:bg-slate-100 transition-all hover:scale-105 active:scale-95"
                >
                  Get Started Free →
                </button>
                <button
                  onClick={onLogin}
                  className="w-full sm:w-auto px-10 py-5 bg-white/[0.08] hover:bg-white/[0.14] text-white font-black text-lg rounded-2xl border border-white/[0.15] transition-all"
                >
                  Already have an account?
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.05] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-10">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-end group">
              <img src="/logo.png" alt="FutureLab" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
              <PoweredByNext className="-mt-1 mr-1 opacity-40 group-hover:opacity-70 transition-opacity" />
            </button>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {[['Programs','#programs'],['Curriculum','#ladder'],['Trainers','#trainers'],['Blog','#blog']].map(([l,h]) => (
                <a key={l} href={h} className="text-sm font-bold text-slate-500 hover:text-white transition-colors">{l}</a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              {[
                { label: 'Twitter', path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.1] transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.05] text-center">
            <p className="text-slate-600 text-sm font-medium">
              © {new Date().getFullYear()} FutureLab: A NEXT Project. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════════════
          TRAINER DETAIL MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setSelectedTrainer(null)}>
          <div className="bg-[#0d1220] border border-slate-700 w-full max-w-2xl max-h-[88vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="relative p-8 flex items-start gap-6 border-b border-slate-800">
              <button onClick={() => setSelectedTrainer(null)} className="absolute top-5 right-5 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <img
                src={selectedTrainer.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTrainer.fullName)}&background=4338ca&color=fff&size=200&bold=true`}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-700 shrink-0"
                alt={selectedTrainer.fullName}
              />
              <div>
                <h2 className="text-2xl font-black text-white">{selectedTrainer.fullName}</h2>
                <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mt-1">{selectedTrainer.instructorProfile?.yearsExperience || 1}+ Years Experience</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(selectedTrainer.instructorProfile?.specialties || ['Python', 'Robotics']).map((s: string) => (
                    <span key={s} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-slate-700">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">About</h4>
              <p className="text-slate-300 leading-relaxed">{selectedTrainer.instructorProfile?.bio || 'Expert educator focused on empowering students through hands-on, project-based learning.'}</p>
            </div>
            <div className="p-8 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Monthly Rate</p>
                <p className="text-white text-2xl font-black">₦{(selectedTrainer.instructorProfile?.monthlyRate || 20000).toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  localStorage.setItem('selectedInstructor', JSON.stringify({ id: selectedTrainer._id, fullName: selectedTrainer.fullName, rate: selectedTrainer.instructorProfile?.monthlyRate }));
                  onStart();
                }}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
              >
                Engage Trainer →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
