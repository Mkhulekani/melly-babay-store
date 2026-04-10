/**
 * useToast.js
 * ─────────────────────────────────────────────────
 * A simple hook that manages a temporary toast notification.
 *
 * Usage:
 *   const { toast, showToast } = useToast();
 *   showToast('Item added to cart! 🛒');
 *   // toast is null when hidden, or a string message when visible
 */

import { useState, useCallback } from 'react';

const DEFAULT_DURATION_MS = 2600;

export function useToast(duration = DEFAULT_DURATION_MS) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message) => {
      setToast(message);
      setTimeout(() => setToast(null), duration);
    },
    [duration]
  );

  return { toast, showToast };
}
