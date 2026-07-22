"use client";

import { Product } from "../types/Product";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export default function ProductCard({ product, onOpenModal }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <button type="button" onClick={() => onOpenModal(product)}>
        <img src={product.image} alt={product.title} />
      </button>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <p className="product-price">${product.price}</p>

        <button
          className="add-button"
          onClick={() => dispatch(addToCart(product))}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
