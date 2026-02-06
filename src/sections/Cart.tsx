import { Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useShop } from '@/contexts/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    cartCount, 
    clearCart,
    isCartOpen,
    setIsCartOpen
  } = useShop();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Корзина пуста');
      return;
    }
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <button 
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 hover:bg-amarin-pink/20 rounded-full transition-colors"
      >
        <ShoppingBag className="w-5 h-5 text-amarin-brown" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amarin-terracotta text-white text-xs rounded-full flex items-center justify-center animate-scale-in">
            {cartCount}
          </span>
        )}
      </button>
      <SheetContent className="w-full sm:max-w-md bg-white overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-amarin-brown flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Корзина
            {cartCount > 0 && (
              <span className="text-sm font-normal text-amarin-gray">
                ({cartCount} {cartCount === 1 ? 'товар' : cartCount < 5 ? 'товара' : 'товаров'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col min-h-[calc(100vh-180px)]">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-24 h-24 rounded-full bg-amarin-cream flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-amarin-gray" />
              </div>
              <p className="text-amarin-brown font-medium text-lg mb-2">
                Корзина пуста
              </p>
              <p className="text-amarin-gray text-sm mb-6">
                Добавьте схемы, чтобы оформить заказ
              </p>
              <Button 
                onClick={() => setIsCartOpen(false)}
                className="bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown rounded-full"
              >
                Продолжить покупки
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-amarin-cream/50 rounded-2xl animate-fade-in-up"
                  >
                    {/* Image */}
                    <div 
                      className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate(`/product/${item.product.id}`);
                      }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="font-display text-lg text-amarin-brown truncate cursor-pointer hover:text-amarin-terracotta"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate(`/product/${item.product.id}`);
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-amarin-terracotta font-semibold">
                        {item.product.price} ₽
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 bg-white rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-amarin-brown hover:bg-amarin-pink/20 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-amarin-brown font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-amarin-brown hover:bg-amarin-pink/20 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-amarin-gray hover:text-amarin-terracotta transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-amarin-brown/10 pt-4 mt-6 sticky bottom-0 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-amarin-gray">Итого:</span>
                  <span className="font-display text-2xl text-amarin-terracotta">
                    {cartTotal} ₽
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-amarin-pink hover:bg-amarin-pink/90 text-amarin-brown font-semibold rounded-full py-6"
                  >
                    Оформить заказ
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full border-amarin-brown/20 text-amarin-gray hover:bg-amarin-cream rounded-full"
                  >
                    Очистить корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
