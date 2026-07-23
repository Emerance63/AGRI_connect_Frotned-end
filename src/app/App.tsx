import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Globe,
  TrendingUp,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Users,
  Sprout,
  Handshake,
  BarChart3,
  MapPin,
} from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1761839257144-297ce252742e?w=900&h=700&fit=crop&auto=format";
const WHO_IMG =
  "https://images.unsplash.com/photo-1756245994771-f06fcaee3a36?w=700&h=600&fit=crop&auto=format";
const COMM_FARMER_IMG =
  "https://images.unsplash.com/photo-1756245994854-1e2cf9108a79?w=600&h=450&fit=crop&auto=format";
const COMM_COOP_IMG =
  "https://images.unsplash.com/photo-1756245995375-ce1524c911d4?w=600&h=450&fit=crop&auto=format";
const COMM_BUYER_IMG =
  "https://images.unsplash.com/photo-1707721690619-7658b6058fa6?w=600&h=450&fit=crop&auto=format";

const steps = [
  {
    num: "01",
    title: "Cooperatives Register",
    desc: "Verified cooperatives create digital profiles and upload available agricultural products.",
    icon: <Sprout size={22} />,
  },
  {
    num: "02",
    title: "Products Are Discovered",
    desc: "Buyers search and discover quality products based on their needs.",
    icon: <Globe size={22} />,
  },
  {
    num: "03",
    title: "Smart Matching",
    desc: "AgriConnect helps match buyers with suitable cooperatives.",
    icon: <CheckCircle2 size={22} />,
  },
  {
    num: "04",
    title: "Partnerships Grow",
    desc: "Buyers and cooperatives build reliable long-term relationships.",
    icon: <Handshake size={22} />,
  },
];

const features = [
  {
    icon: <ShieldCheck size={26} />,
    title: "Verified Cooperatives",
    desc: "Connect with trusted agricultural suppliers.",
  },
  {
    icon: <Globe size={26} />,
    title: "Transparent Marketplace",
    desc: "Access clear product information and supplier details.",
  },
  {
    icon: <TrendingUp size={26} />,
    title: "Better Market Access",
    desc: "Help cooperatives reach more buyers.",
  },
  {
    icon: <Leaf size={26} />,
    title: "Sustainable Agriculture",
    desc: "Support responsible farming communities.",
  },
];

const stats = [
  { value: "500+", label: "Cooperatives Connected", icon: <Users size={20} /> },
  { value: "1,000+", label: "Agricultural Products", icon: <Sprout size={20} /> },
  { value: "50+", label: "Business Buyers", icon: <BarChart3 size={20} /> },
  { value: "30+", label: "Districts Reached", icon: <MapPin size={20} /> },
];

const community = [
  {
    img: COMM_FARMER_IMG,
    title: "Farmers",
    desc: "Empowering farmers through cooperatives",
  },
  {
    img: COMM_COOP_IMG,
    title: "Cooperatives",
    desc: "Helping organizations grow",
  },
  {
    img: COMM_BUYER_IMG,
    title: "Buyers",
    desc: "Making sourcing simple and reliable",
  },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);
    const increment = target / totalFrames;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.min(Math.round(increment * frame), target));
      if (frame >= totalFrames) clearInterval(timer);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration, start]);
  return count;
}

function StatCard({
  value,
  label,
  icon,
  startAnim,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  startAnim: boolean;
}) {
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/\d/g, "").replace(",", "");
  const animated = useCountUp(numericValue, 1600, startAnim);
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-8">
      <div className="text-green-400 mb-1">{icon}</div>
      <div
        className="font-sora text-5xl font-bold text-white"
        style={{ fontFamily: "Sora, sans-serif" }}
      >
        {startAnim ? animated.toLocaleString() : "0"}
        {suffix}
      </div>
      <div className="text-emerald-200 text-sm font-medium uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  );
}

export default function App() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ── 1. Hero ── */}
      <section className="min-h-screen flex items-center bg-background">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center py-20">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest">
              <Leaf size={14} /> Rwanda&apos;s Agricultural Platform
            </span>
            <h1
              className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Connecting Rwanda&apos;s{" "}
              <span className="text-primary">Agriculture</span> Ecosystem
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              AgriConnect bridges the gap between agricultural cooperatives and
              buyers by creating a transparent digital marketplace where quality
              products, trusted partnerships, and sustainable farming meet.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all hover:gap-3">
                Explore Marketplace <ArrowRight size={16} />
              </button>
              <button className="px-6 py-3 border-2 border-border rounded-xl font-semibold text-foreground hover:border-primary hover:text-primary transition-colors">
                Meet Our Cooperatives
              </button>
            </div>
          </div>
          {/* Right */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-green-100">
              <img
                src={HERO_IMG}
                alt="Woman using laptop in an agricultural field — technology meets farming"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-900/40 via-transparent to-transparent" />
            </div>
            {/* Floating cards */}
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <span className="text-2xl">🌾</span>
              <div>
                <div className="font-bold text-foreground text-sm" style={{ fontFamily: "Sora, sans-serif" }}>500+</div>
                <div className="text-xs text-muted-foreground">Cooperatives</div>
              </div>
            </div>
            <div className="absolute top-6 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <div className="font-bold text-foreground text-sm" style={{ fontFamily: "Sora, sans-serif" }}>Trusted</div>
                <div className="text-xs text-muted-foreground">Buyers Network</div>
              </div>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-primary text-primary-foreground rounded-xl px-4 py-3 shadow-lg flex items-center gap-2">
              <Leaf size={14} />
              <span className="text-sm font-semibold">Sustainable Farming</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Who We Are ── */}
      <section id="who" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          {/* Left image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-green-100">
            <img
              src={WHO_IMG}
              alt="Cooperative farmer picking tea leaves in a lush green plantation"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent" />
          </div>
          {/* Right */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">About Us</span>
              <h2
                className="mt-2 text-4xl font-bold text-foreground"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Who We Are
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                AgriConnect is a digital agricultural supply chain platform
                designed to connect buyers directly with verified agricultural
                cooperatives. We simplify agricultural trade by helping buyers
                discover reliable suppliers while enabling cooperatives to
                showcase their products and build stronger partnerships.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">🌱</span>
                <div>
                  <h3 className="font-semibold text-foreground" style={{ fontFamily: "Sora, sans-serif" }}>
                    Empowering Cooperatives
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Helping cooperatives access wider markets and improve visibility.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">🤝</span>
                <div>
                  <h3 className="font-semibold text-foreground" style={{ fontFamily: "Sora, sans-serif" }}>
                    Building Trust
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Creating transparent relationships between producers and buyers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Mission & Vision ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Our Purpose</span>
            <h2
              className="mt-2 text-4xl font-bold text-foreground"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Mission &amp; Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Sprout size={24} className="text-primary" />
              </div>
              <h3
                className="text-2xl font-bold text-foreground mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To transform agricultural commerce in Rwanda by connecting
                cooperatives and buyers through technology, transparency, and
                sustainable partnerships.
              </p>
            </div>
            {/* Vision */}
            <div className="p-8 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Globe size={24} className="text-primary" />
              </div>
              <h3
                className="text-2xl font-bold text-foreground mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To become Rwanda&apos;s leading digital agriculture ecosystem where
                every cooperative can access markets and every buyer can source
                quality products easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. How It Works ── */}
      <section id="how" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Process</span>
            <h2
              className="mt-2 text-4xl font-bold text-foreground"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              How We Connect Agriculture
            </h2>
          </div>
          <div className="relative grid md:grid-cols-4 gap-6">
            {/* connecting line — desktop only */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border" />
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center gap-4">
                <div className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-md">
                  <span className="text-primary">{step.icon}</span>
                </div>
                <div
                  className="text-primary font-bold text-xs tracking-widest"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-bold text-foreground text-base"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose AgriConnect ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Advantages</span>
            <h2
              className="mt-2 text-4xl font-bold text-foreground"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Why Choose AgriConnect?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-6 bg-card border border-border rounded-2xl flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {f.icon}
                </div>
                <h3
                  className="font-bold text-foreground"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Impact ── */}
      <section
        id="impact"
        ref={statsRef}
        className="py-24"
        style={{ background: "linear-gradient(135deg, #060e08 0%, #07100a 50%, #091509 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Our Impact</span>
            <h2
              className="mt-2 text-4xl font-bold text-white"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Growing Together Across Rwanda
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s, i) => (
              <StatCard
                key={i}
                value={s.value}
                label={s.label}
                icon={s.icon}
                startAnim={statsVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Meet The Community ── */}
      <section id="community" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Community</span>
            <h2
              className="mt-2 text-4xl font-bold text-foreground"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Meet The Community
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {community.map((c, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-green-100"
              >
                <img
                  src={c.img}
                  alt={c.desc}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07100a]/90 via-[#07100a]/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {c.title}
                  </h3>
                  <p className="text-emerald-200 text-sm mt-1">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section
        className="py-24 px-6 md:px-12"
        style={{ background: "linear-gradient(135deg, #0b1a0d 0%, #0f2214 40%, #132a18 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
          <span className="text-emerald-300 text-sm font-semibold uppercase tracking-widest">
            Get Started
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Join the Future of Agriculture
          </h2>
          <p className="text-emerald-100 text-lg leading-relaxed max-w-xl">
            Whether you are a cooperative looking for new markets or a buyer
            searching for trusted suppliers, AgriConnect helps you build
            meaningful agricultural connections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg">
              Join AgriConnect <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:border-white hover:bg-white/10 transition-colors">
              Explore Products
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
