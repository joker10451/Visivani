import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Heart, Share2, ArrowLeft, Check,
  Truck, Shield, Clock, Star, Minus, Plus, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import SEO from '@/components/seo/SEO';
import { products, reviews as allReviews } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import StarRating from '@/components/StarRating';
import ReviewForm from '@/components/ReviewForm';

const difficultyLabels = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

const difficultyDescriptions = {
  beginner: 'Идеально для тех, кто только начинает свой путь в вышивании. Простые стежки и понятная схема.',
  intermediate: 'Для опытных вышивальщиц. Больше цветов и более сложные элементы.',
  advanced: 'Для мастеров. Сложная схема с множеством деталей и оттенков.',
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isInFavorites } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = products.find((p) => p.id === id);
  
  // Фильтруем отзывы для текущего товара
  const productReviews = allReviews.filter(r => r.productName === product?.name) || [];

  if (!product) {
    return (
      <div className="min-h-screen bg-amarin-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-amarin-brown mb-4">
            Схема не найдена
          </h1>
          <Button onClick={() => navigate('/')} className="bg-amarin-pink text-amarin-brown">
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Ссылка скопирована!');
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    // Toast уже показывается в addToCart, дополнительный не нужен
  };

  // Рассчитываем средний рейтинг товара
  const averageRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : '0.0';

  const handleAddReview = (_reviewData: { author: string; rating: number; text: string }) => {
    toast.success('Спасибо за ваш отзыв! Он появится после проверки.');
    setShowReviewForm(false);
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        keywords={`схема для вышивки, ${product.name}, вышивка крестиком, пинкипс, amarine`}
        image={product.image}
        url={`https://amarine.ru/product/${product.id}`}
        type="product"
        price={product.price}
        availability={product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'}
      />

      <div className="min-h-screen bg-amarin-cream pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Каталог', href: '/#schemes' },
              { name: product.name, href: `#` },
            ]}
          />

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amarin-gray hover:text-amarin-brown mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>

          {/* Product Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-soft">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.badge === 'new' && (
                  <Badge className="bg-green-100 text-green-700">Новинка</Badge>
                )}
                {product.badge === 'bestseller' && (
                  <Badge className="bg-amarin-terracotta/20 text-amarin-terracotta">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Хит продаж
                  </Badge>
                )}
                {product.badge === 'so-coming' && (
                  <Badge className="bg-amarin-pink text-amarin-brown">СО скоро</Badge>
                )}
                <Badge variant="outline" className="border-amarin-brown/20">
                  {difficultyLabels[product.difficulty]}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl lg:text-5xl text-amarin-brown mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={parseFloat(averageRating)} size="sm" />
                <span className="text-sm text-amarin-gray">
                  {averageRating} ({productReviews.length} {productReviews.length === 1 ? 'отзыв' : productReviews.length < 5 ? 'отзыва' : 'отзывов'})
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-amarin-terracotta mb-6">
                {product.price} ₽
              </div>

              {/* Description */}
              <p className="text-amarin-gray mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-amarin-pink/30 flex items-center justify-center">
                    <Check className="w-5 h-5 text-amarin-terracotta" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amarin-brown">Размер</p>
                    <p className="text-sm text-amarin-gray">{product.size} крестиков</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-amarin-peach/40 flex items-center justify-center">
                    <Check className="w-5 h-5 text-amarin-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amarin-brown">Цветов</p>
                    <p className="text-sm text-amarin-gray">{product.colors} оттенков</p>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-amarin-brown font-medium">Количество:</span>
                <div className="flex items-center gap-1 bg-white rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-amarin-pink/20 rounded-l-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-amarin-pink/20 rounded-r-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown font-semibold rounded-full py-6"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  В корзину
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toggleFavorite(product)}
                  className={`rounded-full px-6 ${
                    isInFavorites(product.id)
                      ? 'border-amarin-terracotta text-amarin-terracotta'
                      : ''
                  }`}
                >
                  <Heart className={isInFavorites(product.id) ? 'fill-current' : ''} />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="rounded-full px-6"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-white/50 rounded-xl">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-amarin-terracotta" />
                  <p className="text-xs text-amarin-gray">Быстрая доставка</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-amarin-gold" />
                  <p className="text-xs text-amarin-gray">Гарантия качества</p>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-amarin-brown" />
                  <p className="text-xs text-amarin-gray">Поддержка 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="mb-16">
            <TabsList className="bg-white">
              <TabsTrigger value="details">Подробности</TabsTrigger>
              <TabsTrigger value="difficulty">О сложности</TabsTrigger>
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-display text-2xl text-amarin-brown mb-4">
                  Что входит в набор
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amarin-gold mt-0.5" />
                    <span className="text-amarin-gray">Цветная схема в электронном формате (PDF)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amarin-gold mt-0.5" />
                    <span className="text-amarin-gray">Ключ к схеме с номерами ниток</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amarin-gold mt-0.5" />
                    <span className="text-amarin-gray">Инструкция по вышивке</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amarin-gold mt-0.5" />
                    <span className="text-amarin-gray">Рекомендации по выбору канвы</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="difficulty" className="mt-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-display text-2xl text-amarin-brown mb-4">
                  Уровень сложности: {difficultyLabels[product.difficulty]}
                </h3>
                <p className="text-amarin-gray mb-4">
                  {difficultyDescriptions[product.difficulty]}
                </p>
                <div className="flex items-center gap-2 p-4 bg-amarin-cream rounded-xl">
                  <Clock className="w-5 h-5 text-amarin-terracotta" />
                  <span className="text-amarin-brown">
                    Примерное время вышивки: {product.difficulty === 'beginner' ? '1-2' : product.difficulty === 'intermediate' ? '2-4' : '4+'} недели
                  </span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-display text-2xl text-amarin-brown mb-4">
                  Доставка и оплата
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-amarin-terracotta mt-0.5" />
                    <div>
                      <p className="font-medium text-amarin-brown">Электронная доставка</p>
                      <p className="text-amarin-gray text-sm">Схема будет отправлена на ваш email сразу после оплаты</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amarin-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-amarin-brown">Безопасная оплата</p>
                      <p className="text-amarin-gray text-sm">Принимаем карты, СБП, электронные кошельки</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Product Reviews */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl text-amarin-brown">
                Отзывы
              </h2>
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
                className="rounded-full border-amarin-brown/20 hover:bg-amarin-pink/20"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {showReviewForm ? 'Отменить' : 'Написать отзыв'}
              </Button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="max-w-xl mb-8">
                <ReviewForm 
                  onSubmit={handleAddReview} 
                  productName={product.name}
                />
              </div>
            )}

            {/* Reviews List */}
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((review) => (
                  <div 
                    key={review.id}
                    className="bg-white rounded-2xl p-6 shadow-soft"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amarin-pink/50 flex items-center justify-center">
                          <span className="font-display text-amarin-brown">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-amarin-brown">
                            {review.author}
                          </p>
                          <p className="text-xs text-amarin-gray">
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-amarin-gray leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl">
                <MessageCircle className="w-12 h-12 text-amarin-gray mx-auto mb-4" />
                <p className="text-amarin-brown text-lg mb-2">
                  Пока нет отзывов
                </p>
                <p className="text-amarin-gray">
                  Будьте первым, кто оставит отзыв об этом товаре!
                </p>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-display text-3xl text-amarin-brown mb-6">
                Похожие схемы
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-soft cursor-pointer card-hover"
                  >
                    <div className="aspect-square">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-display text-lg text-amarin-brown truncate">
                        {p.name}
                      </h4>
                      <p className="text-amarin-terracotta font-semibold">
                        {p.price} ₽
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
