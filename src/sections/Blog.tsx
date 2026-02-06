import { useState, useEffect, useRef } from 'react';
import { BookOpen, Scissors, Lightbulb, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const tips = [
  {
    icon: Scissors,
    title: 'Идеальная изнанка',
    description: 'Три главных секрета, которые сделают вашу вышивку красивой с обеих сторон',
    color: 'bg-amarin-pink/30',
  },
  {
    icon: Lightbulb,
    title: 'Выбор первой схемы',
    description: 'Как выбрать идеальную схему для начинающего вышивальщика',
    color: 'bg-amarin-peach/40',
  },
  {
    icon: BookOpen,
    title: 'Оформление в пинкипс',
    description: 'Пошаговая инструкция по оформлению работы в шестиугольную рамку',
    color: 'bg-amarin-gold/20',
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('amarine_subscribed') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in-up');
                el.classList.remove('opacity-0');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Пожалуйста, введите email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Пожалуйста, введите корректный email');
      return;
    }

    if (isSubscribed) {
      toast.info('Вы уже подписаны на нашу рассылку!');
      return;
    }

    // Save subscription
    localStorage.setItem('amarine_subscribed', 'true');
    localStorage.setItem('amarine_subscriber_email', email);
    setIsSubscribed(true);
    setEmail('');
    
    toast.success('Вы успешно подписались!', {
      description: 'Теперь вы будете первыми узнавать о новых схемах и СО!',
      duration: 5000,
    });
  };

  const handleTipClick = (title: string) => {
    toast.info(`Статья "${title}"`, {
      description: 'Полная версия статьи скоро будет доступна!',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-20 md:py-28 bg-amarin-cream"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-amarin-brown mb-4">
            Советы и секреты
          </h2>
          <p className="text-lg text-amarin-gray max-w-2xl mx-auto">
            Полезные статьи, которые помогут вам стать настоящим мастером вышивки
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="reveal opacity-0 group cursor-pointer"
              onClick={() => handleTipClick(tip.title)}
            >
              <div
                className={`h-full p-6 rounded-2xl ${tip.color} card-hover`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <tip.icon className="w-6 h-6 text-amarin-terracotta" />
                </div>
                <h3 className="font-display text-xl text-amarin-brown mb-2">
                  {tip.title}
                </h3>
                <p className="text-amarin-gray text-sm mb-4">
                  {tip.description}
                </p>
                <span className="inline-flex items-center text-sm text-amarin-terracotta font-medium group-hover:gap-2 transition-all">
                  Читать
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="reveal opacity-0 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft text-center">
            <h3 className="font-display text-2xl text-amarin-brown mb-3">
              Будьте в курсе!
            </h3>
            <p className="text-amarin-gray mb-6">
              Подпишитесь на рассылку, чтобы первыми узнавать о новых схемах,
              совместных отшивах и полезных советах
            </p>
            
            {isSubscribed ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-green-600 font-medium">
                  Вы подписаны на рассылку!
                </p>
                <p className="text-sm text-amarin-gray">
                  Спасибо за интерес к нашей мастерской
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border-amarin-brown/20"
                />
                <Button 
                  type="submit"
                  className="bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown rounded-full px-6"
                >
                  Подписаться
                </Button>
              </form>
            )}
            
            {!isSubscribed && (
              <p className="text-xs text-amarin-gray/60 mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
