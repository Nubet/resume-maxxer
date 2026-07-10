'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Trash2 } from 'lucide-react';

interface ListEditorFieldProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  helperText?: string;
  addLabel?: string;
}

const cleanItem = (value: string) => value.replace(/^[•\-*]\s*/, '').trim();

export const ListEditorField: React.FC<ListEditorFieldProps> = ({
  label,
  items,
  onChange,
  placeholder,
  helperText,
  addLabel,
}) => {
  const t = useTranslations('Editor.Shared');
  const visibleItems = items.length > 0 ? items : [''];

  const handleItemChange = (index: number, value: string) => {
    const nextItems = [...items];

    if (index >= nextItems.length) {
      nextItems.push(value);
    } else {
      nextItems[index] = value;
    }

    onChange(nextItems);
  };

  const handleItemBlur = () => {
    onChange(items.map(cleanItem).filter(Boolean));
  };

  const handleAddItem = () => {
    onChange([...items, '']);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleItemKeyDown = (index: number, event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) return;

    event.preventDefault();

    const nextItems = [...items];
    const insertAt = Math.min(index + 1, nextItems.length);
    nextItems.splice(insertAt, 0, '');
    onChange(nextItems);
  };

  const handleItemPaste = (index: number, event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = event.clipboardData.getData('text');
    const pastedItems = pastedText.split(/\r?\n/).map(cleanItem).filter(Boolean);

    if (pastedItems.length < 2) return;

    event.preventDefault();

    const nextItems = [...items];
    const replaceCount = index < nextItems.length ? 1 : 0;
    nextItems.splice(index, replaceCount, ...pastedItems);
    onChange(nextItems);
  };

  return (
    <div className="sm:col-span-2">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-content">{label}</label>
          {helperText ? (
            <p className="text-[11px] leading-relaxed text-content-secondary">{helperText}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-[11px] font-bold text-content transition-colors hover:border-border-strong hover:bg-surface-secondary"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{addLabel || t('addPoint')}</span>
        </button>
      </div>

      <div className="space-y-3">
        {visibleItems.map((item, index) => {
          const canRemove = index < items.length;

          return (
            <div
              key={`${label}-${index}`}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors focus-within:border-content"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-[10px] font-black text-content-secondary">
                {index + 1}
              </span>

              <textarea
                rows={2}
                value={item}
                onChange={(event) => handleItemChange(index, event.target.value)}
                onBlur={handleItemBlur}
                onKeyDown={(event) => handleItemKeyDown(index, event)}
                onPaste={(event) => handleItemPaste(index, event)}
                placeholder={placeholder}
                className="min-h-[72px] flex-1 resize-y border-0 bg-transparent p-0 text-xs font-semibold leading-relaxed text-content placeholder-content-muted focus:outline-none"
              />

              {canRemove ? (
                <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    title={t('removePoint')}
                    className="mt-1 shrink-0 rounded-full p-2 text-content-muted transition-colors hover:bg-surface-secondary hover:text-red-600"
                  >
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
