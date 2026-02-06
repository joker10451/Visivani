import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, Sparkles, Users, GraduationCap, Hexagon, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const services = [
  {
    icon: Palette,
    title: 'Авторские схемы',
    description: 'Уникальные схемы для вышивки крестиком, созданные с любовью и вниманием к деталям',
    color: 'from-amarin-pink/40 to-amarin-pink/20',
    iconColor: 'text-amarin-terracotta',
    bgColor: 'bg-amarin-pink/10',
    href: '/#schemes',
    stat: '50+ схем',
  },
  {
    icon: Sparkles,
    title: 'Готовые работы',
    description: 'Вышитые работы в наличии — прекрасные подарки для близких и украшение для дома',
    color: 'from-amarin-peach/50 to-amarin-peach/30',
    iconColor: 'text-amarin-gold',
    bgColor: 'bg-amarin-peach/10',
    href: '/#works',
    stat: 'В наличии',
  },
  {
    icon: Users,
    title: 'Совместные отшивы',
    description: 'Присоединяйтесь к сообществу вышивальщиц и вдохновляйтесь вместе с единомышленницами',
    color: 'from-amarin-gold/30 to-amarin-gold/10',
    iconColor: 'text-amarin-brown',
    bgColor: 'bg-amarin-gold/10',
    href: '/#so',
    stat: '200+ участниц',
  },
  {
    icon: GraduationCap,
    title: 'Мастер-классы',
    description: 'Обучение для начинающих и продвинутых — от базовых стежков до сложных техник',
    color: 'from-amarin-terracotta/20 to-amarin-terracotta/10',
    iconColor: 'text-amarin-terracotta',
    bgColor: 'bg-amarin-terracotta/10',
    href: '/faq',
    stat: 'Онлайн',
  },
  {
    icon: Hexagon,
    title: 'Оформление в пинкипсы',
    description: 'Шестиугольные рамки для ваших работ — стильное и современное решение',
    color: 'from-pink-200/50 to-amarin-pink/30',
    iconColor: 'text-pink-600',
    bgColor: 'bg-pink-100/50',
    href: '/#works',
    stat: 'Популярно',
  },
];

export default function Services() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in-up');
                card.classList.remove('opacity-0');
              }, index * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string, title: string) => {
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (href.startsWith('/')) {
      navigate(href);
    } else {
      toast.info(`${title}`, {
        description: 'Этот раздел скоро будет доступен!',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 bg-gradient-to-b from-amarin-cream via-white to-amarin-cream relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amarin-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amarin-peach/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amarin-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amarin-pink/30 text-amarin-brown text-sm font-medium rounded-full mb-4">
            Наши услуги
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-amarin-brown mb-4">
            Что мы делаем
          </h2>
          <p className="text-lg text-amarin-gray max-w-2xl mx-auto">
            В нашей мастерской вы найдёте всё для творчества: от схем до готовых
            работ, от обучения до сообщества единомышленников
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`service-card opacity-0 ${
                index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                onClick={() => handleClick(service.href, service.title)}
                className={`h-full p-8 rounded-3xl bg-gradient-to-br ${service.color} backdrop-blur-sm cursor-pointer group relative overflow-hidden transition-all duration-500 hover:shadow-soft-xl hover:-translate-y-2 border border-white/50`}
              >
                {/* Hover glow effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and stat */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    <span className="text-xs font-medium text-amarin-brown/60 bg-white/60 px-3 py-1 rounded-full">
                      {service.stat}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-amarin-brown mb-3 group-hover:text-amarin-terracotta transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-amarin-gray leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Learn more link */}
                  <div className="flex items-center text-amarin-terracotta font-medium text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Подробнее</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-amarin-gray mb-6">
            Не знаете, с чего начать? Мы поможем выбрать!
          </p>
          <button
            onClick={() => navigate('/faq')}
            className="inline-flex items-center gap-2 text-amarin-terracotta font-medium hover:gap-3 transition-all"
          >
            Перейти в FAQ
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
