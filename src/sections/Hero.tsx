import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Heart, Scissors, Palette } from 'lucide-react';

// Decorative floating elements with enhanced animations
const FloatingElement = ({
  children,
  className,
  delay = 0,
  duration = 3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) => (
  <div
    className={`absolute animate-float ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    {children}
  </div>
);

// Animated needle thread
const NeedleThread = ({ delay = 0 }: { delay?: number }) => (
  <svg 
    width="60" 
    height="120" 
    viewBox="0 0 60 120"
    style={{ animationDelay: `${delay}s` }}
  >
    <path
      d="M30 0 L30 80"
      stroke="#D4A574"
      strokeWidth="2"
      fill="none"
      className="animate-pulse-soft"
    />
    <circle cx="30" cy="5" r="4" fill="none" stroke="#5D4037" strokeWidth="2" />
    <path
      d="M25 80 Q30 85 35 80 Q30 75 25 80"
      fill="#E07A5F"
      className="animate-wiggle"
      style={{ transformOrigin: '30px 80px' }}
    />
    <path
      d="M28 85 Q25 100 20 110 M32 85 Q35 100 40 110"
      stroke="#FFB6C1"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="4 2"
      className="animate-pulse-soft"
    />
  </svg>
);

// Cross stitch pattern decoration
const StitchPattern = ({ className }: { className?: string }) => (
  <div className={`absolute ${className} grid grid-cols-4 gap-1 opacity-20`}>
    {[...Array(16)].map((_, i) => (
      <div
        key={i}
        className="w-3 h-3 rounded-sm"
        style={{
          backgroundColor: ['#FFB6C1', '#FFDAB9', '#D4A574', '#E07A5F'][i % 4],
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
  </div>
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const scrollToSchemes = () => {
    const element = document.getElementById('schemes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSO = () => {
    const element = document.getElementById('so');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF8DC 30%, #FFDAB9 70%, #FFF8DC 100%)',
      }}
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating cross stitch patterns */}
        <StitchPattern className="top-20 left-[5%]" />
        <StitchPattern className="bottom-40 right-[8%]" />
        <StitchPattern className="top-1/3 right-[15%]" />

        {/* Decorative needles */}
        <div 
          className="absolute top-32 left-[12%] opacity-30" 
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        >
          <NeedleThread delay={0} />
        </div>
        <div 
          className="absolute bottom-48 right-[20%] opacity-25" 
          style={{ transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px) rotate(15deg)` }}
        >
          <NeedleThread delay={1} />
        </div>

        {/* Cat silhouettes */}
        <FloatingElement className="top-24 left-[8%] opacity-15" delay={0} duration={4}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="white">
            <ellipse cx="50" cy="65" rx="35" ry="30" />
            <circle cx="35" cy="45" r="22" />
            <polygon points="15,35 22,10 40,28" />
            <polygon points="50,28 68,10 75,35" />
            <circle cx="28" cy="42" r="4" fill="#5D4037" />
            <circle cx="45" cy="42" r="4" fill="#5D4037" />
            <path d="M30 52 Q36 57 43 52" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M25 48 L15 45 M25 50 L15 50" stroke="#5D4037" strokeWidth="1.5" />
            <path d="M48 48 L58 45 M48 50 L58 50" stroke="#5D4037" strokeWidth="1.5" />
          </svg>
        </FloatingElement>

        <FloatingElement className="bottom-36 left-[18%] opacity-10" delay={2} duration={5}>
          <svg width="70" height="70" viewBox="0 0 100 100" fill="white">
            <ellipse cx="50" cy="65" rx="30" ry="25" />
            <circle cx="35" cy="45" r="18" />
            <polygon points="20,35 25,15 40,28" />
            <polygon points="50,28 65,15 70,35" />
          </svg>
        </FloatingElement>

        <FloatingElement className="top-40 right-[12%] opacity-12" delay={1} duration={4.5}>
          <svg width="80" height="80" viewBox="0 0 100 100" fill="white">
            <ellipse cx="50" cy="60" rx="32" ry="28" />
            <circle cx="35" cy="40" r="20" />
            <polygon points="18,30 23,8 38,25" />
            <polygon points="52,25 67,8 72,30" />
            <circle cx="28" cy="38" r="3" fill="#5D4037" />
            <circle cx="43" cy="38" r="3" fill="#5D4037" />
          </svg>
        </FloatingElement>

        {/* Thread decorations */}
        <FloatingElement className="top-48 right-[28%]" delay={0.5} duration={3.5}>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amarin-gold via-amarin-terracotta to-amarin-gold rounded-full transform rotate-45 shadow-sm" />
        </FloatingElement>

        <FloatingElement className="bottom-52 left-[25%]" delay={1.5} duration={4}>
          <div className="w-24 h-1 bg-gradient-to-r from-amarin-pink to-amarin-peach rounded-full transform -rotate-12" />
        </FloatingElement>

        <FloatingElement className="top-1/3 left-[3%]" delay={2.5} duration={3.8}>
          <div className="w-20 h-1.5 bg-gradient-to-r from-amarin-terracotta to-amarin-gold rounded-full transform rotate-30" />
        </FloatingElement>

        {/* Bead decorations with glow */}
        <FloatingElement className="top-32 left-[35%]" delay={0.3} duration={3}>
          <div className="w-5 h-5 rounded-full bg-amarin-gold shadow-lg animate-pulse-soft" style={{ boxShadow: '0 0 15px rgba(212, 165, 116, 0.6)' }} />
        </FloatingElement>

        <FloatingElement className="bottom-32 right-[35%]" delay={1.2} duration={3.5}>
          <div className="w-4 h-4 rounded-full bg-amarin-terracotta shadow-lg" style={{ boxShadow: '0 0 12px rgba(224, 122, 95, 0.5)' }} />
        </FloatingElement>

        <FloatingElement className="top-1/2 right-[5%]" delay={0.8} duration={4}>
          <div className="w-6 h-6 rounded-full bg-amarin-pink shadow-lg animate-pulse-soft" style={{ boxShadow: '0 0 15px rgba(255, 182, 193, 0.6)' }} />
        </FloatingElement>

        <FloatingElement className="bottom-1/3 left-[30%]" delay={1.8} duration={3.2}>
          <div className="w-3 h-3 rounded-full bg-amarin-peach shadow-md" />
        </FloatingElement>

        {/* Hearts */}
        <FloatingElement className="top-1/4 right-[20%]" delay={0.6} duration={4.2}>
          <Heart className="w-6 h-6 text-amarin-pink/40 fill-amarin-pink/40" />
        </FloatingElement>

        <FloatingElement className="bottom-1/4 right-[40%]" delay={2.2} duration={3.8}>
          <Heart className="w-5 h-5 text-amarin-terracotta/30 fill-amarin-terracotta/30" />
        </FloatingElement>

        {/* Scissors icon */}
        <FloatingElement className="top-20 right-[35%]" delay={1.5} duration={4}>
          <Scissors className="w-8 h-8 text-amarin-brown/20 rotate-45" />
        </FloatingElement>

        {/* Palette icon */}
        <FloatingElement className="bottom-40 left-[8%]" delay={0.9} duration={3.5}>
          <Palette className="w-10 h-10 text-amarin-gold/25" />
        </FloatingElement>

        {/* Gradient orbs */}
        <div 
          className="absolute top-20 left-[20%] w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,182,193,0.4) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`
          }}
        />
        <div 
          className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full opacity-25 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,218,185,0.4) 0%, transparent 70%)',
            transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(212,165,116,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with animation */}
          <div 
            className="reveal opacity-0 inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 backdrop-blur-md rounded-full mb-8 shadow-soft hover:shadow-soft-lg transition-shadow cursor-default"
            style={{ transform: `translateY(${mousePosition.y * 0.5}px)` }}
          >
            <Sparkles className="w-4 h-4 text-amarin-terracotta animate-pulse-soft" />
            <span className="text-sm text-amarin-brown font-medium">
              Рукодельная мастерская
            </span>
            <Sparkles className="w-4 h-4 text-amarin-terracotta animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Main Title with enhanced styling */}
          <h1 
            className="reveal opacity-0 font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-amarin-brown mb-6 leading-tight"
            style={{ 
              textShadow: '3px 3px 6px rgba(93, 64, 55, 0.15), 0 0 40px rgba(255, 182, 193, 0.3)',
              transform: `translateY(${mousePosition.y * 0.3}px)`
            }}
          >
            Вышивание
            <span className="block text-amarin-terracotta">с Амаринэ</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="reveal opacity-0 text-xl md:text-2xl lg:text-3xl text-amarin-gray mb-8 font-display"
            style={{ transform: `translateY(${mousePosition.y * 0.2}px)` }}
          >
            где каждый стежок — это магия
          </p>

          {/* Description */}
          <p className="reveal opacity-0 text-base md:text-lg text-amarin-gray/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Авторские схемы для вышивки крестиком, готовые работы, совместные отшивы и
            мастер-классы для творческих душ. Создавайте красоту вместе с нами!
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className="reveal opacity-0 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToSchemes}
              size="lg"
              className="bg-gradient-to-r from-amarin-pink to-amarin-peach hover:from-amarin-pink/90 hover:to-amarin-peach/90 text-amarin-brown font-semibold px-10 py-7 rounded-full shadow-soft-xl btn-hover text-lg group"
            >
              Смотреть схемы
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={scrollToSO}
              size="lg"
              variant="outline"
              className="border-2 border-amarin-brown/30 text-amarin-brown hover:bg-amarin-brown/5 hover:border-amarin-terracotta/50 px-10 py-7 rounded-full btn-hover text-lg backdrop-blur-sm"
            >
              Присоединиться к СО
            </Button>
          </div>

          {/* Trust badges */}
          <div className="reveal opacity-0 mt-16 flex flex-wrap justify-center gap-8 text-sm text-amarin-gray/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center">
                <Palette className="w-4 h-4 text-amarin-terracotta" />
              </div>
              <span>50+ схем</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center">
                <Heart className="w-4 h-4 text-amarin-terracotta" />
              </div>
              <span>1000+ довольных клиентов</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-amarin-terracotta" />
              </div>
              <span>Ручная работа</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 108C120 96 240 72 360 66C480 60 600 72 720 78C840 84 960 84 1080 81C1200 78 1320 72 1380 69L1440 66V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FFF8DC"
          />
        </svg>
      </div>
    </section>
  );
}
