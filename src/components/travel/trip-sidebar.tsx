"use client";

import { useTranslations } from "next-intl";

import { colorForYear } from "./year-colors";

interface TripProperties {
  name: string;
  year?: number;
  date?: string;
  description?: string;
  emoji?: string;
  kind?: "place" | "trajectory";
}

interface TripSidebarProps {
  data: GeoJSON.FeatureCollection | null;
  onSelect: (feature: GeoJSON.Feature) => void;
}

export function TripSidebar({ data, onSelect }: TripSidebarProps) {
  const t = useTranslations("travel");

  if (!data) {
    return (
      <div className="text-muted-foreground p-4 text-sm">{t("loading")}</div>
    );
  }

  const groups = new Map<number, GeoJSON.Feature[]>();
  for (const f of data.features) {
    const props = (f.properties ?? {}) as TripProperties;
    const year = props.year ?? 0;
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(f);
  }

  const sortedYears = [...groups.keys()].sort((a, b) => b - a);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">
          {t("timeline")}
        </h2>
        <span className="text-muted-foreground text-xs">
          {data.features.length}
        </span>
      </div>

      <ol className="flex-1 space-y-5 overflow-y-auto p-3">
        {sortedYears.map((year) => (
          <li key={year}>
            <div className="mb-2 flex items-center gap-2 px-1">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: colorForYear(year) }}
              />
              <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                {year || "—"}
              </span>
            </div>
            <ul className="space-y-1.5">
              {groups.get(year)!.map((f, idx) => {
                const props = (f.properties ?? {}) as TripProperties;
                const isPoint = f.geometry.type === "Point";
                return (
                  <li key={`${year}-${idx}`}>
                    <button
                      type="button"
                      onClick={() => onSelect(f)}
                      className="hover:bg-accent group flex w-full items-start gap-2.5 rounded-lg border bg-background px-3 py-2 text-left transition-colors"
                    >
                      <span
                        className="mt-1.5 size-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor: colorForYear(props.year),
                          boxShadow: isPoint ? "none" : "inset 0 0 0 1px white",
                        }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          {props.emoji && (
                            <span className="text-sm leading-none">
                              {props.emoji}
                            </span>
                          )}
                          <span className="truncate text-sm font-medium">
                            {props.name}
                          </span>
                        </span>
                        {props.date && (
                          <span className="text-muted-foreground mt-0.5 block text-xs">
                            {props.date}
                          </span>
                        )}
                        <span className="text-muted-foreground/70 mt-0.5 block text-[10px] uppercase tracking-wider">
                          {isPoint ? "point" : "trajectory"}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
