import type { Candidate, FunnelStage } from "@/data/types";
import { FUNNEL_STAGES } from "@/data/types";

export { FUNNEL_STAGES };

export function groupByStage<T extends Candidate>(
  candidates: T[]
): Record<FunnelStage, T[]> {
  const grouped = FUNNEL_STAGES.reduce((acc, stage) => {
    acc[stage] = [];
    return acc;
  }, {} as Record<FunnelStage, T[]>);

  for (const candidate of candidates) {
    grouped[candidate.当前招生阶段].push(candidate);
  }
  return grouped;
}

export const STAGE_COLORS: Record<FunnelStage, string> = {
  线索池: "#94a3b8",
  初步研究: "#60a5fa",
  待联系: "#38bdf8",
  已联系: "#22c1c3",
  有意向: "#00a870",
  待面试: "#0052d9",
  已面试: "#7c3aed",
  拟录取: "#d54941",
};
