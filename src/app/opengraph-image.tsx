import { ImageResponse } from "next/og";

/**
 * Site-wide social share image, generated at build time.
 *
 * The metadata previously pointed at `/og-image.png`, which was never added to
 * `public/` — so every share of every page rendered without an image. Generating
 * it here means there is nothing to forget to upload.
 */

export const alt = "Track Opinion — Global Market Research & Online Panel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0d1b3e 0%, #16336b 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Concentric rings, echoing the panel-reach motif used on the site */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 520,
            height: 520,
            borderRadius: 520,
            border: "2px solid rgba(26,111,232,0.35)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 360,
            height: 360,
            borderRadius: 360,
            border: "2px solid rgba(26,111,232,0.25)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#7aa9f0",
              fontWeight: 600,
            }}
          >
            Track Opinion
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.1,
              fontWeight: 800,
              color: "#ffffff",
              maxWidth: 880,
            }}
          >
            Global Market Research &amp; Online Panel
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.72)", maxWidth: 820 }}>
            4.5 million panel members. 60+ languages. End-to-end custom research.
          </div>
        </div>

        {/* Bars, matching the chart motif in the blog fallback image */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 72 }}>
          {[28, 44, 58, 72].map((h) => (
            <div
              key={h}
              style={{
                width: 40,
                height: h,
                borderRadius: 4,
                background: "#1a6fe8",
                display: "flex",
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
