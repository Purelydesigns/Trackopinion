import { ImageResponse } from "next/og";

/**
 * Home-screen icon for iOS. The metadata pointed at `/apple-touch-icon.png`,
 * which did not exist; generating it removes the 404.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d1b3e 0%, #16336b 100%)",
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: -4,
        }}
      >
        TO
      </div>
    ),
    size,
  );
}
