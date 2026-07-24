import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import DisclaimerBanner from "@/components/DisclaimerBanner";

export const metadata: Metadata = {
  title: "青腾企业家人才洞察与招生CRM",
  description: "北大-青腾未来产业学堂数实融合班 · 企业家人才洞察与招生CRM 产品原型（面试作业演示）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NavBar />
        <DisclaimerBanner />
        <main className="flex-1 mx-auto w-full max-w-[1440px] px-6 py-6">
          {children}
        </main>
        <footer className="border-t border-[var(--color-border)] py-4">
          <div className="mx-auto max-w-[1440px] px-6 text-xs text-muted flex justify-between">
            <span>青腾企业家人才洞察与招生CRM · 面试作业演示产品</span>
            <span>数据来源：公开资料整理 + 面试作业仿真数据</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
