"use client";

import { useState, useEffect } from 'react';

export type Orientation = 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary' | 'unknown';

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>('unknown');

  useEffect(() => {
    const getOrientation = (): Orientation => {
      if (typeof window === 'undefined' || !window.screen || !window.screen.orientation) {
        if (typeof window !== 'undefined' && window.matchMedia("(orientation: portrait)").matches) {
            return 'portrait-primary';
        }
        if (typeof window !== 'undefined' && window.matchMedia("(orientation: landscape)").matches) {
            return 'landscape-primary';
        }
        return 'unknown';
      }
      return window.screen.orientation.type as Orientation;
    };

    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    handleOrientationChange(); // Set initial orientation

    const screenOrientation = window.screen.orientation;
    if (screenOrientation && 'addEventListener' in screenOrientation) {
      screenOrientation.addEventListener('change', handleOrientationChange);
    } else {
      // Fallback for browsers that don't support the new API
      window.addEventListener('orientationchange', handleOrientationChange);
    }

    return () => {
      if (screenOrientation && 'removeEventListener' in screenOrientation) {
        screenOrientation.removeEventListener('change', handleOrientationChange);
      } else {
        window.removeEventListener('orientationchange', handleOrientationChange);
      }
    };
  }, []);

  return orientation;
}
