import { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    }
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    }
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
    }
  },
};
