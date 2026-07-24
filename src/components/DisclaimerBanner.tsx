export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs">
      <div className="mx-auto max-w-[1440px] px-6 py-1.5 flex items-start gap-2">
        <span aria-hidden className="text-amber-500 shrink-0">⚠</span>
        <p className="leading-snug">
          本页面为面试产品原型。姓名、公司、职位和所属板块来源于公开海报；经营数据、评分、联系记录、招生状态及推荐内容均为仿真数据。
        </p>
      </div>
    </div>
  );
}
