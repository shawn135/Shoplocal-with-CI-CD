import Link from 'next/link';
import { useEffect, useState } from 'react';

type Order = {
  id: number;
  date: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      }
    } catch (err) {
      console.error('Error loading orders:', err);
    }
  };

  useEffect(() => {
    loadOrders();

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadOrders();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">🧾 Past Orders</h1>
        <Link
          href="/"
          className="text-blue-600 hover:underline dark:text-blue-400 text-sm"
        >
          ← Back to Home
        </Link>
      </header>

      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 italic">You haven’t placed any orders yet.</p>
      ) : (
        <section className="space-y-6">
          {orders.slice().reverse().map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm"
            >
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
                Order on {new Date(order.date).toLocaleString()}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} — ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
