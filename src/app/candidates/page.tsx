"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { candidates as seedCandidates } from "@/data/candidates";
import type { Candidate, ContactRecord } from "@/data/types";
import { enrichAll, enrichCandidate, getFollowUpItems, type EnrichedCandidate } from "@/lib/candidateUtils";
import CandidateFilterBar, {
  DEFAULT_FILTERS,
  type CandidateFilters,
} from "@/components/CandidateFilterBar";
import CandidateTable from "@/components/CandidateTable";
import CandidateDrawer from "@/components/CandidateDrawer";
import AddCandidateModal from "@/components/AddCandidateModal";
import { candidatesToCsv, downloadCsv } from "@/lib/csv";
import { todayLocal } from "@/lib/date";

function CandidatesPageInner() {
  const searchParams = useSearchParams();

  const [rawCandidates, setRawCandidates] = useState<Candidate[]>(seedCandidates);
  const [filters, setFilters] = useState<CandidateFilters>(() => ({
    keyword: searchParams.get("keyword") ?? DEFAULT_FILTERS.keyword,
    industry: (searchParams.get("industry") as CandidateFilters["industry"]) ?? "全部",
    stage: (searchParams.get("stage") as CandidateFilters["stage"]) ?? "全部",
    priority: (searchParams.get("priority") as CandidateFilters["priority"]) ?? "全部",
    sort: DEFAULT_FILTERS.sort,
  }));
  const [followupOnly, setFollowupOnly] = useState(() => searchParams.get("followup") === "1");
  const [selected, setSelected] = useState<EnrichedCandidate | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const enriched = useMemo(() => enrichAll(rawCandidates), [rawCandidates]);

  const filtered = useMemo(() => {
    let result = followupOnly ? getFollowUpItems(enriched, 7) : enriched;

    if (filters.keyword.trim()) {
      const kw = filters.keyword.trim().toLowerCase();
      result = result.filter(
        (c) => c.姓名.toLowerCase().includes(kw) || c.公司.toLowerCase().includes(kw)
      );
    }
    if (filters.industry !== "全部") {
      result = result.filter((c) => c.一级行业 === filters.industry);
    }
    if (filters.stage !== "全部") {
      result = result.filter((c) => c.当前招生阶段 === filters.stage);
    }
    if (filters.priority !== "全部") {
      result = result.filter((c) => c.priority === filters.priority);
    }

    result = [...result].sort((a, b) =>
      filters.sort === "score-desc" ? b.leadScore - a.leadScore : a.leadScore - b.leadScore
    );

    return result;
  }, [enriched, filters, followupOnly]);

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setFollowupOnly(false);
  };

  const handleExportCsv = () => {
    const csv = candidatesToCsv(filtered);
    downloadCsv(`青腾候选人_${todayLocal()}.csv`, csv);
  };

  const handleAddCandidate = (candidate: Candidate) => {
    setRawCandidates((prev) => [candidate, ...prev]);
  };

  const handleAddContact = (candidateId: string, record: ContactRecord) => {
    setRawCandidates((prev) =>
      prev.map((c) =>
        c.候选人ID === candidateId ? { ...c, 联系记录: [...c.联系记录, record] } : c
      )
    );
    setSelected((prev) =>
      prev && prev.候选人ID === candidateId
        ? enrichCandidate({ ...prev, 联系记录: [...prev.联系记录, record] })
        : prev
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">企业家人才库 CRM</h1>
        <p className="text-sm text-muted">
          搜索、筛选与管理青腾数实融合班招生候选人，点击行查看完整档案。
        </p>
      </div>

      {followupOnly && (
        <div className="flex items-center justify-between bg-primary-light/40 border border-primary-light rounded-lg px-4 py-2 text-sm text-primary">
          <span>当前显示：待跟进事项（建议完成时间7天内，含逾期）</span>
          <button onClick={() => setFollowupOnly(false)} className="text-xs underline hover:no-underline">
            清除该筛选
          </button>
        </div>
      )}

      <CandidateFilterBar
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        onExportCsv={handleExportCsv}
        onAddNew={() => setShowAddModal(true)}
        resultCount={filtered.length}
      />

      <div className="bg-surface border border-[var(--color-border)] rounded-xl">
        <CandidateTable candidates={filtered} onSelect={setSelected} />
      </div>

      {selected && (
        <CandidateDrawer
          candidate={selected}
          onClose={() => setSelected(null)}
          onAddContact={handleAddContact}
        />
      )}

      {showAddModal && (
        <AddCandidateModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddCandidate}
        />
      )}
    </div>
  );
}

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div className="text-sm text-muted">加载中...</div>}>
      <CandidatesPageInner />
    </Suspense>
  );
}
