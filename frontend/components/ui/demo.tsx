import React from 'react';
import { Meteors } from '@/components/ui/meteors';
import { Sparkles, ArrowRight } from 'lucide-react';

export function MeteorsDemo() {
  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="w-full relative max-w-sm">
        <div className="absolute inset-0 h-full w-full bg-linear-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl opacity-60" />

        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-6 py-8 h-full overflow-hidden rounded-3xl flex flex-col justify-end items-start space-y-4">
          <div className="flex items-center justify-between w-full">
            <div className="h-10 w-10 rounded-full border border-gray-700 bg-gray-800/80 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-amber-400" />
            </div>
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop"
              alt="AI Abstract Texture"
              className="h-10 w-10 rounded-full object-cover border border-gray-700 opacity-80"
            />
          </div>

          <h1 className="font-bold text-xl text-white relative z-50">
            Meteors because they&apos;re cool
          </h1>

          <p className="font-normal text-sm text-slate-400 relative z-50 leading-relaxed">
            I don&apos;t know what to write so I&apos;ll just paste something cool here. One more
            sentence because lorem ipsum is just unacceptable. Won&apos;t ChatGPT the shit out of
            this.
          </p>

          <button className="inline-flex items-center gap-2 border px-5 py-2 rounded-xl border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-xs font-bold text-gray-200 transition-all relative z-50 group">
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
