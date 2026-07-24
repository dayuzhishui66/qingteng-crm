"use client";

import { FUNNEL_STAGES } from "@/data/types";
import type { FunnelStage, Industry } from "@/data/types";
import { INDUSTRIES, PRIORITY_LEVELS, PRIORITY_LABELS } from "@/data/types";
import type { Priority } from "@/data/types";

export type SortKey = "score-desc" | "score-asc";

export interface CandidateFilters {
  keyword: string;
  industry: Industry | "全部";
  stage: FunnelStage | "全部";
  priority: Priority | "全部";
  sort: SortKey;
}

export const DEFAULT_FILTERS: CandidateFilters = {
  keyword: "",
  industry: "全部",
  stage: "全部",
  priority: "全部",
  sort: "score-desc",
};

export default function CandidateFilterBar({
  filters,
  onChange,
  onReset,
  onExportCsv,
  onAddNew,
  resultCount,
}: {
  filters: CandidateFilters;
  onChange: (filters: CandidateFilters) => void;
  onReset: () => void;
  onExportCsv: () => void;
  onAddNew: () => void;
  resultCount: number;
}) {
  return (
    <div className="bg-surface border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={filters.keyword}
          onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
          placeholder="搜索姓名或公司..."
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />

        <select
          value={filters.industry}
          onChange={(e) =>
            onChange({ ...filters, industry: e.target.value as Industry | "全部" })
          }
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="全部">全部行业</option>
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        <select
          value={filters.stage}
          onChange={(e) =>
            onChange({ ...filters, stage: e.target.value as FunnelStage | "全部" })
          }
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="全部">全部阶段</option>
          {FUNNEL_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            onChange({ ...filters, priority: e.target.value as Priority | "全部" })
          }
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="全部">全部优先级</option>
          {PRIORITY_LEVELS.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as SortKey })}
          className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="score-desc">评分：从高到低</option>
          <option value="score-asc">评分：从低到高</option>
        </select>

        <button
          onClick={onReset}
          className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 border border-[var(--color-border)] hover:bg-gray-50 transition-colors"
        >
          重置筛选
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">
          共 <span className="font-medium text-gray-700">{resultCount}</span> 位候选人
        </span>
        <div className="flex gap-2">
          <button
            onClick={onExportCsv}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-700 border border-[var(--color-border)] hover:bg-gray-50 transition-colors"
          >
            导出 CSV
          </button>
          <button
            onClick={onAddNew}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            + 新增候选人
          </button>
        </div>
      </div>
    </div>
  );
}
