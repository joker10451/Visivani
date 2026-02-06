import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CreditCard, Check, Shield, MapPin, User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import SEO from '@/components/seo/SEO';
import { useShop } from '@/contexts/ShopContext';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useShop();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card',
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-amarin-cream pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-amarin-brown mb-4">
            Корзина пуста
          </h1>
          <p className="text-amarin-gray mb-6">
            Добавьте товары, чтобы оформить заказ
          </p>
          <Button 
            onClick={() => navigate('/#schemes')}
            className="bg-amarin-pink text-amarin-brown"
          >
            Перейти в каталог
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Пожалуйста, заполните обязательные поля');
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Заказ успешно оформлен!', {
      description: `Номер заказа: #${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      duration: 5000,
    });

    clearCart();
    navigate('/order-success');
  };

  return (
    <>
      <SEO
        title="Оформление заказа"
        description="Оформите заказ на схемы для вышивки от Amarine. Быстрая доставка и удобная оплата."
        keywords="оформление заказа, купить схему, вышивка крестиком"
      />

      <div className="min-h-screen bg-amarin-cream pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumbs
            items={[
              { name: 'Главная', href: '/' },
              { name: 'Корзина', href: '#' },
              { name: 'Оформление', href: '#' },
            ]}
          />

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-amarin-gray hover:text-amarin-brown mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>

          <h1 className="font-display text-4xl text-amarin-brown mb-8">
            Оформление заказа
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="font-display text-xl text-amarin-brown mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-amarin-terracotta" />
                    Контактная информация
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя и фамилия *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ivan@example.com"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (999) 999-99-99"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="font-display text-xl text-amarin-brown mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amarin-terracotta" />
                    Доставка
                  </h2>
                  <div className="p-4 bg-amarin-cream rounded-xl">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amarin-brown">Электронная доставка</p>
                        <p className="text-sm text-amarin-gray">
                          Схемы будут отправлены на ваш email сразу после оплаты
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="font-display text-xl text-amarin-brown mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amarin-terracotta" />
                    Способ оплаты
                  </h2>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 border border-amarin-brown/10 rounded-xl cursor-pointer hover:bg-amarin-cream/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-amarin-brown" />
                          <div>
                            <p className="font-medium text-amarin-brown">Банковская карта</p>
                            <p className="text-sm text-amarin-gray">Visa, Mastercard, МИР</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-amarin-brown/10 rounded-xl cursor-pointer hover:bg-amarin-cream/50 transition-colors">
                      <RadioGroupItem value="sbp" id="sbp" />
                      <Label htmlFor="sbp" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                            СБП
                          </div>
                          <div>
                            <p className="font-medium text-amarin-brown">Система быстрых платежей</p>
                            <p className="text-sm text-amarin-gray">Через мобильное приложение банка</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown font-semibold rounded-full py-6"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-amarin-brown/30 border-t-amarin-brown rounded-full animate-spin" />
                      Оформляем...
                    </span>
                  ) : (
                    `Оплатить ${cartTotal} ₽`
                  )}
                </Button>

                {/* Security */}
                <div className="flex items-center justify-center gap-2 text-sm text-amarin-gray">
                  <Shield className="w-4 h-4" />
                  <span>Ваши данные защищены SSL-шифрованием</span>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="font-display text-xl text-amarin-brown mb-4">
                  Ваш заказ
                </h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-amarin-brown text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-amarin-gray text-xs">
                          {item.quantity} шт.
                        </p>
                        <p className="text-amarin-terracotta font-semibold text-sm">
                          {item.product.price * item.quantity} ₽
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-amarin-brown/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-amarin-gray">Товары</span>
                    <span className="text-amarin-brown">{cartTotal} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amarin-gray">Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                  <div className="flex justify-between font-display text-xl pt-2">
                    <span className="text-amarin-brown">Итого</span>
                    <span className="text-amarin-terracotta">{cartTotal} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
