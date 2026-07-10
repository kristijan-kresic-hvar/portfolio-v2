import type { Transition } from 'framer-motion';

// Shared Framer Motion spring presets (design-system §6). Import these in React
// islands instead of re-declaring stiffness/damping per component. Reduced-motion
// is handled per-island via Motion's `useReducedMotion`; Lenis smooth-scroll gets
// disabled under `prefers-reduced-motion: reduce` when it's wired in Phase 8.
export const gentle = { type: 'spring', stiffness: 100, damping: 20 } as const satisfies Transition;
export const snappy = { type: 'spring', stiffness: 300, damping: 30 } as const satisfies Transition;
export const bouncy = { type: 'spring', stiffness: 400, damping: 17 } as const satisfies Transition;
