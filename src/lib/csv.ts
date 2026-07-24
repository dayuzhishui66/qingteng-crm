import type { EnrichedCandidate } from "./candidateUtils";
import { PRIORITY_LABELS } from "@/data/types";

const COLUMNS: { label: string; value: (c: EnrichedCandidate) => unknown }[] = [
  { label: "候选人ID", value: (c) => c.候选人ID },
  { label: "姓名", value: (c) => c.姓名 },
  { label: "公司", value: (c) => c.公司 },
  { label: "职位", value: (c) => c.职位 },
  { label: "产业板块", value: (c) => c.一级行业 },
  { label: "二级赛道", value: (c) => c.二级赛道 },
  { label: "所在城市", value: (c) => c.所在城市 },
  { label: "企业阶段", value: (c) => c.企业阶段 },
  { label: "当前招生阶段", value: (c) => c.当前招生阶段 },
  { label: "Lead Score", value: (c) => c.leadScore },
  { label: "优先级", value: (c) => PRIORITY_LABELS[c.priority] },
  { label: "CRM负责人", value: (c) => c.CRM负责人 },
  { label: "下一步行动", value: (c) => c.nextAction.action },
  { label: "建议完成时间", value: (c) => c.nextAction.dueDate },
];

function csvEscape(value: unknown): string {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function candidatesToCsv(candidates: EnrichedCandidate[]): string {
  const header = COLUMNS.map((c) => csvEscape(c.label)).join(",");
  const rows = candidates.map((c) => COLUMNS.map((col) => csvEscape(col.value(c))).join(","));
  return [header, ...rows].join("\n");
}

export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob(["﻿" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
