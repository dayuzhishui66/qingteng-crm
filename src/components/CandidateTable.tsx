"use client";

import type { EnrichedCandidate } from "@/lib/candidateUtils";
import PriorityBadge from "./PriorityBadge";
import StageBadge from "./StageBadge";
import TagChip from "./TagChip";

export default function CandidateTable({
  candidates,
  onSelect,
}: {
  candidates: EnrichedCandidate[];
  onSelect: (candidate: EnrichedCandidate) => void;
}) {
  if (candidates.length === 0) {
    return (
      <div className="py-16 text-center text-muted text-sm">
        没有符合当前筛选条件的候选人，试试调整筛选条件或点击&ldquo;重置筛选&rdquo;。
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <colgroup>
          <col className="w-[146px]" />
          <col className="w-[88px]" />
          <col className="w-[108px]" />
          <col className="w-[120px]" />
          <col className="w-[58px]" />
          <col className="w-[40px]" />
          <col className="w-[88px]" />
          <col className="w-[100px]" />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b border-[var(--color-border)] text-left text-xs text-muted">
            <th className="py-3 px-3 font-medium">姓名和公司</th>
            <th className="py-3 px-3 font-medium">产业板块</th>
            <th className="py-3 px-3 font-medium">企业阶段</th>
            <th className="py-3 px-3 font-medium">核心标签</th>
            <th className="py-3 px-3 font-medium">Lead Score</th>
            <th className="py-3 px-3 font-medium">优先级</th>
            <th className="py-3 px-3 font-medium">招生阶段</th>
            <th className="py-3 px-3 font-medium">CRM负责人</th>
            <th className="py-3 px-3 font-medium">下一步行动</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr
              key={c.候选人ID}
              onClick={() => onSelect(c)}
              className="border-b border-[var(--color-border)] last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-3">
                <div className="font-medium text-gray-900 truncate" title={c.姓名}>
                  {c.姓名}
                </div>
                <div className="text-xs text-muted truncate" title={c.公司}>
                  {c.公司}
                </div>
              </td>
              <td className="py-3 px-3">
                <div className="text-gray-700 truncate" title={c.一级行业}>
                  {c.一级行业}
                </div>
                <div className="text-xs text-muted truncate" title={c.二级赛道}>
                  {c.二级赛道}
                </div>
              </td>
              <td className="py-3 px-3 text-gray-600 truncate" title={c.企业阶段}>
                {c.企业阶段}
              </td>
              <td className="py-3 px-3">
                <div className="flex flex-wrap gap-1">
                  {c.标签.slice(0, 2).map((tag) => (
                    <TagChip key={tag} label={tag} />
                  ))}
                  {c.标签.length > 2 && (
                    <span className="text-xs text-muted">+{c.标签.length - 2}</span>
                  )}
                </div>
              </td>
              <td className="py-3 px-3 font-semibold text-gray-900">{c.leadScore}</td>
              <td className="py-3 px-3">
                <PriorityBadge priority={c.priority} variant="compact" />
              </td>
              <td className="py-3 px-3">
                <StageBadge stage={c.当前招生阶段} />
              </td>
              <td className="py-3 px-3 text-gray-600 truncate" title={c.CRM负责人}>
                {c.CRM负责人}
              </td>
              <td className="py-3 px-3 text-gray-600 truncate" title={c.nextAction.action}>
                {c.nextAction.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
