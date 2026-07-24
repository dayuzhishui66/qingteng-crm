"use client";

import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EnrichedCandidate } from "@/lib/candidateUtils";
import { FUNNEL_STAGES, STAGE_COLORS } from "@/lib/funnel";

export default function FunnelOverviewChart({
  candidates,
}: {
  candidates: EnrichedCandidate[];
}) {
  const router = useRouter();

  const data = FUNNEL_STAGES.map((stage) => ({
    stage,
    count: candidates.filter((c) => c.当前招生阶段 === stage).length,
  }));

  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f3" />
          <XAxis
            dataKey="stage"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            interval={0}
            angle={-20}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} allowDecimals={false} />
          <Tooltip formatter={(value) => [`${value} 人`, "候选人数"]} />
          <Bar
            dataKey="count"
            radius={[6, 6, 0, 0]}
            cursor="pointer"
            onClick={(entry) => {
              const stage = entry.payload?.stage as string | undefined;
              if (stage) {
                router.push(`/candidates?stage=${encodeURIComponent(stage)}`);
              }
            }}
          >
            {data.map((entry) => (
              <Cell key={entry.stage} fill={STAGE_COLORS[entry.stage]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
