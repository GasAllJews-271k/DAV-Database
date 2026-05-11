import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Session, type Announcement, type GameEvent, RANK_META, canManage, canLog } from "@/types";
import { prioColor, evTypeColor } from "@/lib/helpers";
import { Badge, ClearancePill, CARD, btn, PageWrap, Divider, Dot } from "@/components/Primitives";

interface FeedEntry {
  text: string;
  eventTitle: string;
  eventType: string;
  ts: string;
  sortKey: string;
}

function parseFeedEntry(raw: string, eventTitle: string, eventType: string): FeedEntry {
  const match = raw.match(/^\[([^\]]+)\]\s*\[([^\]]+)\]\s*\[CL-(\d)\]\s*(.*)/);
  if (match) {
    return { ts: match[1], text: match[4], eventTitle, eventType, sortKey: match[1] };
  }
  return { ts: "", text: raw, eventTitle, eventType, sortKey: "" };
}

function ActivityFeed() {
  const [entries, setEntries] = useState<FeedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => {
      const all: FeedEntry[] = [];
      snap.docs.forEach(d => {
        const ev = d.data() as GameEvent;
        (ev.log || []).forEach(line => {
          all.push(parseFeedEntry(line, ev.title, ev.type));
        });
      });
      all.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
      setEntries(all.slice(0, 20));
      setLoading(false);
    });
  }, []);

  return (
    <div style={CARD}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3 }}>LIVE ACTIVITY FEED</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Courier New',monospace", fontSize: 8, color: "#2a6b3c" }}>
          <Dot color="#00ff88" size={6} />
          REAL-TIME
        </div>
      </div>

      {loading && (
        <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 10, textAlign: "center", padding: 20 }}>
          LOADING ENTRIES...
        </div>
      )}

      {!loading && entries.length === 0 && (
        <div style={{ color: "#0e1a22", fontFamily: "'Courier New',monospace", fontSize: 10, textAlign: "center", padding: 20 }}>
          // NO LOG ENTRIES YET
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {entries.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#040709", border: "1px solid #0a1218", padding: "8px 12px" }}>
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <Badge label={e.eventType || "—"} color={evTypeColor(e.eventType)} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "#2a6b3c", marginBottom: 3, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span>{e.eventTitle}</span>
                {e.ts && <span style={{ color: "#1a3a4a" }}>— {e.ts}</span>}
              </div>
              <div style={{ fontFamily: "'Courier New',monospace", fontSize: 10, color: "#3a5a6a", lineHeight: 1.6, wordBreak: "break-word" }}>{e.text}</div>
            </div>
          </div>
        ))}
      </div>

      {entries.length === 20 && (
        <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, textAlign: "center", marginTop: 10, letterSpacing: 2 }}>
          SHOWING 20 MOST RECENT ENTRIES
        </div>
      )}
    </div>
  );
}

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
          <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 12 }}>DATABASE ACCESS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <button onClick={() => setPage("Roster")} style={{ ...btn("#00ff88"), textAlign: "left", padding: "8px 12px" }}>PERSONNEL ROSTER</button>
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

      <div style={{ marginBottom: 20 }}>
        <ActivityFeed />
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
