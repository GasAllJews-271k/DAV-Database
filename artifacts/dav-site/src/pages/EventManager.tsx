import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type GameEvent, type Session } from "@/types";
import { evStatColor, evTypeColor } from "@/lib/helpers";
import { Badge, Modal, CARD, INP, LBL, btn, PageWrap, SecHeader } from "@/components/Primitives";

type EventForm = Omit<GameEvent, "id" | "log" | "createdAt">;

const blank: EventForm = { title: "", date: "", time: "", type: "Training", status: "Upcoming", desc: "", host: "", published: false };

export default function EventManager({ session }: { session: Session }) {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [form, setForm] = useState<EventForm>(blank);
  const [edit, setEdit] = useState<string | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap => setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as GameEvent))));
  }, []);

  const save = async () => {
    if (!form.title.trim() || !form.date) return;
    setSaving(true);
    try {
      if (edit) {
        await updateDoc(doc(db, "events", edit), { ...form, updatedAt: serverTimestamp() });
        setEdit(null);
      } else {
        await addDoc(collection(db, "events"), { ...form, log: [], createdAt: serverTimestamp() });
      }
      setForm(blank);
    } catch (e) { alert("Error: " + (e as Error).message); }
    setSaving(false);
  };

  const togglePub = async (id: string, cur: boolean) => {
    await updateDoc(doc(db, "events", id), { published: !cur });
  };

  const del = async (id: string) => {
    await deleteDoc(doc(db, "events", id));
    setModal(null);
  };

  return (
    <PageWrap>
      {modal && (
        <Modal
          title="CONFIRM DELETION"
          body="This action is permanent and cannot be undone."
          onConfirm={() => del(modal)}
          onCancel={() => setModal(null)}
        />
      )}
      <SecHeader tag="Admin — Events" title="EVENT MANAGER" sub="// Firestore-backed — changes are live for all users instantly" clearance={5} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        <div style={CARD}>
          <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 14 }}>
            {edit ? "// EDIT OPERATION" : "// CREATE OPERATION"}
          </div>
          {([["Title", "title", "text", "Operation title..."], ["Date", "date", "date", ""], ["Time (UTC)", "time", "time", ""], ["Host", "host", "text", "Hosted by..."]] as const).map(([l, k, t, ph]) => (
            <div key={k} style={{ marginBottom: 10 }}>
              <label style={LBL}>{l}</label>
              <input style={INP} type={t} value={String(form[k as keyof EventForm])} placeholder={ph} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <div>
              <label style={LBL}>Type</label>
              <select style={INP} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as GameEvent["type"] }))}>
                {["Training", "Official", "Research", "Emergency"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={LBL}>Status</label>
              <select style={INP} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as GameEvent["status"] }))}>
                {["Upcoming", "Ongoing", "Completed", "Cancelled"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={LBL}>Brief</label>
            <textarea style={{ ...INP, minHeight: 80, resize: "vertical" }} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Operation description..." />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <input type="checkbox" id="epub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} style={{ accentColor: "#00ff88", width: 14, height: 14 }} />
            <label htmlFor="epub" style={{ ...LBL, marginBottom: 0, color: "#2a6b3c", cursor: "pointer" }}>PUBLISH IMMEDIATELY</label>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={save} disabled={saving} style={{ ...btn("#00ff88"), flex: 1, padding: 9 }}>
              {saving ? "SAVING..." : edit ? "UPDATE" : "CREATE"}
            </button>
            {edit && <button onClick={() => { setEdit(null); setForm(blank); }} style={{ ...btn("#3a5a6a"), padding: 9 }}>CANCEL</button>}
          </div>
        </div>

        <div>
          <div style={{ color: "#1a3a4a", fontSize: 8, letterSpacing: 3, fontFamily: "'Courier New',monospace", marginBottom: 12 }}>// ALL OPERATIONS ({events.length})</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 580, overflowY: "auto" }}>
            {events.map(ev => (
              <div key={ev.id} style={{ ...CARD, borderLeft: "2px solid " + (ev.published ? "#00ff88" : "#1a3a4a") }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 6, marginBottom: 6 }}>
                  <div style={{ color: "#b0c4d4", fontWeight: 700, fontSize: 11, fontFamily: "'Courier New',monospace", flex: 1 }}>{ev.title}</div>
                  <Badge label={ev.published ? "LIVE" : "DRAFT"} color={ev.published ? "#00ff88" : "#1a3a4a"} />
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                  <Badge label={ev.type || ""} color={evTypeColor(ev.type)} />
                  <Badge label={ev.status || ""} color={evStatColor(ev.status)} />
                  <span style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, alignSelf: "center" }}>{ev.date}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <button onClick={() => togglePub(ev.id, ev.published)} style={{ ...btn(ev.published ? "#8b1a1a" : "#00ff88"), padding: "4px 10px", fontSize: 9 }}>
                    {ev.published ? "UNPUBLISH" : "PUBLISH"}
                  </button>
                  <button onClick={() => { setEdit(ev.id); setForm({ title: ev.title, date: ev.date, time: ev.time || "", type: ev.type || "Training", status: ev.status || "Upcoming", desc: ev.desc || "", host: ev.host || "", published: ev.published || false }); }} style={{ ...btn("#3a5a6a"), padding: "4px 10px", fontSize: 9 }}>EDIT</button>
                  <button onClick={() => setModal(ev.id)} style={{ ...btn("#8b1a1a"), padding: "4px 10px", fontSize: 9 }}>DELETE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
