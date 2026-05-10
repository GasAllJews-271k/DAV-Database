import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type GameEvent, type Session, canLog } from "@/types";
import { fmtTS, evStatColor, evTypeColor } from "@/lib/helpers";
import { Badge, Divider, CARD, INP, btn, PageWrap, SecHeader } from "@/components/Primitives";

export default function OpLog({ session }: { session: Session }) {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [logInput, setLogInput] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as GameEvent))));
  }, []);

  const addEntry = async (id: string) => {
    const entry = (logInput[id] || "").trim();
    if (!entry) return;
    const line = "[" + fmtTS() + "] [" + (session.username || session.email) + "] [CL-" + session.level + "] " + entry;
    const ev = events.find(e => e.id === id);
    await updateDoc(doc(db, "events", id), { log: [...(ev?.log || []), line] });
    setLogInput(l => ({ ...l, [id]: "" }));
  };

  const types = ["All", "Training", "Official", "Research", "Emergency"];
  const filtered = filter === "All" ? events : events.filter(e => e.type === filter);

  return (
    <PageWrap>
      <SecHeader tag="Field — Operation Log" title="OPERATION LOG" sub="// Live from Firestore — CL-3+ can add entries" clearance={3} />
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ ...btn(filter === t ? "#00ff88" : "#3a5a6a"), padding: "5px 12px", fontSize: 9 }}>{t}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(ev => (
          <div key={ev.id} style={CARD}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              <div>
                <div style={{ color: "#b0c4d4", fontWeight: 700, fontFamily: "'Courier New',monospace", fontSize: 12, marginBottom: 4 }}>{ev.title}</div>
                <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 2, fontFamily: "'Courier New',monospace" }}>{ev.date} — {ev.host}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Badge label={ev.type || ""} color={evTypeColor(ev.type)} />
                <Badge label={ev.status || ""} color={evStatColor(ev.status)} />
              </div>
            </div>
            <Divider my={10} />
            <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 8 }}>
              LOG ENTRIES ({(ev.log || []).length})
            </div>
            {(!ev.log || ev.log.length === 0) && (
              <div style={{ color: "#0e1a22", fontFamily: "'Courier New',monospace", fontSize: 10, marginBottom: 10 }}>// NO ENTRIES</div>
            )}
            {(ev.log || []).map((entry, i) => (
              <div key={i} style={{ background: "#040709", border: "1px solid #0a1218", padding: "7px 12px", marginBottom: 5, fontFamily: "'Courier New',monospace", fontSize: 10, color: "#2a5a4a", lineHeight: 1.6 }}>{entry}</div>
            ))}
            {canLog(session.level) && (
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <input style={{ ...INP, flex: 1 }} value={logInput[ev.id] || ""} onChange={e => setLogInput(l => ({ ...l, [ev.id]: e.target.value }))}
                  placeholder="Add log entry..." onKeyDown={e => e.key === "Enter" && addEntry(ev.id)} />
                <button onClick={() => addEntry(ev.id)} style={{ ...btn("#00ff88"), padding: "8px 12px", fontSize: 9, whiteSpace: "nowrap" }}>ADD</button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", textAlign: "center", padding: 40 }}>NO EVENTS FOUND</div>
        )}
      </div>
    </PageWrap>
  );
}
