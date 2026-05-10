import { useState } from "react";
import { RANK_META, NAV_LINKS, DISCORD, GAME, canManage, type Session } from "@/types";
import { Dot, ClearancePill, btn } from "@/components/Primitives";

type Page = string;

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  session: Session | null;
  onLogout: () => void;
}

export default function Navbar({ page, setPage, session, onLogout }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const m = session ? (RANK_META[session.level] || RANK_META[1]) : null;
  const go = (p: Page) => { setPage(p); setOpen(false); };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(4,6,8,0.97)", borderBottom: "1px solid #0e1422", backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", height: 54, justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }} onClick={() => go("Home")}>
          <div style={{ width: 30, height: 30, border: "1px solid #00ff8855", display: "flex", alignItems: "center", justifyContent: "center", background: "#00ff8808" }}>
            <span style={{ color: "#00ff88", fontSize: 9, fontWeight: 900, fontFamily: "'Courier New',monospace" }}>DAV</span>
          </div>
          <div>
            <div style={{ color: "#c8d6e5", fontSize: 11, fontWeight: 700, letterSpacing: 4, fontFamily: "'Courier New',monospace", lineHeight: 1 }}>D.A.V.</div>
            <div style={{ color: "#1a3a2a", fontSize: 7, letterSpacing: 2, fontFamily: "'Courier New',monospace" }}>CLASSIFIED DATABASE</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {session && m ? (
            <div onClick={() => go("Portal")} style={{ cursor: "pointer", border: "1px solid " + m.color + "33", padding: "4px 8px", fontFamily: "'Courier New',monospace", fontSize: 9, color: m.color, background: m.color + "06", display: "flex", alignItems: "center", gap: 4 }}>
              <Dot color={m.color} size={5} />{"CL-" + session.level}
            </div>
          ) : (
            <button onClick={() => go("Login")} style={{ background: "#00ff8810", border: "1px solid #00ff8844", color: "#00ff88", padding: "6px 14px", cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: 2, fontWeight: 700 }}>
              LOGIN
            </button>
          )}
          <button onClick={() => setOpen(o => !o)} style={{ background: "transparent", border: "1px solid #1a3a2a", color: "#3a5a6a", padding: "6px 12px", cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 14, lineHeight: 1 }}>
            {open ? "✕" : "≡"}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ background: "#040608", borderTop: "1px solid #0e1422", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => go(n)} style={{ background: page === n ? "#00ff8808" : "transparent", border: "none", borderLeft: page === n ? "2px solid #00ff88" : "2px solid transparent", color: page === n ? "#00ff88" : "#3a5a6a", fontSize: 11, letterSpacing: 2, padding: "10px 12px", cursor: "pointer", fontFamily: "'Courier New',monospace", textTransform: "uppercase", textAlign: "left" }}>{n}</button>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            <a href={DISCORD} target="_blank" rel="noreferrer" style={{ ...btn("#5865F2"), padding: "8px 14px", fontSize: 10, textDecoration: "none" }}>DISCORD</a>
            <a href={GAME} target="_blank" rel="noreferrer" style={{ ...btn("#c47a1e"), padding: "8px 14px", fontSize: 10, textDecoration: "none" }}>PLAY ROBLOX</a>
          </div>
          <div style={{ marginTop: 8, borderTop: "1px solid #0e1422", paddingTop: 8 }}>
            {session && m ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <ClearancePill level={session.level} />
                <button onClick={() => go("Portal")} style={{ ...btn(m.color), padding: "6px 12px", fontSize: 9 }}>MY PORTAL</button>
                {canManage(session.level) && (
                  <>
                    <button onClick={() => go("EventManager")} style={{ ...btn("#00ff88"), padding: "6px 12px", fontSize: 9 }}>EVENTS</button>
                    <button onClick={() => go("AnnManager")} style={{ ...btn("#c47a1e"), padding: "6px 12px", fontSize: 9 }}>BROADCASTS</button>
                    <button onClick={() => go("UserManager")} style={{ ...btn("#3a5a6a"), padding: "6px 12px", fontSize: 9 }}>USERS</button>
                  </>
                )}
                <button onClick={() => { onLogout(); setOpen(false); }} style={{ ...btn("#8b1a1a"), padding: "6px 12px", fontSize: 9 }}>LOGOUT</button>
              </div>
            ) : (
              <button onClick={() => go("Login")} style={{ ...btn("#00ff88"), padding: "8px 16px", fontSize: 10 }}>PERSONNEL LOGIN</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
