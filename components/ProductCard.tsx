"use client";

import { useEffect, useRef } from "react";
import { ProductVariant } from "@/data/product";
import {
  animateProductEntrance,
  animateProductTransition,
  animatePriceUpdate,
} from "@/lib/animations";
import { Sneaker3D } from "./Sneaker3D";

interface ProductCardProps {
  variant: ProductVariant;
  basePrice: number;
  productName: string;
  category: string;
}

export function ProductCard({
  variant,
  basePrice,
  productName,
  category,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const previousVariantId = useRef<string>(variant.id);

  useEffect(() => {
    if (cardRef.current) {
      animateProductEntrance(cardRef.current);
    }
  }, []);

  useEffect(() => {
    if (previousVariantId.current !== variant.id) {
      if (productRef.current) {
        animateProductTransition(productRef.current);
      }
      if (priceRef.current) {
        animatePriceUpdate(priceRef.current);
      }
      previousVariantId.current = variant.id;
    }
  }, [variant.id]);

  return (
    <div
      ref={cardRef}
      className="relative flex w-full flex-col items-center justify-center px-4 py-4"
    >
      <div
        ref={productRef}
        className="relative mb-6 mt-12 h-[320px] w-full max-w-[400px] rounded-3xl transition-all duration-700 z-10"
        style={{
          background: `radial-gradient(circle at center, ${variant.colorHex}12, transparent 70%)`,
          boxShadow: `0 30px 80px -15px ${variant.colorHex}25`,
        }}
      >
        <Sneaker3D accentColor={variant.accentColor} />
        <div
          className="absolute inset-0 rounded-3xl transition-colors duration-700 pointer-events-none"
          style={{
            border: `1px solid ${variant.accentColor}12`,
          }}
        />
      </div>

      <div className="text-center relative z-20">
        <p className="mb-1 text-xs font-light uppercase tracking-widest text-neutral-400">
          {category}
        </p>
        <h1 className="mb-1 text-2xl font-light tracking-tight text-white">
          {productName}
        </h1>
        <p
          className="mb-3 text-base font-light transition-colors duration-500"
          style={{ color: variant.accentColor }}
        >
          {variant.name}
        </p>
        <p className="mb-4 max-w-md text-xs font-light leading-relaxed text-neutral-400">
          {variant.description}
        </p>
        <div
          ref={priceRef}
          className="text-xl font-light tracking-tight text-white"
        >
          ${basePrice.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
