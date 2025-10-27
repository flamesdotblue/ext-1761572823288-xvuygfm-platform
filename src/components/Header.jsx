import React from 'react';
import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-b from-zinc-900/60 to-transparent backdrop-blur sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-300">
          <Rocket className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white">WinGo 1-Minute Predictor</h1>
          <p className="text-xs text-zinc-400">Auto-generates Big/Small, Color, and 3 winning numbers every minute (Asia/Kolkata)</p>
        </div>
      </div>
    </header>
  );
}
