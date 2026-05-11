import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Session, type Announcement, type GameEvent, DISCORD, GAME, RANK_META } from "@/types";
import { prioColor, evStatColor, evTypeColor, fmtDate } from "@/lib/helpers";
import { Typewriter, GlitchText, Badge, Dot, Divider, CARD, btn } from "@/components/Primitives";

interface HomePageProps {
  setPage: (p: string) => void;
  session: Session | null;
}

export default function HomePage({ setPage, session }: HomePageProps) {
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);
  const [anns, setAnns] = useState<Announcement[]>([]);
  const [evs, setEvs] = useState<GameEvent[]>([]);

  useEffect(() => {
    const uq = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    const unsub1 = onSnapshot(uq, s => setAnns(s.docs.map(d => ({ id: d.id, ...d.data() } as Announcement)).filter(a => a.published)));
    const eq = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsub2 = onSnapshot(eq, s => setEvs(s.docs.map(d => ({ id: d.id, ...d.data() } as GameEvent)).filter(e => e.published && (e.status === "Upcoming" || e.status === "Ongoing"))));
    return () => { unsub1(); unsub2(); };
  }, []);

  const lines = [
    "ESTABLISHING SECURE CONNECTION TO DAV CENTRAL DATABASE...",
    "VERIFYING TERMINAL INTEGRITY...",
    "CROSS-REFERENCING OPERATOR CREDENTIALS...",
    "CONNECTION ESTABLISHED. WELCOME, OPERATIVE.",
  ];

  useEffect(() => {
    if (!done && phase < lines.length - 1) {
      const t = setTimeout(() => setPhase(p => p + 1), 1200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, done]);

  return (
    <div>
      {/* Hero terminal */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at 50% 35%,#050d08 0%,#050709 55%,#030405 100%)", position: "relative", padding: "80px 20px 40px" }}>
        <div style={{ width: "100%", maxWidth: 640, zIndex: 1 }}>
          <div style={{ border: "1px solid #0e1a14", background: "#050907cc", padding: "28px 28px", backdropFilter: "blur(6px)" }}>
            <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 16 }}>
              DAWNBOUND ACHIVUM VANGUARD — CENTRAL INTELLIGENCE SYSTEM v4.7
            </div>
            {lines.slice(0, phase + 1).map((l, i) => (
              <div key={i} style={{ color: i === phase && !done ? "#2a6b3c" : "#1a3a2a", fontSize: 11, lineHeight: 2, fontFamily: "'Courier New',monospace" }}>
                {i === phase && !done
                  ? <Typewriter text={"> " + l} speed={22} onDone={() => { if (i === lines.length - 1) setDone(true); }} />
                  : "> " + l}
              </div>
            ))}
            {done && (
              <div style={{ marginTop: 24 }}>
                <div style={{ marginBottom: 20 }}>
                  <GlitchText text="D.A.V. CLASSIFIED DATABASE" style={{ color: "#c8d6e5", fontSize: 22, fontWeight: 900, letterSpacing: 4, display: "block", marginBottom: 8 }} />
                  <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.8 }}>
                    Dawnbound Achivum Vanguard — Independent Research & Operations Division.<br />
                    All information stored here is classified and protected under Directive 7-Alpha.
                  </div>
                </div>
                <Divider my={16} />
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {session ? (
                    <button onClick={() => setPage("Portal")} style={{ ...btn("#00ff88"), padding: "10px 20px", fontSize: 11 }}>ACCESS PORTAL</button>
                  ) : (
                    <button onClick={() => setPage("Login")} style={{ ...btn("#00ff88"), padding: "10px 20px", fontSize: 11 }}>PERSONNEL LOGIN</button>
                  )}
                  <a href={DISCORD} target="_blank" rel="noreferrer" style={{ ...btn("#5865F2"), padding: "10px 20px", fontSize: 11, textDecoration: "none" }}>DISCORD</a>
                  <a href={GAME} target="_blank" rel="noreferrer" style={{ ...btn("#c47a1e"), padding: "10px 20px", fontSize: 11, textDecoration: "none" }}>PLAY ROBLOX</a>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Stats row */}
        {done && (
          <div style={{ width: "100%", maxWidth: 640, marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[
              ["ACTIVE OPS", String(evs.length), "#00ff88"],
              ["BROADCASTS", String(anns.length), "#c47a1e"],
              ["CLEARANCE TIERS", "6", "#8aaabb"],
            ].map(([l, v, c]) => (
              <div key={l} style={{ ...CARD, textAlign: "center", padding: "14px 10px" }}>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 2, marginBottom: 4 }}>{l}</div>
                <div style={{ color: c, fontFamily: "'Courier New',monospace", fontSize: 18, fontWeight: 900 }}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live ops */}
      {evs.length > 0 && (
        <div style={{ background: "#040608", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 20 }}>// ACTIVE OPERATIONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
              {evs.slice(0, 3).map(ev => (
                <div key={ev.id} style={{ ...CARD, borderLeft: "2px solid " + evStatColor(ev.status) }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                    <Badge label={ev.type || ""} color={evTypeColor(ev.type)} />
                    <Badge label={ev.status || ""} color={evStatColor(ev.status)} />
                  </div>
                  <div style={{ color: "#b0c4d4", fontWeight: 700, fontFamily: "'Courier New',monospace", fontSize: 12, marginBottom: 4 }}>{ev.title}</div>
                  <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 9 }}>{fmtDate(ev.date)} — {ev.host}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setPage("Events")} style={{ ...btn("#3a5a6a"), marginTop: 16, padding: "8px 16px" }}>VIEW ALL EVENTS</button>
          </div>
        </div>
      )}

      {/* Latest announcements */}
      {anns.length > 0 && (
        <div style={{ background: "#030508", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 20 }}>// LATEST BROADCASTS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {anns.slice(0, 3).map(a => (
                <div key={a.id} style={{ ...CARD, borderLeft: "2px solid " + prioColor(a.priority) }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <Badge label={a.priority} color={prioColor(a.priority)} />
                    <span style={{ color: "#b0c4d4", fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 700 }}>{a.title}</span>
                  </div>
                  <div style={{ color: "#3a5a6a", fontSize: 11, lineHeight: 1.7, fontFamily: "'Courier New',monospace" }}>{a.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick nav */}
      <div style={{ background: "#040608", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 20 }}>// DATABASE SECTIONS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
            {[
              ["LORE ARCHIVE", "Lore", "#3a5a6a", "Historical records and world lore"],
              ["FACTIONS", "Factions", "#3a5a6a", "Known groups and alliances"],
              ["THREAT DATABASE", "Enemies", "#8b1a1a", "Enemy entities and threat levels"],
              ["EVENTS", "Events", "#00ff88", "Operations and scheduled events"],
              ["RANK STRUCTURE", "Ranks", "#c47a1e", "Clearance hierarchy"],
              ["SERVER RULES", "Rules", "#3a5a6a", "Conduct directives"],
            ].map(([label, page, color, desc]) => (
              <div key={label} onClick={() => setPage(page)} style={{ ...CARD, cursor: "pointer", borderLeft: "2px solid " + color + "44", transition: "border-color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.borderLeftColor = color)}
                onMouseLeave={e => (e.currentTarget.style.borderLeftColor = color + "44")}>
                <div style={{ color: color, fontFamily: "'Courier New',monospace", fontSize: 10, fontWeight: 900, letterSpacing: 2, marginBottom: 6 }}>{label}</div>
                <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 9 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rank preview */}
      <div style={{ background: "#030508", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 20 }}>// CLEARANCE TIERS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 8 }}>
            {([6, 5, 4, 3, 2, 1] as const).map(l => {
              const m = RANK_META[l];
              return (
                <div key={l} style={{ ...CARD, borderLeft: "2px solid " + m.color + "44", padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <Dot color={m.color} size={6} />
                    <span style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 9 }}>CL-{l}</span>
                  </div>
                  <div style={{ color: m.color, fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 900 }}>{m.label.toUpperCase()}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
