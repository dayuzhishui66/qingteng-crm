# 青腾企业家人才洞察与招生CRM（面试作业原型）

面向 腾讯青腾（TencentX）商业分析实习生 岗位面试作业制作的产品原型：将分散的企业家公开信息转化为结构化画像，通过可解释的 Lead Score 优先级评分和招生流程管理，支持青腾团队进行候选人研究、筛选、触达、面试及后续运营。

**数据说明**：10 位候选人的姓名、所在公司、职位与所属产业板块取自青腾官方发布的《北大-青腾未来产业学堂【数实融合班】全名单》公开海报，真实可核实；除此之外的所有字段（企业阶段、融资状态、Lead Score 各维度评分、联系记录、CRM 负责人、Next Best Action、时间戳等）均为本次面试作业虚构的仿真数据，仅用于演示产品设计思路，不代表任何真实经营信息。页面顶部横幅和 [`/about`](http://localhost:3000/about) 页面均有明显标注。

## 本地运行

需要 Node.js 18 及以上版本。

```bash
# 在 qingteng-crm 目录下
npm install
npm run dev
```

然后打开 [http://localhost:3000](http://localhost:3000)。

其他可用脚本：

```bash
npm run lint       # ESLint 检查
npm run typecheck  # TypeScript 类型检查（tsc --noEmit）
npm run build      # 生产构建
npm run start      # 以生产模式启动（需先 build）
```

## 部署到 Vercel（让面试官通过链接直接打开）

**方式一：Vercel CLI（最快，不需要 GitHub）**

```bash
npm i -g vercel
cd qingteng-crm
vercel
```

按提示登录（免费账号即可，不需要绑定信用卡）、确认项目目录，几十秒后会得到一个 `https://xxx.vercel.app` 的公开链接，发给面试官即可直接打开。

**方式二：GitHub + Vercel 网页导入**

1. 把 `qingteng-crm` 这个文件夹推送到一个 GitHub 仓库（公开或私有均可）。
2. 打开 [vercel.com](https://vercel.com)，用 GitHub 账号登录，选择 "Import Project"，选中该仓库。
3. Vercel 会自动识别为 Next.js 项目，无需额外配置，点击 Deploy 即可。

两种方式都是 Vercel 的免费 Hobby 套餐，不涉及任何付费服务。

## 一级页面

| 页面 | 路由 | 说明 |
|---|---|---|
| 招生驾驶舱 Dashboard | `/` | 4 张顶部统计卡 + 招生漏斗 + 产业赛道分布 + 优先级矩阵 + 今日待办 + 重点推荐候选人 |
| 企业家人才库 CRM | `/candidates` | 候选人列表，搜索/筛选/排序/导出 CSV，点击行进入详情抽屉 |
| 招生流程 Pipeline | `/pipeline` | 8 阶段看板视图 |
| 产品说明 About | `/about` | 产品定位、字段设计逻辑、Lead Score 模型、AI 辅助构想、合规说明、3 分钟演示路径 |

候选人详情通过点击 CRM 列表后以右侧抽屉呈现，不单独设一级导航。

## 项目结构

```
src/
  app/
    page.tsx             # 招生驾驶舱 Dashboard
    candidates/page.tsx   # 企业家人才库 CRM
    pipeline/page.tsx      # 招生流程 Pipeline（看板视图）
    about/page.tsx          # 产品说明
    layout.tsx               # 全局布局 + 导航 + 仿真数据声明横幅
  components/                # 可复用 UI 组件（表格、详情抽屉、图表、优先级矩阵、徽标等）
  data/
    types.ts                  # 候选人数据模型 TypeScript 类型定义
    candidates.ts               # 10 位候选人仿真种子数据
  lib/
    scoring.ts                   # Lead Score 计算逻辑（6 维度自动求和，非手工填写）+ A/B/C/D 优先级
    funnel.ts                     # 招生阶段分组与阶段颜色
    candidateUtils.ts              # 候选人数据 enrich（leadScore / priority）+ 待跟进事项筛选
    csv.ts                          # CSV 导出
    date.ts                          # 本地日期工具（避免 UTC 时区偏移）
```

## Lead Score 模型（满分 100，六维度自动求和）

企业影响力 20 + 创新与成长潜力 20 + 数智融合程度 15 + 青腾课程匹配度 20 + 国际化与生态价值 15 + 招生可转化程度 10。

优先级：A（85-100，重点邀请）/ B（70-84，优先培育）/ C（55-69，持续观察）/ D（低于55，暂缓推进）。

## 关于数据持久化

页面中的「新增候选人」「记录跟进」均为前端演示交互：提交后会临时更新到内存中的 React state，**刷新页面即恢复为原始仿真数据**（未接入数据库，符合面试作业「不需要永久保存」的要求）。
