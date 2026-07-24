"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function StatCard({
  label,
  value,
  suffix,
  hint,
  icon,
  href,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  hint?: string;
  icon?: ReactNode;
  href?: string;
}) {
  const router = useRouter();
  const clickable = Boolean(href);

  return (
    <div
      onClick={clickable ? () => router.push(href!) : undefined}
      className={`bg-surface border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-2 ${
        clickable ? "cursor-pointer hover:border-primary hover:shadow-sm transition-all" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        {icon && <span className="text-primary">{icon}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-gray-900">{value}</span>
        {suffix && <span className="text-sm text-muted">{suffix}</span>}
      </div>
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  );
}
