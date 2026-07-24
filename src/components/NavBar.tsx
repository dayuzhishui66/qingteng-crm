"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "招生驾驶舱 Dashboard" },
  { href: "/candidates", label: "企业家人才库 CRM" },
  { href: "/pipeline", label: "招生流程 Pipeline" },
  { href: "/about", label: "产品说明 About" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-30">
      <div className="mx-auto max-w-[1440px] px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            青
          </div>
          <div>
            <p className="font-semibold text-[15px] leading-tight">青腾企业家人才洞察与招生CRM</p>
            <p className="text-xs text-muted leading-tight">数实融合班 · 招生运营原型</p>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-light text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
