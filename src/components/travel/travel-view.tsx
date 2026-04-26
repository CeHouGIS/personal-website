"use client";

import { useEffect, useRef, useState } from "react";

import { MusicPlayer } from "./music-player";
import { TravelMap, type TravelMapHandle } from "./travel-map";
import { TripSidebar } from "./trip-sidebar";

export function TravelView() {
  const [data, setData] = useState<GeoJSON.FeatureCollection | null>(null);
  const mapRef = useRef<TravelMapHandle>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/trips.geojson")
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setData(d as GeoJSON.FeatureCollection);
      })
      .catch((err) => console.error("[TravelView] failed to load trips:", err));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelect = (feature: GeoJSON.Feature) => {
    let coords: [number, number] | null = null;
    if (feature.geometry.type === "Point") {
      const c = feature.geometry.coordinates;
      coords = [c[0], c[1]];
    } else if (feature.geometry.type === "LineString") {
      const line = feature.geometry.coordinates;
      const mid = line[Math.floor(line.length / 2)];
      coords = [mid[0], mid[1]];
    }
    if (coords) {
      const zoom = feature.geometry.type === "LineString" ? 3 : 5;
      mapRef.current?.flyTo(coords, zoom);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_320px]">
        <div className="h-[65vh] min-h-[420px]">
          <TravelMap ref={mapRef} data={data} />
        </div>
        <div className="bg-card h-[65vh] min-h-[420px] overflow-hidden rounded-xl border">
          <TripSidebar data={data} onSelect={handleSelect} />
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}
