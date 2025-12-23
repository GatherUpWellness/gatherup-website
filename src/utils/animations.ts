import { Variants, Transition } from 'framer-motion';

// Common transition presets
export const transitions = {
  gentle: {
    duration: 0.75, // Slowed from 0.5s
    ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number], // easeOut
  },
  smooth: {
    duration: 0.6, // Slowed from 0.4s
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // easeOutQuad
  },
  quick: {
    duration: 0.45, // Slowed from 0.3s
    ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number], // easeOut
  },
  bouncy: {
    duration: 0.9, // Slowed from 0.6s
    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // easeOutBack
  },
} as const;

// Page load animations
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.gentle,
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

// Stagger container for children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Image loading animations
export const imageLoad: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...transitions.gentle,
      duration: 0.9, // Slowed from 0.6s
    },
  },
};

// Scale on hover (for interactive elements)
export const scaleOnHover = {
  scale: 1.05,
  transition: transitions.quick,
};

export const scaleOnTap = {
  scale: 0.98,
  transition: transitions.quick,
};

// Slide right (for arrow icons, etc.)
export const slideRight = {
  x: 4,
  transition: transitions.quick,
};

// Expand/collapse variants for text
export const expandCollapse: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: transitions.smooth,
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: transitions.smooth,
  },
};

// Scroll reveal variants (use with useInView)
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.gentle,
      duration: 0.75, // Slowed from 0.5s
    },
  },
};

// Subtle fade in for page load
export const pageLoad: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6, // Slowed from 0.4s
      delay: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

// Flip card transition configuration
export const flipCardTransition: Transition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
};

// Flip card container style
export const flipCardContainerStyle = {
  transformStyle: 'preserve-3d' as const,
};

// Flip card backface style
export const flipCardBackfaceStyle = {
  backfaceVisibility: 'hidden' as const,
};

// Flip card perspective style
export const flipCardPerspectiveStyle = {
  perspective: '1000px',
};

// Down arrow bounce animation (for negative indicators)
export const downArrowBounce: Variants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: 3, // Repeat once (4 cycles total = 6 seconds)
      ease: [0.4, 0.0, 0.6, 1] as [number, number, number, number],
    },
  },
};

// Up arrow bounce animation (for positive indicators)
export const upArrowBounce: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: 3, // Repeat once (4 cycles total = 6 seconds)
      ease: [0.4, 0.0, 0.6, 1] as [number, number, number, number],
    },
  },
};
