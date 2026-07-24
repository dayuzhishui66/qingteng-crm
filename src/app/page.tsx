"use client";

import Link from "next/link";
import { candidates as seedCandidates } from "@/data/candidates";
import { enrichAll, getFollowUpItems } from "@/lib/candidateUtils";
import StatCard from "@/components/StatCard";
import IndustryChart from "@/components/IndustryChart";
import FunnelOverviewChart from "@/components/FunnelOverviewChart";
import PriorityMatrix from "@/components/PriorityMatrix";
import PriorityBadge from "@/components/PriorityBadge";

export default function DashboardPage() {
  const candidates = enrichAll(seedCandidates);

  const total = candidates.length;
  const tierA = candidates.filter((c) => c.priority === "A").length;
  const interviewed = candidates.filter(
    (c) => c.当前招生阶段 === "已面试" || c.当前招生阶段 === "拟录取"
  ).length;
  const followUps = getFollowUpItems(candidates, 7);

  const topCandidates = [...candidates].sort((a, b) => b.leadScore - a.leadScore).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <div className="bg-primary rounded-xl px-6 py-6 text-white">
        <p className="text-xs uppercase tracking-wide text-blue-100 mb-1">
          北大-青腾未来产业学堂【数实融合班】
        </p>
        <h1 className="text-2xl font-semibold mb-2">招生驾驶舱 · 青腾企业家人才洞察与招生CRM</h1>
        <p className="text-sm text-blue-100 max-w-[720px] leading-relaxed">
          将分散的企业家公开信息转化为结构化画像，通过可解释的优先级评分和招生流程管理，
          支持研究、筛选、触达、面试及后续运营全流程。
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="候选人总数" value={total} suffix="人" href="/candidates" />
        <StatCard
          label="A级优先候选人"
          value={tierA}
          suffix="人"
          hint="Lead Score ≥ 85"
          href="/candidates?priority=A"
        />
        <StatCard
          label="待跟进事项"
          value={followUps.length}
          suffix="项"
          hint="建议完成时间7天内（含逾期）"
          href="/candidates?followup=1"
        />
        <StatCard
          label="已进入面试"
          value={interviewed}
          suffix="人"
          hint="已面试 + 拟录取"
          href="/candidates?stage=已面试"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Funnel overview */}
        <div className="bg-surface border border-[var(--color-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">招生漏斗</h2>
            <Link href="/pipeline" className="text-xs text-primary hover:underline">
              查看看板 →
            </Link>
          </div>
          <FunnelOverviewChart candidates={candidates} />
        </div>

        {/* Industry distribution */}
        <div className="bg-surface border border-[var(--color-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">产业赛道分布</h2>
            <span className="text-xs text-muted">点击条形跳转筛选</span>
          </div>
          <IndustryChart candidates={candidates} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Priority matrix */}
        <div className="bg-surface border border-[var(--color-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">候选人优先级矩阵</h2>
            <span className="text-xs text-muted">企业影响力 × 招生可转化程度</span>
          </div>
          <PriorityMatrix candidates={candidates} />
        </div>

        {/* Today's to-dos */}
        <div className="bg-surface border border-[var(--color-border)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">今日待办</h2>
            <span className="text-xs text-muted">按建议完成时间排序</span>
          </div>
          <div className="flex flex-col gap-1">
            {followUps.length === 0 && (
              <p className="text-sm text-muted py-6 text-center">近期没有待跟进事项</p>
            )}
            {followUps.map((c) => (
              <Link
                key={c.候选人ID}
                href={`/candidates?keyword=${encodeURIComponent(c.姓名)}`}
                className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {c.姓名} <span className="text-muted font-normal">· {c.公司}</span>
                  </p>
                  <p className="text-xs text-muted truncate">{c.nextAction.action}</p>
                </div>
                <span className="text-xs text-muted shrink-0">{c.nextAction.dueDate}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Featured candidates */}
      <div className="bg-surface border border-[var(--color-border)] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">重点推荐候选人</h2>
          <Link href="/candidates" className="text-xs text-primary hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {topCandidates.map((c, idx) => (
            <Link
              key={c.候选人ID}
              href={`/candidates?keyword=${encodeURIComponent(c.姓名)}`}
              className="flex flex-col gap-1.5 p-3 rounded-lg border border-[var(--color-border)] hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">#{idx + 1}</span>
                <PriorityBadge priority={c.priority} variant="compact" />
              </div>
              <p className="text-sm font-medium text-gray-900 truncate">{c.姓名}</p>
              <p className="text-xs text-muted truncate">{c.公司}</p>
              <p className="text-sm font-semibold text-gray-800">{c.leadScore} 分</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
