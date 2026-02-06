import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/seo/SEO';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Заказ оформлен"
        description="Ваш заказ успешно оформлен. Спасибо за покупку в Amarine!"
      />

      <div className="min-h-screen bg-amarin-cream pt-24 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
              <Check className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-amarin-brown mb-4">
              Заказ оформлен!
            </h1>
            
            <p className="text-amarin-gray mb-6">
              Спасибо за покупку! Мы отправили подтверждение на ваш email.
            </p>

            {/* Order Number */}
            <div className="bg-amarin-cream rounded-xl p-4 mb-8">
              <p className="text-sm text-amarin-gray mb-1">Номер заказа</p>
              <p className="font-display text-2xl text-amarin-brown">
                #{orderNumber}
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amarin-terracotta mt-0.5" />
                <div>
                  <p className="font-medium text-amarin-brown">Проверьте email</p>
                  <p className="text-sm text-amarin-gray">
                    Мы отправили схемы на указанный адрес
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-amarin-gold mt-0.5" />
                <div>
                  <p className="font-medium text-amarin-brown">Мгновенная доставка</p>
                  <p className="text-sm text-amarin-gray">
                    Электронные схемы доступны сразу после оплаты
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/#schemes')}
                className="w-full bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown rounded-full py-6"
              >
                Продолжить покупки
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full rounded-full"
              >
                На главную
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
