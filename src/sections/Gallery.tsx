import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Eye, Grid3X3, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';

const categories = [
  { id: 'all', name: 'Все работы', icon: Grid3X3 },
  { id: 'flowers', name: 'Цветы', icon: Sparkles },
  { id: 'animals', name: 'Животные', icon: Heart },
  { id: 'city', name: 'Города', icon: Eye },
  { id: 'letters', name: 'Буквы', icon: Sparkles },
];

export default function Gallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof products[0] | null>(null);
  const [, setHoveredWork] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { addToCart, toggleFavorite, isInFavorites } = useShop();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-scale-in');
                item.classList.remove('opacity-0');
              }, index * 80);
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
  }, [activeCategory]);

  const filteredWorks =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleImageClick = (product: typeof products[0]) => {
    setSelectedImage(product);
  };

  const handleAddToCart = () => {
    if (selectedImage) {
      addToCart(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="py-24 md:py-32 bg-gradient-to-b from-white via-amarin-cream to-white relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-amarin-pink/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-amarin-peach/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amarin-gold/30 text-amarin-brown text-sm font-medium rounded-full mb-4">
            Вдохновение
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-amarin-brown mb-4">
            Галерея работ
          </h2>
          <p className="text-lg text-amarin-gray max-w-2xl mx-auto">
            Работы наших клиентов — вдохновляйтесь и создавайте свои шедевры!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amarin-pink to-amarin-peach text-amarin-brown shadow-soft'
                  : 'bg-white text-amarin-gray hover:bg-amarin-cream border border-amarin-brown/10'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredWorks.map((work, index) => (
            <div
              key={work.id}
              onClick={() => handleImageClick(work)}
              onMouseEnter={() => setHoveredWork(work.id)}
              onMouseLeave={() => setHoveredWork(null)}
              className={`gallery-item opacity-0 break-inside-avoid cursor-pointer group ${
                index % 5 === 0 ? 'aspect-[4/5]' : 
                index % 5 === 1 ? 'aspect-square' : 
                index % 5 === 2 ? 'aspect-[3/4]' :
                index % 5 === 3 ? 'aspect-[4/5]' : 'aspect-square'
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl bg-amarin-cream h-full shadow-soft hover:shadow-soft-xl transition-all duration-500">
                <img
                  src={work.image}
                  alt={work.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amarin-brown/90 via-amarin-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Quick actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(work);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 ${
                      isInFavorites(work.id)
                        ? 'bg-amarin-terracotta text-white'
                        : 'bg-white/95 text-amarin-brown hover:bg-amarin-pink'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInFavorites(work.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-display text-xl mb-1">
                    {work.name}
                  </p>
                  <p className="text-white/80 text-sm mb-3">
                    Нажмите для просмотра
                  </p>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <span className="px-2 py-1 bg-white/20 rounded-lg">{work.size} крестиков</span>
                    <span className="px-2 py-1 bg-white/20 rounded-lg">{work.colors} цветов</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Results count */}
        <p className="text-center text-sm text-amarin-gray mt-12">
          Показано <span className="font-semibold text-amarin-brown">{filteredWorks.length}</span> {filteredWorks.length === 1 ? 'работа' : filteredWorks.length < 5 ? 'работы' : 'работ'}
        </p>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl bg-white p-0 overflow-hidden rounded-3xl">
          {selectedImage && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-amarin-pink/30 text-amarin-brown text-xs font-medium rounded-full mb-4 w-fit">
                  {selectedImage.category === 'flowers' ? 'Цветы' : 
                   selectedImage.category === 'animals' ? 'Животные' : 
                   selectedImage.category === 'city' ? 'Города' : 'Буквы'}
                </span>
                <h3 
                  className="font-display text-3xl text-amarin-brown mb-3 cursor-pointer hover:text-amarin-terracotta transition-colors"
                  onClick={() => {
                    setSelectedImage(null);
                    navigate(`/product/${selectedImage.id}`);
                  }}
                >
                  {selectedImage.name}
                </h3>
                <p className="text-amarin-gray mb-6">
                  {selectedImage.description}
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-amarin-brown/10">
                    <span className="text-amarin-gray">Размер</span>
                    <span className="text-amarin-brown font-medium">{selectedImage.size} крестиков</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-amarin-brown/10">
                    <span className="text-amarin-gray">Цветов</span>
                    <span className="text-amarin-brown font-medium">{selectedImage.colors}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-amarin-gray">Цена</span>
                    <span className="text-amarin-terracotta font-bold text-xl">{selectedImage.price} ₽</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-amarin-pink to-amarin-peach hover:from-amarin-pink/90 hover:to-amarin-peach/90 text-amarin-brown font-semibold rounded-full py-6"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Добавить в корзину
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedImage(null);
                      navigate(`/product/${selectedImage.id}`);
                    }}
                    className="w-full rounded-full border-amarin-brown/20"
                  >
                    Подробнее о схеме
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
