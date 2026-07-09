'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Search, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { TEMPLATE_FAMILIES } from '@/lib/templates';

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const { templateId, setTemplateId } = useResume();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Wszystkie' },
    { id: 'classic', label: 'Klasyczne' },
    { id: 'modern', label: 'Nowoczesne' },
    { id: 'tech', label: 'IT & Inżynieria' },
    { id: 'exec', label: 'Management' },
  ];

  const templates = TEMPLATE_FAMILIES;

  const filteredTemplates = templates.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelect = (id: string, available: boolean) => {
    if (!available) {
      alert('Ten szablon będzie dostępny w nadchodzącej aktualizacji biblioteki!');
      return;
    }
    setTemplateId(id);
    onSelectTemplate(id);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-surface text-content animate-fade-in font-sans relative selection:bg-content selection:text-surface">
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-surface-secondary/80 to-transparent pointer-events-none -z-10" />

      <div className="pt-24 pb-16 px-6 sm:px-12 lg:px-20 mx-auto max-w-[1400px]">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-content leading-tight">
            Galeria Szablonów
          </h1>
          <p className="text-lg text-content-secondary max-w-xl font-medium leading-relaxed">
            Wybierz układ, który najlepiej pasuje do Twojej profesji. Wszystkie szablony są
            zaprojektowane tak, aby ułatwić czytanie i wyeksponować Twoje kompetencje.
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-surface/80 backdrop-blur-2xl border-b border-border/40 transition-all">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-20 py-4 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex gap-8 overflow-x-auto w-full md:w-auto no-scrollbar mask-linear-fade">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative pb-2 whitespace-nowrap text-sm font-bold tracking-wide transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'text-content'
                    : 'text-content-muted hover:text-content-secondary'
                }`}
              >
                {cat.label}
                {selectedCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-content rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          <div className="relative group w-full md:w-72">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-content-muted group-focus-within:text-content transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Wyszukaj po nazwie lub tagu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-secondary/50 border border-transparent group-hover:bg-surface-secondary group-focus-within:bg-surface focus:border-border rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-content/5 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {filteredTemplates.map((tpl) => {
            const selectedVariant = tpl.variants.find((variant) => variant.id === templateId) ?? null;
            const isSelected = Boolean(selectedVariant);

            return (
              <div
                  key={tpl.id}
                  className={`group flex flex-col cursor-pointer`}
                >
                <div
                  className={`relative w-full aspect-[1/1.414] mb-6 rounded-2xl flex items-center justify-center p-6 sm:p-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                  ${isSelected ? 'bg-surface-secondary/80 border border-border/50 shadow-inner' : 'bg-surface-secondary/30 group-hover:bg-surface-secondary/60'}
                `}
                >
                  <div
                    className={`relative w-full h-full bg-white rounded-lg shadow-xl shadow-black/5 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] transform-gpu
                    ${!tpl.available && 'opacity-60 grayscale-[0.8]'}
                    ${tpl.available && !isSelected && 'group-hover:-translate-y-4 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-black/15 group-hover:rotate-1'}
                    ${isSelected && 'shadow-2xl shadow-black/10 scale-105 ring-1 ring-content/10'}
                  `}
                  >
                    <img
                      src={tpl.image}
                      alt={`Podgląd ${tpl.name}`}
                      className="w-full h-full object-cover object-top origin-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {tpl.available && !isSelected && (
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <div className="flex items-center justify-between text-white">
                            <span className="font-bold text-lg tracking-tight">Wybierz układ i język</span>
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {!tpl.available && (
                      <div className="absolute inset-0 bg-surface/20 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-surface/90 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold tracking-wide text-content shadow-xl border border-white/10">
                          <Lock className="w-4 h-4" />
                          <span>Wkrótce</span>
                        </div>
                      </div>
                    )}
                  </div>

                    {isSelected && (
                      <div className="absolute -top-3 -right-3 bg-content text-surface rounded-full p-2.5 shadow-xl z-10 animate-fade-in">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="px-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-content-muted mb-3 flex items-center gap-2">
                    {tpl.author}
                    {isSelected && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-content-muted" />
                        <span className="text-content">{selectedVariant?.language === 'pl' ? 'Aktywny PL' : 'Aktywny EN'}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-2xl font-black tracking-tight text-content mb-3 group-hover:text-content-secondary transition-colors duration-300">
                    {tpl.name}
                  </h3>

                  <p className="text-sm text-content-secondary font-medium leading-relaxed mb-5 line-clamp-2">
                    {tpl.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {tpl.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold text-content-muted bg-surface-secondary/60 border border-border/40 px-3 py-1 rounded-lg group-hover:border-border/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2">
                    {tpl.variants.map((variant) => {
                      const variantSelected = templateId === variant.id;

                      return (
                        <button
                          key={variant.id}
                          type="button"
                          disabled={!tpl.available}
                          onClick={() => handleSelect(variant.id, tpl.available)}
                          className={`rounded-full border px-3 py-2 text-xs font-black transition-all ${
                            variantSelected
                              ? 'border-content bg-content text-content-inverse'
                              : 'border-border bg-surface-secondary text-content hover:border-content'
                          } ${!tpl.available ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                          {variant.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="py-32 text-center flex flex-col items-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-surface-secondary flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-content-muted" />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-content mb-2">
              Nic nie znaleziono
            </h3>
            <p className="text-content-secondary font-medium">
              Spróbuj wpisać inne zapytanie lub wybierz inną kategorię.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
