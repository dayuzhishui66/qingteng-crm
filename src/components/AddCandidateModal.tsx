"use client";

import { useState } from "react";
import type { Candidate, FunnelStage, Industry } from "@/data/types";
import { INDUSTRIES } from "@/data/types";
import { todayLocal } from "@/lib/date";

const EMPTY_FORM = {
  姓名: "",
  公司: "",
  职位: "",
  一级行业: "智能新产业" as Industry,
  二级赛道: "",
  所在城市: "",
  下一步行动: "",
};

export default function AddCandidateModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (candidate: Candidate) => void;
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = () => {
    if (!form.姓名.trim() || !form.公司.trim()) return;

    const today = todayLocal();
    const stage: FunnelStage = "线索池";
    const newCandidate: Candidate = {
      候选人ID: `QT-DEMO-${Date.now().toString().slice(-5)}`,
      姓名: form.姓名.trim(),
      公司: form.公司.trim(),
      职位: form.职位.trim() || "待补充",
      一级行业: form.一级行业,
      二级赛道: form.二级赛道.trim() || "待补充",
      所在城市: form.所在城市.trim() || "待补充",
      企业阶段: "待研究确认",
      企业规模: "待研究确认",
      融资或上市状态: "待研究确认",
      海外业务情况: "待研究确认",
      海外市场数量: 0,
      数字化成熟度: "待评估",
      AI应用程度: "待评估",
      创新能力: "待评估",
      行业影响力: "待评估",
      青腾课程匹配度: "待评估",
      招生意向: "待评估",
      腾讯生态关联度: "待评估",
      风险提示: "该候选人为演示新增数据，尚未完成尽调，暂无风险评估。",
      信息来源: "手动新增（演示数据，不持久化）",
      CRM负责人: "待分配",
      首次录入时间: today,
      最近联系时间: today,
      当前招生阶段: stage,
      标签: ["新增演示"],
      scoreDimensions: {
        企业影响力: { value: 5, max: 20, reason: "新增候选人，尚未完成深度评估，暂给予基础分" },
        创新与成长潜力: { value: 5, max: 20, reason: "新增候选人，尚未完成深度评估，暂给予基础分" },
        数智融合程度: { value: 4, max: 15, reason: "新增候选人，尚未完成深度评估，暂给予基础分" },
        青腾课程匹配度: { value: 5, max: 20, reason: "新增候选人，尚未完成深度评估，暂给予基础分" },
        国际化与生态价值: { value: 4, max: 15, reason: "新增候选人，尚未完成深度评估，暂给予基础分" },
        招生可转化程度: { value: 2, max: 10, reason: "新增候选人，尚未完成深度评估，暂给予基础分" },
      },
      联系记录: [{ date: today, channel: "系统录入", note: "通过“新增候选人”演示表单创建，等待补充详细信息。" }],
      推荐课程模块: ["待评估后推荐"],
      推荐私访主题: ["待评估后推荐"],
      推荐同班企业家类型: ["待评估后推荐"],
      青腾匹配建议: "该候选人为演示新增数据，建议补充企业与个人背景信息后重新评估匹配度。",
      nextAction: {
        action: form.下一步行动.trim() || "安排初步研究",
        reason: "新增候选人尚未完成深度调研，建议先完成基础资料收集",
        dueDate: today,
        owner: "待分配",
      },
    };

    onSubmit(newCandidate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-[480px] bg-surface rounded-xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold text-gray-900">新增候选人</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl leading-none px-1"
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        <p className="text-xs text-muted mb-4">
          演示功能：提交后仅追加到当前浏览器会话的内存状态，不会持久化保存，刷新页面后消失。
        </p>

        <div className="flex flex-col gap-3">
          <FormField label="姓名 *">
            <input
              value={form.姓名}
              onChange={(e) => setForm({ ...form, 姓名: e.target.value })}
              className="input"
              placeholder="例如：张三"
            />
          </FormField>
          <FormField label="公司 *">
            <input
              value={form.公司}
              onChange={(e) => setForm({ ...form, 公司: e.target.value })}
              className="input"
              placeholder="例如：示例科技有限公司"
            />
          </FormField>
          <FormField label="职位">
            <input
              value={form.职位}
              onChange={(e) => setForm({ ...form, 职位: e.target.value })}
              className="input"
              placeholder="例如：创始人&CEO"
            />
          </FormField>
          <FormField label="一级行业">
            <select
              value={form.一级行业}
              onChange={(e) => setForm({ ...form, 一级行业: e.target.value as Industry })}
              className="input bg-white"
            >
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="二级赛道">
            <input
              value={form.二级赛道}
              onChange={(e) => setForm({ ...form, 二级赛道: e.target.value })}
              className="input"
              placeholder="例如：智能硬件"
            />
          </FormField>
          <FormField label="所在城市">
            <input
              value={form.所在城市}
              onChange={(e) => setForm({ ...form, 所在城市: e.target.value })}
              className="input"
              placeholder="例如：北京"
            />
          </FormField>
          <FormField label="下一步行动">
            <input
              value={form.下一步行动}
              onChange={(e) => setForm({ ...form, 下一步行动: e.target.value })}
              className="input"
              placeholder="例如：安排初步研究"
            />
          </FormField>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 border border-[var(--color-border)] hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={!form.姓名.trim() || !form.公司.trim()}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed"
          >
            确认新增
          </button>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid var(--color-border);
          font-size: 14px;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-light);
        }
      `}</style>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}
