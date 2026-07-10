import type { Transition } from 'framer-motion';

// Shared Framer Motion spring presets (design-system §6) — import, don't re-declare per island.
export const gentle = { type: 'spring', stiffness: 100, damping: 20 } as const satisfies Transition;
export const snappy = { type: 'spring', stiffness: 300, damping: 30 } as const satisfies Transition;
export const bouncy = { type: 'spring', stiffness: 400, damping: 17 } as const satisfies Transition;
