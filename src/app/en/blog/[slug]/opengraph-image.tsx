import { ImageResponse } from "next/og";

import { DATA } from "@/data";

export const runtime = "edge";
export const alt = `Blog Post - ${DATA.name}'s Blog`;
export const size = {
  width: 1200,
  height: 630,
};
export const author = `| ${DATA.name}'s Blog`;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = DATA.blogInfo[slug as keyof typeof DATA.blogInfo];

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #f5f5f5 0%, #e5e5e5 100%)",
            position: "relative",
          }}
        >
          {/* Subtle noise texture overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')",
              opacity: 0.1,
            }}
          />

          {/* Main content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "900px",
              padding: "80px 60px",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            {/* Z logo icon */}
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#000000",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  fontFamily: "serif",
                  letterSpacing: "-2px",
                }}
              >
                {DATA.blogCharacter}
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#2a2a2a",
                marginBottom: "24px",
                lineHeight: "1.2",
                textAlign: "center",
                maxWidth: "800px",
              }}
            >
              Blog Post
            </div>

            {/* Author */}
            <div
              style={{
                fontSize: "18px",
                color: "#888888",
                fontWeight: "500",
              }}
            >
              {author}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      },
    );
  }

  const title = post.title;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #f5f5f5 0%, #e5e5e5 100%)",
          position: "relative",
        }}
      >
        {/* Subtle noise texture overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')",
            opacity: 0.1,
          }}
        />

        {/* Main content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "900px",
            padding: "80px 60px",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Z logo icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#000000",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#ffffff",
                fontFamily: "serif",
                letterSpacing: "-2px",
              }}
            >
              {DATA.blogCharacter}
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              color: "#2a2a2a",
              marginBottom: "24px",
              lineHeight: "1.2",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {title}
          </div>

          {/* Author */}
          <div
            style={{
              fontSize: "18px",
              color: "#888888",
              fontWeight: "500",
            }}
          >
            {author}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
