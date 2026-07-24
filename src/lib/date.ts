// 本地日期字符串（YYYY-MM-DD），避免 toISOString() 在 UTC+8 等时区下产生的日期偏移。
export function todayLocal(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 在今天的基础上加 N 天，返回 YYYY-MM-DD（用于"待跟进事项"截止窗口判断）。 */
export function addDaysLocal(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
