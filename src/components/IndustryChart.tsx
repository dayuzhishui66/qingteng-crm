"use client";

import { useRouter } from "next/navigation";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { EnrichedCandidate } from "@/lib/candidateUtils";
import { INDUSTRIES } from "@/data/types";

const INDUSTRY_COLORS: Record<string, string> = {
  智能新产业: "#0052d9",
  医疗新康养: "#00a870",
  场景新消费: "#e37318",
  融合新科技: "#7c3aed",
  自主新制造: "#0eb0c9",
  科技碳中和: "#2e7d32",
};

export default function IndustryChart({
  candidates,
}: {
  candidates: EnrichedCandidate[];
}) {
  const router = useRouter();

  const data = INDUSTRIES.map((industry) => ({
    name: industry,
    value: candidates.filter((c) => c.一级行业 === industry).length,
  }));

  const goToIndustry = (name: string) => {
    router.push(`/candidates?industry=${encodeURIComponent(name)}`);
  };

  return (
    <div className="h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
          barCategoryGap={10}
        >
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fontSize: 12, fill: "#374151" }}
          />
          <Tooltip formatter={(value) => [`${value} 人`, "候选人数"]} />
          <Bar
            dataKey="value"
            radius={[0, 6, 6, 0]}
            cursor="pointer"
            barSize={18}
            onClick={(entry) => {
              const name = entry.payload?.name as string | undefined;
              if (name) goToIndustry(name);
            }}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={INDUSTRY_COLORS[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
