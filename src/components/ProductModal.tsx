"use client";

import { Product } from "../types/Product";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) {
    return null;
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`product-modal-title-${product.id}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose}>
          x
        </button>

        <img className="modal-image" src={product.image} alt={product.title} />

        <div className="modal-body">
          <h3 id={`product-modal-title-${product.id}`}>{product.title}</h3>
          <p className="modal-price">${product.price}</p>
          <p className="modal-quantity">Cantidad disponible: {product.quantity}</p>
        </div>
      </div>
    </div>
  );
}