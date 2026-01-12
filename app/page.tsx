"use client";

import { useState } from "react";
import { product } from "@/data/product";
import { ProductCard } from "@/components/ProductCard";
import { VariantSelector } from "@/components/VariantSelector";

export default function Home() {
  const [activeVariantId, setActiveVariantId] = useState(
    product.variants[0].id
  );

  const activeVariant =
    product.variants.find((v) => v.id === activeVariantId) ||
    product.variants[0];

  return (
    <main className="relative h-screen overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${activeVariant.colorHex}30, transparent 60%)`,
        }}
      />
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto flex h-screen w-full flex-col items-center justify-center gap-6 px-8 py-6">
        <ProductCard
          variant={activeVariant}
          basePrice={product.basePrice}
          productName={product.name}
          category={product.category}
        />
        <VariantSelector
          variants={product.variants}
          activeVariantId={activeVariantId}
          onVariantChange={setActiveVariantId}
        />
        <footer className="mt-auto text-center">
          <p className="text-[10px] font-light tracking-widest text-neutral-600">
            PREMIUM PERFORMANCE COLLECTION
          </p>
        </footer>
      </div>
    </main>
  );
}
