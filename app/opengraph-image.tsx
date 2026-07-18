import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Meet Jain — AI Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "linear-gradient(to right, #ffffff11 1px, transparent 1px), linear-gradient(to bottom, #ffffff11 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            color: "#8a8a8e",
            fontFamily: "monospace",
            marginBottom: 28,
          }}
        >
          meet@jain:~$
          <div style={{ width: 10, height: 26, backgroundColor: "#b8c4cc" }} />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontFamily: "monospace",
            fontWeight: 600,
            color: "#ededec",
            lineHeight: 1.05,
          }}
        >
          Meet Jain
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontFamily: "monospace",
            color: "#b8c4cc",
            marginTop: 24,
          }}
        >
          AI Engineer · Full Stack Developer
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontFamily: "monospace",
            color: "#4e4e52",
            marginTop: 12,
          }}
        >
          Building Intelligent Software
        </div>
      </div>
    ),
    { ...size },
  );
}
