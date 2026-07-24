import type { Candidate } from "@/data/types";
import { computeLeadScore, getPriority } from "./scoring";
import { addDaysLocal } from "./date";

export interface EnrichedCandidate extends Candidate {
  leadScore: number;
  priority: ReturnType<typeof getPriority>;
}

export function enrichCandidate(candidate: Candidate): EnrichedCandidate {
  const leadScore = computeLeadScore(candidate.scoreDimensions);
  return {
    ...candidate,
    leadScore,
    priority: getPriority(leadScore),
  };
}

export function enrichAll(candidates: Candidate[]): EnrichedCandidate[] {
  return candidates.map(enrichCandidate);
}

/**
 * "待跟进事项"：Next Best Action 建议完成时间在未来 N 天内（含已逾期）的候选人，
 * 按建议完成时间升序排列，用于 Dashboard 的待跟进统计与"今日待办"列表。
 */
export function getFollowUpItems(
  candidates: EnrichedCandidate[],
  withinDays = 7
): EnrichedCandidate[] {
  const cutoff = addDaysLocal(withinDays);
  return candidates
    .filter((c) => c.nextAction.dueDate <= cutoff)
    .sort((a, b) => a.nextAction.dueDate.localeCompare(b.nextAction.dueDate));
}
