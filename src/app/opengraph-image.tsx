import { ImageResponse } from "next/og";

export const alt = "Shashwat Singh · Engineer · AI/ML · Full-stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#ededed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "monospace",
            fontSize: 20,
            color: "#8a8a90",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#e8d5b7",
            }}
          />
          shashwat / singh
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 0.95,
              maxWidth: 1000,
            }}
          >
            Building thoughtful systems
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: "italic",
              color: "#e8d5b7",
              lineHeight: 1,
            }}
          >
            at the edge of AI and engineering.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 22,
            color: "#b4b4b8",
          }}
        >
          <div>Delhi, India</div>
          <div>shashwatsngh.work@gmail.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
