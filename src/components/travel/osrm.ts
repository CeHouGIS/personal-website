// OSRM public demo server — for development use only.
// Docs: https://project-osrm.org/docs/v5.24.0/api/#general-options
const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";
const CACHE_PREFIX = "osrm-cache-v1:";
const CACHE_FAIL = "__no_route__";

interface TripFeatureProps {
  mode?: "drive" | "flight";
  [key: string]: unknown;
}

/**
 * Replace LineString geometries marked with `mode: "drive"` with a real
 * road path fetched from OSRM. Other features pass through unchanged.
 * On any failure (no route, network error), keeps the original geometry.
 */
export async function enrichDriveRoutes(
  fc: GeoJSON.FeatureCollection,
): Promise<GeoJSON.FeatureCollection> {
  const features = await Promise.all(
    fc.features.map(async (f) => {
      const props = (f.properties ?? {}) as TripFeatureProps;
      if (f.geometry.type !== "LineString" || props.mode !== "drive") {
        return f;
      }
      const geom = await fetchDrivingGeometry(f.geometry.coordinates);
      if (!geom) return f;
      return { ...f, geometry: geom } as GeoJSON.Feature;
    }),
  );
  return { ...fc, features };
}

async function fetchDrivingGeometry(
  coords: number[][],
): Promise<GeoJSON.LineString | null> {
  if (coords.length < 2) return null;
  const path = coords.map((c) => `${c[0]},${c[1]}`).join(";");
  const cacheKey = `${CACHE_PREFIX}${path}`;

  if (typeof window !== "undefined") {
    const cached = window.localStorage.getItem(cacheKey);
    if (cached === CACHE_FAIL) return null;
    if (cached) {
      try {
        return JSON.parse(cached) as GeoJSON.LineString;
      } catch {
        /* corrupted cache entry */
      }
    }
  }

  const url = `${OSRM_BASE}/${path}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data?.code === "Ok" && data.routes?.[0]?.geometry) {
        const geom = data.routes[0].geometry as GeoJSON.LineString;
        cacheSet(cacheKey, JSON.stringify(geom));
        return geom;
      }
    }
    cacheSet(cacheKey, CACHE_FAIL);
    return null;
  } catch (err) {
    console.warn("[OSRM] fetch failed:", err);
    return null;
  }
}

function cacheSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* quota exceeded — fine to skip */
  }
}
