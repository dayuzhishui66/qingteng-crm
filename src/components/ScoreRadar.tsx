"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { LeadScoreDimensions } from "@/data/types";

export default function ScoreRadar({
  dimensions,
}: {
  dimensions: LeadScoreDimensions;
}) {
  const data = Object.entries(dimensions).map(([key, dim]) => ({
    dimension: key,
    percent: Math.round((dim.value / dim.max) * 100),
  }));

  return (
    <div className="h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="#e4e7ed" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 11, fill: "#4b5563" }}
          />
          <Radar
            dataKey="percent"
            stroke="#0052d9"
            fill="#0052d9"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
