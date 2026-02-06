import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Menu, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useShop } from '@/contexts/ShopContext';
import Cart from './Cart';

const navItems = [
  { name: 'Главная', href: '/' },
  { name: 'Схемы', href: '/#schemes' },
  { name: 'О нас', href: '/about' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { favorites, searchQuery, setSearchQuery } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (location.pathname !== '/') {
        navigate('/#schemes');
      } else {
        const element = document.getElementById('schemes');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsSearchOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-soft py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <span className="font-display text-3xl md:text-4xl text-amarin-brown group-hover:text-amarin-terracotta transition-colors">
                Amarine
              </span>
              {/* Cat ears decoration */}
              <svg
                className="absolute -top-2 left-2 w-4 h-4 text-amarin-pink animate-wiggle"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L8 8h8l-4-6z" />
              </svg>
              <svg
                className="absolute -top-2 right-2 w-4 h-4 text-amarin-pink animate-wiggle"
                style={{ animationDelay: '0.5s' }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L8 8h8l-4-6z" />
              </svg>
            </div>
            <span className="hidden md:inline text-sm text-amarin-gray">
              | Вышивание и схемы
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-amarin-terracotta'
                    : 'text-amarin-brown hover:text-amarin-terracotta'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-auto'}`}>
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Поиск схем..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 rounded-full border-amarin-brown/20"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 text-amarin-brown"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="h-9 w-9 text-amarin-brown"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-amarin-brown hover:text-amarin-terracotta hover:bg-amarin-pink/20"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Favorites */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection('/#schemes')}
              className="hidden md:flex text-amarin-brown hover:text-amarin-terracotta hover:bg-amarin-pink/20 relative"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amarin-terracotta text-white text-xs rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>

            {/* Cart */}
            <Cart />

            {/* User */}
            <Link to="/about">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-amarin-brown hover:text-amarin-terracotta hover:bg-amarin-pink/20"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-amarin-brown"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-amarin-cream">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Поиск схем..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="rounded-full border-amarin-brown/20"
                    />
                    <Button type="submit" size="icon" variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                  </form>

                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className={`text-lg font-medium text-left transition-colors ${
                          isActive(item.href)
                            ? 'text-amarin-terracotta'
                            : 'text-amarin-brown hover:text-amarin-terracotta'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>

                  <div className="flex gap-4 pt-4 border-t border-amarin-brown/10">
                    <Button variant="outline" size="icon" className="relative">
                      <Heart className="w-5 h-5" />
                      {favorites.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amarin-terracotta text-white text-xs rounded-full flex items-center justify-center">
                          {favorites.length}
                        </span>
                      )}
                    </Button>
                    <Link to="/about">
                      <Button variant="outline" size="icon">
                        <User className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
