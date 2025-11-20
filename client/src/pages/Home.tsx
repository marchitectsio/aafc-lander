import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";

const animationStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.8s ease-out;
  }

  .animate-fade-in-delayed {
    animation: fadeIn 0.8s ease-out 0.2s both;
  }

  .animate-fade-in-delayed-2 {
    animation: fadeIn 0.8s ease-out 0.4s both;
  }

  .animate-fade-in-delayed-3 {
    animation: fadeIn 0.8s ease-out 0.6s both;
  }

  .animate-fade-in-delayed-4 {
    animation: fadeIn 0.8s ease-out 0.8s both;
  }

  @keyframes sparkle {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
    }
    50% {
      transform: scale(1.05) rotate(2deg);
      box-shadow: 0 0 30px rgba(212, 175, 55, 0.8), 0 0 40px rgba(212, 175, 55, 0.4);
    }
  }

  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .donate-button {
    position: relative;
    overflow: hidden;
  }

  .donate-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
  }

  .donate-button:hover::before {
    animation: shine 0.8s;
  }

  .donate-button:hover {
    animation: sparkle 0.6s ease-in-out;
  }

  .logo-subtext {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #E3A857;
    text-transform: uppercase;
    margin-top: 0.25rem;
    line-height: 1;
  }
`;

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active nav based on scroll position
      const sections = ["home", "mission", "programs", "impact", "join"];
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNav(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveNav(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo - AAFC Image */}
          <img src="/aafc-logo.png" alt="AAFC Logo" className="h-16 w-auto mix-blend-lighten" />

          {/* Navigation Links - Centered */}
          <ul className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2">
            {[
              { id: "home", label: "Home" },
              { id: "mission", label: "Mission" },
              { id: "programs", label: "Programs" },
              { id: "impact", label: "Impact" },
              { id: "join", label: "Join Us" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-semibold transition-all duration-300 pb-2 border-b-2 ${
                    activeNav === item.id
                      ? "text-[#E3A857] border-[#E3A857]"
                      : "text-white border-transparent hover:text-[#E3A857]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* PARTNER WITH US Button - Far Right */}
          <Button
            className="px-4 py-2 bg-[#E3A857] hover:bg-transparent hover:border-2 hover:border-[#E3A857] text-black hover:text-[#E3A857] font-bold text-sm rounded-lg transition-all duration-300 shadow-lg"
            onClick={() => window.open('https://app.youform.com/forms/r9uihypu', '_blank')}
          >
            PARTNER WITH US
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen pt-32 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3A857]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Tagline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight text-white animate-fade-in-delayed block">
            ARTISTS AND ATHLETES FOR CHANGE
          </h1>

          <p className="text-2xl sm:text-3xl lg:text-4xl mb-8 font-bold text-[#E3A857] animate-fade-in-delayed-2">
            Empowering the next generation of leaders
          </p>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-delayed-4">
            AAFC trains youth to become digitally fluent leaders who build sustainable careers and strengthen their communities through creativity, discipline, and innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed-5">
            <Button
              className="px-8 py-3 bg-[#E3A857] hover:bg-transparent hover:border-2 hover:border-[#E3A857] text-black hover:text-[#E3A857] font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => window.open('https://app.youform.com/forms/f8xnzrci', '_blank')}
            >
              Apply Now
            </Button>
            <Button
              className="px-8 py-3 border-2 border-[#E3A857] bg-transparent hover:bg-[#E3A857] text-[#E3A857] hover:text-black font-bold text-lg rounded-lg transition-all duration-300 hover:border-[#E3A857]"
              onClick={() => window.open('https://app.youform.com/forms/r9uihypu', '_blank')}
            >
              Partner with Us
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-8 text-gray-900 leading-tight">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                AAFC believes young people carry extraordinary potential. Through our one-year tech cohort, participants master digital tools, gain hands-on business experience, and develop leadership skills that prepare them to thrive in creative, athletic, and entrepreneurial fields.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#E3A857] mb-2">500+</div>
                  <p className="text-sm text-gray-600 font-semibold">Youth Impacted</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#E3A857] mb-2">50+</div>
                  <p className="text-sm text-gray-600 font-semibold">Programs</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#E3A857] mb-2">25+</div>
                  <p className="text-sm text-gray-600 font-semibold">Partners</p>
                </div>
              </div>
            </div>
            <div className="relative h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-2xl group">
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              >
                <source src="/mission-video.mp4" type="video/mp4" />
              </video>
              <button
                onClick={() => setIsVideoExpanded(true)}
                className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-lg shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Expand video"
              >
                <Maximize2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-12 text-gray-900">
            Our Programs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎭",
                title: "Creative and Digital Innovation",
                description:
                  "Advance your creative work while mastering media strategy, digital production, and business tools. Collaborate with professionals and explore creative industries that connect art, technology, and opportunity.",
              },
              {
                icon: "⚽",
                title: "Athletic Leadership and Technology",
                description:
                  "Strengthen your performance mindset while developing personal branding, digital fluency, and business awareness. Learn directly from athletes and coaches who guide you through growth and career transitions.",
              },
              {
                icon: "💡",
                title: "Innovation and Community Impact",
                description:
                  "Learn how to apply technology and design thinking to solve real challenges in your community. Develop practical skills that turn ideas into measurable impact.",
              },
            ].map((program, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-[#E3A857]"
              >
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {program.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-12 text-gray-900">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Mentorship Driven",
                description:
                  "Participants receive personalized guidance, real-world insight, and direct access to professional networks that expand career opportunities.",
              },
              {
                title: "Leadership Development",
                description:
                  "Through training and applied experience, participants build confidence, critical thinking, and the ability to lead in creative and professional environments.",
              },
              {
                title: "Cultural and Community Advancement",
                description:
                  "Graduates become community builders who use creativity, discipline, and technology to strengthen local systems and inspire progress.",
              },
              {
                title: "Tech Integration",
                description:
                  "Technology is embedded in every phase of the program, preparing participants to operate effectively in modern creative and business ecosystems.",
              },
            ].map((impact, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-l-4 border-[#E3A857] shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {impact.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section
        id="join"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Ready to Build Your Future?
          </h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            <strong>For Youth Ages 18 to 24:</strong> Join a cohort that provides mentorship, hands-on training, and real-world experience in technology, business, and leadership.<br/><br/>
            <strong>For Supporters:</strong> Your investment funds technology access, instruction, and mentorship that prepare young leaders to build sustainable futures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="px-8 py-3 bg-[#E3A857] hover:bg-transparent hover:border-2 hover:border-[#E3A857] text-black hover:text-[#E3A857] font-bold text-lg rounded-lg transition-all duration-300 shadow-lg"
              onClick={() => window.open('https://app.youform.com/forms/f8xnzrci', '_blank')}
            >
              Apply Now
            </Button>
            <Button 
              className="px-8 py-3 border-2 border-[#E3A857] bg-transparent hover:bg-[#E3A857] text-[#E3A857] hover:text-black font-bold text-lg rounded-lg transition-all duration-300"
              onClick={() => window.open('https://app.youform.com/forms/r9uihypu', '_blank')}
            >
              Partner with Us
            </Button>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-[#E3A857] text-lg font-bold mb-4 tracking-normal" style={{fontFamily: 'Merriweather, serif'}}>About AAFC</h4>
              <p className="text-sm leading-relaxed">
                AAFC empowers youth through arts, athletics, and innovation to build sustainable futures and create lasting community impact.
              </p>
            </div>
            <div>
              <h4 className="text-[#E3A857] text-lg font-bold mb-4 tracking-normal" style={{fontFamily: 'Merriweather, serif'}}>Programs</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#programs" className="hover:text-[#E3A857] transition">Creative and Digital Innovation</a></li>
                <li><a href="#programs" className="hover:text-[#E3A857] transition">Athletic Leadership and Technology</a></li>
                <li><a href="#programs" className="hover:text-[#E3A857] transition">Innovation and Community Impact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#E3A857] text-lg font-bold mb-4 tracking-normal" style={{fontFamily: 'Merriweather, serif'}}>Get Involved</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#join" className="hover:text-[#E3A857] transition">Apply Now</a></li>
                <li><a href="#join" className="hover:text-[#E3A857] transition">Partner with Us</a></li>
              </ul>
            </div>

          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Artists and Athletes for Change. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <video
              autoPlay
              muted
              loop
              controls
              className="w-full h-full object-cover"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <button
              onClick={() => setIsVideoExpanded(false)}
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-lg shadow-lg transition-all duration-300"
              aria-label="Close video"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <style>{animationStyles}</style>
    </div>
  );
}
