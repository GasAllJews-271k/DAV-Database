import { NAV_LINKS, DISCORD, GAME } from "@/types";
import { Divider } from "@/components/Primitives";

export default function Footer({ setPage }: { setPage: (p: string) => void }) {
  return (
    <footer style={{ background: "#030508", borderTop: "1px solid #0e1422", padding: "32px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 24, marginBottom: 20 }}>
          <div>
            <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 700, letterSpacing: 4, marginBottom: 10 }}>D.A.V.</div>
            <div style={{ color: "#1a3a2a", fontFamily: "'Courier New',monospace", fontSize: 9, lineHeight: 2 }}>Dawnbound Achivum Vanguard<br />Independent Research Division</div>
          </div>
          <div>
            <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 10 }}>NAVIGATION</div>
            {NAV_LINKS.map(n => (
              <div key={n} onClick={() => setPage(n)} style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 10, marginBottom: 4, cursor: "pointer" }}>{n}</div>
            ))}
          </div>
          <div>
            <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 10 }}>EXTERNAL</div>
            <a href={DISCORD} target="_blank" rel="noreferrer" style={{ display: "block", color: "#5865F2", fontFamily: "'Courier New',monospace", fontSize: 10, marginBottom: 6, textDecoration: "none" }}>DISCORD SERVER</a>
            <a href={GAME} target="_blank" rel="noreferrer" style={{ display: "block", color: "#c47a1e", fontFamily: "'Courier New',monospace", fontSize: 10, textDecoration: "none" }}>PLAY ON ROBLOX</a>
          </div>
        </div>
        <Divider my={12} />
        <div style={{ textAlign: "center", fontFamily: "'Courier New',monospace", color: "#0e1a22", fontSize: 9, letterSpacing: 2 }}>
          DAWNBOUND ACHIVUM VANGUARD — ALL DATA PROTECTED UNDER DIRECTIVE 7-ALPHA
        </div>
      </div>
    </footer>
  );
}
