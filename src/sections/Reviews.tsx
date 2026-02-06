import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reviews as initialReviews } from '@/data/products';
import StarRating from '@/components/StarRating';
import ReviewForm from '@/components/ReviewForm';
import type { Review } from '@/types';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Рассчитываем средний рейтинг
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Количество отзывов по рейтингу
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector('.reveal')?.classList.add('animate-fade-in-up');
            entry.target.querySelector('.reveal')?.classList.remove('opacity-0');
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

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleAddReview = (reviewData: { author: string; rating: number; text: string }) => {
    const newReview: Review = {
      id: Date.now().toString(),
      author: reviewData.author,
      rating: reviewData.rating,
      text: reviewData.text,
      productName: 'Общий отзыв',
      date: new Date().toISOString().split('T')[0],
    };
    
    setReviews([newReview, ...reviews]);
    setShowForm(false);
    setCurrentIndex(0);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="py-20 md:py-28 bg-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-amarin-brown mb-4">
            Отзывы
          </h2>
          <p className="text-lg text-amarin-gray max-w-2xl mx-auto mb-8">
            Что говорят наши клиенты о схемах и совместных отшивах
          </p>
          
          {/* Rating Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-5xl font-display text-amarin-brown mb-2">
                {averageRating}
              </div>
              <StarRating rating={parseFloat(averageRating)} size="lg" />
              <p className="text-sm text-amarin-gray mt-2">
                {reviews.length} {reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'}
              </p>
            </div>
            
            {/* Rating Distribution */}
            <div className="w-full sm:w-auto space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating] || 0;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-3 text-sm">
                    <span className="w-3 text-amarin-gray">{rating}</span>
                    <div className="w-32 sm:w-40 h-2 bg-amarin-cream rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amarin-gold rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-amarin-gray w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add Review Button */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            className="rounded-full px-8 border-amarin-brown/20 hover:bg-amarin-pink/20"
          >
            {showForm ? 'Отменить' : 'Оставить отзыв'}
          </Button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="max-w-xl mx-auto mb-12">
            <ReviewForm onSubmit={handleAddReview} />
          </div>
        )}

        {/* Review Carousel */}
        {reviews.length > 0 && (
          <div className="reveal opacity-0 max-w-3xl mx-auto">
            <div className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-amarin-pink rounded-full flex items-center justify-center z-10">
                <Quote className="w-6 h-6 text-amarin-brown" />
              </div>

              {/* Review Card */}
              <div className="bg-gradient-to-br from-amarin-cream to-white rounded-3xl p-8 md:p-12 shadow-soft text-center">
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  <StarRating rating={currentReview.rating} size="lg" />
                </div>

                {/* Review Text */}
                <p className="text-lg md:text-xl text-amarin-brown mb-8 leading-relaxed min-h-[80px] flex items-center justify-center">
                  "{currentReview.text}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-amarin-pink/50 flex items-center justify-center mb-3">
                    <span className="text-2xl font-display text-amarin-brown">
                      {currentReview.author.charAt(0)}
                    </span>
                  </div>
                  <p className="font-display text-xl text-amarin-brown">
                    {currentReview.author}
                  </p>
                  <p className="text-sm text-amarin-gray">
                    {currentReview.productName}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="rounded-full border-amarin-brown/20 hover:bg-amarin-pink/20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-6 bg-amarin-terracotta'
                          : 'bg-amarin-brown/20 hover:bg-amarin-brown/40'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full border-amarin-brown/20 hover:bg-amarin-pink/20"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
