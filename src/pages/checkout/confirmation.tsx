import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setLastOrder(parsed[parsed.length - 1]);
      }
    }
  }, []);

  const orderTotal = lastOrder?.items?.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-center space-y-8 font-sans text-gray-900 dark:text-gray-100">
      <div className="text-green-500 text-6xl">✅</div>
      <h1 className="text-3xl sm:text-4xl font-bold">Thank you for your order!</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Your order has been successfully placed and is being processed.
      </p>

      {lastOrder && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left space-y-4 shadow-sm">
          <h2 className="text-lg font-semibold">🧾 Order Summary</h2>
          <ul className="text-sm space-y-2">
            {lastOrder.items.map((item: any) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <hr className="border-gray-300 dark:border-gray-600" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${orderTotal?.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4 pt-4">
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          🏠 Back to Home
        </Link>
        <Link
          href="/orders"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
        >
          📜 View Orders
        </Link>
      </div>
    </main>
  );
}
