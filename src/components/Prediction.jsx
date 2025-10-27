import React from 'react';

function Pill({ children, color }) {
  const colorMap = {
    Red: 'bg-red-500/15 text-red-300 border-red-400/30',
    Green: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    Default: 'bg-zinc-700/30 text-zinc-200 border-zinc-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border ${colorMap[color] || colorMap.Default}`}>{children}</span>
  );
}

function NumberCard({ item, index }) {
  const { n, bigSmall, color } = item;
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5">
      <div className="text-xs text-zinc-400">#{index + 1}</div>
      <div className="text-3xl font-bold tabular-nums text-white">{n}</div>
      <div className="flex items-center gap-2">
        <Pill color={color}>{color}</Pill>
        <Pill color="Default">{bigSmall}</Pill>
      </div>
    </div>
  );
}

export default function Prediction({ prediction }) {
  if (!prediction) return null;
  const { minuteLabel, primary, numbers } = prediction;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-white">Current Prediction</h2>
        <div className="text-xs text-zinc-400">Minute: {minuteLabel} IST</div>
      </div>

      <div className="rounded-2xl border border-white/10 p-4 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="text-sm text-zinc-400">Primary Outcome</div>
            <div className="flex items-center gap-3 mt-1">
              <div className="text-4xl font-extrabold tabular-nums text-white">{primary.n}</div>
              <div className="flex items-center gap-2">
                <Pill color={primary.color}>{primary.color}</Pill>
                <Pill color="Default">{primary.bigSmall}</Pill>
              </div>
            </div>
          </div>
          <div className="text-sm text-zinc-300">WinGo 1 minute • Auto-updates every new minute</div>
        </div>

        <div>
          <div className="text-sm text-zinc-400 mb-2">3 Winning Numbers</div>
          <div className="grid grid-cols-3 gap-3">
            {numbers.map((item, idx) => (
              <NumberCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
