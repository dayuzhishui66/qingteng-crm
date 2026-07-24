import type { FunnelStage } from "@/data/types";
import { STAGE_COLORS } from "@/lib/funnel";

export default function StageBadge({ stage }: { stage: FunnelStage }) {
  const color = STAGE_COLORS[stage];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {stage}
    </span>
  );
}
