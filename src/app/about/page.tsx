const SECTION_CLASS =
  "bg-surface border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-3";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-5 max-w-[900px]">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">产品说明</h1>
        <p className="text-sm text-muted">
          青腾企业家人才洞察与招生CRM —— 本页说明该原型的产品设计逻辑，帮助面试官在 3
          分钟内理解其价值与思考过程。
        </p>
      </div>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">产品定位</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          将分散的企业家公开信息转化为结构化画像，通过可解释的优先级评分和招生流程管理，
          支持青腾团队进行候选人研究、筛选、触达、面试及后续运营。
        </p>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">用户是谁</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          主要用户是青腾行业研究人员、招生运营负责人、项目经理及面试评审人员——需要从企业家
          公开资料、名录海报、面试反馈等分散信息源中，快速构建结构化的候选人画像，并据此制定
          跟进策略、分配跟进责任人、准备面试材料。评审人员则需要在面试前快速获取候选人的企业
          背景与课程匹配度评估。
        </p>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">解决什么问题</h2>
        <ul className="text-sm text-gray-700 leading-relaxed list-disc list-inside space-y-1.5">
          <li>企业家信息分散在名录海报、公开新闻、口碑推荐等非结构化渠道中，缺乏统一数据模型</li>
          <li>候选人优先级判断依赖个人经验，缺少可解释、可复用的评分标准</li>
          <li>招生进度只能用 Excel 表格管理，缺乏可视化的流程视角，难以快速掌握全局</li>
          <li>候选人的企业画像、评分依据、跟进历史分散在不同文档中，交接与协作成本高</li>
        </ul>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">核心使用场景</h2>
        <ul className="text-sm text-gray-700 leading-relaxed list-disc list-inside space-y-1.5">
          <li>行业研究人员筛选出目标企业家名单后，快速录入并生成结构化候选人档案</li>
          <li>招生运营负责人根据 Lead Score 与漏斗阶段，制定本周重点跟进名单</li>
          <li>面试前，评审人员通过候选人详情页快速了解企业背景、评分依据与风险提示</li>
          <li>项目经理筹备青腾汇全球私访等项目时，根据候选人的赛道与画像推荐潜在参与主题</li>
        </ul>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">字段设计逻辑</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          字段设计遵循「基础档案 → 企业画像 → 企业家画像 → 青腾匹配建议 → Lead Score →
          招生运营与联系记录」的分层结构，与候选人详情页的六个板块一一对应：
        </p>
        <ul className="text-sm text-gray-700 leading-relaxed list-disc list-inside space-y-1.5">
          <li>
            <strong>基础档案</strong>：姓名、公司、职位、产业板块（对应青腾六大赛道）、二级赛道等，
            用于快速识别与分类
          </li>
          <li>
            <strong>企业画像</strong>：企业阶段、规模、融资/上市状态、海外业务情况等，用于判断企业的
            成熟度与国际化潜力
          </li>
          <li>
            <strong>企业家画像</strong>：创新能力、行业影响力、腾讯生态关联度等，用于判断创始人个人的
            课程适配度与生态协同价值
          </li>
          <li>
            <strong>招生运营与联系记录</strong>：Next Best Action、招生阶段、CRM 负责人、联系记录
            时间线等，用于日常招生流程管理与团队协作
          </li>
        </ul>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">Lead Score 模型说明</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          综合 Lead Score（0-100 分）由六个维度的分值相加得出，总分永远由程序计算而非人工填写，
          每个维度都附有简短评分原因，确保评分的一致性、可解释性与可追溯性：
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ["企业影响力", "0-20 分", "在所属赛道中的头部程度与行业地位"],
            ["创新与成长潜力", "0-20 分", "企业营收/用户/管线等增长态势与创新能力"],
            ["数智融合程度", "0-15 分", "数字化基础设施与 AI 应用的融合深度"],
            ["青腾课程匹配度", "0-20 分", "企业议题与课程模块的契合程度"],
            ["国际化与生态价值", "0-15 分", "海外市场覆盖广度与腾讯生态协同价值"],
            ["招生可转化程度", "0-10 分", "候选人本人或企业的参与积极性与转化确定性"],
          ].map(([name, weight, desc]) => (
            <div key={name} className="border border-[var(--color-border)] rounded-lg p-3">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-medium text-gray-900">{name}</span>
                <span className="text-xs text-primary font-medium">{weight}</span>
              </div>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mt-1">
          优先级分层：<strong>A（85-100分）重点邀请</strong>、
          <strong>B（70-84分）优先培育</strong>、<strong>C（55-69分）持续观察</strong>、
          <strong>D（低于55分）暂缓推进</strong>，统一呈现在候选人列表、Pipeline 看板与
          Dashboard 优先级矩阵中。
        </p>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">
          AI 未来如何辅助资料搜集、自动标签、摘要、评分解释和推荐
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          当前原型中的评分、标签与推荐内容均为人工/仿真设定，以下是面向未来的产品构想（非本次实现范围）：
        </p>
        <ul className="text-sm text-gray-700 leading-relaxed list-disc list-inside space-y-1.5">
          <li>
            <strong>资料搜集</strong>：自动抓取企业公开新闻、财报摘要、招聘信息等，辅助更新企业画像字段
          </li>
          <li>
            <strong>自动标签</strong>：基于企业介绍与新闻语料，用大模型自动生成标签（如&ldquo;出海标杆&rdquo;
            &ldquo;AI转型&rdquo;），减少人工打标签成本
          </li>
          <li>
            <strong>摘要生成</strong>：将冗长的企业背景资料自动压缩为 3-5 句话的候选人速览，
            供面试官快速阅读
          </li>
          <li>
            <strong>评分解释</strong>：基于抓取到的公开信息自动生成六维度评分初稿及对应文字理由，
            替代人工逐项打分的重复劳动
          </li>
          <li>
            <strong>智能推荐</strong>：基于候选人画像自动推荐匹配的课程模块、私访主题、同班企业家
            类型与 Next Best Action，辅助招生顾问制定个性化沟通策略
          </li>
        </ul>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">AI 结果必须由人工审核</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          上述 AI 辅助能力（资料搜集、自动标签、摘要、评分解释、推荐）产出的均是<strong>初稿</strong>，
          而非最终结论。任何进入正式招生决策——包括录取评审、评分发布、对外沟通话术——的内容，
          都必须经过招生运营人员或行业研究人员的人工审核与确认后才能生效。AI 在本产品中的定位是
          效率工具，不替代人工判断，尤其涉及真实企业与个人的信息时，人工审核是不可省略的合规
          与质量控制环节。
        </p>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">数据真实性及隐私合规说明</h2>
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
          本页面为面试产品原型。姓名、公司、职位和所属板块来源于公开海报；经营数据、评分、
          联系记录、招生状态及推荐内容均为仿真数据。
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          本原型中 10 位候选人的姓名、所在公司、职位与所属板块取自青腾官方发布的公开校友名录
          海报，这部分信息真实且可核实。除此之外的所有字段——包括企业阶段、规模、融资状态、
          海外市场数量、数字化/AI/创新等评分维度、联系记录时间线、CRM 负责人、Next Best Action
          与内部时间戳——均为本次面试作业虚构生成的仿真数据，用于演示 CRM 产品的数据模型设计与
          Lead Score 建模思路。这样处理的原因：其一，面试作业的考察重点是产品思维与信息架构能力，
          而非真实商业情报的获取能力；其二，捏造或推测真实企业的经营数据、真实人物的联系方式存在
          事实风险与隐私风险，不符合数据使用的基本合规原则；其三，明确区分&ldquo;真实公开信息&rdquo;与
          &ldquo;仿真演示数据&rdquo;本身就是一种负责任的产品设计实践，值得在原型说明中如实呈现。
        </p>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">后续产品迭代方向</h2>
        <ul className="text-sm text-gray-700 leading-relaxed list-disc list-inside space-y-1.5">
          <li>接入真实 CRM / 数据库（如飞书多维表格、企业内部系统），替代当前的内存态演示数据</li>
          <li>
            与企业微信、腾讯会议等腾讯生态内部工具做联系人去重与自动关联，减少重复录入
          </li>
          <li>引入真实的 AI 辅助评分：基于公开资料自动生成初稿评分与理由，人工复核后确认发布</li>
          <li>基于角色的多用户权限体系（行业研究人员 / 招生运营负责人 / 项目经理 / 评审人员）</li>
          <li>招生漏斗增加转化率与流转时长统计，辅助识别流程瓶颈阶段</li>
          <li>候选人详情页增加附件管理（如企业介绍PDF、面试记录音频转写）</li>
        </ul>
      </section>

      <section className={SECTION_CLASS}>
        <h2 className="text-base font-semibold text-gray-900">3 分钟面试演示路径</h2>
        <ol className="text-sm text-gray-700 leading-relaxed list-decimal list-inside space-y-1.5">
          <li>
            <strong>招生驾驶舱（30秒）</strong>：从 4 张顶部统计卡切入，说明&ldquo;候选人总数 / A级优先
            候选人数 / 待跟进事项 / 已进入面试人数&rdquo;如何一眼呈现全局，并点击任意卡片演示自动跳转到
            CRM 并应用筛选
          </li>
          <li>
            <strong>产业赛道分布 + 优先级矩阵（30秒）</strong>：说明横向条形图与&ldquo;企业影响力 ×
            招生可转化程度&rdquo;矩阵如何辅助资源分配决策
          </li>
          <li>
            <strong>企业家人才库 CRM（60秒）</strong>：演示搜索、产业板块/招生阶段/优先级筛选、按
            Lead Score 排序、导出 CSV，并点击一行进入候选人详情
          </li>
          <li>
            <strong>候选人详情（60秒）</strong>：依次展示基础档案 → 企业画像 → 企业家画像 → 青腾
            匹配建议 → Lead Score 评分雷达与分项原因 → Next Best Action 与联系记录时间线，现场
            演示&ldquo;记录跟进&rdquo;
          </li>
          <li>
            <strong>招生流程 Pipeline（20秒）</strong>：切换到看板视图，说明 8 个阶段如何呈现招生
            全流程的分布与流转
          </li>
        </ol>
      </section>
    </div>
  );
}
