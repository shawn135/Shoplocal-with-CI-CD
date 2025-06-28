import ProductCard from '@/components/ProductCard';
import products from '@/data/products.json';
import Link from 'next/link';
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';


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
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4 space-y-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {product.name}
          </h2>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-md">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
