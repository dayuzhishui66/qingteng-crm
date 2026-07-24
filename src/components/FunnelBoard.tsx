"use client";

import type { EnrichedCandidate } from "@/lib/candidateUtils";
import { FUNNEL_STAGES, STAGE_COLORS, groupByStage } from "@/lib/funnel";
import PriorityBadge from "./PriorityBadge";

export default function FunnelBoard({
  candidates,
  onSelect,
}: {
  candidates: EnrichedCandidate[];
  onSelect: (candidate: EnrichedCandidate) => void;
}) {
  const grouped = groupByStage(candidates);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {FUNNEL_STAGES.map((stage) => {
        const stageCandidates = grouped[stage];
        const color = STAGE_COLORS[stage];
        return (
          <div key={stage} className="w-[240px] shrink-0 flex flex-col">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-sm font-semibold text-gray-800">{stage}</span>
              </div>
              <span className="text-xs text-muted bg-gray-100 rounded-full px-2 py-0.5">
                {stageCandidates.length}
              </span>
            </div>
            <div
              className="flex flex-col gap-2 rounded-xl p-2 min-h-[120px] flex-1"
              style={{ backgroundColor: `${color}0d` }}
            >
              {stageCandidates.length === 0 && (
                <div className="text-xs text-muted text-center py-6">暂无候选人</div>
              )}
              {stageCandidates.map((c) => (
                <button
                  key={c.候选人ID}
                  onClick={() => onSelect(c)}
                  className="text-left bg-surface border border-[var(--color-border)] rounded-lg p-3 hover:shadow-sm hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-900">{c.姓名}</span>
                    <span className="text-xs font-semibold text-gray-700 shrink-0">
                      {c.leadScore}分
                    </span>
                  </div>
                  <p className="text-xs text-muted mb-2 truncate">{c.公司}</p>
                  <PriorityBadge priority={c.priority} />
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
