import { useState, useEffect } from 'react';

export function useCountUp(end: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);
  return count;
}
