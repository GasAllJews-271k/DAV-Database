import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { type Session, type Announcement, type GameEvent, canManage, canLog } from "@/types";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import { Scanlines } from "@/components/Primitives";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import LorePage from "@/pages/LorePage";
import FactionsPage from "@/pages/FactionsPage";
import EnemiesPage from "@/pages/EnemiesPage";
import EventsPage from "@/pages/EventsPage";
import RanksPage from "@/pages/RanksPage";
import RulesPage from "@/pages/RulesPage";
import PersonnelPortal from "@/pages/PortalPage";
import EventManager from "@/pages/EventManager";
import AnnManager from "@/pages/AnnManager";
import OpLog from "@/pages/OpLog";
import UserManager from "@/pages/UserManager";

type Page = string;

const NEEDS_AUTH = ["Portal", "OpLog", "EventManager", "AnnManager", "UserManager"];
const NEEDS_MANAGE = ["EventManager", "AnnManager", "UserManager"];
const NEEDS_LOG = ["OpLog"];

function guard(page: Page, session: Session | null): Page {
  if (NEEDS_AUTH.includes(page) && !session) return "Login";
  if (NEEDS_MANAGE.includes(page) && session && !canManage(session.level)) return "Portal";
  if (NEEDS_LOG.includes(page) && session && !canLog(session.level)) return "Portal";
  return page;
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [page, setPage] = useState<Page>("Home");
  const [authLoading, setAuthLoading] = useState(true);
  const [anns, setAnns] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<GameEvent[]>([]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setSession({ uid: user.uid, email: user.email!, ...snap.data() } as Session);
        } else {
          setSession({ uid: user.uid, email: user.email!, username: user.email!, level: 1, rank: "Recruit" });
        }
      } else {
        setSession(null);
      }
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap =>
      setAnns(snap.docs.map(d => ({ id: d.id, ...d.data() } as Announcement)).filter(a => a.published))
    );
  }, []);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    return onSnapshot(q, snap =>
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() } as GameEvent)))
    );
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setSession(null);
    setPage("Home");
  };

  const active = guard(page, session);

  if (authLoading) {
    return (
      <div style={{ background: "#040608", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Courier New',monospace", color: "#2a6b3c", fontSize: 12, letterSpacing: 3 }}>
        AUTHENTICATING SESSION...
      </div>
    );
  }

  return (
    <div style={{ background: "#040608", color: "#c8d6e5", minHeight: "100vh", fontFamily: "'Courier New',monospace" }}>
      <Scanlines />
      <Navbar page={active} setPage={setPage} session={session} onLogout={handleLogout} />
      <div style={{ position: "fixed", top: 54, left: 0, right: 0, zIndex: 998 }}>
        <AnnouncementBanner announcements={anns} />
      </div>
      <div style={{ paddingTop: anns.length ? 26 : 0 }}>
        {active === "Home" && <HomePage setPage={setPage} session={session} />}
        {active === "Lore" && <LorePage />}
        {active === "Factions" && <FactionsPage />}
        {active === "Enemies" && <EnemiesPage />}
        {active === "Events" && <EventsPage />}
        {active === "Ranks" && <RanksPage />}
        {active === "Rules" && <RulesPage />}
        {active === "Login" && <LoginPage onLogin={s => { setSession(s); setPage("Portal"); }} />}
        {active === "Portal" && session && <PersonnelPortal session={session} setPage={setPage} events={events} announcements={anns} />}
        {active === "EventManager" && session && <EventManager session={session} />}
        {active === "AnnManager" && session && <AnnManager />}
        {active === "OpLog" && session && <OpLog session={session} />}
        {active === "UserManager" && session && <UserManager />}
      </div>
      {active !== "Home" && <Footer setPage={setPage} />}
    </div>
  );
}
