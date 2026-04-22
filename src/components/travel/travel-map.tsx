"use client";

import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import { useEffect, useRef, useState } from "react";

import "maplibre-gl/dist/maplibre-gl.css";

interface TripProperties {
  name: string;
  date?: string;
  description?: string;
  emoji?: string;
  photo?: string;
  type?: string;
}

// OpenFreeMap: free vector tiles, no API key required — used as the default basemap.
// Set NEXT_PUBLIC_PMTILES_URL (e.g. pmtiles://https://your-r2-bucket.r2.dev/basemap.pmtiles)
// to switch to a self-hosted Protomaps basemap.
const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

function buildPmtilesStyle(url: string): maplibregl.StyleSpecification {
  return {
    version: 8,
    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
    sprite:
      "https://protomaps.github.io/basemaps-assets/sprites/v4/light/sprites",
    sources: {
      protomaps: {
        type: "vector",
        url,
        attribution:
          '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "#f2ede8" },
      },
      {
        id: "earth",
        type: "fill",
        source: "protomaps",
        "source-layer": "earth",
        paint: { "fill-color": "#e8dfd5" },
      },
      {
        id: "water",
        type: "fill",
        source: "protomaps",
        "source-layer": "water",
        paint: { "fill-color": "#a8c8e0" },
      },
      {
        id: "landuse_park",
        type: "fill",
        source: "protomaps",
        "source-layer": "landuse",
        filter: ["==", ["get", "pmap:kind"], "park"] as maplibregl.ExpressionSpecification,
        paint: { "fill-color": "#c8ddb8", "fill-opacity": 0.6 },
      },
      {
        id: "roads",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        paint: {
          "line-color": "#ffffff",
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0.3,
            12,
            2,
          ] as maplibregl.ExpressionSpecification,
        },
      },
      {
        id: "buildings",
        type: "fill",
        source: "protomaps",
        "source-layer": "buildings",
        minzoom: 14,
        paint: { "fill-color": "#d4cab8", "fill-opacity": 0.8 },
      },
      {
        id: "place_labels",
        type: "symbol",
        source: "protomaps",
        "source-layer": "places",
        layout: {
          "text-field": ["get", "name"] as maplibregl.ExpressionSpecification,
          "text-font": ["Noto Sans Regular"],
          "text-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            3,
            9,
            10,
            14,
          ] as maplibregl.ExpressionSpecification,
          "text-max-width": 8,
          "text-anchor": "center",
        },
        paint: {
          "text-color": "#444444",
          "text-halo-color": "#f2ede8",
          "text-halo-width": 1.5,
        },
      },
    ],
  };
}

export function TravelMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selected, setSelected] = useState<TripProperties | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const pmtilesUrl = process.env.NEXT_PUBLIC_PMTILES_URL;
    let pmProtocol: InstanceType<typeof Protocol> | null = null;

    if (pmtilesUrl) {
      pmProtocol = new Protocol();
      try {
        maplibregl.addProtocol("pmtiles", pmProtocol.tile.bind(pmProtocol));
      } catch {
        /* protocol already registered during HMR */
      }
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: pmtilesUrl ? buildPmtilesStyle(pmtilesUrl) : OPENFREEMAP_STYLE,
      center: [105, 28],
      zoom: 2.8,
      attributionControl: { compact: true },
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.on("load", async () => {
      try {
        const res = await fetch("/data/trips.geojson");
        const geojson = (await res.json()) as GeoJSON.FeatureCollection;

        map.addSource("trips", { type: "geojson", data: geojson });

        // Dashed route arcs
        map.addLayer({
          id: "trip-lines",
          type: "line",
          source: "trips",
          filter: ["==", "$type", "LineString"] as maplibregl.ExpressionSpecification,
          paint: {
            "line-color": "#ef4444",
            "line-width": 1.5,
            "line-dasharray": [4, 3],
            "line-opacity": 0.65,
          },
        });

        // White halo behind markers
        map.addLayer({
          id: "trip-points-halo",
          type: "circle",
          source: "trips",
          filter: ["==", "$type", "Point"] as maplibregl.ExpressionSpecification,
          paint: {
            "circle-color": "#ffffff",
            "circle-radius": 9,
            "circle-opacity": 0.9,
          },
        });

        // Filled markers
        map.addLayer({
          id: "trip-points",
          type: "circle",
          source: "trips",
          filter: ["==", "$type", "Point"] as maplibregl.ExpressionSpecification,
          paint: {
            "circle-color": "#ef4444",
            "circle-radius": 6,
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": 2,
          },
        });

        map.on("click", "trip-points", (e) => {
          const feature = e.features?.[0];
          if (!feature) return;
          setSelected(feature.properties as TripProperties);
          map.easeTo({
            center: e.lngLat,
            zoom: Math.max(map.getZoom(), 5),
            duration: 500,
          });
        });

        map.on("click", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["trip-points"],
          });
          if (features.length === 0) setSelected(null);
        });

        map.on("mouseenter", "trip-points", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "trip-points", () => {
          map.getCanvas().style.cursor = "";
        });
      } catch (err) {
        console.error("[TravelMap] Failed to load trips data:", err);
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      if (pmProtocol) {
        try {
          maplibregl.removeProtocol("pmtiles");
        } catch {
          /* ignore */
        }
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border">
      <div ref={containerRef} className="h-full w-full" />

      {selected && (
        <div className="absolute bottom-4 left-4 z-10 w-72 rounded-xl border bg-background/95 p-4 shadow-xl backdrop-blur-sm">
          <button
            className="text-muted-foreground hover:text-foreground absolute right-3 top-3 text-sm leading-none"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="flex items-center gap-2">
            {selected.emoji && (
              <span className="text-xl leading-none">{selected.emoji}</span>
            )}
            <h3 className="font-semibold">{selected.name}</h3>
          </div>

          {selected.date && (
            <p className="text-muted-foreground mt-0.5 text-xs">{selected.date}</p>
          )}

          {selected.photo && (
            <img
              src={selected.photo}
              alt={selected.name}
              className="mt-2 h-36 w-full rounded-lg object-cover"
            />
          )}

          {selected.description && (
            <p className="mt-2 text-sm leading-relaxed">{selected.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
