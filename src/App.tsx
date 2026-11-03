/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Globe,
  Zap,
  Lightbulb,
  BadgeCheck,
  Info,
  Mail,
  Phone,
  Star,
  Plus,
  X,
  Menu,
  ChevronDown,
} from 'lucide-react';

const DISTRICTS = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kanchipuram',
  'Kanniyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivagangai',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thiruvarur',
  'Thoothukudi',
  'Tiruchirappalli',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Vellore',
  'Villupuram',
  'Virudhunagar',
  'Pondicherry',
  'Others',
];

const CUSTOMER_AVATARS = [
  { src: '/assets/solar/avatar-emily.png', name: 'Ananya R.' },
  { src: '/assets/solar/avatar-billie.png', name: 'Karthik S.' },
  { src: '/assets/solar/avatar-james.png', name: 'Vikram M.' },
  { src: '/assets/solar/testimonial-center.png', name: 'Priya N.' },
];

function CustomerAvatarGroup({
  variant = 'light',
  count = 4,
}: {
  variant?: 'dark' | 'light';
  count?: number;
}) {
  const isDark = variant === 'dark';
  const sizeClass = isDark
    ? 'w-[36px] h-[36px] sm:w-[40px] sm:h-[40px]'
    : 'w-[40px] h-[40px] sm:w-[44px] sm:h-[44px]';
  const ringClass = isDark
    ? 'border-2 border-[#0D0D0D] bg-[#222222]'
    : 'border-2 border-white bg-[#EDEDED] shadow-xs';

  return (
    <div
      className="inline-flex items-center -space-x-2.5 sm:-space-x-3 shrink-0 select-none"
      role="group"
      aria-label="Happy customer avatars"
    >
      {CUSTOMER_AVATARS.slice(0, count).map((avatar, idx) => (
        <div
          key={avatar.name}
          style={{ zIndex: idx + 1 }}
          className={`relative ${sizeClass} rounded-full overflow-hidden ${ringClass} shrink-0 transition-transform duration-200 hover:-translate-y-0.5`}
        >
          <img
            src={avatar.src}
            alt={avatar.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover block"
          />
        </div>
      ))}
    </div>
  );
}


// Dot matrix data for the third bento card (14 columns, bottom-to-top)
// 'D' = #193d3c (dark teal), 'G' = #9cfc6c (lime green), 'L' = #dcdcdc (light gray)
const DOT_CHART_COLUMNS: Array<{
  dots: Array<'D' | 'G' | 'L'>;
  label?: string;
}> = [
  { dots: ['D', 'D', 'G', 'D', 'D'], label: '1 kW' },
  { dots: ['L', 'L', 'L', 'G', 'D', 'D'] },
  { dots: ['L', 'L', 'D', 'D'] },
  { dots: ['L', 'L', 'D'] },
  { dots: ['G', 'L', 'D', 'D', 'D'], label: '2 kW' },
  { dots: ['L', 'D'] },
  { dots: ['D', 'D', 'D', 'D'] },
  { dots: ['D', 'D', 'D', 'D'] },
  { dots: ['L', 'L', 'L', 'G', 'D', 'D', 'D'] },
  { dots: ['L', 'L', 'D', 'D'], label: '3 kW' },
  { dots: ['L', 'D', 'D'] },
  { dots: ['L', 'L', 'D'] },
  { dots: ['L', 'D'] },
  { dots: ['D'], label: '3 kW+' },
];

const PROJECTS = [
  {
    title: 'Residential Solar',
    rating: '4.9',
    description:
      'Years of experience, a portfolio of successful installations and trust built with every customer.',
    installedCapacity: '3 kW',
    location: 'Chennai, Tamil Nadu',
    projectType: 'Residential Solar',
    subsidyAvailed: '₹1,00,000',
    image: '/assets/solar/project-residential.png',
  },
  {
    title: 'Residential Solar',
    rating: '4.9',
    description:
      'Years of experience, a portfolio of successful installations and trust built with every customer.',
    installedCapacity: '2 kW',
    location: 'Coimbatore, Tamil Nadu',
    projectType: 'Residential Solar',
    subsidyAvailed: '₹70,000',
    image: '/assets/solar/testimonial-center.png',
  },
  {
    title: 'Residential Solar',
    rating: '4.8',
    description:
      'Years of experience, a portfolio of successful installations and trust built with every customer.',
    installedCapacity: '5 kW',
    location: 'Madurai, Tamil Nadu',
    projectType: 'Residential Solar',
    subsidyAvailed: '₹1,00,000',
    image: '/assets/solar/service-commercial.png',
  },
];

const FAQS = [
  {
    id: 1,
    question:
      '1. How much does it cost to install a rooftop solar system for a home in Tamil Nadu?',
    answer:
      'The cost depends on your electricity consumption, required system capacity, roof suitability and equipment selection. NIRT evaluates these factors to recommend a suitable solar solution and provide a project-specific quotation.',
  },
  {
    id: 2,
    question:
      '2. How much government subsidy can I get for installing solar panels in Tamil Nadu?',
    answer:
      'Eligible residential households can receive up to ₹78,000 in central government subsidy under PM Surya Ghar. Additional Tamil Nadu state subsidy benefits may also be available, subject to current eligibility conditions.',
  },
  {
    id: 3,
    question:
      '3. How many units of electricity can a 3 kW solar system generate per day?',
    answer:
      'A 3 kW rooftop solar system can generate approximately 12–15 units per day under favourable conditions. Actual generation varies depending on sunlight, location, weather and rooftop orientation.',
  },
  {
    id: 4,
    question: '4. Can rooftop solar completely eliminate my monthly EB bill?',
    answer:
      'Solar can significantly reduce your electricity expenses, but a zero bill cannot be guaranteed. Your final bill depends on electricity consumption, solar generation, fixed charges and applicable net-metering regulations.',
  },
  {
    id: 5,
    question:
      '5. Can I install solar panels through a bank loan or EMI in Tamil Nadu?',
    answer:
      'Yes. Eligible homeowners can explore solar financing through participating banks and lenders. Loan availability, interest rates, repayment periods and EMI amounts depend on lender approval.',
  },
];

// NIRT Renewable Energy Brand Logo (exact unaltered image)
function SolarproLogo() {
  return (
    <a
      href="#home"
      aria-label="NIRT Renewable Energy Home"
      className="inline-flex items-center shrink-0 focus:outline-none"
    >
      <img
        src="/assets/aistudio/nirt_logo_dbbf2295.png"
        alt="NIRT Renewable Energy"
        referrerPolicy="no-referrer"
        className="h-[46px] sm:h-[56px] lg:h-[64px] w-auto object-contain block"
      />
    </a>
  );
}

function HeroNirtBackdrop() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <img
        src="/assets/aistudio/image_59327cd1.png"
        alt="NIRT Renewable Energy wind turbines and solar landscape"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-[38%_top] sm:object-center block"
      />
    </div>
  );
}

export default function App() {
  const [openFaqId, setOpenFaqId] = useState<number>(1);
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [caseStudyModal, setCaseStudyModal] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Mid-page popup form state (triggers after visitor engages with the numerical section)
  const [midPagePopupOpen, setMidPagePopupOpen] = useState<boolean>(false);
  const [hasTriggeredMidPopup, setHasTriggeredMidPopup] =
    useState<boolean>(false);
  const numericalSectionRef = useRef<HTMLElement | null>(null);

  // Interactive EMI Calculator state (defaults to PDF illustrative example: ₹1,00,000, 5 years, 10% p.a. -> ₹2,125)
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(10);

  // Main Estimate Form state (PDF Page 1 & Page 8: Name, District, Contact number, Bi monthly bill)
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    contactNumber: '',
    biMonthlyBill: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');

  // Mid-page Popup Form state
  const [popupFormData, setPopupFormData] = useState({
    name: '',
    district: '',
    contactNumber: '',
    biMonthlyBill: '',
  });
  const [popupFormStatus, setPopupFormStatus] = useState<'idle' | 'submitted'>(
    'idle'
  );

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSaved, setNewsletterSaved] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  // Initial-only open -> show "WhatsApp Us" -> close -> show only icon animation
  useEffect(() => {
    const openTimer = setTimeout(() => {
      setWhatsappOpen(true);
    }, 400);
    const closeTimer = setTimeout(() => {
      setWhatsappOpen(false);
    }, 3200);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  // Calculate monthly EMI
  const calculateMonthlyEmi = (
    principal: number,
    years: number,
    annualRate: number
  ) => {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    if (monthlyRate === 0) return Math.round(principal / months);
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const calculatedEmi = calculateMonthlyEmi(
    loanAmount,
    loanTenureYears,
    interestRate
  );

  // Trigger Mid-page popup form after visitor engages with / views the numerical section
  useEffect(() => {
    if (hasTriggeredMidPopup) return;
    const el = numericalSectionRef.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasTriggeredMidPopup) {
          timer = setTimeout(() => {
            setMidPagePopupOpen(true);
            setHasTriggeredMidPopup(true);
          }, 1800);
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [hasTriggeredMidPopup]);

  const scrollToQuote = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitted');
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  const handlePopupFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPopupFormStatus('submitted');
    setTimeout(() => {
      setPopupFormStatus('idle');
      setMidPagePopupOpen(false);
    }, 1800);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSaved(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSaved(false), 4000);
  };

  const currentProject = PROJECTS[activeProjectIdx];

  // ============================================================================
  // SECTION 1: TOP NAVBAR
  // ============================================================================
  const renderNavbar = () => (
    <header className="w-full bg-white py-[14px] sm:py-[18px] lg:py-[22px] border-b border-black/[0.04] sticky top-0 z-40">
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <SolarproLogo />

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-[32px] xl:gap-[42px] text-[16px] tracking-[-0.01em]">
          <a
            href="#home"
            className="font-semibold text-[#0D0D0D] hover:text-[#1E255E] transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#about"
            className="font-normal text-[#6E6E6E] hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
          <a
            href="#services"
            className="font-normal text-[#6E6E6E] hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
          >
            Subsidies
          </a>
          <a
            href="#testimonials"
            className="font-normal text-[#6E6E6E] hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
          >
            Testimonials
          </a>
          <a
            href="#blogs"
            className="font-normal text-[#6E6E6E] hover:text-[#0D0D0D] transition-colors whitespace-nowrap shrink-0"
          >
            FAQs
          </a>
        </nav>

        {/* Zone 3: Primary CTA Button + Mobile Hamburger Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => scrollToQuote()}
            className="group relative hidden sm:inline-flex items-center bg-[#0D0D0D] hover:bg-[#222222] text-white rounded-full pl-[20px] lg:pl-[26px] pr-[50px] lg:pr-[58px] py-[11px] lg:py-[13px] text-[14.5px] lg:text-[16px] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[32px] lg:group-hover:translate-x-[34px]">
              Get My solar estimate
            </span>
            <span className="absolute right-[6px] lg:right-[7px] group-hover:right-[calc(100%-40px)] lg:group-hover:right-[calc(100%-45px)] top-1/2 -translate-y-1/2 w-[34px] h-[34px] lg:w-[38px] lg:h-[38px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4 lg:w-4.5 lg:h-4.5 stroke-[2.2]" />
            </span>
          </button>

          {/* Compact CTA for very small screens (< sm) */}
          <button
            type="button"
            onClick={() => scrollToQuote()}
            className="sm:hidden inline-flex items-center gap-1.5 bg-[#0D0D0D] text-white rounded-full pl-3.5 pr-1.5 py-1.5 text-[13px] font-medium whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Get Estimate</span>
            <span className="w-[28px] h-[28px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </span>
          </button>

          {/* Mobile/Tablet Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-[42px] h-[42px] rounded-full bg-[#F5F6F4] hover:bg-[#EAECE9] text-[#0D0D0D] inline-flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 stroke-[2]" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2]" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-black/[0.06]"
          >
            <nav className="w-[90%] sm:w-[88%] mx-auto py-4 flex flex-col gap-1 text-[16px]">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Subsidies', href: '#services' },
                { label: 'Testimonials', href: '#testimonials' },
                { label: 'FAQs', href: '#blogs' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl font-medium text-[#0D0D0D] hover:bg-[#F5F6F4] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );

  // ============================================================================
  // SECTION 2: HERO SECTION (PDF Page 1 — matching screenshot proportions + Form)
  // ============================================================================
  const renderHero = () => (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#1e73b3] select-none"
    >
      {/* Full-Bleed Hero Container responsive across mobile, tablet, and desktop */}
      <div className="relative w-full lg:aspect-[16/10] min-h-[680px] sm:min-h-[760px] lg:min-h-[880px] lg:max-h-[1040px] flex flex-col justify-end">
        <HeroNirtBackdrop />

        {/* Subtle Bottom Contrast Scrim for Crisp White Typography */}
        <div className="absolute inset-x-0 bottom-0 h-[62%] sm:h-[52%] lg:h-[48%] bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none" />

        {/* Bottom Overlay Flexbox Row + Hero Inline Estimate Form */}
        <div className="relative z-10 w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto flex flex-col justify-end pb-[28px] sm:pb-[44px] lg:pb-[56px] pt-[210px] sm:pt-[260px] lg:pt-32">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 sm:gap-6 lg:gap-12">
            {/* Bottom-Left Headline (PDF Page 1: Get Up to ₹1,00,000 for Solar) */}
            <div>
              <h1 className="text-white font-normal text-[34px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.14] tracking-[-0.02em] max-w-[680px]">
                Get Up to ₹1,00,000
                <br />
                for Solar
              </h1>
            </div>

            {/* Bottom-Right Copy (PDF Page 1) */}
            <div className="flex flex-col items-start gap-3.5 max-w-[440px] lg:mr-[24px]">
              <p className="text-white text-[15.5px] sm:text-[17.5px] lg:text-[18.5px] leading-[1.48] font-normal tracking-[-0.01em]">
                Go solar with NIRT. From financial assistance to final
                installation.
              </p>
            </div>
          </div>

          {/* PDF Page 1 Quick Estimate Form Bar (Name, District, Contact number, Bi monthly bill, CTA: Get My solar estimate) */}
          <form
            onSubmit={handleFormSubmit}
            className="mt-5 sm:mt-7 lg:mt-8 bg-white/95 backdrop-blur-md rounded-[22px] sm:rounded-[24px] p-3.5 sm:p-5 shadow-[0_14px_36px_rgba(0,0,0,0.2)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-3 sm:gap-3.5 items-center"
          >
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
              className="w-full min-w-0 rounded-full border border-[#E5E5E5] bg-white px-4 sm:px-5 py-3 sm:py-3.5 text-[14.5px] sm:text-[15px] text-[#0D0D0D] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#1E255E]"
            />
            <div className="relative w-full min-w-0">
              <select
                required
                aria-label="District"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                className={`w-full min-w-0 appearance-none rounded-full border border-[#E5E5E5] bg-white pl-4 sm:pl-5 pr-10 py-3 sm:py-3.5 text-[14.5px] sm:text-[15px] focus:outline-none focus:border-[#1E255E] cursor-pointer ${
                  formData.district ? 'text-[#0D0D0D]' : 'text-[#7A7A7A]'
                }`}
              >
                <option value="" disabled>
                  Select District
                </option>
                {DISTRICTS.map((district) => (
                  <option
                    key={district}
                    value={district}
                    className="text-[#0D0D0D] bg-white"
                  >
                    {district}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7A7A]" />
            </div>
            <input
              type="tel"
              required
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              placeholder="Contact number"
              className="w-full min-w-0 rounded-full border border-[#E5E5E5] bg-white px-4 sm:px-5 py-3 sm:py-3.5 text-[14.5px] sm:text-[15px] text-[#0D0D0D] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#1E255E]"
            />
            <input
              type="text"
              required
              value={formData.biMonthlyBill}
              onChange={(e) =>
                setFormData({ ...formData, biMonthlyBill: e.target.value })
              }
              placeholder="Bi monthly bill (₹)"
              className="w-full min-w-0 rounded-full border border-[#E5E5E5] bg-white px-4 sm:px-5 py-3 sm:py-3.5 text-[14.5px] sm:text-[15px] text-[#0D0D0D] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#1E255E]"
            />
            <button
              type="submit"
              className="group relative w-full sm:col-span-2 lg:col-span-1 lg:w-auto inline-flex items-center justify-center bg-[#0D0D0D] hover:bg-[#222222] text-white rounded-full pl-[24px] pr-[54px] sm:pl-[26px] sm:pr-[58px] py-[13px] sm:py-[13.5px] text-[15px] sm:text-[15.5px] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[30px] sm:group-hover:translate-x-[34px]">
                {formStatus === 'submitted'
                  ? 'Estimate Requested ✓'
                  : 'Get My solar estimate'}
              </span>
              <span className="absolute right-[7px] group-hover:right-[calc(100%-45px)] top-1/2 -translate-y-1/2 w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.2]" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 3: MAKE YOUR ROOF WORK TOWARDS LONG-TERM SAVINGS (PDF Page 2)
  // ============================================================================
  const renderWhySolar = () => (
    <section
      id="about"
      className="w-full bg-[#F5F6F4] pt-[56px] sm:pt-[68px] lg:pt-[74px] pb-[64px] sm:pb-[76px] lg:pb-[88px]"
    >
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto">
        {/* Top Section Tag */}
        <div className="mb-[20px] sm:mb-[26px]">
          <span className="inline-block bg-white text-[#4A4A4A] text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            Why Solar Energy
          </span>
        </div>

        {/* Two-Tone Editorial Headline + Right CTA Row (matching screenshot proportions) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 mb-[36px] sm:mb-[48px] lg:mb-[54px]">
          <h2 className="text-[26px] sm:text-[34px] lg:text-[40px] leading-[1.3] sm:leading-[1.32] tracking-[-0.02em] font-normal max-w-[780px]">
            <span className="text-[#0D0D0D]">
              Make Your Roof Work Towards Long-Term Savings,
            </span>{' '}
            <span className="text-[#6E6E6E]">
              greater energy independence, and lower electricity bills from day
              one with NIRT.
            </span>
          </h2>

          <button
            type="button"
            onClick={() => scrollToQuote()}
            className="group relative self-start lg:self-center inline-flex items-center bg-[#0D0D0D] hover:bg-[#222222] text-white rounded-full pl-[24px] sm:pl-[26px] pr-[56px] sm:pr-[60px] py-[13px] sm:py-[14px] text-[15.5px] sm:text-[16.5px] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_8px_22px_rgba(0,0,0,0.18)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[34px]">
              Check My Subsidy
            </span>
            <span className="absolute right-[8px] group-hover:right-[calc(100%-46px)] top-1/2 -translate-y-1/2 w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
              <ArrowUpRight className="w-4.5 h-4.5 stroke-[2]" />
            </span>
          </button>
        </div>

        {/* 3-Column Bento Grid (responsive across mobile 1-col, tablet 2-col, desktop 3-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[28px]">
          {/* Card 1: 1–3 kW+ System capacity */}
          <div className="relative rounded-[26px] sm:rounded-[30px] overflow-hidden lg:aspect-[444/518] min-h-[430px] sm:min-h-[480px] bg-[#6FA6BF] select-none">
            <img
              src="/assets/solar/card-100-clean.png"
              alt="1–3 kW+ System capacity"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover block"
            />
            {/* Top-Left Metric + Top-Right Frosted Badge (matching screenshot with unobstructed bottom photo) */}
            <div className="absolute inset-0 p-6 sm:p-[34px] xl:p-[38px] flex flex-col justify-start z-10">
              <div className="flex flex-wrap items-start justify-between gap-2.5">
                <div className="text-white font-light text-[44px] sm:text-[54px] xl:text-[64px] leading-[0.96] tracking-[-0.03em] tabular-nums">
                  1–3 kW+
                </div>
                <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md rounded-full pl-3.5 pr-1.5 py-1.5 text-[12px] sm:text-[12.5px] text-white whitespace-nowrap shrink-0">
                  <span>System capacity</span>
                  <span className="w-[24px] h-[24px] rounded-full bg-black/25 inline-flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>
              </div>
              <p className="mt-3 text-white font-normal text-[16px] sm:text-[17px] leading-[1.38] max-w-[260px]">
                The right size depends on your electricity consumption, roof
                suitability and usage pattern.
              </p>
            </div>
          </div>

          {/* Card 2: Dark #0D0D0D Card (25 years Potential system lifespan) */}
          <div className="rounded-[26px] sm:rounded-[30px] bg-[#0D0D0D] text-white p-6 sm:p-[34px] xl:p-[38px] flex flex-col justify-between lg:aspect-[444/518] min-h-[430px] sm:min-h-[480px]">
            {/* Top Row: Avatars + Pill */}
            <div className="flex items-center justify-between gap-2.5">
              <CustomerAvatarGroup variant="dark" count={3} />
              <div className="inline-flex items-center gap-2 bg-[#1F1F1F] border border-white/10 rounded-full pl-3.5 sm:pl-4 pr-1.5 py-1.5 text-[12px] sm:text-[13px] text-white/90 whitespace-nowrap">
                <span>Grid-Connected</span>
                <span className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] rounded-full bg-black/50 border border-white/15 inline-flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-white/90" />
                </span>
              </div>
            </div>

            {/* Middle Copy */}
            <p className="text-[19px] sm:text-[21px] xl:text-[23px] leading-[1.38] text-white font-normal tracking-[-0.01em] my-auto py-4">
              Grid-connected rooftop solar systems can have a lifespan of 25
              years. Component warranties and actual performance vary.
            </p>

            {/* Bottom Metric: 25 years */}
            <div>
              <div className="text-[48px] sm:text-[58px] xl:text-[68px] font-light leading-none tracking-[-0.03em] text-white tabular-nums">
                25 years
              </div>
              <div className="mt-2.5 sm:mt-3 text-[16px] sm:text-[17px] text-white/90 font-normal">
                Potential system lifespan
              </div>
            </div>
          </div>

          {/* Card 3: White Card (₹35,000–₹1,00,000 Potential combined subsidy + Dot Matrix Chart) */}
          <div className="md:col-span-2 lg:col-span-1 rounded-[26px] sm:rounded-[30px] bg-white p-6 sm:p-[34px] xl:p-[38px] flex flex-col justify-between lg:aspect-[444/518] min-h-[430px] sm:min-h-[480px]">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-2.5">
                <div className="text-[32px] sm:text-[36px] xl:text-[42px] font-normal leading-[1.05] tracking-[-0.03em] text-[#0D0D0D] tabular-nums">
                  ₹35k–₹1L
                </div>
                <div className="inline-flex items-center gap-2 bg-[#1E255E] text-white rounded-full pl-3.5 sm:pl-4 pr-1.5 py-1.5 text-[12px] sm:text-[12.5px] font-normal whitespace-nowrap shrink-0">
                  <span>TN Portal</span>
                  <span className="w-[24px] h-[24px] rounded-full bg-white text-[#1E255E] inline-flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 stroke-[2.2]" />
                  </span>
                </div>
              </div>
              <div className="mt-3 text-[16.5px] sm:text-[18px] text-[#6E6E6E] font-normal">
                Potential combined subsidy (₹35,000–₹1,00,000)
              </div>
              <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.48] text-[#7A7A7A]">
                For eligible residential systems under the current Tamil Nadu
                portal&apos;s 1–3 kW examples.
              </p>
            </div>

            {/* Bottom Dot-Matrix Chart */}
            <div className="pt-4">
              <div className="grid grid-cols-14 items-end gap-1 sm:gap-[6px] h-[130px] sm:h-[148px]">
                {DOT_CHART_COLUMNS.map((col, cIdx) => (
                  <div
                    key={cIdx}
                    className="flex flex-col-reverse items-center gap-1 sm:gap-[6px]"
                  >
                    {col.dots.map((dotType, dIdx) => {
                      const bgClass =
                        dotType === 'D'
                          ? 'bg-[#1E255E]'
                          : dotType === 'G'
                            ? 'bg-[#76B82A]'
                            : 'bg-[#DCDCDC]';
                      return (
                        <span
                          key={dIdx}
                          className={`w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] xl:w-[14px] xl:h-[14px] rounded-full ${bgClass} block shrink-0`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              {/* Capacity Axis Labels */}
              <div className="grid grid-cols-14 mt-3 text-[12.5px] sm:text-[13.5px] text-[#6E6E6E] tabular-nums">
                <span className="col-span-3 text-left">1 kW</span>
                <span className="col-span-4 text-center">2 kW</span>
                <span className="col-span-4 text-center">3 kW</span>
                <span className="col-span-3 text-right">3 kW+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 4: COMBINED SOLAR SUBSIDIES (PDF Page 3)
  // ============================================================================
  const renderServices = () => {
    const subsidyTiers = [
      {
        num: '01',
        title: '1 kW',
        amount: '₹35,000',
        desc: 'Combined Central & Tamil Nadu State Government solar subsidy for eligible 1 kW residential rooftop systems.',
        image: '/assets/solar/service-residential.png',
      },
      {
        num: '02',
        title: '2 kW',
        amount: '₹70,000',
        desc: 'Combined Central & Tamil Nadu State Government solar subsidy for eligible 2 kW residential rooftop systems.',
        image: '/assets/solar/service-commercial.png',
      },
      {
        num: '03',
        title: '3 kW and above',
        amount: '₹1,00,000',
        desc: 'Maximum combined Central & Tamil Nadu State Government subsidy for eligible 3 kW+ residential systems.',
        image: '/assets/solar/service-battery.png',
      },
    ];

    return (
      <section
        id="services"
        className="w-full bg-[#F8F8F8] py-[56px] sm:py-[72px] lg:py-[84px]"
      >
        <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* Left Column (5 cols): Section Heading + Bottom Thumbnail Pair */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-white text-[#4A4A4A] text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-[20px] sm:mb-[24px]">
                Solar Subsidies
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-[#0D0D0D]">
                Get Up to ₹1,00,000 in
                <br className="hidden sm:block" /> Combined Solar Subsidies*
              </h2>
              <p className="mt-3.5 sm:mt-4 text-[15.5px] sm:text-[16.5px] leading-[1.58] text-[#6E6E6E] max-w-[420px]">
                Eligible households can receive up to ₹1 lakh in combined
                Central and Tamil Nadu State Government solar subsidies, making
                rooftop solar more affordable.
              </p>
            </div>

            {/* Bottom-Left Pair of Rounded Solar Thumbnails */}
            <div className="mt-7 sm:mt-10 lg:mt-0 grid grid-cols-2 sm:flex items-center gap-3 sm:gap-4">
              <img
                src="/assets/solar/service-thumb-1.png"
                alt="Solar field array at sunset"
                referrerPolicy="no-referrer"
                className="w-full sm:w-[175px] h-[145px] sm:h-[172px] rounded-[20px] sm:rounded-[22px] object-cover shrink-0"
              />
              <img
                src="/assets/solar/service-thumb-2.png"
                alt="Technician inspecting rooftop solar panel"
                referrerPolicy="no-referrer"
                className="w-full sm:w-[210px] h-[145px] sm:h-[172px] rounded-[20px] sm:rounded-[22px] object-cover shrink-0"
              />
            </div>
          </div>

          {/* Right Column (7 cols): 3 Stacked Subsidy Tier Cards (1 kW, 2 kW, 3 kW and above) */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-[24px]">
            {subsidyTiers.map((tier) => (
              <div
                key={tier.num}
                className="bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-[28px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="flex flex-col justify-between pl-0.5 sm:pl-1 w-full sm:w-auto">
                  <span className="text-[14px] sm:text-[15px] text-[#888888] font-normal tabular-nums">
                    {tier.num}
                  </span>
                  <div className="mt-1.5 flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-[22px] sm:text-[26px] font-medium tracking-[-0.02em] text-[#0D0D0D]">
                      {tier.title}
                    </h3>
                    <span className="text-[24px] sm:text-[28px] font-semibold text-[#1E255E] tabular-nums">
                      {tier.amount}
                    </span>
                  </div>
                  <p className="mt-2 text-[14.5px] sm:text-[15.5px] leading-[1.52] text-[#6E6E6E] max-w-[400px]">
                    {tier.desc}
                  </p>
                  <div className="mt-4 sm:mt-5">
                    <button
                      type="button"
                      onClick={() => scrollToQuote()}
                      className="group relative inline-flex items-center rounded-full bg-[#0D0D0D] hover:bg-[#222222] pl-[22px] pr-[52px] py-[11.5px] text-[15px] sm:text-[15.5px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-sm whitespace-nowrap cursor-pointer"
                    >
                      <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[30px]">
                        Check My Subsidy
                      </span>
                      <span className="absolute right-[7px] group-hover:right-[calc(100%-41px)] top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center shrink-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                      </span>
                    </button>
                  </div>
                </div>

                <img
                  src={tier.image}
                  alt={tier.title}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-[220px] xl:w-[250px] h-[180px] sm:h-[190px] rounded-[18px] sm:rounded-[20px] object-cover shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // ============================================================================
  // SECTION 5: THE NIRT PROJECT PORTFOLIO (PDF Page 4)
  // ============================================================================
  const renderProjects = () => (
    <section className="w-full bg-[#111111] text-white py-[56px] sm:py-[72px] lg:py-[84px]">
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
        {/* Left Column (5 cols): Title + Carousel Arrows */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-[#1D1D1D] text-white/85 text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full mb-[20px] sm:mb-[24px]">
              Our Projects
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-white">
              The NIRT Project
              <br />
              Portfolio
            </h2>
            <p className="mt-3.5 sm:mt-4 text-[15.5px] sm:text-[16.5px] leading-[1.58] text-white/70 max-w-[380px]">
              Explore our renewable energy installations across Tamil Nadu
            </p>
          </div>

          {/* Bottom-Left Prev / Next Circular Buttons */}
          <div className="mt-6 sm:mt-8 lg:mt-0 flex items-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                setSlideDirection(-1);
                setActiveProjectIdx(
                  (prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length
                );
              }}
              aria-label="Previous project"
              className="w-[46px] h-[46px] sm:w-[48px] sm:h-[48px] rounded-full bg-[#1E1E1E] hover:bg-[#2A2A2A] text-white/80 inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[1.8]" />
            </button>
            <button
              type="button"
              onClick={() => {
                setSlideDirection(1);
                setActiveProjectIdx((prev) => (prev + 1) % PROJECTS.length);
              }}
              aria-label="Next project"
              className="w-[46px] h-[46px] sm:w-[48px] sm:h-[48px] rounded-full bg-white hover:bg-white/90 text-[#0D0D0D] inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Featured Project Card with Installed capacity, location, Project type, subsidy availed inside the box */}
        <div className="lg:col-span-7 overflow-hidden">
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={activeProjectIdx}
              custom={slideDirection}
              initial={{ opacity: 0, x: slideDirection * 48, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: slideDirection * -48, scale: 0.97 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1B1B1B] rounded-[24px] sm:rounded-[30px] p-5 sm:p-[28px]"
            >
              <div className="overflow-hidden rounded-[18px] sm:rounded-[22px]">
                <motion.img
                  src={currentProject.image}
                  alt={currentProject.title}
                  referrerPolicy="no-referrer"
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-[220px] sm:h-[320px] lg:h-[340px] object-cover block"
                />
              </div>

              <div className="mt-5 sm:mt-6 px-0.5 sm:px-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[21px] sm:text-[24px] font-medium text-white tracking-[-0.01em]">
                    {currentProject.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 bg-[#262626] text-white text-[14px] sm:text-[14.5px] px-3.5 py-1 rounded-full tabular-nums">
                    <Star className="w-4 h-4 fill-[#76B82A] text-[#76B82A]" />
                    {currentProject.rating}
                  </span>
                </div>

                <p className="mt-2 text-[15px] sm:text-[16px] leading-[1.55] text-white/65 max-w-[560px]">
                  {currentProject.description}
                </p>

                {/* 4 Project Metadata Items Inside the Box (PDF Page 4: Installed capacity, location, Project type, subsidy availed) */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 bg-[#141414] border border-white/10 rounded-[16px] sm:rounded-[18px] p-3.5 sm:p-4">
                  <div>
                    <div className="text-[12.5px] sm:text-[13px] text-white/50">
                      Installed capacity
                    </div>
                    <div className="text-[15.5px] sm:text-[16.5px] font-medium text-white mt-1 tabular-nums">
                      {currentProject.installedCapacity}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12.5px] sm:text-[13px] text-white/50">
                      Location
                    </div>
                    <div className="text-[15px] sm:text-[16px] font-medium text-white mt-1">
                      {currentProject.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12.5px] sm:text-[13px] text-white/50">
                      Project type
                    </div>
                    <div className="text-[15px] sm:text-[16px] font-medium text-white mt-1">
                      {currentProject.projectType}
                    </div>
                  </div>
                  <div>
                    <div className="text-[12.5px] sm:text-[13px] text-white/50">
                      Subsidy availed
                    </div>
                    <div className="text-[15.5px] sm:text-[16.5px] font-semibold text-[#76B82A] mt-1 tabular-nums">
                      {currentProject.subsidyAvailed}
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setCaseStudyModal(true)}
                    className="group relative inline-flex items-center rounded-full bg-[#0D0D0D] hover:bg-[#262626] border border-white/20 pl-[22px] pr-[52px] py-[11.5px] text-[15px] sm:text-[15.5px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap cursor-pointer"
                  >
                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[30px]">
                      View Project Details
                    </span>
                    <span className="absolute right-[7px] group-hover:right-[calc(100%-41px)] top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                    </span>
                  </button>

                  <span className="text-[19px] sm:text-[22px] font-normal text-[#76B82A] tracking-[-0.01em] tabular-nums">
                    Subsidy: {currentProject.subsidyAvailed}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 6: NUMERICAL IMPACT SECTION (Triggers Mid-Page Popup on Engagement)
  // ============================================================================
  const renderImpact = () => (
    <section
      ref={numericalSectionRef}
      onClick={() => {
        if (!hasTriggeredMidPopup) {
          setMidPagePopupOpen(true);
          setHasTriggeredMidPopup(true);
        }
      }}
      className="w-full bg-[#F8F8F8] py-[56px] sm:py-[72px] lg:py-[84px]"
    >
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 mb-9 sm:mb-12">
          <div>
            <span className="inline-block bg-white text-[#4A4A4A] text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-[20px] sm:mb-[24px]">
              Our Impact
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-[#0D0D0D]">
              Numbers That Speak
              <br />
              for Themselves
            </h2>
          </div>

          <p className="text-[15.5px] sm:text-[16.5px] leading-[1.58] text-[#6E6E6E] sm:text-right max-w-[400px]">
            Years of experience, a portfolio of successful installations and
            trust built with every customer.
          </p>
        </div>

        {/* 4-Column Impact Icon Cards (matching PDF Page 4 visual numbers: 2,500+, 35%, 45 MW+, 98%) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-[24px]">
          {/* Card 1: Active NIRT Navy Blue #1E255E */}
          <div className="rounded-[22px] sm:rounded-[26px] bg-[#1E255E] text-white p-5 sm:p-8 flex flex-col items-center text-center justify-between min-h-[175px] sm:min-h-[195px] cursor-pointer">
            <span className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#76B82A] text-white inline-flex items-center justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <ellipse
                  cx="12"
                  cy="12"
                  rx="9"
                  ry="4.2"
                  transform="rotate(45 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="9"
                  ry="4.2"
                  transform="rotate(-45 12 12)"
                />
                <path d="M12.5 9.5L10.5 12h3l-2 2.5" strokeLinecap="round" />
              </svg>
            </span>
            <div className="mt-4 sm:mt-5">
              <div className="text-[26px] sm:text-[34px] font-semibold tracking-tight tabular-nums">
                2,500+
              </div>
              <div className="text-[14px] sm:text-[15.5px] text-white/85 mt-1">
                Homes Powered
              </div>
            </div>
          </div>

          {/* Card 2: Lightbulb */}
          <div className="rounded-[22px] sm:rounded-[26px] bg-white text-[#0D0D0D] p-5 sm:p-8 flex flex-col items-center text-center justify-between min-h-[175px] sm:min-h-[195px] cursor-pointer">
            <span className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#F5F6F6] inline-flex items-center justify-center">
              <Lightbulb className="w-[23px] h-[23px] sm:w-[25px] sm:h-[25px] text-[#0D0D0D] stroke-[1.7]" />
            </span>
            <div className="mt-4 sm:mt-5">
              <div className="text-[26px] sm:text-[34px] font-semibold tracking-tight tabular-nums">
                35%
              </div>
              <div className="text-[14px] sm:text-[15.5px] text-[#6E6E6E] mt-1">
                Average Energy Savings
              </div>
            </div>
          </div>

          {/* Card 3: Lightning Bolt */}
          <div className="rounded-[22px] sm:rounded-[26px] bg-white text-[#0D0D0D] p-5 sm:p-8 flex flex-col items-center text-center justify-between min-h-[175px] sm:min-h-[195px] cursor-pointer">
            <span className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#F5F6F6] inline-flex items-center justify-center">
              <Zap className="w-[23px] h-[23px] sm:w-[25px] sm:h-[25px] text-[#0D0D0D] stroke-[1.7]" />
            </span>
            <div className="mt-4 sm:mt-5">
              <div className="text-[26px] sm:text-[34px] font-semibold tracking-tight tabular-nums">
                45 MW+
              </div>
              <div className="text-[14px] sm:text-[15.5px] text-[#6E6E6E] mt-1">
                Installed Capacity
              </div>
            </div>
          </div>

          {/* Card 4: Certified Check Badge */}
          <div className="rounded-[22px] sm:rounded-[26px] bg-white text-[#0D0D0D] p-5 sm:p-8 flex flex-col items-center text-center justify-between min-h-[175px] sm:min-h-[195px] cursor-pointer">
            <span className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#F5F6F6] inline-flex items-center justify-center">
              <BadgeCheck className="w-[23px] h-[23px] sm:w-[25px] sm:h-[25px] text-[#0D0D0D] stroke-[1.7]" />
            </span>
            <div className="mt-4 sm:mt-5">
              <div className="text-[26px] sm:text-[34px] font-semibold tracking-tight tabular-nums">
                98%
              </div>
              <div className="text-[14px] sm:text-[15.5px] text-[#6E6E6E] mt-1">
                Customer Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 7: HELPING PEOPLE SPEND LESS ON ELECTRICITY (PDF Page 4 & Page 5)
  // ============================================================================
  const renderHelpingFamilies = () => (
    <section className="w-full bg-[#F8F8F8] py-[56px] sm:py-[72px] lg:py-[84px]">
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
        {/* Left Column (4 cols): 3 Solar Photos (3-up grid on tablet, stacked on desktop) */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col justify-between gap-4 sm:gap-5">
          <img
            src="/assets/solar/helping-1.png"
            alt="Sunlit solar panel array"
            referrerPolicy="no-referrer"
            className="w-full h-[180px] sm:h-[160px] lg:h-[196px] rounded-[20px] sm:rounded-[24px] object-cover block"
          />
          <img
            src="/assets/solar/helping-2.png"
            alt="Solar panels with wind turbines"
            referrerPolicy="no-referrer"
            className="w-full h-[180px] sm:h-[160px] lg:h-[196px] rounded-[20px] sm:rounded-[24px] object-cover block"
          />
          <img
            src="/assets/solar/helping-3.png"
            alt="Aerial view of solar panels on lush greenery"
            referrerPolicy="no-referrer"
            className="w-full h-[180px] sm:h-[160px] lg:h-[196px] rounded-[20px] sm:rounded-[24px] object-cover block"
          />
        </div>

        {/* Right Column (8 cols): Heading + CTA/Avatars Row + 2x2 Feature Grid */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          {/* Top Header Area */}
          <div className="pl-0.5 sm:pl-1">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-[#0D0D0D]">
              Helping People Spend Less
              <br />
              on Electricity
            </h2>

            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-between gap-5 sm:gap-6">
              <button
                type="button"
                onClick={() => scrollToQuote()}
                className="group relative inline-flex items-center bg-[#0D0D0D] hover:bg-[#222222] text-white rounded-full pl-[24px] pr-[54px] py-[12px] text-[15px] sm:text-[15.5px] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.18)] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[30px]">
                  Explore My Savings
                </span>
                <span className="absolute right-[7px] group-hover:right-[calc(100%-41px)] top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                </span>
              </button>

              {/* 4 Overlapping Customer Avatars + 5 Stars + 500+ Happy Customers */}
              <div className="flex items-center gap-3.5">
                <CustomerAvatarGroup variant="light" count={4} />
                <div>
                  <div className="flex items-center gap-1 text-[#0D0D0D]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#0D0D0D] text-[#0D0D0D]"
                      />
                    ))}
                  </div>
                  <div className="text-[13.5px] sm:text-[14px] text-[#666666] font-normal mt-1 whitespace-nowrap">
                    500+ Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Feature Cards Grid (PDF Page 4 & 5: 01–04) */}
          <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Card 1: 01. Government Subsidy */}
            <div className="bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <span className="w-11 h-11 rounded-full bg-[#F7F8F8] inline-flex items-center justify-center text-[#0D0D0D]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </span>
              <h3 className="mt-4 text-[19px] sm:text-[20px] font-medium text-[#0D0D0D] tracking-[-0.01em]">
                01. Government Subsidy
              </h3>
              <p className="mt-2 text-[14.5px] sm:text-[15px] leading-[1.55] text-[#6E6E6E]">
                Make your solar investment lighter with eligible government
                subsidy benefits.
              </p>
            </div>

            {/* Card 2: 02. Long-Term Savings */}
            <div className="bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <span className="w-11 h-11 rounded-full bg-[#F7F8F8] inline-flex items-center justify-center text-[#0D0D0D]">
                <BadgeCheck className="w-5 h-5 stroke-[1.7]" />
              </span>
              <h3 className="mt-4 text-[19px] sm:text-[20px] font-medium text-[#0D0D0D] tracking-[-0.01em]">
                02. Long-Term Savings
              </h3>
              <p className="mt-2 text-[14.5px] sm:text-[15px] leading-[1.55] text-[#6E6E6E]">
                Reduce grid electricity dependence and bring down your household
                energy expenses.
              </p>
            </div>

            {/* Card 3: 03. Our Solar Promise */}
            <div className="bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <span className="w-11 h-11 rounded-full bg-[#F7F8F8] inline-flex items-center justify-center text-[#0D0D0D]">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect
                    x="12"
                    y="2"
                    width="14"
                    height="14"
                    rx="2.5"
                    transform="rotate(45 12 2)"
                  />
                  <path d="M12 9v6M9 12h6" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="mt-4 text-[19px] sm:text-[20px] font-medium text-[#0D0D0D] tracking-[-0.01em]">
                03. Our Solar Promise
              </h3>
              <p className="mt-2 text-[14.5px] sm:text-[15px] leading-[1.55] text-[#6E6E6E]">
                Clear commitments, quality execution and support beyond
                installation.
              </p>
            </div>

            {/* Card 4: 04. Flexible Financing */}
            <div className="bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <span className="w-11 h-11 rounded-full bg-[#F7F8F8] inline-flex items-center justify-center text-[#0D0D0D]">
                <Info className="w-5 h-5 stroke-[1.7]" />
              </span>
              <h3 className="mt-4 text-[19px] sm:text-[20px] font-medium text-[#0D0D0D] tracking-[-0.01em]">
                04. Flexible Financing
              </h3>
              <p className="mt-2 text-[14.5px] sm:text-[15px] leading-[1.55] text-[#6E6E6E]">
                Explore loan assistance and payment options suited to your
                budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 8: SOLAR EMI CALCULATOR (PDF Page 6: Illustrative EMI example)
  // ============================================================================
  const renderPricing = () => {
    const illustrativeDetails = [
      { label: 'Loan amount', value: '₹1,00,000' },
      { label: 'Loan tenure', value: '5 years' },
      { label: 'Assumed interest', value: '10% p.a.' },
      { label: 'Approx. monthly EMI', value: '₹2,125' },
    ];

    return (
      <section className="w-full bg-[#F8F8F8] py-[56px] sm:py-[72px] lg:py-[84px]">
        <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto">
          <div className="text-center mb-9 sm:mb-12">
            <span className="inline-block bg-white text-[#4A4A4A] text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-4">
              Solar EMI Calculator
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-[#0D0D0D]">
              Illustrative EMI Example
            </h2>
            <p className="mt-3 text-[15.5px] sm:text-[16.5px] leading-[1.58] text-[#6E6E6E] max-w-[640px] mx-auto">
              Suppose a customer finances ₹1,00,000 over five years at an
              illustrative annual interest rate of 10%.
            </p>
          </div>

          {/* 2-Column EMI Grid matching the exact dual-card aesthetic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full">
            {/* Left Card (White): Illustrative Loan Calculation Summary */}
            <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
              <div>
                <span className="inline-block bg-[#F5F5F5] text-[#333333] text-[13px] sm:text-[13.5px] font-medium px-4 py-1.5 rounded-full">
                  Illustrative loan calculation only
                </span>
                <div className="mt-5 flex flex-wrap items-baseline gap-2.5 sm:gap-3">
                  <span className="text-[38px] sm:text-[48px] font-medium tracking-[-0.02em] text-[#0D0D0D] tabular-nums">
                    ₹2,125
                  </span>
                  <span className="text-[15px] sm:text-[16px] text-[#6E6E6E]">
                    Approx. monthly EMI
                  </span>
                </div>
                <p className="mt-2.5 text-[14.5px] sm:text-[15.5px] leading-[1.55] text-[#6E6E6E]">
                  Suppose a customer finances ₹1,00,000 over five years at an
                  illustrative annual interest rate of 10%.
                </p>

                <button
                  type="button"
                  onClick={() => scrollToQuote()}
                  className="group relative mt-6 w-full py-3.5 sm:py-4 pl-5 pr-12 sm:px-7 rounded-full bg-[#0D0D0D] hover:bg-[#222222] text-white text-[14px] sm:text-[16px] font-medium inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md cursor-pointer"
                >
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                    Explore My Solar Payment Options
                  </span>
                  <span className="absolute right-2.5 sm:right-3 group-hover:right-[calc(100%-44px)] top-1/2 -translate-y-1/2 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </span>
                </button>

                <ul className="mt-6 sm:mt-7 space-y-3.5 sm:space-y-4">
                  {illustrativeDetails.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-2 text-[14.5px] sm:text-[15.5px] text-[#333333] pb-3 border-b border-black/[0.05] last:border-none"
                    >
                      <span className="flex items-center gap-2.5 text-[#555555]">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#1E255E] shrink-0 stroke-[1.8]" />
                        {item.label}
                      </span>
                      <span className="font-semibold text-[#0D0D0D] tabular-nums">
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 text-[13px] sm:text-[13.5px] leading-[1.55] text-[#7A7A7A]">
                Actual EMI depends on lender terms, fees, rate type and approved
                loan amount. This example does not represent a financing offer
                from NIRT.
              </p>
            </div>

            {/* Right Card (NIRT Navy Blue #1E255E): Interactive Solar EMI Calculator */}
            <div className="bg-[#1E255E] text-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_4px_14px_rgba(30,37,94,0.2)]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-block bg-white text-[#0D0D0D] text-[13px] sm:text-[13.5px] font-medium px-4 py-1.5 rounded-full">
                    Interactive Solar EMI Calculator
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLoanAmount(100000);
                      setLoanTenureYears(5);
                      setInterestRate(10);
                    }}
                    className="text-[13px] sm:text-[13.5px] text-[#76B82A] hover:underline cursor-pointer"
                  >
                    Reset to ₹1,00,000 example
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-baseline gap-2.5 sm:gap-3">
                  <span className="text-[38px] sm:text-[48px] font-medium tracking-[-0.02em] text-white tabular-nums">
                    ₹{calculatedEmi.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[15px] sm:text-[16px] text-white/80">
                    Approx. monthly EMI
                  </span>
                </div>

                {/* Interactive Sliders */}
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-[14.5px] sm:text-[15px] mb-2">
                      <span className="text-white/85">Loan amount</span>
                      <span className="font-semibold text-[#76B82A] tabular-nums">
                        ₹{loanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50000}
                      max={500000}
                      step={10000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full accent-[#76B82A] cursor-pointer h-2 bg-white/20 rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[14.5px] sm:text-[15px] mb-2">
                      <span className="text-white/85">Loan tenure</span>
                      <span className="font-semibold text-[#76B82A] tabular-nums">
                        {loanTenureYears}{' '}
                        {loanTenureYears === 1 ? 'year' : 'years'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={loanTenureYears}
                      onChange={(e) =>
                        setLoanTenureYears(Number(e.target.value))
                      }
                      className="w-full accent-[#76B82A] cursor-pointer h-2 bg-white/20 rounded-lg"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[14.5px] sm:text-[15px] mb-2">
                      <span className="text-white/85">Assumed interest</span>
                      <span className="font-semibold text-[#76B82A] tabular-nums">
                        {interestRate}% p.a.
                      </span>
                    </div>
                    <input
                      type="range"
                      min={7}
                      max={16}
                      step={0.5}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full accent-[#76B82A] cursor-pointer h-2 bg-white/20 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToQuote()}
                  className="group relative mt-7 w-full py-3.5 sm:py-4 pl-5 pr-12 sm:px-7 rounded-full bg-white hover:bg-[#EAEAEA] text-[#0D0D0D] text-[14px] sm:text-[16px] font-medium inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md cursor-pointer"
                >
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                    Explore My Solar Payment Options
                  </span>
                  <span className="absolute right-2.5 sm:right-3 group-hover:right-[calc(100%-44px)] top-1/2 -translate-y-1/2 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full bg-[#0D0D0D] text-white inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </span>
                </button>
              </div>

              <p className="mt-6 text-[13px] sm:text-[13.5px] leading-[1.55] text-white/75">
                Actual EMI depends on lender terms, fees, rate type and approved
                loan amount. This example does not represent a financing offer
                from NIRT.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // ============================================================================
  // SECTION 9: TESTIMONIALS (PDF Page 5: Hear It from Those Who Made the Switch.)
  // ============================================================================
  const renderTestimonials = () => (
    <section
      id="testimonials"
      className="w-full bg-[#F8F8F8] py-[56px] sm:py-[72px] lg:py-[84px]"
    >
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto">
        <div className="text-center mb-9 sm:mb-12">
          <span className="inline-block bg-white text-[#4A4A4A] text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-4">
            Testimonials
          </span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-[#0D0D0D]">
            Hear It from Those Who
            <br />
            Made the Switch.
          </h2>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 w-full items-stretch">
          {/* Left Column: 4.9/5 Summary Card + Nataraj A Quote */}
          <div className="flex flex-col justify-between gap-5">
            {/* Top Card: 4.9/5 */}
            <div className="bg-white rounded-[24px] sm:rounded-[26px] p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-black/[0.06]">
                <div className="text-[36px] sm:text-[40px] font-medium tracking-[-0.03em] text-[#0D0D0D] tabular-nums leading-none">
                  4.9
                  <span className="text-[16px] text-[#7A7A7A] font-normal">
                    /5
                  </span>
                </div>
                <div className="text-[13.5px] sm:text-[14px] leading-[1.42] text-[#6E6E6E] max-w-[180px]">
                  Based on verified Tamil Nadu homeowners
                </div>
              </div>

              <ul className="mt-4 space-y-2.5 text-[14.5px] sm:text-[15px] text-[#555555]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#76B82A] shrink-0" />
                  <span>End-to-end subsidy assistance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#76B82A] shrink-0" />
                  <span>98% customer satisfaction</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#76B82A] shrink-0" />
                  <span>Certified rooftop installations</span>
                </li>
              </ul>
            </div>

            {/* Bottom Card: Nataraj A */}
            <div className="bg-white rounded-[24px] sm:rounded-[26px] p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <p className="text-[15px] sm:text-[15.5px] leading-[1.6] text-[#222222] font-normal">
                Great product quality and excellent customer support.
                Installation and follow-up service were smooth and timely. Truly
                a reliable and trustworthy company.
              </p>

              <div className="mt-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/solar/avatar-emily.png"
                    alt="Nataraj A"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-[15px] font-semibold text-[#0D0D0D] leading-tight">
                      Nataraj A
                    </div>
                    <div className="text-[13px] text-[#7A7A7A] leading-tight mt-0.5">
                      Homeowner, Tamil Nadu
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[13.5px] text-[#555555] bg-[#F7F7F7] px-3 py-1 rounded-full tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-[#76B82A] text-[#76B82A]" />
                  5.0
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Architectural Solar Home Image */}
          <div className="md:col-span-2 lg:col-span-1 rounded-[24px] sm:rounded-[26px] overflow-hidden min-h-[280px] sm:min-h-[340px] lg:min-h-0 order-first lg:order-none">
            <img
              src="/assets/solar/testimonial-center.png"
              alt="Modern solar powered residence surrounded by trees"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Right Column: KIRIT RAJA + RAJA R S Quote Cards */}
          <div className="flex flex-col justify-between gap-5">
            {/* Top Card: KIRIT RAJA */}
            <div className="bg-white rounded-[24px] sm:rounded-[26px] p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <p className="text-[15px] sm:text-[15.5px] leading-[1.6] text-[#222222] font-normal">
                Fast and reliable service. Advance technology tailor made
                solutions.
              </p>

              <div className="mt-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/solar/avatar-billie.png"
                    alt="KIRIT RAJA"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-[15px] font-semibold text-[#0D0D0D] leading-tight">
                      KIRIT RAJA
                    </div>
                    <div className="text-[13px] text-[#7A7A7A] leading-tight mt-0.5">
                      Homeowner, Tamil Nadu
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[13.5px] text-[#555555] bg-[#F7F7F7] px-3 py-1 rounded-full tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-[#76B82A] text-[#76B82A]" />
                  4.9
                </span>
              </div>
            </div>

            {/* Bottom Card: RAJA R S */}
            <div className="bg-white rounded-[24px] sm:rounded-[26px] p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <p className="text-[15px] sm:text-[15.5px] leading-[1.6] text-[#222222] font-normal">
                Excellent product and service. In depth knowledge about the
                product .
              </p>

              <div className="mt-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/solar/avatar-james.png"
                    alt="RAJA R S"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-[15px] font-semibold text-[#0D0D0D] leading-tight">
                      RAJA R S
                    </div>
                    <div className="text-[13px] text-[#7A7A7A] leading-tight mt-0.5">
                      Homeowner, Tamil Nadu
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[13.5px] text-[#555555] bg-[#F7F7F7] px-3 py-1 rounded-full tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-[#76B82A] text-[#76B82A]" />
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 10: FAQS (PDF Page 7: Frequently Asked Questions)
  // ============================================================================
  const renderFaqs = () => (
    <section
      id="blogs"
      className="w-full bg-[#F8F8F8] py-[56px] sm:py-[72px] lg:py-[84px]"
    >
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto">
        <div className="text-center mb-9 sm:mb-12">
          <span className="inline-block bg-white text-[#4A4A4A] text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-3.5">
            FAQs
          </span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-[#0D0D0D]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-[15.5px] sm:text-[16.5px] text-[#6E6E6E]">
            Find quick answers to the most common questions about rooftop solar
            in Tamil Nadu.
          </p>
        </div>

        {/* 5 Accordion Items */}
        <div className="max-w-[960px] mx-auto flex flex-col gap-3.5 sm:gap-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-[18px] sm:rounded-[20px] transition-colors ${
                  isOpen
                    ? 'bg-[#1E255E] text-white p-5 sm:p-7'
                    : 'bg-white text-[#0D0D0D] px-5 sm:px-6 py-4 sm:py-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? 0 : faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-[16px] sm:text-[17.5px] font-medium tracking-[-0.01em]">
                    {faq.question}
                  </span>
                  <span className="w-[26px] h-[26px] rounded-full bg-[#76B82A] text-white inline-flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    ) : (
                      <X className="w-3.5 h-3.5 stroke-[2.2]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3.5 text-[14.5px] sm:text-[15.5px] leading-[1.62] text-white/90 sm:pr-8">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 11: WHAT'S YOUR SOLAR SAVINGS POTENTIAL? (PDF Page 8 + Page 1 Form)
  // ============================================================================
  const renderContact = () => (
    <section
      id="quote-form"
      className="w-full bg-[#F8F8F8] pt-[52px] sm:pt-[68px] pb-[68px] sm:pb-[92px]"
    >
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
        {/* Left Column (5 cols): Heading + Direct Contact Info */}
        <div className="lg:col-span-5 flex flex-col justify-between py-1">
          <div>
            <span className="inline-block bg-white text-[#4A4A4A] text-[14px] sm:text-[15px] font-normal px-[20px] sm:px-[22px] py-[9px] sm:py-[10px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-4">
              Solar Estimate
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.2] tracking-[-0.02em] font-normal text-[#0D0D0D]">
              What&apos;s Your Solar Savings Potential?
            </h2>
            <p className="mt-3.5 sm:mt-4 text-[15.5px] sm:text-[16.5px] leading-[1.58] text-[#6E6E6E] max-w-[430px]">
              Share your details to explore eligible subsidies and estimate your
              savings with NIRT.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-0 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white inline-flex items-center justify-center text-[#0D0D0D] shadow-[0_1px_3px_rgba(0,0,0,0.04)] shrink-0">
                <Mail className="w-5 h-5 stroke-[1.8]" />
              </span>
              <div>
                <div className="text-[14px] sm:text-[14.5px] font-medium text-[#0D0D0D]">
                  Email
                </div>
                <a
                  href="mailto:nirtinfo@gmail.com"
                  className="text-[15px] sm:text-[15.5px] text-[#6E6E6E] hover:text-[#1E255E] transition-colors break-all"
                >
                  nirtinfo@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white inline-flex items-center justify-center text-[#0D0D0D] shadow-[0_1px_3px_rgba(0,0,0,0.04)] shrink-0">
                <Phone className="w-5 h-5 stroke-[1.8]" />
              </span>
              <div>
                <div className="text-[14px] sm:text-[14.5px] font-medium text-[#0D0D0D]">
                  Phone
                </div>
                <a
                  href="tel:8048035697"
                  className="text-[15px] sm:text-[15.5px] text-[#6E6E6E] hover:text-[#1E255E] transition-colors tabular-nums"
                >
                  8048035697
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): White Form Card (PDF Page 1 Form: Name, District, Contact number, Bi monthly bill, CTA: Get My solar estimate) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-[14px] sm:text-[14.5px] font-medium text-[#222222] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full rounded-full border border-[#ECECEC] bg-[#FAFAFA] px-5 py-3.5 text-[15px] text-[#0D0D0D] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#1E255E]"
                />
              </div>

              <div>
                <label className="block text-[14px] sm:text-[14.5px] font-medium text-[#222222] mb-2">
                  District
                </label>
                <div className="relative w-full">
                  <select
                    required
                    aria-label="District"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className={`w-full appearance-none rounded-full border border-[#ECECEC] bg-[#FAFAFA] pl-5 pr-11 py-3.5 text-[15px] focus:outline-none focus:border-[#1E255E] cursor-pointer ${
                      formData.district ? 'text-[#0D0D0D]' : 'text-[#A0A0A0]'
                    }`}
                  >
                    <option value="" disabled>
                      Select your district
                    </option>
                    {DISTRICTS.map((district) => (
                      <option
                        key={district}
                        value={district}
                        className="text-[#0D0D0D] bg-white"
                      >
                        {district}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#7A7A7A]" />
                </div>
              </div>

              <div>
                <label className="block text-[14px] sm:text-[14.5px] font-medium text-[#222222] mb-2">
                  Contact number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumber: e.target.value })
                  }
                  placeholder="Enter 10-digit mobile number"
                  className="w-full rounded-full border border-[#ECECEC] bg-[#FAFAFA] px-5 py-3.5 text-[15px] text-[#0D0D0D] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#1E255E]"
                />
              </div>

              <div>
                <label className="block text-[14px] sm:text-[14.5px] font-medium text-[#222222] mb-2">
                  Bi monthly bill
                </label>
                <input
                  type="text"
                  required
                  value={formData.biMonthlyBill}
                  onChange={(e) =>
                    setFormData({ ...formData, biMonthlyBill: e.target.value })
                  }
                  placeholder="e.g. ₹3,500"
                  className="w-full rounded-full border border-[#ECECEC] bg-[#FAFAFA] px-5 py-3.5 text-[15px] text-[#0D0D0D] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#1E255E]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative mt-6 sm:mt-7 w-full py-3.5 sm:py-4 pl-5 pr-12 sm:px-7 rounded-full bg-[#0D0D0D] hover:bg-[#222222] text-white text-[15px] sm:text-[16px] font-medium inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_6px_18px_rgba(0,0,0,0.16)] cursor-pointer"
            >
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                {formStatus === 'submitted'
                  ? 'Solar Estimate Request Received ✓'
                  : 'Get My solar estimate'}
              </span>
              <span className="absolute right-2.5 sm:right-3 group-hover:right-[calc(100%-44px)] top-1/2 -translate-y-1/2 w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );

  // ============================================================================
  // SECTION 12: DARK FOOTER WITH EXACT NIRT LOGO
  // ============================================================================
  const renderFooter = () => (
    <footer className="w-full bg-[#111111] text-white pt-[52px] sm:pt-[68px] pb-0 overflow-hidden">
      <div className="w-[90%] sm:w-[88%] lg:w-[86%] max-w-[1380px] mx-auto">
        {/* Top Row: Logo + Tagline + CTA + Social Pill Buttons */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <a
              href="#home"
              aria-label="NIRT Renewable Energy Home"
              className="inline-flex items-center shrink-0 mb-4 focus:outline-none"
            >
              <img
                src="/assets/aistudio/nirt_logo_dbbf2295.png"
                alt="NIRT Renewable Energy"
                referrerPolicy="no-referrer"
                className="h-[72px] sm:h-[92px] w-auto object-contain block"
              />
            </a>
            <p className="text-[15px] sm:text-[16px] leading-[1.55] text-white/90 font-normal max-w-[390px]">
              Go solar with NIRT. From financial assistance and government
              subsidies to final installation across Tamil Nadu.
            </p>
            <button
              type="button"
              onClick={() => scrollToQuote()}
              className="group relative mt-5 inline-flex items-center bg-white hover:bg-[#EAEAEA] text-[#0D0D0D] rounded-full pl-[24px] pr-[54px] py-[12px] text-[15px] sm:text-[15.5px] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_6px_16px_rgba(255,255,255,0.18)] whitespace-nowrap cursor-pointer"
            >
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[30px]">
                Get My solar estimate
              </span>
              <span className="absolute right-[7px] group-hover:right-[calc(100%-41px)] top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-[#0D0D0D] text-white inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {['Instagram', 'Youtube', 'Facebook', 'Linkedin'].map((net) => (
              <a
                key={net}
                href={`#${net.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToQuote();
                }}
                className="px-4 py-2 rounded-full bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white/80 text-[13.5px] transition-colors whitespace-nowrap"
              >
                {net}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Row: Footer Columns + Newsletter */}
        <div className="py-8 sm:py-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-7 sm:gap-8 text-[14.5px]">
          <div className="lg:col-span-2 space-y-2.5">
            <div className="text-white/45 font-normal mb-3">Company</div>
            <div>
              <a
                href="#about"
                className="text-white/85 hover:text-white transition-colors"
              >
                About Us
              </a>
            </div>
            <div>
              <a
                href="#services"
                className="text-white/85 hover:text-white transition-colors"
              >
                Subsidies
              </a>
            </div>
            <div>
              <a
                href="#quote-form"
                className="text-white/85 hover:text-white transition-colors"
              >
                EMI Calculator
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-2.5">
            <div className="text-white/45 font-normal mb-3">Policies</div>
            <div>
              <a
                href="#quote-form"
                className="text-white/85 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
            <div>
              <a
                href="#services"
                className="text-white/85 hover:text-white transition-colors"
              >
                Services Policy
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-2.5">
            <div className="text-white/45 font-normal mb-3">Contact</div>
            <div className="text-white/85 break-all">nirtinfo@gmail.com</div>
            <div className="text-white/85 tabular-nums">8048035697</div>
          </div>

          <div className="sm:col-span-2 lg:col-span-5">
            <div className="text-white/45 font-normal mb-3">Newsletter</div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center bg-[#1A1A1A] border border-white/10 rounded-full p-1.5"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={newsletterSaved ? 'Subscribed!' : 'Email'}
                className="bg-transparent text-white placeholder:text-white/40 text-[14.5px] px-4 py-2 flex-1 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#111111] border border-white/15 hover:border-white/40 text-white text-[14px] font-medium transition-colors shrink-0 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Giant Watermark Wordmark */}
        <div className="pt-2 select-none pointer-events-none overflow-hidden">
          <div className="text-[20vw] sm:text-[14.5vw] leading-[0.76] font-semibold tracking-[-0.04em] text-[#1C1C1C] text-center translate-y-2">
            NIRT
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen w-full bg-white text-[#0D0D0D] font-display relative overflow-x-hidden">
      <div className="w-full bg-white overflow-hidden">
        {renderNavbar()}
        <main>
          {renderHero()}
          {renderWhySolar()}
          {renderServices()}
          {renderProjects()}
          {renderImpact()}
          {renderHelpingFamilies()}
          {renderPricing()}
          {renderTestimonials()}
          {renderFaqs()}
          {renderContact()}
        </main>
        {renderFooter()}
      </div>

      {/* Mid-Page Popup Form (PDF Page 3: Triggered after engaging with the numerical section) */}
      <AnimatePresence>
        {midPagePopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setMidPagePopupOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white text-[#0D0D0D] rounded-[24px] max-w-[480px] w-full p-6 sm:p-7 shadow-2xl border border-black/5 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setMidPagePopupOpen(false)}
                aria-label="Close popup"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F2F2F2] hover:bg-[#E5E5E5] inline-flex items-center justify-center text-[#0D0D0D] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="inline-block bg-[#F2F2F2] text-[#1E255E] text-[10px] font-medium px-3 py-1 rounded-full mb-3">
                Free Solar Assessment
              </span>

              <h3 className="text-[20px] sm:text-[22px] font-medium leading-[1.25] tracking-[-0.02em] text-[#0D0D0D]">
                Want to Know What Solar Could Mean for Your Home?
              </h3>
              <p className="mt-2 text-[12px] leading-[1.5] text-[#6E6E6E]">
                Share your monthly electricity bill and location to start a
                solar assessment with NIRT.
              </p>

              <form onSubmit={handlePopupFormSubmit} className="mt-5 space-y-3">
                <div>
                  <label className="block text-[10px] font-medium text-[#222222] mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={popupFormData.name}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your full name"
                    className="w-full rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-2 text-[11px] text-[#0D0D0D] focus:outline-none focus:border-[#1E255E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-medium text-[#222222] mb-1">
                      District
                    </label>
                    <div className="relative w-full">
                      <select
                        required
                        aria-label="District"
                        value={popupFormData.district}
                        onChange={(e) =>
                          setPopupFormData({
                            ...popupFormData,
                            district: e.target.value,
                          })
                        }
                        className={`w-full appearance-none rounded-full border border-[#E5E5E5] bg-[#FAFAFA] pl-4 pr-8 py-2 text-[11px] focus:outline-none focus:border-[#1E255E] cursor-pointer ${
                          popupFormData.district
                            ? 'text-[#0D0D0D]'
                            : 'text-[#7A7A7A]'
                        }`}
                      >
                        <option value="" disabled>
                          Select District
                        </option>
                        {DISTRICTS.map((district) => (
                          <option
                            key={district}
                            value={district}
                            className="text-[#0D0D0D] bg-white"
                          >
                            {district}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7A7A7A]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-[#222222] mb-1">
                      Contact number
                    </label>
                    <input
                      type="tel"
                      required
                      value={popupFormData.contactNumber}
                      onChange={(e) =>
                        setPopupFormData({
                          ...popupFormData,
                          contactNumber: e.target.value,
                        })
                      }
                      placeholder="Mobile number"
                      className="w-full rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-2 text-[11px] text-[#0D0D0D] focus:outline-none focus:border-[#1E255E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-[#222222] mb-1">
                    Bi monthly bill
                  </label>
                  <input
                    type="text"
                    required
                    value={popupFormData.biMonthlyBill}
                    onChange={(e) =>
                      setPopupFormData({
                        ...popupFormData,
                        biMonthlyBill: e.target.value,
                      })
                    }
                    placeholder="Your bi-monthly EB bill amount (₹)"
                    className="w-full rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-2 text-[11px] text-[#0D0D0D] focus:outline-none focus:border-[#1E255E]"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative mt-2 w-full py-3.5 px-6 rounded-full bg-[#0D0D0D] hover:bg-[#222222] text-white text-[13.5px] font-medium inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer"
                >
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                    {popupFormStatus === 'submitted'
                      ? 'Assessment Started ✓'
                      : 'Explore My Solar Potential'}
                  </span>
                  <span className="absolute right-2.5 group-hover:right-[calc(100%-38px)] top-1/2 -translate-y-1/2 w-[28px] h-[28px] rounded-full bg-white text-[#0D0D0D] inline-flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Project Portfolio Modal */}
      {caseStudyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setCaseStudyModal(false)}
        >
          <div
            className="bg-[#1B1B1B] text-white rounded-[22px] max-w-[520px] w-full p-6 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="text-[11px] text-[#76B82A] font-medium">
                {currentProject.location}
              </span>
              <button
                type="button"
                onClick={() => setCaseStudyModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 inline-flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={currentProject.image}
              alt={currentProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-[220px] object-cover rounded-[14px] mb-4"
            />
            <h3 className="text-[20px] font-medium">{currentProject.title}</h3>
            <p className="mt-2 text-[12.5px] text-white/70 leading-relaxed">
              {currentProject.description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 bg-[#141414] rounded-[14px] p-3.5 border border-white/10 text-[11.5px]">
              <div>
                <span className="text-white/45 block text-[10px]">
                  Installed capacity
                </span>
                <span className="font-medium text-white">
                  {currentProject.installedCapacity}
                </span>
              </div>
              <div>
                <span className="text-white/45 block text-[10px]">
                  Location
                </span>
                <span className="font-medium text-white">
                  {currentProject.location}
                </span>
              </div>
              <div>
                <span className="text-white/45 block text-[10px]">
                  Project type
                </span>
                <span className="font-medium text-white">
                  {currentProject.projectType}
                </span>
              </div>
              <div>
                <span className="text-white/45 block text-[10px]">
                  Subsidy availed
                </span>
                <span className="font-semibold text-[#76B82A]">
                  {currentProject.subsidyAvailed}
                </span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <div className="text-[10px] text-white/50">Subsidy Availed</div>
                <div className="text-[20px] font-semibold text-[#76B82A] tabular-nums">
                  {currentProject.subsidyAvailed}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCaseStudyModal(false);
                  scrollToQuote();
                }}
                className="inline-flex items-center gap-2 bg-white text-[#0D0D0D] rounded-full px-4 py-2 text-[12px] font-medium hover:bg-[#EAEAEA] transition-colors cursor-pointer"
              >
                <span>Get My solar estimate</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Button (Bottom-Right Corner) */}
      <a
        href="https://wa.me/918048035697?text=Hi%20NIRT%2C%20I%20would%20like%20to%20know%20more%20about%20rooftop%20solar%20and%20government%20subsidy%20options."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NIRT on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 inline-flex items-center justify-end bg-[#1E255E] hover:bg-[#76B82A] text-white rounded-full p-[7px] shadow-[0_10px_28px_rgba(30,37,94,0.28)] hover:shadow-[0_14px_34px_rgba(118,184,42,0.34)] border border-white/15 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden whitespace-nowrap cursor-pointer"
      >
        <span
          className={`overflow-hidden whitespace-nowrap text-[13.5px] font-medium transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            whatsappOpen
              ? 'max-w-[140px] opacity-100 pl-3.5 pr-2.5'
              : 'max-w-0 opacity-0 pl-0 pr-0'
          }`}
        >
          WhatsApp Us
        </span>
        <span className="w-[38px] h-[38px] rounded-full bg-[#76B82A] group-hover:bg-[#1E255E] text-white inline-flex items-center justify-center shrink-0 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.031 2c-5.516 0-9.999 4.486-9.999 10.001 0 1.765.461 3.489 1.337 5.012L2 22l5.118-1.341c1.474.805 3.133 1.229 4.913 1.229 5.515 0 9.999-4.486 9.999-10.001S17.546 2 12.031 2zm5.822 14.148c-.244.687-1.419 1.314-1.976 1.399-.512.078-1.161.111-1.874-.115-.433-.138-.988-.321-1.699-.628-2.99-1.291-4.943-4.301-5.092-4.501-.149-.199-1.216-1.618-1.216-3.086 0-1.469.769-2.191 1.042-2.489.273-.299.596-.373.795-.373.199 0 .397.002.571.01.183.009.429-.069.671.513.248.597.844 2.065.918 2.214.075.149.124.324.025.523-.099.199-.149.323-.298.497-.149.174-.313.389-.447.523-.149.149-.304.311-.131.609.174.299.772 1.274 1.658 2.063 1.139 1.015 2.099 1.329 2.397 1.479.298.149.472.124.646-.075.174-.199.745-.871.944-1.169.199-.299.397-.249.671-.149.273.099 1.739.821 2.037.97.298.149.497.224.571.348.075.125.075.722-.169 1.409z" />
          </svg>
        </span>
      </a>
    </div>
  );
}
