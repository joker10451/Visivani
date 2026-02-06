import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';
import { useShop } from '@/contexts/ShopContext';

const difficultyLabels = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-orange-100 text-orange-700',
};

const badgeLabels = {
  new: 'Новинка',
  bestseller: 'Хит продаж',
  'so-coming': 'СО скоро',
};

const badgeColors = {
  new: 'bg-green-100 text-green-700 border-green-200',
  bestseller: 'bg-gradient-to-r from-amarin-terracotta/30 to-amarin-pink/30 text-amarin-terracotta border-amarin-terracotta/30',
  'so-coming': 'bg-gradient-to-r from-amarin-pink/50 to-amarin-peach/50 text-amarin-brown border-amarin-pink/50',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isInFavorites } = useShop();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTiltStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTiltStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      className="product-card opacity-0 group"
      style={{ transform: tiltStyle, transition: 'transform 0.3s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-[0_20px_60px_-15px_rgba(214,130,138,0.3)] transition-all duration-500 border border-amarin-brown/5 hover:border-amarin-pink/30">
        {/* Image */}
        <div 
          className="relative aspect-square overflow-hidden bg-amarin-cream cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-amarin-pink/20 via-transparent to-amarin-terracotta/10" />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          {product.badge && (
            <Badge
              className={`absolute top-4 left-4 ${badgeColors[product.badge]} px-3 py-1 font-medium`}
            >
              {badgeLabels[product.badge]}
            </Badge>
          )}

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(product);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 ${
                isInFavorites(product.id)
                  ? 'bg-amarin-terracotta text-white'
                  : 'bg-white/95 text-amarin-brown hover:bg-amarin-pink hover:text-amarin-brown'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              <Heart
                className={`w-5 h-5 ${
                  isInFavorites(product.id) ? 'fill-current' : ''
                }`}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              className="w-10 h-10 rounded-full bg-white/95 text-amarin-brown hover:bg-amarin-pink flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              style={{ transitionDelay: '75ms' }}
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Add Button */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => addToCart(product)}
              className="w-full bg-gradient-to-r from-amarin-brown to-amarin-brown/90 hover:from-amarin-terracotta hover:to-amarin-terracotta/90 text-white rounded-full py-6 font-medium shadow-lg hover:shadow-xl hover:shadow-amarin-terracotta/25 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              В корзину
            </Button>
          </div>
        </div>

        {/* Content */}
        <div 
          className="p-5 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <h3 className="font-display text-xl text-amarin-brown mb-2 hover:text-amarin-terracotta transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-amarin-gray text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-amarin-gray mb-4">
            <span className="px-2 py-1 bg-amarin-cream rounded-lg">{product.size} крестиков</span>
            <span className="px-2 py-1 bg-amarin-cream rounded-lg">{product.colors} цветов</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-amarin-terracotta">
              {product.price} ₽
            </span>
            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${difficultyColors[product.difficulty]}`}>
              {difficultyLabels[product.difficulty]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
