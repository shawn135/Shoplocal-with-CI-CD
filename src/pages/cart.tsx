import { useCart } from '../hooks/CartContext';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '@/components/Button'; // ✅ Reusable Button
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, saveOrder } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    saveOrder();
    clearCart();
    router.push('/checkout/confirmation');
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center mt-12 space-y-6">
          <p className="text-2xl text-gray-600 dark:text-gray-300">🛒 Your cart is empty.</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
              🏠 Go Home
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 border shadow-sm rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`/images/${item.id === '1' ? 'headphones.jpg' : 'mug.jpg'}`}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded border"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:underline px-2 py-1 bg-transparent"
                >
                  ❌ Remove
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-between items-center border-t pt-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Total: ${total.toFixed(2)}
            </h3>
            <div className="flex gap-3">
              <Button
                onClick={clearCart}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm"
              >
                🧹 Clear Cart
              </Button>
              <Button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                ✅ Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
