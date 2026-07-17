import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
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
          padding: "72px",
          background:
            "linear-gradient(135deg, #122457 0%, #16398f 45%, #0f4de1 100%)",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Top row: badge + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "96px",
              height: "96px",
              borderRadius: "999px",
              background: "#0b1a40",
            }}
          >
            <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
              <g
                stroke="#f5b301"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M7.5 33h33" />
                <path d="M17 33V12.5" />
                <path d="M31 33V12.5" />
                <path d="M17 12.5Q24 27 31 12.5" />
                <path d="M17 12.5Q10 21.5 7.5 32" />
                <path d="M31 12.5Q38 21.5 40.5 32" />
              </g>
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "34px", fontWeight: 800 }}>
              {siteConfig.name}
            </span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "2px",
                color: "#bcdcff",
                textTransform: "uppercase",
              }}
            >
              Licensed · Local · Free
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <span style={{ fontSize: "74px", fontWeight: 800, lineHeight: 1.05 }}>
            Pittsburgh&apos;s #1 way to
          </span>
          <span style={{ fontSize: "74px", fontWeight: 800, lineHeight: 1.05 }}>
            <span style={{ color: "#ffcc4d" }}>compare &amp; get</span>
            <span>&nbsp;insurance</span>
          </span>
          <span style={{ fontSize: "30px", color: "#d9ebff", marginTop: "8px" }}>
            Home · Auto · Life · Health · Medicare · Disability · Business
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "30px", fontWeight: 700, color: "#ffffff" }}>
            pittsburghinsurancehub.com
          </span>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 700,
              background: "rgba(255,255,255,0.12)",
              padding: "14px 28px",
              borderRadius: "999px",
            }}
          >
            {siteConfig.phone}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
