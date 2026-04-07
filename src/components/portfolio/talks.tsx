"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { ResumeCard } from "@/components/portfolio/resume-card";
import { Button } from "@/components/ui/button";

interface Talk {
  host: string;
  title: string;
  date: string;
  url?: string;
  logoUrl?: string;
}

interface TalksProps {
  talks: readonly Talk[];
  delay?: number;
  showAllText?: string;
}

const DEFAULT_DISPLAY_COUNT = 5;

export default function Talks({ talks, delay = 0, showAllText = "Show All" }: TalksProps) {
  const [showAll, setShowAll] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort talks by date (newest first)
  const sortedTalks = [...talks].sort((a, b) => {
    // Convert "Mon. YYYY" format to "YYYYMM" for proper date comparison
    const monthMap: Record<string, string> = {
      "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
      "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
      "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };
    
    const parseDate = (dateStr: string) => {
      const parts = dateStr.split(". ");
      const month = monthMap[parts[0]] || "00";
      const year = parts[1] || "0000";
      return year + month;
    };
    
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.localeCompare(dateA);
  });

  // Show latest items by default, or all if showAll is true
  const displayedTalks = showAll
    ? sortedTalks
    : sortedTalks.slice(0, DEFAULT_DISPLAY_COUNT);
  const hasMoreTalks = sortedTalks.length > DEFAULT_DISPLAY_COUNT;

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex min-h-0 flex-col gap-y-3">
        {sortedTalks.slice(0, DEFAULT_DISPLAY_COUNT).map((talk) => (
          <ResumeCard
            key={talk.host + talk.date}
            href={talk.url}
            logoUrl={talk.logoUrl || ""}
            altText={talk.host}
            title={talk.host}
            subtitle={talk.title}
            period={talk.date}
            useMarkdown={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-col gap-y-3">
      {displayedTalks.map((talk) => (
        <ResumeCard
          key={talk.host + talk.date}
          href={talk.url}
          logoUrl={talk.logoUrl || ""}
          altText={talk.host}
          title={talk.host}
          subtitle={talk.title}
          period={talk.date}
          useMarkdown={true}
        />
      ))}
      {hasMoreTalks && !showAll && (
        <div className="flex justify-center pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(true)}
            className="flex items-center gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            {showAllText}
          </Button>
        </div>
      )}
    </div>
  );
}
