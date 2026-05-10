import { type Session, type Announcement, type GameEvent, RANK_META, canManage, canLog } from "@/types";
import { prioColor } from "@/lib/helpers";
import { Badge, ClearancePill, CARD, btn, PageWrap, Divider } from "@/components/Primitives";

interface PortalProps {
  session: Session;
  setPage: (p: string) => void;
  events: GameEvent[];
  announcements: Announcement[];
}

export default function PersonnelPortal({ session, setPage, events, announcements }: PortalProps) {
  const m = RANK_META[session.level] || RANK_META[1];
  const pubAnns = announcements.filter(a => a.published);
  const upcoming = events.filter(e => e.published && (e.status === "Upcoming" || e.status === "Ongoing"));
  const accessTier = session.level >= 5 ? "FULL ADMINISTRATION" : session.level >= 3 ? "FIELD OPERATIONS" : "READ-ONLY ACCESS";

  return (
    <PageWrap>
      <div style={{ ...CARD, marginBottom: 20, border: "1px solid " + m.color + "33" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 6 }}>AUTHENTICATED SESSION</div>
            <div style={{ color: "#c8d6e5", fontSize: 16, fontWeight: 900, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 10 }}>{session.username || session.email}</div>
            <ClearancePill level={session.level} />
          </div>
          <div style={{ textAlign: "right", fontFamily: "'Courier New',monospace" }}>
            <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, marginBottom: 4 }}>ACCESS TIER</div>
            <div style={{ color: m.color, fontSize: 11, fontWeight: 900, letterSpacing: 2, border: "1px solid " + m.color + "33", padding: "4px 10px" }}>{accessTier}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10, marginBottom: 20 }}>
        {[
          ["CLEARANCE", "CL-" + session.level, m.color],
          ["RANK", m.label.toUpperCase(), m.color],
          ["ACTIVE OPS", String(upcoming.length), "#00ff88"],
          ["BROADCASTS", String(pubAnns.length), "#c47a1e"],
        ].map(([l, v, c]) => (
          <div key={l} style={{ ...CARD, textAlign: "center" }}>
            <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 2, marginBottom: 6 }}>{l}</div>
            <div style={{ color: c, fontFamily: "'Courier New',monospace", fontSize: 14, fontWeight: 900 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginBottom: 20 }}>
        <div style={CARD}>
          <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 12 }}>PUBLIC ACCESS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              ["VIEW EVENTS", "Events"],
              ["THREAT DATABASE", "Enemies"],
              ["LORE ARCHIVE", "Lore"],
              ["FACTIONS", "Factions"],
              ["SERVER RULES", "Rules"],
            ].map(([l, p]) => (
              <button key={l} onClick={() => setPage(p)} style={{ ...btn("#3a5a6a"), textAlign: "left", padding: "8px 12px" }}>{l}</button>
            ))}
          </div>
        </div>

        {canLog(session.level) && !canManage(session.level) && (
          <div style={{ ...CARD, border: "1px solid #00ff8818" }}>
            <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 8 }}>FIELD FUNCTIONS</div>
            <div style={{ marginBottom: 12 }}><ClearancePill level={3} /></div>
            <button onClick={() => setPage("OpLog")} style={{ ...btn("#00ff88"), width: "100%", padding: "9px 12px", textAlign: "left" }}>OPERATION LOG — ADD ENTRIES</button>
          </div>
        )}

        {canManage(session.level) && (
          <div style={{ ...CARD, border: "1px solid " + m.color + "22" }}>
            <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 8 }}>ADMINISTRATION</div>
            <div style={{ marginBottom: 12 }}><ClearancePill level={session.level} /></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button onClick={() => setPage("EventManager")} style={{ ...btn("#00ff88"), textAlign: "left", padding: "8px 12px" }}>MANAGE EVENTS</button>
              <button onClick={() => setPage("AnnManager")} style={{ ...btn("#c47a1e"), textAlign: "left", padding: "8px 12px" }}>MANAGE ANNOUNCEMENTS</button>
              <button onClick={() => setPage("OpLog")} style={{ ...btn("#8aaabb"), textAlign: "left", padding: "8px 12px" }}>OPERATION LOG</button>
              <button onClick={() => setPage("UserManager")} style={{ ...btn("#3a5a6a"), textAlign: "left", padding: "8px 12px" }}>USER MANAGER</button>
            </div>
          </div>
        )}
      </div>

      {pubAnns.length > 0 && (
        <>
          <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 12 }}>LATEST BROADCASTS</div>
          {pubAnns.slice(0, 3).map(a => (
            <div key={a.id} style={{ ...CARD, marginBottom: 10, borderLeft: "2px solid " + prioColor(a.priority) }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                <Badge label={a.priority} color={prioColor(a.priority)} />
                <span style={{ color: "#b0c4d4", fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 700 }}>{a.title}</span>
                <span style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 9, marginLeft: "auto" }}>{a.date}</span>
              </div>
              <Divider my={8} />
              <div style={{ color: "#3a5a6a", fontSize: 11, lineHeight: 1.7, fontFamily: "'Courier New',monospace" }}>{a.content}</div>
            </div>
          ))}
        </>
      )}
    </PageWrap>
  );
}
