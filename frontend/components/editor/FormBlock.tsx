'use client';

import React from 'react';

interface FormBlockProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormBlock: React.FC<FormBlockProps> = ({ eyebrow, title, description, children }) => {
  return (
    <section className="rounded-[1.75rem] border border-border bg-surface-secondary p-5 shadow-xs sm:p-6">
      <div className="mb-5 space-y-1.5">
        {eyebrow && (
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-content-muted">
            {eyebrow}
          </div>
        )}
        <h3 className="text-base font-black tracking-tight text-content">{title}</h3>
        {description && (
          <p className="text-xs font-medium leading-relaxed text-content-secondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
};
