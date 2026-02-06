import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './StarRating';
import { toast } from 'sonner';

interface ReviewFormProps {
  onSubmit: (review: {
    author: string;
    rating: number;
    text: string;
  }) => void;
  productName?: string;
}

export default function ReviewForm({ onSubmit, productName }: ReviewFormProps) {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!author.trim()) {
      toast.error('Пожалуйста, введите ваше имя');
      return;
    }
    
    if (author.trim().length < 2) {
      toast.error('Имя должно содержать минимум 2 символа');
      return;
    }
    
    if (!text.trim()) {
      toast.error('Пожалуйста, напишите отзыв');
      return;
    }
    
    if (text.trim().length < 10) {
      toast.error('Отзыв должен содержать минимум 10 символов');
      return;
    }
    
    setIsSubmitting(true);
    
    // Имитируем отправку
    setTimeout(() => {
      onSubmit({
        author: author.trim(),
        rating,
        text: text.trim(),
      });
      
      // Сброс формы
      setAuthor('');
      setRating(5);
      setText('');
      setIsSubmitting(false);
      
      toast.success('Спасибо за ваш отзыв!');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-soft">
      <h3 className="font-display text-2xl text-amarin-brown mb-6">
        {productName ? `Оставить отзыв о «${productName}»` : 'Оставить отзыв'}
      </h3>
      
      <div className="space-y-4">
        {/* Имя */}
        <div>
          <label className="block text-sm font-medium text-amarin-brown mb-2">
            Ваше имя
          </label>
          <Input
            type="text"
            placeholder="Как вас зовут?"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="rounded-full border-amarin-brown/20"
            maxLength={50}
          />
        </div>
        
        {/* Рейтинг */}
        <div>
          <label className="block text-sm font-medium text-amarin-brown mb-2">
            Ваша оценка
          </label>
          <div className="flex items-center gap-3">
            <StarRating 
              rating={rating} 
              size="lg" 
              interactive 
              onRatingChange={setRating}
            />
            <span className="text-sm text-amarin-gray">
              {rating === 5 ? 'Отлично!' : 
               rating === 4 ? 'Хорошо' :
               rating === 3 ? 'Нормально' :
               rating === 2 ? 'Плохо' : 'Ужасно'}
            </span>
          </div>
        </div>
        
        {/* Текст отзыва */}
        <div>
          <label className="block text-sm font-medium text-amarin-brown mb-2">
            Ваш отзыв
          </label>
          <Textarea
            placeholder="Расскажите о вашем опыте..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="rounded-xl border-amarin-brown/20 min-h-[120px] resize-none"
            maxLength={500}
          />
          <div className="text-right text-xs text-amarin-gray mt-1">
            {text.length}/500
          </div>
        </div>
        
        {/* Кнопка отправки */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amarin-pink to-amarin-peach hover:from-amarin-pink/90 hover:to-amarin-peach/90 text-amarin-brown font-semibold rounded-full py-6"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
        </Button>
      </div>
    </form>
  );
}
