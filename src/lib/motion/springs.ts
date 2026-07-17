// Shared Motion spring presets (design-system §6) — pass as the transition options of an
// `animate()` call (vanilla `motion` package). Import, don't re-declare per component.
export const gentle = { type: 'spring', stiffness: 100, damping: 20 } as const;
export const snappy = { type: 'spring', stiffness: 300, damping: 30 } as const;
export const bouncy = { type: 'spring', stiffness: 400, damping: 17 } as const;
