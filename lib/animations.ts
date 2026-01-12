/**
 * GSAP Animation utilities
 * 
 * Motion design principles:
 * - Use transform and opacity for performance (GPU-accelerated)
 * - Easing: Power3 for natural, premium feel
 * - Duration: 0.6-0.8s for primary transitions (feels considered, not rushed)
 * - Stagger: 0.1s for sequential reveals (rhythm without delay)
 * 
 * Why these choices:
 * - Luxury brands move slowly and deliberately
 * - Fast animations feel cheap; too slow feels sluggish
 * - Power3 easing mimics natural motion (acceleration/deceleration)
 */

import { gsap } from "gsap";

/**
 * Check if user prefers reduced motion
 * Respect accessibility preferences
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get animation duration based on user preference
 * Returns minimal duration if reduced motion is preferred
 */
export const getAnimationDuration = (defaultDuration: number): number => {
  return prefersReducedMotion() ? 0.01 : defaultDuration;
};

/**
 * Product card entrance animation
 * Fade + slight upward movement creates a "lifting" effect
 */
export const animateProductEntrance = (element: HTMLElement) => {
  const duration = getAnimationDuration(0.8);
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: "power3.out",
    }
  );
};

/**
 * Product variant transition
 * Cross-fade with subtle scale creates depth
 * 
 * Why scale down then up:
 * - Simulates a "focus shift" in physical space
 * - Adds dimensionality without being distracting
 */
export const animateProductTransition = (element: HTMLElement) => {
  const duration = getAnimationDuration(0.7);
  
  const timeline = gsap.timeline();
  
  timeline
    .to(element, {
      opacity: 0,
      scale: 0.95,
      duration: duration * 0.4,
      ease: "power3.in",
    })
    .set(element, {
      // Prepare for next variant
    })
    .to(element, {
      opacity: 1,
      scale: 1,
      duration: duration * 0.6,
      ease: "power3.out",
    });
  
  return timeline;
};

/**
 * Variant selector stagger animation
 * Sequential reveal creates rhythm and hierarchy
 */
export const animateVariantSelectorEntrance = (elements: HTMLElement[]) => {
  const duration = getAnimationDuration(0.6);
  const stagger = getAnimationDuration(0.08);
  
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 10,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
    }
  );
};

/**
 * Button hover scale
 * Micro-interaction for tactile feedback
 * 
 * Why subtle scale:
 * - Confirms interactivity without being jarring
 * - 1.05 is noticeable but refined
 */
export const animateButtonHover = (element: HTMLElement, isHover: boolean) => {
  const duration = getAnimationDuration(0.3);
  
  gsap.to(element, {
    scale: isHover ? 1.05 : 1,
    duration,
    ease: "power2.out",
  });
};

/**
 * Price update animation
 * Subtle fade draws attention to changed value
 */
export const animatePriceUpdate = (element: HTMLElement) => {
  const duration = getAnimationDuration(0.4);
  
  const timeline = gsap.timeline();
  
  timeline
    .to(element, {
      opacity: 0.3,
      duration: duration * 0.5,
      ease: "power2.in",
    })
    .to(element, {
      opacity: 1,
      duration: duration * 0.5,
      ease: "power2.out",
    });
  
  return timeline;
};

/**
 * Loading state animation
 * Infinite pulse for loading indicator
 */
export const animateLoading = (element: HTMLElement) => {
  const duration = getAnimationDuration(1.5);
  
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 0.5 });
    return;
  }
  
  gsap.to(element, {
    opacity: 0.3,
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
};
