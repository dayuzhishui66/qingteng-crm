import type { Priority } from "@/data/types";
import { PRIORITY_LABELS } from "@/data/types";
import { PRIORITY_STYLES } from "@/lib/scoring";

export default function PriorityBadge({
  priority,
  variant = "full",
}: {
  priority: Priority;
  /** compact：仅字母徽标（表格等紧凑场景）；full：字母+说明（详情页等） */
  variant?: "compact" | "full";
}) {
  const style = PRIORITY_STYLES[priority];

  if (variant === "compact") {
    return (
      <span
        title={PRIORITY_LABELS[priority]}
        className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-semibold ${style.bg} ${style.text}`}
      >
        {priority}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
