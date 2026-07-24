"use client";

import { useRouter } from "next/navigation";
import type { EnrichedCandidate } from "@/lib/candidateUtils";
import { PRIORITY_LEVELS, PRIORITY_LABELS } from "@/data/types";

const WIDTH = 420;
const HEIGHT = 260;
const PAD = { top: 12, right: 16, bottom: 28, left: 34 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

// 颜色取自 scoring.ts 的优先级配色，转换为实心点用色
const DOT_COLOR: Record<string, string> = {
  A: "#ef4444",
  B: "#f59e0b",
  C: "#3b82f6",
  D: "#9ca3af",
};

export default function PriorityMatrix({ candidates }: { candidates: EnrichedCandidate[] }) {
  const router = useRouter();

  const points = candidates.map((c) => {
    const impact = c.scoreDimensions.企业影响力;
    const convert = c.scoreDimensions.招生可转化程度;
    const xPct = impact.value / impact.max; // 0-1，企业影响力
    const yPct = convert.value / convert.max; // 0-1，招生可转化程度
    return {
      candidate: c,
      cx: PAD.left + xPct * PLOT_W,
      cy: PAD.top + (1 - yPct) * PLOT_H,
    };
  });

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-[240px]">
        {/* 象限背景 */}
        <rect x={PAD.left} y={PAD.top} width={PLOT_W / 2} height={PLOT_H / 2} fill="#eff6ff" />
        <rect x={PAD.left + PLOT_W / 2} y={PAD.top} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fef2f2" />
        <rect x={PAD.left} y={PAD.top + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#f9fafb" />
        <rect x={PAD.left + PLOT_W / 2} y={PAD.top + PLOT_H / 2} width={PLOT_W / 2} height={PLOT_H / 2} fill="#fffbeb" />

        {/* 象限标签 */}
        <text x={PAD.left + 6} y={PAD.top + 14} fontSize="9" fill="#93c5fd">快速转化</text>
        <text x={PAD.left + PLOT_W - 6} y={PAD.top + 14} fontSize="9" fill="#fca5a5" textAnchor="end">重点邀请</text>
        <text x={PAD.left + 6} y={PAD.top + PLOT_H - 6} fontSize="9" fill="#d1d5db">持续观察</text>
        <text x={PAD.left + PLOT_W - 6} y={PAD.top + PLOT_H - 6} fontSize="9" fill="#fcd34d" textAnchor="end">重点培育</text>

        {/* 坐标轴线 */}
        <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PLOT_H} stroke="#d1d5db" />
        <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={PAD.left + PLOT_W} y2={PAD.top + PLOT_H} stroke="#d1d5db" />
        <line
          x1={PAD.left + PLOT_W / 2}
          y1={PAD.top}
          x2={PAD.left + PLOT_W / 2}
          y2={PAD.top + PLOT_H}
          stroke="#e5e7eb"
          strokeDasharray="3 3"
        />
        <line
          x1={PAD.left}
          y1={PAD.top + PLOT_H / 2}
          x2={PAD.left + PLOT_W}
          y2={PAD.top + PLOT_H / 2}
          stroke="#e5e7eb"
          strokeDasharray="3 3"
        />

        {/* 轴标题 */}
        <text x={PAD.left + PLOT_W / 2} y={HEIGHT - 6} fontSize="10" fill="#6b7280" textAnchor="middle">
          企业影响力 →
        </text>
        <text
          x={10}
          y={PAD.top + PLOT_H / 2}
          fontSize="10"
          fill="#6b7280"
          textAnchor="middle"
          transform={`rotate(-90 10 ${PAD.top + PLOT_H / 2})`}
        >
          招生可转化程度 →
        </text>

        {/* 候选人点 */}
        {points.map(({ candidate, cx, cy }) => (
          <g
            key={candidate.候选人ID}
            className="cursor-pointer"
            onClick={() => router.push(`/candidates?keyword=${encodeURIComponent(candidate.姓名)}`)}
          >
            <circle cx={cx} cy={cy} r={6} fill={DOT_COLOR[candidate.priority]} stroke="#fff" strokeWidth={1.5} />
            <text x={cx + 8} y={cy + 3} fontSize="9" fill="#374151">
              {candidate.姓名}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex items-center gap-3 mt-1 flex-wrap">
        {PRIORITY_LEVELS.map((p) => (
          <span key={p} className="flex items-center gap-1 text-xs text-muted">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DOT_COLOR[p] }} />
            {PRIORITY_LABELS[p]}
          </span>
        ))}
      </div>
    </div>
  );
}
