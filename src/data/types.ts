// 候选人 CRM 数据模型
// 说明：除姓名/公司/职位/所属板块外，其余字段均为面试作业仿真数据。

export type FunnelStage =
  | "线索池"
  | "初步研究"
  | "待联系"
  | "已联系"
  | "有意向"
  | "待面试"
  | "已面试"
  | "拟录取";

export const FUNNEL_STAGES: FunnelStage[] = [
  "线索池",
  "初步研究",
  "待联系",
  "已联系",
  "有意向",
  "待面试",
  "已面试",
  "拟录取",
];

// A：85–100 重点邀请 / B：70–84 优先培育 / C：55–69 持续观察 / D：<55 暂缓推进
export type Priority = "A" | "B" | "C" | "D";

export const PRIORITY_LEVELS: Priority[] = ["A", "B", "C", "D"];

export const PRIORITY_LABELS: Record<Priority, string> = {
  A: "A · 重点邀请",
  B: "B · 优先培育",
  C: "C · 持续观察",
  D: "D · 暂缓推进",
};

export type Industry =
  | "智能新产业"
  | "医疗新康养"
  | "场景新消费"
  | "融合新科技"
  | "自主新制造"
  | "科技碳中和";

export const INDUSTRIES: Industry[] = [
  "智能新产业",
  "医疗新康养",
  "场景新消费",
  "融合新科技",
  "自主新制造",
  "科技碳中和",
];

export interface ScoreDimension {
  /** 当前得分 */
  value: number;
  /** 该维度满分 */
  max: number;
  /** 打分理由，与候选人具体情况挂钩 */
  reason: string;
}

// Lead Score 六维模型，满分 100：
// 企业影响力20 + 创新与成长潜力20 + 数智融合程度15 + 青腾课程匹配度20 + 国际化与生态价值15 + 招生可转化程度10
export interface LeadScoreDimensions {
  企业影响力: ScoreDimension; // 0-20
  创新与成长潜力: ScoreDimension; // 0-20
  数智融合程度: ScoreDimension; // 0-15
  青腾课程匹配度: ScoreDimension; // 0-20
  国际化与生态价值: ScoreDimension; // 0-15
  招生可转化程度: ScoreDimension; // 0-10
}

export interface ContactRecord {
  date: string; // YYYY-MM-DD
  channel: string; // 电话 / 微信 / 邮件 / 线下拜访 / 校友引荐 等
  note: string;
}

export interface NextBestAction {
  /** 系统建议的下一步行动 */
  action: string;
  /** 推荐原因 */
  reason: string;
  /** 建议完成时间 YYYY-MM-DD */
  dueDate: string;
  /** CRM负责人 */
  owner: string;
}

export interface Candidate {
  候选人ID: string;
  姓名: string;
  公司: string;
  职位: string;
  一级行业: Industry;
  二级赛道: string;
  所在城市: string;
  企业阶段: string;
  企业规模: string;
  融资或上市状态: string;
  海外业务情况: string;
  海外市场数量: number;
  数字化成熟度: string;
  AI应用程度: string;
  创新能力: string;
  行业影响力: string;
  青腾课程匹配度: string;
  招生意向: string;
  腾讯生态关联度: string;
  风险提示: string;
  信息来源: string;
  CRM负责人: string;
  首次录入时间: string;
  最近联系时间: string;
  当前招生阶段: FunnelStage;
  标签: string[];
  scoreDimensions: LeadScoreDimensions;
  联系记录: ContactRecord[];
  推荐课程模块: string[];
  推荐私访主题: string[];
  推荐同班企业家类型: string[];
  青腾匹配建议: string;
  nextAction: NextBestAction;
}
