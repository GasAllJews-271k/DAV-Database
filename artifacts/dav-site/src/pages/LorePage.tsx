import { PageWrap, SecHeader, CARD, Divider, DocStamp, Redacted } from "@/components/Primitives";

export default function LorePage() {
  return (
    <PageWrap>
      <SecHeader tag="Archive — Lore" title="LORE ARCHIVE" sub="// Historical records and classified intelligence — handle with care" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ ...CARD, borderLeft: "2px solid #00ff8844" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
            <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 14, fontWeight: 900, letterSpacing: 2 }}>ORIGIN OF THE VANGUARD</div>
            <DocStamp text="DECLASSIFIED" color="#2a6b3c" />
          </div>
          <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.9 }}>
            The Dawnbound Achivum Vanguard emerged from the wreckage of the Remnants Conflict — a fractured era where autonomous research cells operated without oversight or accountability. Founded under Directive 7-Alpha, the D.A.V. was established as an independent intelligence and operations division, tasked with cataloguing threats, preserving critical knowledge, and maintaining order in contested zones.
            <br /><br />
            Our founding operatives — <Redacted text="Classified Personnel File" /> — believed that structured intelligence was the only counterweight to the chaos that had consumed rival factions. The Archive was built not to hoard power, but to ensure that knowledge could not be destroyed by those who feared it.
          </div>
        </div>

        <div style={{ ...CARD, borderLeft: "2px solid #c47a1e44" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
            <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 14, fontWeight: 900, letterSpacing: 2 }}>THE REMNANTS CONFLICT</div>
            <DocStamp text="RESTRICTED" color="#c47a1e" />
          </div>
          <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.9 }}>
            The Remnants Conflict refers to the prolonged territorial and ideological war that reshaped the known zones. What began as resource disputes between <Redacted text="[FACTION ALPHA]" /> and <Redacted text="[FACTION BETA]" /> escalated into full-scale engagements involving autonomous threat entities, rogue research divisions, and unaffiliated survivors.
            <br /><br />
            The D.A.V. maintained a position of strategic neutrality throughout the conflict, gathering intelligence from all sides without direct combat engagement. This neutrality came at a cost — several research outposts were lost to hostile incursions. Their locations remain classified.
          </div>
        </div>

        <div style={{ ...CARD, borderLeft: "2px solid #8b1a1a44" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
            <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 14, fontWeight: 900, letterSpacing: 2 }}>DIRECTIVE 7-ALPHA</div>
            <DocStamp text="CLASSIFIED" />
          </div>
          <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.9 }}>
            Directive 7-Alpha is the foundational charter of the Dawnbound Achivum Vanguard. Its full text is accessible only to <Redacted text="Division Director-level and above" />. The publicly known provisions are as follows:
          </div>
          <Divider my={12} />
          {[
            "All intelligence gathered by D.A.V. operatives is the property of the Archive, not the individual.",
            "Operatives may not share classified materials with non-personnel without Director authorization.",
            "The Archive is politically neutral. No D.A.V. unit may formally align with external factions.",
            "Threat entities are to be catalogued, not engaged, unless a field directive authorizes otherwise.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, fontFamily: "'Courier New',monospace", fontSize: 11 }}>
              <span style={{ color: "#1a3a4a", minWidth: 20, flexShrink: 0 }}>0{i + 1}.</span>
              <span style={{ color: "#3a5a6a", lineHeight: 1.7 }}>{item}</span>
            </div>
          ))}
          <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 9, marginTop: 10, fontStyle: "italic" }}>
            Additional provisions: <Redacted text="[ARTICLES 5-12 REDACTED — CL-5+ REQUIRED]" />
          </div>
        </div>

        <div style={{ ...CARD }}>
          <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 14, fontWeight: 900, letterSpacing: 2, marginBottom: 14 }}>KNOWN ZONES OF OPERATION</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
            {[
              ["OUTPOST SIGMA-7", "Active", "#2a6b3c", "Primary research and staging hub."],
              ["THE BREACH", "Contested", "#c47a1e", "High-threat anomalous zone. Entry restricted."],
              ["ARCHIVE DELTA", "Active", "#2a6b3c", "Main database and records facility."],
              ["ZONE 14-KAPPA", "Lost", "#8b1a1a", "Last contact: [REDACTED]. Status unknown."],
            ].map(([name, status, color, desc]) => (
              <div key={name} style={{ background: "#040709", border: "1px solid #0a1218", padding: 14 }}>
                <div style={{ color: color, fontFamily: "'Courier New',monospace", fontSize: 10, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>{name}</div>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 2, marginBottom: 6 }}>STATUS: {status.toUpperCase()}</div>
                <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 10, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
