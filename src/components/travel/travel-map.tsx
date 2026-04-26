"use client";

import maplibregl from "maplibre-gl";
import { Protocol } from "pmtiles";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import "maplibre-gl/dist/maplibre-gl.css";

import { FALLBACK_COLOR, YEAR_COLORS } from "./year-colors";

interface TripProperties {
  name: string;
  year?: number;
  date?: string;
  description?: string;
  emoji?: string;
  photo?: string;
  kind?: "place" | "trajectory";
}

export interface TravelMapHandle {
  flyTo: (coords: [number, number], zoom?: number) => void;
}

interface TravelMapProps {
  data: GeoJSON.FeatureCollection | null;
}

const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

function buildYearColorExpression(): maplibregl.ExpressionSpecification {
  const expr: unknown[] = ["match", ["get", "year"]];
  for (const [year, color] of Object.entries(YEAR_COLORS)) {
    expr.push(Number(year), color);
  }
  expr.push(FALLBACK_COLOR);
  return expr as maplibregl.ExpressionSpecification;
}

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
        id: "place_labels",
        type: "symbol",
        source: "protomaps",
        "source-layer": "places",
        layout: {
          "text-field": ["get", "name"] as maplibregl.ExpressionSpecification,
          "text-font": ["Noto Sans Regular"],
          "text-size": 12,
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

export const TravelMap = forwardRef<TravelMapHandle, TravelMapProps>(
  function TravelMap({ data }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selected, setSelected] = useState<TripProperties | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        flyTo: (coords, zoom = 5) => {
          mapRef.current?.flyTo({
            center: coords,
            zoom,
            essential: true,
            duration: 1000,
          });
        },
      }),
      [],
    );

    useEffect(() => {
      if (!containerRef.current || mapRef.current) return;

      const pmtilesUrl = process.env.NEXT_PUBLIC_PMTILES_URL;
      let pmProtocol: InstanceType<typeof Protocol> | null = null;
      if (pmtilesUrl) {
        pmProtocol = new Protocol();
        try {
          maplibregl.addProtocol("pmtiles", pmProtocol.tile.bind(pmProtocol));
        } catch {
          /* already registered */
        }
      }

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: pmtilesUrl ? buildPmtilesStyle(pmtilesUrl) : OPENFREEMAP_STYLE,
        center: [60, 25],
        zoom: 1.5,
        attributionControl: { compact: true },
      });

      mapRef.current = map;
      map.addControl(new maplibregl.NavigationControl(), "top-right");
      map.addControl(new maplibregl.FullscreenControl(), "top-right");

      map.on("load", () => {
        const colorExpr = buildYearColorExpression();

        map.addSource("trips", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });

        // Flight / default routes — dashed straight line (also used while
        // OSRM enrichment is pending)
        map.addLayer({
          id: "trip-lines-flight",
          type: "line",
          source: "trips",
          filter: [
            "all",
            ["==", ["geometry-type"], "LineString"],
            ["!=", ["get", "mode"], "drive"],
          ] as unknown as maplibregl.ExpressionSpecification,
          paint: {
            "line-color": colorExpr,
            "line-width": 2,
            "line-dasharray": [4, 3],
            "line-opacity": 0.75,
          },
        });

        // Drive routes — solid, slightly thicker; geometry is replaced
        // with the actual OSRM road path once enrichment completes.
        map.addLayer({
          id: "trip-lines-drive",
          type: "line",
          source: "trips",
          filter: [
            "all",
            ["==", ["geometry-type"], "LineString"],
            ["==", ["get", "mode"], "drive"],
          ] as unknown as maplibregl.ExpressionSpecification,
          paint: {
            "line-color": colorExpr,
            "line-width": 3,
            "line-opacity": 0.9,
          },
        });

        // Halo behind point markers
        map.addLayer({
          id: "trip-points-halo",
          type: "circle",
          source: "trips",
          filter: ["==", "$type", "Point"] as unknown as maplibregl.ExpressionSpecification,
          paint: {
            "circle-color": "#ffffff",
            "circle-radius": 9,
          },
        });

        // Points: year-colored dots
        map.addLayer({
          id: "trip-points",
          type: "circle",
          source: "trips",
          filter: ["==", "$type", "Point"] as unknown as maplibregl.ExpressionSpecification,
          paint: {
            "circle-color": colorExpr,
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
          const f = map.queryRenderedFeatures(e.point, {
            layers: ["trip-points"],
          });
          if (f.length === 0) setSelected(null);
        });

        map.on("mouseenter", "trip-points", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "trip-points", () => {
          map.getCanvas().style.cursor = "";
        });

        setMapLoaded(true);
      });

      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
        setMapLoaded(false);
        if (pmProtocol) {
          try {
            maplibregl.removeProtocol("pmtiles");
          } catch {
            /* ignore */
          }
        }
      };
    }, []);

    // Sync data into the source when either map is ready or data changes
    useEffect(() => {
      if (!mapLoaded || !data || !mapRef.current) return;
      const src = mapRef.current.getSource("trips") as
        | maplibregl.GeoJSONSource
        | undefined;
      src?.setData(data);
    }, [mapLoaded, data]);

    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl border">
        <div ref={containerRef} className="h-full w-full" />

        {selected && (
          <div className="absolute bottom-4 left-4 z-10 w-72 rounded-xl border bg-background/95 p-4 shadow-xl backdrop-blur-sm">
            <button
              type="button"
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
              <p className="text-muted-foreground mt-0.5 text-xs">
                {selected.date}
              </p>
            )}
            {selected.photo && (
              <img
                src={selected.photo}
                alt={selected.name}
                className="mt-2 h-36 w-full rounded-lg object-cover"
              />
            )}
            {selected.description && (
              <p className="mt-2 text-sm leading-relaxed">
                {selected.description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);
