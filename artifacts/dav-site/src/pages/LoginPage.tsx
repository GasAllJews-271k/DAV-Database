import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { type Session } from "@/types";
import { CARD, INP, LBL, btn, PageWrap, Divider } from "@/components/Primitives";
import { Typewriter } from "@/components/Primitives";

interface LoginPageProps {
  onLogin: (s: Session) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState(0);
  const boot = [
    "INITIALIZING D.A.V. PERSONNEL AUTHENTICATION SYSTEM...",
    "SECURE CHANNEL ESTABLISHED...",
    "AWAITING CREDENTIALS...",
  ];

  useEffect(() => {
    if (phase < boot.length - 1) {
      const t = setTimeout(() => setPhase(p => p + 1), 800);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase]);

  const tryLogin = async () => {
    if (!email.trim() || !pass.trim()) return;
    setLoading(true); setErr("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass.trim());
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      if (snap.exists()) {
        onLogin({ uid: cred.user.uid, email: cred.user.email!, ...snap.data() } as Session);
      } else {
        onLogin({ uid: cred.user.uid, email: cred.user.email!, username: cred.user.email!, level: 1, rank: "Recruit" });
      }
    } catch (e: unknown) {
      const code = (e as { code?: string }).code;
      setErr(
        code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found"
          ? "ACCESS DENIED — INVALID CREDENTIALS"
          : "SYSTEM ERROR — " + (e as Error).message
      );
    }
    setLoading(false);
  };

  return (
    <PageWrap>
      <div style={{ maxWidth: 480, margin: "40px auto" }}>
        <div style={{ ...CARD, border: "1px solid #0e1a22" }}>
          <div style={{ borderBottom: "1px solid #0a1218", paddingBottom: 14, marginBottom: 20 }}>
            <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 3 }}>DAWNBOUND ACHIVUM VANGUARD</div>
            <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 12 }}>PERSONNEL AUTHENTICATION TERMINAL</div>
            {boot.slice(0, phase + 1).map((l, i) => (
              <div key={i} style={{ color: i === phase ? "#2a6b3c" : "#1a3a2a", fontSize: 10, lineHeight: 2, fontFamily: "'Courier New',monospace" }}>
                {i === phase ? <Typewriter text={"> " + l} speed={18} /> : "> " + l}
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={LBL}>Email Address</label>
            <input style={INP} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="operative@dav.com" onKeyDown={e => e.key === "Enter" && tryLogin()} disabled={loading} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={LBL}>Access Code</label>
            <input style={INP} type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && tryLogin()} disabled={loading} />
          </div>
          {err && <div style={{ background: "#0a0405", border: "1px solid #1a0808", padding: "8px 12px", color: "#8b1a1a", fontSize: 10, letterSpacing: 2, marginBottom: 12, fontFamily: "'Courier New',monospace" }}>SYSTEM: {err}</div>}
          <button onClick={tryLogin} disabled={loading} style={{ ...btn("#00ff88"), width: "100%", padding: 11, fontSize: 11, letterSpacing: 3, cursor: loading ? "wait" : "pointer" }}>
            {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
          </button>
          <Divider my={14} />
          <div style={{ color: "#1a2a3a", fontSize: 9, letterSpacing: 1, fontFamily: "'Courier New',monospace", lineHeight: 1.7 }}>
            Access is granted by your Division Director.<br />Contact command if you have not received credentials.
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
