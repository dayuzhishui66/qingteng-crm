import type { LeadScoreDimensions, Priority } from "@/data/types";

/**
 * 综合 LeadScore 永远由六个维度的分值相加得出，不允许在数据对象上硬编码总分。
 * 六个维度满分：
 * 企业影响力 20 + 创新与成长潜力 20 + 数智融合程度 15 + 青腾课程匹配度 20
 * + 国际化与生态价值 15 + 招生可转化程度 10 = 100
 */
export function computeLeadScore(dimensions: LeadScoreDimensions): number {
  return (
    dimensions.企业影响力.value +
    dimensions.创新与成长潜力.value +
    dimensions.数智融合程度.value +
    dimensions.青腾课程匹配度.value +
    dimensions.国际化与生态价值.value +
    dimensions.招生可转化程度.value
  );
}

// A：85–100 重点邀请 / B：70–84 优先培育 / C：55–69 持续观察 / D：<55 暂缓推进
export function getPriority(score: number): Priority {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  return "D";
}

export const PRIORITY_STYLES: Record<
  Priority,
  { bg: string; text: string; dot: string }
> = {
  A: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  B: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  C: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  D: { bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-400" },
};
