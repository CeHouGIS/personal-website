"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const isChinese = pathname.startsWith("/zh");

  const handleLanguageToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetUrl = isChinese 
      ? pathname.replace("/zh", "") || "/"
      : "/zh" + pathname;
    
    router.push(targetUrl);
  };

  return (
    <Button
      variant="ghost" 
      type="button"
      size="icon"
      className="px-2"
      onClick={handleLanguageToggle}
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium">{isChinese ? "中" : "EN"}</span>
    </Button>
  );
}
