import { useState, useEffect } from "react";
import { RANK_META } from "@/types";

export const Scanlines = () => (
  <div style={{
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
    background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.022) 2px,rgba(0,0,0,0.022) 4px)"
  }} />
);

export function GlitchText({ text, style = {} }: { text: string; style?: React.CSSProperties }) {
  const [d, setD] = useState(text);
  const go = () => {
    const ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
    let i = 0;
    const iv = setInterval(() => {
      setD(text.split("").map((c, x) => x < i ? c : ch[Math.floor(Math.random() * ch.length)]).join(""));
      i++; if (i > text.length) { clearInterval(iv); setD(text); }
    }, 32);
  };
  return <span style={{ fontFamily: "'Courier New',monospace", cursor: "default", ...style }} onMouseEnter={go}>{d}</span>;
}

export function Typewriter({ text, speed = 26, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [d, setD] = useState("");
  useEffect(() => {
    let i = 0; setD("");
    const iv = setInterval(() => {
      setD(text.slice(0, i + 1)); i++;
      if (i >= text.length) { clearInterval(iv); onDone?.(); }
    }, speed);
    return () => clearInterval(iv);
  }, [text]);
  return <span>{d}<span style={{ color: "#00ff88", animation: "blink 1s step-end infinite" }}>_</span></span>;
}

export const Badge = ({ label, color }: { label: string; color: string }) => (
  <span style={{
    background: color + "18", border: "1px solid " + color + "55", color, fontSize: 9,
    fontFamily: "'Courier New',monospace", padding: "2px 8px", letterSpacing: 2,
    textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap"
  }}>{label}</span>
);

export const Dot = ({ color, size = 7 }: { color: string; size?: number }) => (
  <span style={{
    display: "inline-block", width: size, height: size, borderRadius: "50%", background: color,
    boxShadow: "0 0 5px " + color, animation: "pulse 2s ease-in-out infinite", marginRight: 6, flexShrink: 0
  }} />
);

export const Divider = ({ my = 18 }: { my?: number }) => (
  <div style={{ height: 1, background: "#0e1a22", margin: my + "px 0", opacity: 0.7 }} />
);

export function ClearancePill({ level }: { level: number }) {
  const m = RANK_META[level] || RANK_META[1];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, background: m.color + "10",
      border: "1px solid " + m.color + "44", padding: "3px 10px",
      fontFamily: "'Courier New',monospace", fontSize: 10, color: m.color, letterSpacing: 1, whiteSpace: "nowrap"
    }}>
      <Dot color={m.color} size={6} />CL-{level} — {m.label}
    </span>
  );
}

export const DocStamp = ({ text, color = "#8b1a1a" }: { text: string; color?: string }) => (
  <span style={{
    display: "inline-block", border: "2px solid " + color, padding: "3px 12px",
    transform: "rotate(-1.5deg)", color, fontFamily: "'Courier New',monospace",
    fontSize: 10, fontWeight: 900, letterSpacing: 4, opacity: 0.75, textTransform: "uppercase"
  }}>{text}</span>
);

export function Redacted({ text }: { text: string }) {
  const [r, setR] = useState(false);
  return (
    <span onClick={() => setR(!r)} style={{
      cursor: "pointer", background: r ? "transparent" : "#0a0a0a",
      color: r ? "#c8d6e5" : "#0a0a0a", border: r ? "none" : "1px solid #3a0a0a",
      padding: "0 4px", fontFamily: "'Courier New',monospace", userSelect: "none"
    }}>{r ? text : "[REDACTED]"}</span>
  );
}

export function Modal({ title, body, onConfirm, onCancel }: {
  title: string; body: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000000dd", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#060a0b", border: "1px solid #8b1a1a", padding: 32, fontFamily: "'Courier New',monospace", maxWidth: 420, width: "100%" }}>
        <div style={{ color: "#8b1a1a", fontSize: 11, letterSpacing: 3, marginBottom: 10 }}>{title}</div>
        <div style={{ color: "#3a5a6a", fontSize: 12, lineHeight: 1.7, marginBottom: 22 }}>{body}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onConfirm} style={{ ...btn("#8b1a1a"), flex: 1, padding: 10 }}>CONFIRM</button>
          <button onClick={onCancel} style={{ ...btn("#3a5a6a"), flex: 1, padding: 10 }}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}

export const CARD: React.CSSProperties = { background: "#060a0b", border: "1px solid #0e1a22", padding: 20 };
export const INP: React.CSSProperties = { background: "#030506", border: "1px solid #0e1a22", color: "#b0c4d4", padding: "8px 12px", fontFamily: "'Courier New',monospace", fontSize: 16, outline: "none", width: "100%", boxSizing: "border-box" };
export const LBL: React.CSSProperties = { color: "#1a3a4a", fontSize: 9, letterSpacing: 3, fontFamily: "'Courier New',monospace", display: "block", marginBottom: 5, textTransform: "uppercase" };
export const btn = (c = "#00ff88"): React.CSSProperties => ({ background: c + "08", border: "1px solid " + c + "28", color: c, padding: "7px 16px", fontFamily: "'Courier New',monospace", fontSize: 10, letterSpacing: 2, cursor: "pointer", textTransform: "uppercase", transition: "all 0.15s" });

export const PageWrap = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px 60px", minHeight: "100vh" }}>{children}</div>
);

export function SecHeader({ tag, title, sub, clearance }: { tag: string; title: string; sub?: string; clearance?: number }) {
  const m = clearance ? RANK_META[clearance] : null;
  return (
    <div style={{ marginBottom: 28, paddingBottom: 18, borderBottom: "1px solid #0e1a22" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 6 }}>D.A.V. // {tag}</div>
          <h2 style={{ color: "#c8d6e5", fontSize: 20, fontWeight: 900, letterSpacing: 3, margin: 0, textTransform: "uppercase", fontFamily: "'Courier New',monospace" }}>{title}</h2>
          {sub && <p style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 10, marginTop: 6, letterSpacing: 1 }}>{sub}</p>}
        </div>
        {m && (
          <div style={{ textAlign: "right", fontFamily: "'Courier New',monospace", flexShrink: 0 }}>
            <div style={{ color: "#1a3a2a", fontSize: 8, letterSpacing: 3 }}>REQUIRED ACCESS</div>
            <div style={{ color: m.color, fontSize: 12, fontWeight: 900, letterSpacing: 2, border: "1px solid " + m.color + "33", padding: "3px 10px", marginTop: 2 }}>
              CL-{clearance} — {m.label.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
