"use client";

import { useState } from "react";
import { candidates as seedCandidates } from "@/data/candidates";
import type { Candidate, ContactRecord } from "@/data/types";
import { enrichAll, enrichCandidate, type EnrichedCandidate } from "@/lib/candidateUtils";
import FunnelBoard from "@/components/FunnelBoard";
import CandidateDrawer from "@/components/CandidateDrawer";

export default function PipelinePage() {
  const [rawCandidates, setRawCandidates] = useState<Candidate[]>(seedCandidates);
  const [selected, setSelected] = useState<EnrichedCandidate | null>(null);

  const enriched = enrichAll(rawCandidates);

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
        <h1 className="text-xl font-semibold text-gray-900 mb-1">招生流程 Pipeline</h1>
        <p className="text-sm text-muted">
          8 个阶段的看板视图，直观呈现候选人在招生流程中的分布与流转，点击卡片查看详情。
        </p>
      </div>

      <FunnelBoard candidates={enriched} onSelect={setSelected} />

      {selected && (
        <CandidateDrawer
          candidate={selected}
          onClose={() => setSelected(null)}
          onAddContact={handleAddContact}
        />
      )}
    </div>
  );
}
