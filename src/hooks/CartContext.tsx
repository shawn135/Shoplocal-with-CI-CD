import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  saveOrder: () => void;
  isReady: boolean;
};



const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    try {
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to parse cart from localStorage:", err);
      localStorage.removeItem('cart');
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isReady]);

const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);

    if (existingItem) {
      // If item exists, increase its quantity
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      );
    } else {
      // Add new item with passed quantity (default to 1 if missing)
      return [...prevCart, { ...product, quantity: product.quantity || 1 }];
    }
  });
};


  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const saveOrder = () => {
  const previousOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const newOrder = {
    id: Date.now(),
    items: cart,
    date: new Date().toISOString(),
  };
  localStorage.setItem('orders', JSON.stringify([...previousOrders, newOrder]));

  console.log('✅ Order saved:', newOrder);
};


  // ⬇️ This is the exact line you asked about
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isReady, saveOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
