import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Announcement } from "@/types";
import { prioColor } from "@/lib/helpers";
import { Badge, CARD, INP, LBL, btn, PageWrap, SecHeader } from "@/components/Primitives";

type AnnForm = { title: string; content: string; priority: Announcement["priority"]; published: boolean };
const blank: AnnForm = { title: "", content: "", priority: "Normal", published: false };

export default function AnnManager() {
  const [anns, setAnns] = useState<Announcement[]>([]);
  const [form, setForm] = useState<AnnForm>(blank);
  const [edit, setEdit] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => setAnns(snap.docs.map(d => ({ id: d.id, ...d.data() } as Announcement))));
  }, []);

  const save = async () => {
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      if (edit) {
        await updateDoc(doc(db, "announcements", edit), { ...form, date: today, updatedAt: serverTimestamp() });
        setEdit(null);
      } else {
        await addDoc(collection(db, "announcements"), { ...form, date: today, createdAt: serverTimestamp() });
      }
      setForm(blank);
    } catch (e) { alert("Error: " + (e as Error).message); }
    setSaving(false);
  };

  const togglePub = async (id: string, cur: boolean) => {
    await updateDoc(doc(db, "announcements", id), { published: !cur });
  };

  const del = async (id: string) => {
    await deleteDoc(doc(db, "announcements", id));
  };

  return (
    <PageWrap>
      <SecHeader tag="Admin — Announcements" title="ANNOUNCEMENT MANAGER" sub="// Published announcements appear instantly for all users" clearance={5} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        <div style={CARD}>
          <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 14 }}>{edit ? "// EDIT" : "// COMPOSE"}</div>
          <div style={{ marginBottom: 10 }}>
            <label style={LBL}>Title</label>
            <input style={INP} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Announcement title..." />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={LBL}>Content</label>
            <textarea style={{ ...INP, minHeight: 100, resize: "vertical" }} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Announcement body..." />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={LBL}>Priority</label>
            <select style={INP} value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value as Announcement["priority"] }))}>
              {["Normal", "High", "Critical"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <input type="checkbox" id="apub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} style={{ accentColor: "#00ff88", width: 14, height: 14 }} />
            <label htmlFor="apub" style={{ ...LBL, marginBottom: 0, color: "#2a6b3c", cursor: "pointer" }}>PUBLISH IMMEDIATELY</label>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={save} disabled={saving} style={{ ...btn("#00ff88"), flex: 1, padding: 9 }}>
              {saving ? "SAVING..." : edit ? "UPDATE" : "PUBLISH"}
            </button>
            {edit && <button onClick={() => { setEdit(null); setForm(blank); }} style={{ ...btn("#3a5a6a"), padding: 9 }}>CANCEL</button>}
          </div>
        </div>

        <div>
          <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 12 }}>// ALL BROADCASTS ({anns.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 580, overflowY: "auto" }}>
            {anns.map(a => (
              <div key={a.id} style={{ ...CARD, borderLeft: "2px solid " + (a.published ? prioColor(a.priority) : "#1a3a4a") }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ color: "#b0c4d4", fontWeight: 700, fontSize: 11, fontFamily: "'Courier New',monospace" }}>{a.title}</span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Badge label={a.priority} color={prioColor(a.priority)} />
                    <Badge label={a.published ? "LIVE" : "DRAFT"} color={a.published ? "#00ff88" : "#1a3a4a"} />
                  </div>
                </div>
                <div style={{ color: "#2a4a5a", fontSize: 11, lineHeight: 1.6, fontFamily: "'Courier New',monospace", marginBottom: 8 }}>
                  {a.content.slice(0, 80)}{a.content.length > 80 ? "..." : ""}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => togglePub(a.id, a.published)} style={{ ...btn(a.published ? "#8b1a1a" : "#00ff88"), padding: "4px 10px", fontSize: 9 }}>
                    {a.published ? "RETRACT" : "PUBLISH"}
                  </button>
                  <button onClick={() => { setEdit(a.id); setForm({ title: a.title, content: a.content, priority: a.priority, published: a.published }); }} style={{ ...btn("#3a5a6a"), padding: "4px 10px", fontSize: 9 }}>EDIT</button>
                  <button onClick={() => del(a.id)} style={{ ...btn("#8b1a1a"), padding: "4px 10px", fontSize: 9 }}>DELETE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
