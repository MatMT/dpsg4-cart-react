"use client";

import { useState } from "react";

import { books } from "../data/data";
import { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

import "../styles/product-grid.css";

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="product-grid">
        {books.map((book) => (
          <ProductCard
            key={book.id}
            product={book}
            onOpenModal={setSelectedProduct}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
