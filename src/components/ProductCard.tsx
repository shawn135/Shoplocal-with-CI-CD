import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {product.name}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-bold text-md">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}