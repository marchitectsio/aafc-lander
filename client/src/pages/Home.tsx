import { Button } from "@/components/ui/button";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Cpu,
  Maximize2,
  Menu,
  Palette,
  Play,
  Trophy,
  X,
} from "lucide-react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const ScrollReveal = ({ children, className = "", delay = 0 }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-16 scale-95 opacity-0"
      } motion-reduce:transform-none motion-reduce:transition-none ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const [style, setStyle] = useState<CSSProperties>({});
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;

    const rotateX = y * -20;
    const rotateY = x * 20;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`will-change-transform motion-reduce:transform-none ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [activeNav, setActiveNav] = useState("home");
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setSpotlightPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["home", "mission", "programs", "impact", "join"];
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveNav(sectionId);
        }
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      setSpotlightPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      setActiveNav(sectionId);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "mission", label: "Mission" },
    { id: "programs", label: "Programs" },
    { id: "impact", label: "Impact" },
    { id: "join", label: "Join Us" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-[#0B1A3A] selection:bg-[#E4AC44] selection:text-[#0A152A]">
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#0A152A]/90 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <img src="/aafc-logo.png" alt="AAFC Logo" className="h-16 w-auto mix-blend-lighten" />

          <div className="absolute left-1/2 hidden -translate-x-1/2 space-x-10 text-sm font-semibold text-white/90 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative overflow-hidden transition-colors hover:text-[#E4AC44]"
              >
                <span className={`relative z-10 ${activeNav === item.id ? "text-[#E4AC44]" : ""}`}>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-[#E4AC44] transition-all duration-300 ${
                    activeNav === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="hidden items-center md:flex">
            <Button
              asChild
              className="group relative overflow-hidden rounded-full border-2 border-[#E4AC44] bg-transparent px-6 py-2 text-sm font-bold uppercase tracking-wide text-[#E4AC44] transition-all duration-300"
            >
              <a href="https://app.youform.com/forms/r9uihypu" target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[#E4AC44] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[#0A152A]">
                  Partner with Us <ArrowRight size={16} />
                </span>
              </a>
            </Button>
          </div>

          <button
            className="text-white transition-colors hover:text-[#E4AC44] md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col space-y-6 bg-[#0A152A] px-6 pt-24 md:hidden">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="animate-slide-up border-b border-white/10 pb-4 text-left text-2xl font-bold text-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </button>
          ))}
          <Button
            className="mt-8 rounded-xl bg-[#E4AC44] py-4 text-lg font-bold uppercase tracking-wide text-[#0A152A] transition-transform active:scale-95"
            onClick={() => window.open("https://app.youform.com/forms/r9uihypu", "_blank")}
          >
            Partner with Us
          </Button>
        </div>
      )}

      <header
        id="home"
        className="relative overflow-hidden bg-[#0A152A] pb-48 pt-40 md:pb-64 md:pt-52"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 600px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(228, 172, 68, 0.15), transparent 80%)`,
          }}
        />

        <div className="animate-float-slow absolute right-0 top-0 h-[50vw] w-[50vw] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#E4AC44]/10 blur-[120px]" />
        <div className="animate-float-delayed absolute bottom-20 left-10 h-[30vw] w-[30vw] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 z-10 h-32 w-full bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-20 mx-auto max-w-6xl px-6 text-center md:px-12">
          <div className="mb-6 overflow-hidden">
            <h1 className="animate-slide-up-fade text-5xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-lg md:text-7xl lg:text-[5.5rem]">
              ARTISTS AND <br /> ATHLETES FOR CHANGE
            </h1>
          </div>

          <div className="mb-8 overflow-hidden">
            <h2
              className="animate-slide-up-fade text-2xl font-bold tracking-wide text-[#E4AC44] md:text-4xl"
              style={{ animationDelay: "150ms", animationFillMode: "forwards", opacity: 0 }}
            >
              Empowering the next generation of leaders
            </h2>
          </div>

          <div className="mx-auto mb-12 max-w-3xl overflow-hidden">
            <p
              className="animate-slide-up-fade text-lg font-medium leading-relaxed text-blue-100/80 md:text-xl"
              style={{ animationDelay: "300ms", animationFillMode: "forwards", opacity: 0 }}
            >
              AAFC trains youth to become digitally fluent leaders who build sustainable careers and
              strengthen their communities through creativity, discipline, and innovation.
            </p>
          </div>

          <div
            className="animate-slide-up-fade flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            style={{ animationDelay: "450ms", animationFillMode: "forwards", opacity: 0 }}
          >
            <Button
              asChild
              className="w-full rounded-full bg-[#E4AC44] px-10 py-4 text-lg font-bold uppercase tracking-wide text-[#0A152A] shadow-[0_4px_20px_rgba(228,172,68,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_4px_30px_rgba(255,255,255,0.6)] sm:w-auto"
            >
              <a href="https://app.youform.com/forms/f8xnzrci" target="_blank" rel="noopener noreferrer">
                Apply Now
              </a>
            </Button>
            <Button
              asChild
              className="group relative w-full overflow-hidden rounded-full border-2 border-[#E4AC44] bg-transparent px-10 py-4 text-lg font-bold uppercase tracking-wide text-[#E4AC44] transition-all duration-300 sm:w-auto"
            >
              <a href="https://app.youform.com/forms/r9uihypu" target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[#E4AC44] transition-transform duration-300 ease-out group-hover:scale-y-100" />
                <span className="transition-colors duration-300 group-hover:text-[#0A152A]">Partner with Us</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-20 -ml-4 w-[105%] origin-left -rotate-1 transform overflow-hidden border-y-4 border-white bg-[#E4AC44] py-4 shadow-lg transition-transform duration-500 ease-out hover:rotate-0">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap space-x-8 text-xl font-black uppercase tracking-widest text-[#0A152A]">
          <span>✦ CREATIVITY</span>
          <span>✦ DISCIPLINE</span>
          <span>✦ INNOVATION</span>
          <span>✦ COMMUNITY IMPACT</span>
          <span>✦ DIGITAL FLUENCY</span>
          <span>✦ CREATIVITY</span>
          <span>✦ DISCIPLINE</span>
          <span>✦ INNOVATION</span>
          <span>✦ COMMUNITY IMPACT</span>
        </div>
      </div>

      <section id="mission" className="relative z-10 overflow-hidden bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="pr-0 lg:pr-12">
              <ScrollReveal>
                <h2 className="group relative mb-8 inline-block text-4xl font-black text-[#0B1A3A] md:text-5xl">
                  Our Mission
                  <div className="absolute -bottom-2 left-0 h-1.5 w-1/3 bg-[#E4AC44] transition-all duration-500 ease-out group-hover:w-full" />
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <p className="mb-12 text-lg font-medium leading-relaxed text-[#0B1A3A]/70 md:text-xl">
                  AAFC believes young people carry extraordinary potential. Through our one-year tech
                  cohort, participants master digital tools, gain hands-on business experience, and
                  develop leadership skills that prepare them to thrive in creative, athletic, and
                  entrepreneurial fields.
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { stat: "500+", label: "Youth Impacted" },
                  { stat: "50+", label: "Programs" },
                  { stat: "25+", label: "Partners" },
                ].map((item, index) => (
                  <ScrollReveal key={item.label} delay={300 + index * 100}>
                    <div className="border-l-4 border-[#E4AC44] pl-4 transition-transform duration-300 hover:translate-x-2">
                      <div className="mb-1 text-4xl font-black text-[#E4AC44] md:text-5xl">{item.stat}</div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#0B1A3A]/60">{item.label}</div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <ScrollReveal delay={200}>
              <TiltCard>
                <div className="group relative">
                  <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border-4 border-[#0A152A] transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:translate-y-6" />
                  <div className="relative overflow-hidden rounded-3xl bg-[#0A152A] shadow-2xl">
                    <video autoPlay muted loop className="h-[450px] w-full object-cover opacity-85 transition-all duration-700 group-hover:opacity-100">
                      <source src="/mission-video.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsVideoExpanded(true)}
                        className="z-20 flex h-20 w-20 items-center justify-center rounded-full bg-[#E4AC44] pl-1 shadow-[0_0_0_0_rgba(228,172,68,0.7)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_15px_rgba(228,172,68,0)]"
                        aria-label="Expand video"
                      >
                        <Play fill="#0A152A" className="text-[#0A152A]" size={32} />
                      </button>
                    </div>
                    <button
                      onClick={() => setIsVideoExpanded(true)}
                      className="absolute right-4 top-4 rounded-lg bg-white/90 p-2 text-gray-900 shadow-lg transition-all duration-300 hover:bg-white"
                      aria-label="Expand video"
                    >
                      <Maximize2 size={20} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full translate-y-4 bg-gradient-to-t from-[#0A152A] via-[#0A152A]/80 to-transparent p-8 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="text-xl font-bold text-white opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                        Building sustainable futures through creativity, discipline, and innovation
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="programs" className="relative bg-[#F8F9FA] py-24">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#0A152A]/10 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-20 text-center">
              <h2 className="group relative inline-block text-4xl font-black text-[#0B1A3A] md:text-5xl">
                Our Programs
                <div className="absolute -bottom-2 left-1/4 h-1.5 w-1/2 bg-[#E4AC44] transition-all duration-500 group-hover:left-0 group-hover:w-full" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                icon: <Palette size={32} />,
                title: "Creative and Digital Innovation",
                desc: "Advance your creative work while mastering media strategy, digital production, and business tools. Collaborate with professionals and explore industries.",
              },
              {
                num: "02",
                icon: <Trophy size={32} />,
                title: "Athletic Leadership and Technology",
                desc: "Strengthen your performance mindset while developing personal branding, digital fluency, and business awareness. Learn directly from athletes and coaches.",
              },
              {
                num: "03",
                icon: <Cpu size={32} />,
                title: "Innovation and Community Impact",
                desc: "Learn how to apply technology and design thinking to solve real challenges in your community. Develop practical skills that turn ideas into measurable impact.",
              },
            ].map((prog, index) => (
              <ScrollReveal key={prog.num} delay={index * 150}>
                <TiltCard className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-2xl">
                    <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#E4AC44] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    <div className="pointer-events-none absolute -bottom-4 -right-4 text-8xl font-black text-[#0A152A]/5 transition-all duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4 group-hover:text-[#0A152A]/10">
                      {prog.num}
                    </div>

                    <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-[#0A152A] text-[#E4AC44] shadow-md transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                      {prog.icon}
                    </div>
                    <h3 className="relative z-10 mb-4 text-2xl font-black text-[#0B1A3A]">{prog.title}</h3>
                    <p className="relative z-10 font-medium leading-relaxed text-[#0B1A3A]/70">{prog.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h2 className="group relative inline-block text-4xl font-black text-[#0B1A3A] md:text-5xl">
                Our Impact
                <div className="absolute -bottom-2 left-1/4 h-1.5 w-1/2 bg-[#E4AC44] transition-all duration-500 group-hover:left-0 group-hover:w-full" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: "Mentorship Driven",
                text: "Participants receive personalized guidance, real-world insight, and direct access to professional networks that expand career opportunities.",
                color: "navy",
              },
              {
                title: "Leadership Development",
                text: "Through training and applied experience, participants build confidence, critical thinking, and the ability to lead in creative and professional environments.",
                color: "gold",
              },
              {
                title: "Cultural & Community Advancement",
                text: "Graduates become community builders who use creativity, discipline, and technology to strengthen local systems and inspire progress.",
                color: "gold",
              },
              {
                title: "Tech Integration",
                text: "Technology is embedded in every phase of the program, preparing participants to operate effectively in modern creative and business ecosystems.",
                color: "navy",
              },
            ].map((impact, index) => (
              <ScrollReveal key={impact.title} delay={index * 100}>
                <div
                  className={`group cursor-default rounded-2xl border-l-4 bg-[#F8F9FA] p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${
                    impact.color === "navy"
                      ? "border-[#0A152A] hover:bg-[#0A152A] hover:text-white"
                      : "border-[#E4AC44] hover:bg-[#E4AC44] hover:text-[#0A152A]"
                  }`}
                >
                  <h3
                    className={`mb-4 text-2xl font-bold transition-colors ${
                      impact.color === "navy" ? "group-hover:text-[#E4AC44]" : ""
                    }`}
                  >
                    {impact.title}
                  </h3>
                  <p
                    className={`font-medium transition-colors ${
                      impact.color === "navy"
                        ? "text-[#0B1A3A]/70 group-hover:text-white/80"
                        : "text-[#0B1A3A]/70 group-hover:text-[#0A152A]/80"
                    }`}
                  >
                    {impact.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="relative overflow-hidden bg-[#0A152A] py-28">
        <div
          className="animate-float-slow absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(#E4AC44 2px, transparent 2px)", backgroundSize: "40px 40px" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
          <ScrollReveal>
            <h2 className="mb-12 text-4xl font-black text-white md:text-6xl">Ready to Build Your Future?</h2>
          </ScrollReveal>

          <div className="space-y-8 text-left">
            <ScrollReveal delay={150}>
              <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(228,172,68,0.1)] md:flex-row">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#E4AC44]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#E4AC44]" />
                    For Youth Ages 18 to 24
                  </div>
                  <p className="font-medium text-white/90">
                    Join a cohort that provides mentorship, hands-on training, and real-world
                    experience in technology, business, and leadership.
                  </p>
                </div>
                <Button
                  className="w-full shrink-0 rounded-full bg-[#E4AC44] px-8 py-3 font-bold uppercase tracking-wide text-[#0A152A] transition-colors duration-200 hover:scale-105 hover:bg-white active:scale-95 md:w-auto"
                  onClick={() => window.open("https://app.youform.com/forms/f8xnzrci", "_blank")}
                >
                  Apply Now
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] md:flex-row">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-400">
                    For Supporters
                  </div>
                  <p className="font-medium text-white/90">
                    Your investment funds technology access, instruction, and mentorship that prepare
                    young leaders to build sustainable futures.
                  </p>
                </div>
                <Button
                  className="w-full shrink-0 rounded-full border-2 border-[#E4AC44] bg-transparent px-8 py-3 font-bold uppercase tracking-wide text-[#E4AC44] transition-all duration-200 hover:scale-105 hover:bg-[#E4AC44] hover:text-[#0A152A] active:scale-95 md:w-auto"
                  onClick={() => window.open("https://app.youform.com/forms/r9uihypu", "_blank")}
                >
                  Partner with Us
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#050B16] pb-10 pt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <img src="/aafc-logo.png" alt="AAFC Logo" className="mb-6 h-14 w-auto mix-blend-lighten" />
              <p className="max-w-sm font-medium leading-relaxed text-white/60">
                Empowering youth through arts, athletics, and innovation to build sustainable futures
                and create lasting community impact.
              </p>
            </div>

            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Programs</h4>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                {[
                  "Creative and Digital Innovation",
                  "Athletic Leadership and Technology",
                  "Community Impact",
                ].map((link) => (
                  <li key={link}>
                    <a href="#programs" className="inline-block transition-transform hover:translate-x-1 hover:text-[#E4AC44]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">Get Involved</h4>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                {["Apply Now", "Partner with Us", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#join" className="inline-block transition-transform hover:translate-x-1 hover:text-[#E4AC44]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between border-t border-white/10 pt-8 text-xs font-medium text-white/40 md:flex-row">
            <p>© {new Date().getFullYear()} Artists and Athletes for Change. All rights reserved.</p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {isVideoExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-black shadow-2xl">
            <video autoPlay muted loop controls className="aspect-video h-full w-full object-cover">
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <button
              onClick={() => setIsVideoExpanded(false)}
              className="absolute right-4 top-4 rounded-lg bg-white p-2 text-gray-900 shadow-lg transition-all duration-300 hover:bg-gray-100"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(40px) scale(0.95); }
        }
        @keyframes slide-up-fade {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite reverse; }
        .animate-slide-up-fade { animation: slide-up-fade 1s cubic-bezier(0.22, 1, 0.36, 1); }
        .animate-slide-up { animation: slide-up 0.8s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-float-delayed,
          .animate-slide-up-fade,
          .animate-slide-up {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
