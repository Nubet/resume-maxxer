'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export const Meteors = ({ number, className }: { number?: number; className?: string }) => {
  const [styles, setStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const count = number || 20;
    const newStyles = new Array(count).fill(true).map(() => ({
      top: Math.floor(Math.random() * 100) + '%',
      left: Math.floor(Math.random() * 120) - 10 + '%',
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStyles(newStyles);
  }, [number]);

  if (styles.length === 0) {
    return null;
  }

  return (
    <>
      {styles.map((style, idx) => (
        <span
          key={'meteor' + idx}
          className={cn(
            'animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-215',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:translate-y-[-50%] before:w-12.5 before:h-px before:bg-linear-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={style}
        ></span>
      ))}
    </>
  );
};
