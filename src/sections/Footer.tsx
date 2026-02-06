import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, Instagram, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { products } from '@/data/products';

const quickLinks = [
  { name: 'Главная', href: '/' },
  { name: 'Каталог', href: '/#schemes' },
  { name: 'О нас', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

const socialLinks = [
  { name: 'Telegram', icon: Send, href: 'https://t.me/crossstich_amarine' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'VK', icon: MessageCircle, href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('amarine_subscribed') === 'true';
    }
    return false;
  });
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

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

    localStorage.setItem('amarine_subscribed', 'true');
    localStorage.setItem('amarine_subscriber_email', email);
    setIsSubscribed(true);
    setEmail('');
    
    toast.success('Вы успешно подписались!', {
      description: 'Теперь вы будете первыми узнавать о новых схемах и СО!',
    });
  };

  const handleSocialClick = (name: string, href: string) => {
    if (href === '#') {
      toast.info(`${name} скоро будет доступен!`);
    }
  };

  return (
    <footer id="contacts" className="bg-gradient-to-br from-amarin-pink/20 via-amarin-peach/20 to-amarin-cream pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-3xl text-amarin-brown">
                Amarine
              </span>
            </Link>
            <p className="text-amarin-gray text-sm mb-6">
              Рукодельная мастерская, где каждый стежок — это магия. Авторские
              схемы, готовые работы и тёплое сообщество вышивальщиц.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href !== '#' ? social.href : undefined}
                  onClick={(e) => {
                    if (social.href === '#') {
                      e.preventDefault();
                      handleSocialClick(social.name, social.href);
                    }
                  }}
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-amarin-brown hover:bg-amarin-pink hover:text-amarin-brown transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-amarin-brown mb-4">
              Навигация
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-amarin-gray hover:text-amarin-terracotta transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-amarin-brown mb-4">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="text-amarin-gray">
                <span className="block text-amarin-brown font-medium mb-1">
                  Telegram-канал
                </span>
                <a 
                  href="https://t.me/crossstich_amarine" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amarin-terracotta transition-colors"
                >
                  @crossstich_amarine
                </a>
              </li>
              <li className="text-amarin-gray">
                <span className="block text-amarin-brown font-medium mb-1">
                  Email
                </span>
                <a 
                  href="mailto:hello@amarine.ru"
                  className="hover:text-amarin-terracotta transition-colors"
                >
                  hello@amarine.ru
                </a>
              </li>
              <li className="text-amarin-gray">
                <span className="block text-amarin-brown font-medium mb-1">
                  Режим работы
                </span>
                Пн-Пт: 10:00 - 19:00
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg text-amarin-brown mb-4">
              Подписка на новости
            </h4>
            <p className="text-amarin-gray text-sm mb-4">
              Будьте в курсе новых СО и схем!
            </p>
            
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="text-sm">Вы подписаны!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-amarin-brown/20 text-sm focus:outline-none focus:border-amarin-pink"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Mini Gallery */}
        <div className="mb-10">
          <h4 className="font-display text-lg text-amarin-brown mb-4 text-center">
            Наши работы
          </h4>
          <div className="grid grid-cols-6 gap-2 max-w-lg mx-auto">
            {products.slice(0, 6).map((product) => (
              <button
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="aspect-square rounded-lg overflow-hidden bg-amarin-cream"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amarin-brown/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-amarin-gray">
              © 2024 Amarine. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm">
              <button 
                onClick={() => toast.info('Политика конфиденциальности скоро будет доступна')}
                className="text-amarin-gray hover:text-amarin-terracotta"
              >
                Политика конфиденциальности
              </button>
              <button 
                onClick={() => toast.info('Информация о доставке скоро будет доступна')}
                className="text-amarin-gray hover:text-amarin-terracotta"
              >
                Доставка и оплата
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
