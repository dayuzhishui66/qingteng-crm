"use client";

import { useState } from "react";
import type { EnrichedCandidate } from "@/lib/candidateUtils";
import type { ContactRecord } from "@/data/types";
import { todayLocal } from "@/lib/date";
import PriorityBadge from "./PriorityBadge";
import StageBadge from "./StageBadge";
import TagChip from "./TagChip";
import ScoreBar from "./ScoreBar";
import ScoreRadar from "./ScoreRadar";

const DIMENSION_LABELS: Record<string, string> = {
  企业影响力: "企业影响力",
  创新与成长潜力: "创新与成长潜力",
  数智融合程度: "数智融合程度",
  青腾课程匹配度: "青腾课程匹配度",
  国际化与生态价值: "国际化与生态价值",
  招生可转化程度: "招生可转化程度",
};

export default function CandidateDrawer({
  candidate,
  onClose,
  onAddContact,
}: {
  candidate: EnrichedCandidate;
  onClose: () => void;
  onAddContact: (candidateId: string, record: ContactRecord) => void;
}) {
  const [channel, setChannel] = useState("电话");
  const [note, setNote] = useState("");

  const handleAddContact = () => {
    if (!note.trim()) return;
    onAddContact(candidate.候选人ID, { date: todayLocal(), channel, note: note.trim() });
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-[560px] h-full bg-[var(--background)] shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-[var(--color-border)] px-6 py-4 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-gray-900">{candidate.姓名}</h2>
              <PriorityBadge priority={candidate.priority} />
            </div>
            <p className="text-sm text-muted">
              {candidate.公司} · {candidate.职位}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none px-2"
            aria-label="关闭"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-6">
          {/* 1. 基础档案 */}
          <Section title="1. 基础档案">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Field label="产业板块" value={candidate.一级行业} />
              <Field label="二级赛道" value={candidate.二级赛道} />
              <Field label="所在城市" value={candidate.所在城市} />
              <Field label="候选人ID" value={candidate.候选人ID} />
              <Field label="当前招生阶段" value={<StageBadge stage={candidate.当前招生阶段} />} />
              <Field label="综合Lead Score" value={`${candidate.leadScore} 分`} />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {candidate.标签.map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </Section>

          {/* 2. 企业画像 */}
          <Section title="2. 企业画像">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Field label="企业阶段" value={candidate.企业阶段} />
              <Field label="企业规模" value={candidate.企业规模} />
              <Field label="融资或上市状态" value={candidate.融资或上市状态} />
              <Field label="海外市场数量" value={`${candidate.海外市场数量} 个`} />
              <Field label="数字化成熟度" value={candidate.数字化成熟度} span2 />
              <Field label="AI应用程度" value={candidate.AI应用程度} span2 />
              <Field label="海外业务情况" value={candidate.海外业务情况} span2 />
            </div>
          </Section>

          {/* 3. 企业家画像 */}
          <Section title="3. 企业家画像">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Field label="创新能力" value={candidate.创新能力} span2 />
              <Field label="行业影响力" value={candidate.行业影响力} span2 />
              <Field label="青腾课程匹配度" value={candidate.青腾课程匹配度} span2 />
              <Field label="招生意向" value={candidate.招生意向} span2 />
              <Field label="腾讯生态关联度" value={candidate.腾讯生态关联度} span2 />
            </div>
          </Section>

          {/* 4. 青腾匹配建议 */}
          <Section title="4. 青腾匹配建议">
            <p className="text-sm text-gray-700 leading-relaxed bg-primary-light/40 border border-primary-light rounded-lg p-3">
              {candidate.青腾匹配建议}
            </p>
          </Section>

          {/* 5. Lead Score 及评分原因 */}
          <Section title="5. Lead Score 及评分原因">
            <ScoreRadar dimensions={candidate.scoreDimensions} />
            <div className="mt-3">
              {Object.entries(candidate.scoreDimensions).map(([key, dim]) => (
                <ScoreBar
                  key={key}
                  label={DIMENSION_LABELS[key] ?? key}
                  value={dim.value}
                  max={dim.max}
                  reason={dim.reason}
                />
              ))}
            </div>
          </Section>

          {/* 6. 招生运营与联系记录 */}
          <Section title="6. 招生运营与联系记录">
            <div className="flex flex-col gap-5">
              {/* Next Best Action */}
              <div>
                <SubHeading>Next Best Action · 系统建议</SubHeading>
                <div className="bg-primary-light/40 border border-primary-light rounded-lg p-3 flex flex-col gap-2 text-sm">
                  <p className="font-medium text-gray-900">{candidate.nextAction.action}</p>
                  <p className="text-gray-700">推荐原因：{candidate.nextAction.reason}</p>
                  <div className="flex items-center gap-4 text-xs text-muted pt-1">
                    <span>建议完成时间：{candidate.nextAction.dueDate}</span>
                    <span>CRM负责人：{candidate.nextAction.owner}</span>
                  </div>
                </div>
              </div>

              {/* 风险提示 */}
              <div>
                <SubHeading>风险提示</SubHeading>
                <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
                  {candidate.风险提示}
                </p>
              </div>

              {/* 推荐课程模块 */}
              <div>
                <SubHeading>推荐课程模块</SubHeading>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.推荐课程模块.map((item) => (
                    <TagChip key={item} label={item} />
                  ))}
                </div>
              </div>

              {/* 推荐私访主题 */}
              <div>
                <SubHeading>推荐私访主题</SubHeading>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.推荐私访主题.map((item) => (
                    <TagChip key={item} label={item} />
                  ))}
                </div>
              </div>

              {/* 推荐同班企业家类型 */}
              <div>
                <SubHeading>推荐同班企业家类型</SubHeading>
                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                  {candidate.推荐同班企业家类型.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 联系记录时间线 */}
              <div>
                <SubHeading>联系记录时间线</SubHeading>
                <div className="flex flex-col gap-3">
                  {candidate.联系记录
                    .slice()
                    .reverse()
                    .map((record, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center pt-1">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          {idx < candidate.联系记录.length - 1 && (
                            <span className="w-px flex-1 bg-[var(--color-border)] mt-1" />
                          )}
                        </div>
                        <div className="pb-1">
                          <div className="flex items-center gap-2 text-xs text-muted mb-0.5">
                            <span className="font-medium text-gray-700">{record.date}</span>
                            <span>·</span>
                            <span>{record.channel}</span>
                          </div>
                          <p className="text-sm text-gray-700">{record.note}</p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* 记录跟进表单 */}
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  <p className="text-xs text-muted mb-2">
                    记录跟进（仅追加到当前会话状态，刷新页面后恢复初始数据）
                  </p>
                  <div className="flex gap-2">
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                      className="px-2.5 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white"
                    >
                      <option>电话</option>
                      <option>微信</option>
                      <option>邮件</option>
                      <option>线下拜访</option>
                      <option>校友引荐</option>
                      <option>线上活动</option>
                    </select>
                    <input
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="填写本次跟进内容..."
                      className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      onClick={handleAddContact}
                      className="px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors shrink-0"
                    >
                      记录跟进
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Section>
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-2.5">{title}</h3>
      <div className="bg-surface border border-[var(--color-border)] rounded-xl p-4">
        {children}
      </div>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{children}</h4>;
}

function Field({
  label,
  value,
  span2,
}: {
  label: string;
  value: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "col-span-2" : undefined}>
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <div className="text-gray-800">{value}</div>
    </div>
  );
}
