import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import products from '@/data/products.json';
import { useCart } from '@/hooks/CartContext';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const found = products.find((item) => item.id === id);
      setProduct(found || null);
    }
  }, [id]);

  if (!id || !product) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center text-gray-500 dark:text-gray-300">Loading product...</div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{product.name}</h1>

      <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded object-cover"
        />

        <div className="flex-1 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
            ${product.price.toFixed(2)}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <label htmlFor="quantity" className="text-sm text-gray-600 dark:text-gray-400">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 border rounded text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity,
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            🛒 Add {quantity} to Cart
          </button>

          {/* Go Back Button in Box */}
          <div className="mt-6">
            <button
              onClick={() => router.back()}
              className="border border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-2"
            >
              ⬅️ Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
