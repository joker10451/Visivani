import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import type { Product, CartItem } from '@/types';

interface ShopContextType {
  cart: CartItem[];
  favorites: string[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
  isInFavorites: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'amarine_cart';
const FAVORITES_STORAGE_KEY = 'amarine_favorites';

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Ref для отслеживания toast-уведомлений и предотвращения дублирования
  const toastTimeouts = useRef<Map<string, number>>(new Map());

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const addToCart = useCallback((product: Product) => {
    const toastKey = `cart-${product.id}`;
    
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      
      // Проверяем, не показывали ли мы недавно toast для этого товара
      const lastToastTime = toastTimeouts.current.get(toastKey);
      const now = Date.now();
      
      if (!lastToastTime || now - lastToastTime > 2000) {
        // Показываем toast только если прошло больше 2 секунд с последнего
        toastTimeouts.current.set(toastKey, now);
        
        if (existingItem) {
          toast.success(`Добавлено ещё одно: ${product.name}`, {
            description: `В корзине: ${existingItem.quantity + 1} шт.`,
          });
        } else {
          toast.success(`Добавлено в корзину: ${product.name}`, {
            description: 'Нажмите на корзину, чтобы оформить заказ',
            action: {
              label: 'Открыть корзину',
              onClick: () => setIsCartOpen(true),
            },
          });
        }
      }
      
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const toastKey = `remove-${productId}`;
    
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      
      // Проверяем, не показывали ли мы недавно toast
      const lastToastTime = toastTimeouts.current.get(toastKey);
      const now = Date.now();
      
      if (item && (!lastToastTime || now - lastToastTime > 2000)) {
        toastTimeouts.current.set(toastKey, now);
        toast.info(`Удалено из корзины: ${item.product.name}`);
      }
      
      return prev.filter((item) => item.product.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.info('Корзина очищена');
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    const toastKey = `fav-${product.id}`;
    
    setFavorites((prev) => {
      const isFavorite = prev.includes(product.id);
      
      // Проверяем, не показывали ли мы недавно toast для этого товара
      const lastToastTime = toastTimeouts.current.get(toastKey);
      const now = Date.now();
      
      if (!lastToastTime || now - lastToastTime > 2000) {
        // Показываем toast только если прошло больше 2 секунд с последнего
        toastTimeouts.current.set(toastKey, now);
        
        if (isFavorite) {
          toast.info(`Удалено из избранного: ${product.name}`);
        } else {
          toast.success(`Добавлено в избранное: ${product.name}`);
        }
      }
      
      if (isFavorite) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  }, []);

  const isInFavorites = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isInFavorites,
        cartTotal,
        cartCount,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
