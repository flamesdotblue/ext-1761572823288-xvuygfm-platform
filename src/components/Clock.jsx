import React, { useEffect, useState } from 'react';
import { getISTParts } from '../utils/predict';

export default function Clock() {
  const [parts, setParts] = useState(getISTParts());

  useEffect(() => {
    const id = setInterval(() => setParts(getISTParts()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-baseline gap-2">
      <div className="text-sm text-zinc-400">IST</div>
      <div className="text-xl font-medium tabular-nums text-white">{parts.dateLabel}</div>
      <div className="text-xl font-semibold tabular-nums text-indigo-300">{parts.timeLabel}</div>
    </div>
  );
}
