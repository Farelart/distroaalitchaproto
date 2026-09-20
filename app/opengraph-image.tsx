import { ImageResponse } from "next/og";

export const alt = "Sillage — Find your people. Leave an impression.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#b8462e",
        color: "#fff8ee",
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        padding: "62px 72px",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700, letterSpacing: "-2px" }}>
        <span style={{ display: "flex", width: 44, height: 50, marginRight: 14, borderRadius: "17px 5px 17px 5px", background: "#fff8ee", color: "#b8462e", alignItems: "center", justifyContent: "center", fontSize: 39, fontWeight: 700, fontStyle: "italic" }}>s</span>
        sillage<span style={{ color: "#f5c49e" }}>.</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: 82 }}>
        <span style={{ color: "#f5c49e", fontSize: 17, letterSpacing: "2px", fontWeight: 600 }}>GOOD BRANDS. REAL PEOPLE.</span>
        <span style={{ fontSize: 72, lineHeight: 1.08, letterSpacing: "-4px", fontWeight: 600, marginTop: 24 }}>Find your people.<br />Leave an impression.</span>
        <span style={{ fontSize: 23, color: "#ffe7d9", marginTop: 27 }}>Creator connections built on good chemistry.</span>
      </div>

      <div style={{ display: "flex", position: "absolute", right: -88, bottom: -110, width: 420, height: 420, border: "2px solid #f5c49e", borderRadius: "50%", opacity: 0.7 }} />
      <div style={{ display: "flex", position: "absolute", right: 110, bottom: 48, width: 126, height: 126, background: "#e9b65c", color: "#3d2823", borderRadius: "50%", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 600, textAlign: "center" }}>made of<br />real<br />connections</div>
      <div style={{ display: "flex", position: "absolute", right: 72, top: 66, color: "#f5c49e", fontSize: 36 }}>✳</div>
    </div>,
    size
  );
}
