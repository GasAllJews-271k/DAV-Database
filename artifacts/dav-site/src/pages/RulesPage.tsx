import { PageWrap, SecHeader, CARD, DocStamp, Divider } from "@/components/Primitives";

const RULES = [
  {
    section: "CONDUCT & RESPECT",
    color: "#3a6a8a",
    rules: [
      { num: "R-01", title: "Respectful Communication", text: "All personnel are expected to communicate with respect and professionalism. Harassment, discrimination, or targeted hostility toward any member — regardless of rank — will result in immediate disciplinary review." },
      { num: "R-02", title: "No Rank-Based Abuse", text: "Higher clearance does not entitle any operative to mistreat or demean lower-ranked personnel. Leadership is earned through conduct, not abused through title." },
      { num: "R-03", title: "Disputes", text: "Inter-personnel disputes should be brought to a Division Director. Public arguments are prohibited and may result in temporary suspension of communications access." },
    ],
  },
  {
    section: "OPERATIONS",
    color: "#00ff88",
    rules: [
      { num: "R-04", title: "Operation Authorization", text: "All field operations must be authorized by a CL-5 Division Director or higher. Unauthorized operations that result in personnel losses or intelligence compromise will be reviewed for disciplinary action." },
      { num: "R-05", title: "Log Accuracy", text: "Operation logs must be accurate and factual. Falsification of field reports is a serious violation subject to immediate demotion and potential expulsion." },
      { num: "R-06", title: "Asset Protection", text: "D.A.V. personnel, equipment, and intelligence assets are to be protected during all operations. Recklessness that endangers assets will be documented and reviewed." },
    ],
  },
  {
    section: "CLASSIFIED INFORMATION",
    color: "#c47a1e",
    rules: [
      { num: "R-07", title: "Information Security", text: "Classified information may only be shared with personnel who have the appropriate clearance level. Sharing restricted intelligence with unauthorized parties — including external faction members — is a dismissal offense." },
      { num: "R-08", title: "Database Integrity", text: "All personnel are prohibited from attempting to access, modify, or destroy database records beyond their clearance permissions. Unauthorized access attempts are logged and reviewed by the Director." },
    ],
  },
  {
    section: "FACTION NEUTRALITY",
    color: "#5a9a7a",
    rules: [
      { num: "R-09", title: "Political Neutrality", text: "The D.A.V. does not formally align with external factions. Individual personnel may maintain external affiliations, but may not act on behalf of those affiliations while operating as D.A.V. personnel." },
      { num: "R-10", title: "Inter-Faction Conduct", text: "D.A.V. personnel interacting with external factions must maintain professionalism and must not make commitments on behalf of the Division without Director authorization." },
    ],
  },
  {
    section: "DISCIPLINE",
    color: "#8b1a1a",
    rules: [
      { num: "R-11", title: "Disciplinary Process", text: "Violations of any directive will trigger a review by a Division Director. Serious violations may be escalated to the Director. Consequences range from formal warning to demotion or expulsion depending on severity." },
      { num: "R-12", title: "Appeals", text: "Personnel who believe a disciplinary action was unjust may appeal to the Director. Appeals must be submitted through official channels. Director decisions on appeals are final." },
    ],
  },
];

export default function RulesPage() {
  return (
    <PageWrap>
      <SecHeader tag="Directive — Conduct" title="SERVER RULES" sub="// Compliance is mandatory for all personnel regardless of clearance level" />
      <div style={{ marginBottom: 20, ...CARD, borderLeft: "2px solid #8b1a1a88" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 4 }}>MANDATORY READING</div>
            <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 12 }}>All D.A.V. personnel are bound by these directives upon acceptance of clearance. Ignorance of the rules is not a valid defense.</div>
          </div>
          <DocStamp text="BINDING" color="#8b1a1a" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {RULES.map(section => (
          <div key={section.section} style={{ ...CARD, borderLeft: "2px solid " + section.color + "55" }}>
            <div style={{ color: section.color, fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: 4, fontWeight: 900, marginBottom: 16 }}>§ {section.section}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {section.rules.map((rule, i) => (
                <div key={rule.num}>
                  {i > 0 && <Divider my={10} />}
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: 1, minWidth: 40, flexShrink: 0, marginTop: 1 }}>{rule.num}</div>
                    <div>
                      <div style={{ color: "#8aabb0", fontFamily: "'Courier New',monospace", fontSize: 11, fontWeight: 700, marginBottom: 5 }}>{rule.title}</div>
                      <div style={{ color: "#3a5a6a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.8 }}>{rule.text}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}
