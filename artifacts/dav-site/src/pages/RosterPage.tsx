import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type UserProfile, RANK_META } from "@/types";
import { PageWrap, SecHeader, CARD, ClearancePill, Dot, Divider } from "@/components/Primitives";

export default function RosterPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("level", "desc"));
    return onSnapshot(q, snap => {
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() } as UserProfile)));
      setLoading(false);
    });
  }, []);

  const displayed = filter !== null ? users.filter(u => u.level === filter) : users;

  const counts = ([6, 5, 4, 3, 2, 1] as const).map(l => ({
    level: l,
    count: users.filter(u => u.level === l).length,
    meta: RANK_META[l],
  }));

  return (
    <PageWrap>
      <SecHeader tag="Personnel — Roster" title="PERSONNEL ROSTER" sub="// Active division members — classified — authenticated access only" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 8, marginBottom: 20 }}>
        {counts.map(({ level, count, meta }) => (
          <div key={level} onClick={() => setFilter(filter === level ? null : level)}
            style={{ ...CARD, textAlign: "center", cursor: "pointer", borderLeft: "2px solid " + meta.color + (filter === level ? "ff" : "33"), padding: "12px 8px" }}>
            <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 7, letterSpacing: 2, marginBottom: 4 }}>CL-{level}</div>
            <div style={{ color: meta.color, fontFamily: "'Courier New',monospace", fontSize: 18, fontWeight: 900, marginBottom: 2 }}>{count}</div>
            <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 1 }}>{meta.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {filter !== null && (
        <div style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: 2 }}>
            FILTERING: CL-{filter} — {RANK_META[filter]?.label.toUpperCase()}
          </span>
          <button onClick={() => setFilter(null)} style={{ background: "transparent", border: "1px solid #1a3a4a", color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, padding: "3px 10px", cursor: "pointer", letterSpacing: 2 }}>
            CLEAR
          </button>
        </div>
      )}

      {loading && (
        <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 11, textAlign: "center", padding: 40 }}>
          LOADING PERSONNEL DATA...
        </div>
      )}

      {!loading && displayed.length === 0 && (
        <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 11, textAlign: "center", padding: 40 }}>
          NO PERSONNEL FOUND
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {displayed.map((u, i) => {
          const m = RANK_META[u.level] || RANK_META[1];
          return (
            <div key={u.id}>
              {i > 0 && displayed[i - 1].level !== u.level && (
                <Divider my={10} />
              )}
              <div style={{ ...CARD, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 32, height: 32, border: "1px solid " + m.color + "44", background: m.color + "08", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Dot color={m.color} size={7} />
                  </div>
                  <div>
                    <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
                      {u.username || u.email}
                    </div>
                    {u.username && (
                      <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 9, marginTop: 2 }}>
                        {u.email}
                      </div>
                    )}
                  </div>
                </div>
                <ClearancePill level={u.level} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, textAlign: "right", marginTop: 16, letterSpacing: 2 }}>
        TOTAL PERSONNEL: {users.length}
      </div>
    </PageWrap>
  );
}
