import { PageWrap, SecHeader, CARD, Dot, Divider } from "@/components/Primitives";
import { RANK_META } from "@/types";

const RANK_DETAILS: Record<number, { duties: string[]; access: string[]; notes: string }> = {
  6: {
    duties: ["Full organizational command authority", "Director-level intelligence access", "Personnel appointment and dismissal", "Directive issuance and revision", "Inter-faction diplomatic representation"],
    access: ["All classified systems", "Directive 7-Alpha full text", "Personnel files (all clearances)", "Field operation authorization"],
    notes: "The Director holds supreme authority within the D.A.V. structure. Decisions made at this level are final unless countermanded by the founding charter.",
  },
  5: {
    duties: ["Division-level management and oversight", "Personnel account creation and level assignment", "Event scheduling and publication", "Announcement broadcast authority", "Operation log oversight"],
    access: ["Administrative systems", "User management tools", "Event and announcement management", "Restricted field reports"],
    notes: "Division Directors manage the day-to-day operations of their assigned division. They report directly to the Director and are responsible for CL-1 through CL-4 personnel under their command.",
  },
  4: {
    duties: ["Lead field operations and tactical assessments", "Mentor junior operatives", "Submit field reports to Division Director", "Coordinate with allied faction liaisons"],
    access: ["Senior field intelligence", "Tactical database", "Threat assessment files (CL-4 and below)"],
    notes: "Senior Operatives are experienced field personnel who have demonstrated reliability and judgment across multiple operations.",
  },
  3: {
    duties: ["Active field deployment and mission execution", "Operation log entry (field reports)", "Threat cataloguing and documentation", "Reconnaissance and zone mapping"],
    access: ["Field operations database", "Operation log (read/write)", "Standard threat files"],
    notes: "Operatives are the backbone of D.A.V. field operations. They have earned the right to submit official log entries and participate in active operations.",
  },
  2: {
    duties: ["Support tasks and base operations", "Archive organization and maintenance", "Training participation", "Basic field observation (supervised)"],
    access: ["Public database sections", "Training materials", "Non-restricted event listings"],
    notes: "Associates are personnel who have been vetted and accepted into the Division but have not yet completed field certification.",
  },
  1: {
    duties: ["Orientation and onboarding", "Training program participation", "Supervised base activity", "Initial assessment completion"],
    access: ["Public access only", "Training materials", "Recruit orientation database"],
    notes: "Recruits are new personnel in the initial assessment phase. Clearance elevation requires approval from a Division Director (CL-5+).",
  },
};

export default function RanksPage() {
  return (
    <PageWrap>
      <SecHeader tag="Personnel — Rank Structure" title="RANK STRUCTURE" sub="// Clearance hierarchy — elevation requires Division Director approval" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {([6, 5, 4, 3, 2, 1] as const).map(level => {
          const m = RANK_META[level];
          const d = RANK_DETAILS[level];
          return (
            <div key={level} style={{ ...CARD, borderLeft: "3px solid " + m.color + "66" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Dot color={m.color} size={10} />
                  <div>
                    <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 2 }}>CLEARANCE LEVEL {level}</div>
                    <div style={{ color: m.color, fontFamily: "'Courier New',monospace", fontSize: 16, fontWeight: 900, letterSpacing: 3 }}>{m.label.toUpperCase()}</div>
                  </div>
                </div>
                <div style={{ border: "1px solid " + m.color + "33", padding: "6px 14px", fontFamily: "'Courier New',monospace", fontSize: 20, fontWeight: 900, color: m.color + "88" }}>
                  CL-{level}
                </div>
              </div>
              <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.8, marginBottom: 14 }}>{d.notes}</div>
              <Divider my={12} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                <div>
                  <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 8 }}>DUTIES</div>
                  {d.duties.map((duty, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, fontFamily: "'Courier New',monospace", fontSize: 10, color: "#3a5a6a" }}>
                      <span style={{ color: m.color, fontSize: 8, flexShrink: 0 }}>▶</span>{duty}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 8 }}>SYSTEM ACCESS</div>
                  {d.access.map((acc, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, fontFamily: "'Courier New',monospace", fontSize: 10, color: "#3a5a6a" }}>
                      <span style={{ color: "#00ff88", fontSize: 8, flexShrink: 0 }}>✓</span>{acc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageWrap>
  );
}
