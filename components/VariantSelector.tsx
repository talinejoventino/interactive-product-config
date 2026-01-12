"use client";

import { useEffect, useRef } from "react";
import { ProductVariant } from "@/data/product";
import {
  animateVariantSelectorEntrance,
  animateButtonHover,
} from "@/lib/animations";

interface VariantSelectorProps {
  variants: ProductVariant[];
  activeVariantId: string;
  onVariantChange: (variantId: string) => void;
}

/**
 * VariantSelector component
 * 
 * Design decisions:
 * - Color swatches with text labels (accessibility)
 * - Large touch targets (min 44x44px)
 * - Clear active state with accent border
 * - Keyboard navigation support
 * 
 * Interaction patterns:
 * - Hover: subtle scale (tactile feedback)
 * - Active: border + scale combination
 * - Focus: visible outline for keyboard users
 * 
 * Why horizontal layout:
 * - Easier to scan (left-to-right reading)
 * - Works well on mobile and desktop
 * - Feels like a natural product picker
 */
export function VariantSelector({
  variants,
  activeVariantId,
  onVariantChange,
}: VariantSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const hasAnimated = useRef(false);

  // Entrance animation on mount
  useEffect(() => {
    if (!hasAnimated.current && containerRef.current) {
      const buttons = buttonsRef.current.filter(
        (btn): btn is HTMLButtonElement => btn !== null
      );
      if (buttons.length > 0) {
        animateVariantSelectorEntrance(buttons);
        hasAnimated.current = true;
      }
    }
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % variants.length;
      buttonsRef.current[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + variants.length) % variants.length;
      buttonsRef.current[prevIndex]?.focus();
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <h2 className="mb-6 text-sm font-light uppercase tracking-widest text-neutral-400">
        Select Edition
      </h2>

      <div
        className="flex flex-wrap justify-center gap-3"
        role="radiogroup"
        aria-label="Product variants"
      >
        {variants.map((variant, index) => {
          const isActive = variant.id === activeVariantId;

          return (
            <button
              key={variant.id}
              ref={(el) => {
                buttonsRef.current[index] = el;
              }}
              onClick={() => onVariantChange(variant.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onMouseEnter={(e) =>
                animateButtonHover(e.currentTarget, true)
              }
              onMouseLeave={(e) =>
                animateButtonHover(e.currentTarget, false)
              }
              className="group relative flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              style={{
                backgroundColor: isActive
                  ? `${variant.colorHex}20`
                  : "transparent",
              }}
              role="radio"
              aria-checked={isActive}
              aria-label={`${variant.name}, ${variant.colorName}`}
            >
              {/* Color Swatch */}
              <div className="relative">
                <div
                  className="h-12 w-12 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: variant.colorHex,
                    boxShadow: isActive
                      ? `0 0 0 3px ${variant.accentColor}`
                      : `0 0 0 1px ${variant.colorHex}40`,
                  }}
                />

                {/* Active indicator */}
                {isActive && (
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-full"
                    aria-hidden="true"
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: variant.accentColor,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Color Name */}
              <span
                className="text-xs font-light transition-colors duration-300"
                style={{
                  color: isActive ? variant.accentColor : "#a3a3a3",
                }}
              >
                {variant.colorName}
              </span>

              {/* Hover state background */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundColor: `${variant.colorHex}10`,
                }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
