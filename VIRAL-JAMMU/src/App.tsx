import { useEffect, useState, useRef } from 'react';

// Hook for scroll reveal animations
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal, .stagger-children').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef} className="counter-number">{count.toLocaleString()}{suffix}</span>;
}

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#jkbose-results', label: 'JKBOSE Results' },
    { href: '#rumors-reality', label: 'Rumors vs Reality' },
    { href: '#vaishno-devi', label: 'Vaishno Devi' },
    { href: '#viral-places', label: 'Viral Places' },
    { href: '#jobs', label: 'Govt Jobs' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-2xl font-display font-bold text-white">V</span>
            </div>
            <div>
              <span className="text-xl font-display font-bold text-gradient-gold">Viral Jammu</span>
              <span className="block text-xs text-gray-400 font-body">Trending JK News</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#C9A227] transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A227] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="https://t.me/VIRALJAMMU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              Join Telegram
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-[#C9A227]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <div className="glass rounded-xl p-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-[#C9A227] transition-colors font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://t.me/VIRALJAMMU"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center mt-4"
            >
              Join Telegram
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Breaking News Ticker
function BreakingNewsTicker() {
  const headlines = [
    "🔥 JKBOSE Class 10 Result 2026 Expected Soon - Check Official Updates",
    "📢 JKBOSE Class 12 Result Declaration Date Announced",
    "⚡ Mata Vaishno Devi Yatra: New Guidelines Released",
    "🎓 JK Scholarship 2026 Applications Open Now",
    "💼 JKSSB New Recruitment Notification Out",
    "🌤️ Jammu Weather Alert: Temperature Changes Expected",
    "📍 Hidden Gems Near RS Pura - Must Visit Places",
  ];

  return (
    <div className="bg-gradient-to-r from-[#C9A227] via-[#C75B39] to-[#C9A227] py-2 overflow-hidden">
      <div className="flex animate-ticker">
        {[...headlines, ...headlines].map((headline, idx) => (
          <span key={idx} className="whitespace-nowrap px-8 text-white font-medium">
            {headline}
          </span>
        ))}
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 gradient-radial"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A227]/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C75B39]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2C5530]/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Live Updates • Jammu & Kashmir</span>
            </div>

            <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight animate-slide-up">
              <span className="text-white">Your Trusted Source for</span>
              <br />
              <span className="text-gradient-gold">JKBOSE Results 2026</span>
              <br />
              <span className="text-white">&amp; Viral JK News</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Get the latest updates on JKBOSE Class 10 & 12 results, exam dates, Mata Vaishno Devi travel info, government jobs, and trending news from Jammu & Kashmir.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <a href="#jkbose-results" className="btn-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Check Results
              </a>
              <a href="#rumors-reality" className="btn-secondary">
                Rumors vs Reality
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-800 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div>
                <div className="text-3xl font-bold text-gradient-gold"><AnimatedCounter end={50000} suffix="+" /></div>
                <div className="text-sm text-gray-500">Daily Readers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-gold"><AnimatedCounter end={15000} suffix="+" /></div>
                <div className="text-sm text-gray-500">Telegram Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-gold"><AnimatedCounter end={500} suffix="+" /></div>
                <div className="text-sm text-gray-500">Daily Updates</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in hidden lg:block">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80"
                alt="Beautiful view of Jammu and Kashmir mountains and valleys representing the scenic beauty of the region"
                className="rounded-3xl shadow-2xl shadow-[#C9A227]/20"
              />
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Verified Updates</div>
                    <div className="text-gray-400 text-sm">100% Official Sources</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Real-time News</div>
                    <div className="text-gray-400 text-sm">Instant Alerts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a href="#jkbose-results" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-[#C9A227] transition-colors">
        <span className="text-sm">Scroll to explore</span>
        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}

// JKBOSE Results Section
function JKBOSEResultsSection() {
  const resultCards = [
    {
      title: "JKBOSE Class 10 Result 2026",
      status: "Expected Soon",
      tag: "HOT",
      tagClass: "tag-hot",
      description: "The JKBOSE 10th Result 2026 is expected to be released soon. Students can check their results on the official JKBOSE website. Stay tuned for the latest updates.",
      expectedDate: "March 2026",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
      imageAlt: "Students studying for JKBOSE Class 10 exams representing education in Jammu Kashmir"
    },
    {
      title: "JKBOSE Class 12 Result 2026",
      status: "Coming Soon",
      tag: "BREAKING",
      tagClass: "tag-breaking",
      description: "JKBOSE Class 12 results for the 2026 session will be declared after the Class 10 results. Check the official notification for exact dates and updates.",
      expectedDate: "April 2026",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
      imageAlt: "Higher secondary students preparing for JKBOSE Class 12 board examinations"
    },
    {
      title: "JKBOSE Exam Date Sheet 2026",
      status: "Released",
      tag: "OFFICIAL",
      tagClass: "tag-official",
      description: "The official exam date sheet for JKBOSE 2026 has been released. Download the complete schedule for Class 10 and Class 12 examinations.",
      expectedDate: "Available Now",
      image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80",
      imageAlt: "JKBOSE exam schedule and date sheet for upcoming board examinations"
    }
  ];

  return (
    <section id="jkbose-results" className="py-24 relative noise-overlay">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A227]/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="tag tag-hot mb-4">Latest Updates</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-4">
            JKBOSE Results & <span className="text-gradient-gold">Exam Updates</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Get the most accurate and timely information about JKBOSE Class 10 and Class 12 results, exam dates, and official notifications directly from verified sources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {resultCards.map((card, idx) => (
            <article key={idx} className="glass rounded-3xl overflow-hidden card-hover group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent"></div>
                <span className={`tag ${card.tagClass} absolute top-4 left-4`}>{card.tag}</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A227] text-sm font-medium">{card.status}</span>
                  <span className="text-gray-500 text-sm">{card.expectedDate}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-[#C9A227] transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#C9A227] font-medium group/link">
                  Read Full Update
                  <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* How to Check Results Box */}
        <div className="mt-16 animated-border p-8 rounded-2xl reveal">
          <div className="relative z-10">
            <h3 className="text-2xl font-display font-bold text-white mb-6">
              How to Check JKBOSE Results 2026 Online
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Visit Official Website", desc: "Go to jkbose.nic.in" },
                { step: "2", title: "Select Result Link", desc: "Click on Class 10/12 Result" },
                { step: "3", title: "Enter Details", desc: "Fill Roll Number & DOB" },
                { step: "4", title: "View & Download", desc: "Check and save result" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Rumors vs Reality Section
function RumorsRealitySection() {
  const rumors = [
    {
      rumor: "JKBOSE Paper Leak 2026 - Exam Cancelled?",
      reality: "FALSE: There is NO official confirmation of any paper leak. JKBOSE has clarified that all examinations are being conducted as per schedule. Do not believe unverified WhatsApp forwards.",
      status: "Fake News",
      icon: "❌"
    },
    {
      rumor: "Class 10 Results Delayed to June 2026",
      reality: "UNVERIFIED: This claim is circulating on social media without any official source. As per JKBOSE officials, results are expected in the regular timeline (March-April 2026).",
      status: "Unverified",
      icon: "⚠️"
    },
    {
      rumor: "Online Mode Exams Announced for 2026",
      reality: "FALSE: JKBOSE has NOT announced any online examination mode. All exams will be conducted in offline/physical mode as per the traditional pattern.",
      status: "Fake News",
      icon: "❌"
    },
    {
      rumor: "New Grading System Implementation",
      reality: "OFFICIAL: JKBOSE is reviewing the grading system, but no changes have been announced for 2026. Any updates will be communicated through official channels only.",
      status: "Under Review",
      icon: "🔍"
    }
  ];

  return (
    <section id="rumors-reality" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#C75B39]/5 via-transparent to-[#2C5530]/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="tag tag-breaking mb-4">Fact Check</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-4">
            Rumors vs <span className="text-gradient-gold">Official Updates</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Don't fall for fake news! We verify every claim against official JKBOSE sources. Here's the truth behind viral rumors about JKBOSE 2026.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 stagger-children">
          {rumors.map((item, idx) => (
            <div key={idx} className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`tag ${item.status === 'Fake News' ? 'bg-red-500/20 text-red-400' : item.status === 'Under Review' ? 'tag-official' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-3">
                    "{item.rumor}"
                  </h3>
                  <div className="bg-[#2C5530]/20 border border-[#2C5530]/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-green-400 font-semibold text-sm">REALITY CHECK</span>
                    </div>
                    <p className="text-gray-300 text-sm">{item.reality}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center reveal">
          <div className="inline-flex items-center gap-4 glass-light rounded-full px-6 py-3">
            <svg className="w-6 h-6 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">Always verify news from official JKBOSE website: <a href="https://jkbose.nic.in" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:underline">jkbose.nic.in</a></span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mata Vaishno Devi Section
function VaishnodeviSection() {
  return (
    <section id="vaishno-devi" className="py-24 relative parallax-section overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1600&q=80"
          alt="Scenic mountain path leading to Mata Vaishno Devi shrine in Jammu showcasing the pilgrimage route"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-[#0D1117]/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 reveal">
            <span className="tag tag-official">Travel Updates</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white">
              Mata Vaishno Devi <span className="text-gradient-gold">Yatra Updates</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Planning your pilgrimage to the holy shrine? Get the latest information on yatra registrations, helicopter bookings, weather conditions, and crowd updates.
            </p>

            <div className="space-y-4">
              {[
                { label: "Current Waiting Time", value: "2-3 Hours", icon: "⏰" },
                { label: "Today's Weather", value: "Clear, 8°C", icon: "🌤️" },
                { label: "Helicopter Status", value: "Operational", icon: "🚁" },
                { label: "Yatra Status", value: "Open for All", icon: "✅" }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 glass-light rounded-xl p-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="https://www.maavaishnodevi.org" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Yatra Online
              </a>
              <a href="#" className="btn-secondary">
                View Full Guide
              </a>
            </div>
          </div>

          <div className="relative reveal hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=400&q=80"
                alt="Devotees on the pilgrimage path to Mata Vaishno Devi temple"
                className="rounded-2xl w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=400&q=80"
                alt="Beautiful view of mountains surrounding Katra and Vaishno Devi route"
                className="rounded-2xl w-full h-64 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1597074866923-dc0589150358?w=400&q=80"
                alt="Panoramic mountain scenery of Jammu region near Vaishno Devi"
                className="rounded-2xl w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80"
                alt="Morning sunrise view from Vaishno Devi pilgrimage trail"
                className="rounded-2xl w-full h-64 object-cover mt-8"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 animate-pulse-glow">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold"><AnimatedCounter end={25000} suffix="+" /></div>
                <div className="text-gray-400 text-sm">Daily Pilgrims</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Viral Places Section
function ViralPlacesSection() {
  const places = [
    {
      name: "Hidden Waterfall near RS Pura",
      location: "RS Pura, Jammu",
      description: "A secret natural waterfall just 15 km from RS Pura, perfect for a weekend getaway. Rarely crowded and stunningly beautiful.",
      image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&q=80",
      imageAlt: "Hidden natural waterfall near RS Pura Jammu surrounded by lush greenery",
      trending: true
    },
    {
      name: "Biaspur Parlah Sunset Point",
      location: "Biaspur Parlah",
      description: "The most Instagram-worthy sunset spot in Jammu district. Golden hour views that will leave you speechless.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      imageAlt: "Stunning sunset view from Biaspur Parlah viewpoint in Jammu",
      trending: true
    },
    {
      name: "Ancient Temple Trail",
      location: "Near Akhnoor",
      description: "Discover 1000-year-old temples hidden in the hills. A perfect blend of history and nature just 40 km from Jammu city.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
      imageAlt: "Ancient temple ruins near Akhnoor showcasing historical heritage of Jammu",
      trending: false
    },
    {
      name: "Mansar Lake Secret Cove",
      location: "Mansar Lake",
      description: "Beyond the main lake lies a hidden cove that most tourists miss. Pristine waters and zero crowds await.",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80",
      imageAlt: "Serene hidden cove at Mansar Lake near Jammu with crystal clear waters",
      trending: true
    },
    {
      name: "Patnitop Off-Route Trails",
      location: "Patnitop",
      description: "Skip the crowded areas and explore secret pine forest trails that offer breathtaking valley views.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      imageAlt: "Off-route hiking trails in Patnitop pine forests with mountain views",
      trending: false
    },
    {
      name: "Bahu Fort Gardens",
      location: "Jammu City",
      description: "Early morning at Bahu Fort offers the most serene experience. Locals know 6 AM is the magical hour.",
      image: "https://images.unsplash.com/photo-1585506942812-e72b29cef752?w=600&q=80",
      imageAlt: "Historic Bahu Fort gardens in Jammu city during early morning hours",
      trending: false
    }
  ];

  return (
    <section id="viral-places" className="py-24 relative noise-overlay">
      <div className="absolute inset-0 bg-gradient-to-t from-[#C9A227]/5 via-transparent to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="tag tag-hot mb-4">Explore</span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mt-4">
            Viral Places in <span className="text-gradient-gold">Jammu</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Discover hidden gems and trending spots in Jammu that locals love. From secret waterfalls near RS Pura to stunning viewpoints in Biaspur Parlah.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {places.map((place, idx) => (
            <article key={idx} className="group relative glass rounded-2xl overflow-hidden card-hover">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.imageAlt}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent"></div>
                {place.trending && (
                  <span className="tag tag-hot absolute top-4 right-4">🔥 Trending</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[#C9A227] text-sm mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {place.location}
                </div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-[#C9A227] transition-colors mb-2">
                  {place.name}
                </h3>
                <p className="text-gray-400 text-sm">{place.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Weather & Alerts Section
function WeatherAlertsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weather Card */}
          <div className="glass rounded-3xl p-8 reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <span className="text-2xl">🌤️</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">Jammu Weather Today</h3>
                <span className="text-gray-400 text-sm">Live Updates</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1A1A] rounded-2xl p-4 text-center">
                <div className="text-5xl font-bold text-white">24°C</div>
                <div className="text-gray-400 mt-1">Current</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center glass-light rounded-xl p-3">
                  <span className="text-gray-400">Humidity</span>
                  <span className="text-white font-semibold">65%</span>
                </div>
                <div className="flex justify-between items-center glass-light rounded-xl p-3">
                  <span className="text-gray-400">Wind</span>
                  <span className="text-white font-semibold">12 km/h</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-5 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
                <div key={day} className="text-center glass-light rounded-xl p-3">
                  <div className="text-gray-400 text-xs">{day}</div>
                  <div className="text-xl my-1">{['☀️', '🌤️', '⛅', '🌧️', '☀️'][idx]}</div>
                  <div className="text-white text-sm font-semibold">{[26, 24, 22, 18, 25][idx]}°</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarship & Jobs Updates */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6 reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white">Latest Scholarships</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "JK Merit Scholarship 2026", deadline: "Mar 15, 2026", amount: "₹50,000" },
                  { name: "Post Matric Scholarship", deadline: "Feb 28, 2026", amount: "₹25,000" },
                  { name: "Minority Scholarship", deadline: "Apr 10, 2026", amount: "₹30,000" }
                ].map((item) => (
                  <a key={item.name} href="#" className="flex items-center justify-between glass-light rounded-xl p-4 hover:bg-[#C9A227]/10 transition-colors group">
                    <div>
                      <div className="text-white font-medium group-hover:text-[#C9A227] transition-colors">{item.name}</div>
                      <div className="text-gray-500 text-sm">Deadline: {item.deadline}</div>
                    </div>
                    <div className="text-[#C9A227] font-semibold">{item.amount}</div>
                  </a>
                ))}
              </div>
            </div>

            <div id="jobs" className="glass rounded-3xl p-6 reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#2C5530] flex items-center justify-center">
                  <span className="text-xl">💼</span>
                </div>
                <h3 className="text-lg font-display font-bold text-white">Government Jobs in JK</h3>
              </div>
              <div className="space-y-3">
                {[
                  { title: "JKSSB Clerk Recruitment", posts: "500+ Posts", status: "Apply Now" },
                  { title: "JK Police Constable", posts: "1200 Posts", status: "Coming Soon" },
                  { title: "JKPSC Teacher Posts", posts: "800 Posts", status: "Apply Now" }
                ].map((item) => (
                  <a key={item.title} href="#" className="flex items-center justify-between glass-light rounded-xl p-4 hover:bg-[#2C5530]/10 transition-colors group">
                    <div>
                      <div className="text-white font-medium group-hover:text-[#C9A227] transition-colors">{item.title}</div>
                      <div className="text-gray-500 text-sm">{item.posts}</div>
                    </div>
                    <span className={`tag ${item.status === 'Apply Now' ? 'tag-official' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {item.status}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Telegram CTA Section
function TelegramCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-gold opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animated-border rounded-3xl p-1">
          <div className="bg-[#1A1A1A] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <pattern id="telegram-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M20 0L40 20L20 40L0 20Z" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#telegram-pattern)" />
              </svg>
            </div>

            <div className="relative z-10 reveal">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0088cc] to-[#229ED9] flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Join <span className="text-gradient-gold">@VIRALJAMMU</span> on Telegram
              </h2>

              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                Get instant updates on JKBOSE results, exam notifications, government jobs, and viral Jammu news directly on your phone. Join 15,000+ members now!
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {[
                  { icon: "⚡", text: "Instant Alerts" },
                  { icon: "📢", text: "Breaking News" },
                  { icon: "📚", text: "Study Materials" },
                  { icon: "💼", text: "Job Updates" }
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-gray-300">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://t.me/VIRALJAMMU"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-10 py-4 inline-flex"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Join @VIRALJAMMU Now
              </a>

              <p className="text-gray-500 text-sm mt-4">
                Free • No Spam • Verified Updates Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-white">V</span>
              </div>
              <div>
                <span className="text-xl font-display font-bold text-gradient-gold">Viral Jammu</span>
                <span className="block text-xs text-gray-400">Trending JK News</span>
              </div>
            </a>
            <p className="text-gray-400 max-w-md">
              Your trusted source for JKBOSE results, exam updates, Mata Vaishno Devi travel information, government jobs, and trending news from Jammu & Kashmir.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://t.me/VIRALJAMMU" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-gray-400 hover:text-[#C9A227] hover:border-[#C9A227] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-gray-400 hover:text-[#C9A227] hover:border-[#C9A227] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-gray-400 hover:text-[#C9A227] hover:border-[#C9A227] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '#jkbose-results', label: 'JKBOSE Results' },
                { href: '#rumors-reality', label: 'Rumors vs Reality' },
                { href: '#vaishno-devi', label: 'Vaishno Devi Updates' },
                { href: '#viral-places', label: 'Viral Places' },
                { href: '#jobs', label: 'Government Jobs' }
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-[#C9A227] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              {[
                { href: 'https://jkbose.nic.in', label: 'JKBOSE Official' },
                { href: 'https://www.maavaishnodevi.org', label: 'Vaishno Devi Shrine' },
                { href: 'https://jkssb.nic.in', label: 'JKSSB Portal' },
                { href: '#', label: 'Scholarship Portal' },
                { href: '#', label: 'Weather Updates' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-gray-400 hover:text-[#C9A227] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Viral Jammu. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made with ❤️ in Jammu & Kashmir
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Navigation />
      <BreakingNewsTicker />
      <main>
        <HeroSection />
        <JKBOSEResultsSection />
        <RumorsRealitySection />
        <VaishnodeviSection />
        <ViralPlacesSection />
        <WeatherAlertsSection />
        <TelegramCTASection />
      </main>
      <Footer />
    </div>
  );
}
