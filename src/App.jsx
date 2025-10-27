import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Clock from './components/Clock';
import Prediction from './components/Prediction';
import History from './components/History';
import { getISTParts, predictForMinute } from './utils/predict';

export default function App() {
  const [currentParts, setCurrentParts] = useState(getISTParts());
  const [prediction, setPrediction] = useState(() => predictForMinute(getISTParts()));
  const [history, setHistory] = useState([]);

  // Update clock parts every second
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentParts(getISTParts());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Watch for minute changes in IST and regenerate prediction
  const minuteKey = useMemo(() => `${currentParts.year}${String(currentParts.month).padStart(2, '0')}${String(currentParts.day).padStart(2, '0')}${String(currentParts.hour).padStart(2, '0')}${String(currentParts.minute).padStart(2, '0')}`, [currentParts]);

  useEffect(() => {
    // If the minute key changed, push previous prediction to history and create new one
    setPrediction((prev) => {
      if (!prev || prev.minuteKey !== minuteKey) {
        if (prev && prev.minuteKey) {
          setHistory((h) => {
            const next = [prev, ...h];
            return next.slice(0, 20); // keep last 20
          });
        }
        return predictForMinute(currentParts);
      }
      return prev;
    });
  }, [minuteKey, currentParts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-900 text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Clock />
          <div className="text-xs text-zinc-500">0-4 Small • 5-9 Big • Even Red • Odd Green</div>
        </div>

        <Prediction prediction={prediction} />

        <section className="w-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-white">Recent Minutes</h3>
            <div className="text-xs text-zinc-500">Session history</div>
          </div>
          <History items={history} />
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-zinc-500">
        Predictions are generated deterministically per minute using local time in Asia/Kolkata and refresh automatically at each new minute.
      </footer>
    </div>
  );
}
