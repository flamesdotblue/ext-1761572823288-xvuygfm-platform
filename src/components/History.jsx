import React from 'react';

export default function History({ items }) {
  if (!items?.length) return (
    <div className="text-sm text-zinc-500">No history yet. New predictions will appear every minute.</div>
  );

  return (
    <div className="space-y-2">
      {items.map((p) => (
        <div key={p.minuteKey} className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5">
          <div className="sm:col-span-5 text-xs sm:text-sm text-zinc-300">{p.minuteLabel} IST</div>
          <div className="sm:col-span-7 flex items-center gap-3">
            {p.numbers.map((it, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-zinc-700/40 text-white text-xs tabular-nums border border-white/10">{it.n}</span>
                <span className="hidden sm:inline text-xs text-zinc-500">{it.color}/{it.bigSmall}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
