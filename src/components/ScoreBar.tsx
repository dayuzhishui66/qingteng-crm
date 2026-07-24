export default function ScoreBar({
  label,
  value,
  max,
  reason,
}: {
  label: string;
  value: number;
  max: number;
  reason?: string;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{value}</span> / {max}
        </span>
      </div>
      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      {reason && <p className="text-xs text-muted mt-1">{reason}</p>}
    </div>
  );
}
