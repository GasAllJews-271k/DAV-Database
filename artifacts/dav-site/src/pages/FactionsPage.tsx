import { PageWrap, SecHeader, CARD, Badge, Divider } from "@/components/Primitives";

const FACTIONS = [
  {
    name: "DAWNBOUND ACHIVUM VANGUARD",
    tag: "D.A.V.",
    alignment: "Neutral",
    alignColor: "#8aaabb",
    status: "Active",
    statusColor: "#00ff88",
    desc: "The D.A.V. is an independent intelligence and research division. We catalogue threats, preserve knowledge, and maintain structured operations in the Remnants conflict zone. Political neutrality is a core directive.",
    traits: ["Intelligence gathering", "Archive preservation", "Field operations", "Threat cataloguing"],
    relations: [
      { name: "Remnant Collective", stance: "Neutral", color: "#8aaabb" },
      { name: "Iron Syndicate", stance: "Hostile", color: "#8b1a1a" },
      { name: "Free Zones Coalition", stance: "Allied", color: "#2a6b3c" },
    ],
  },
  {
    name: "REMNANT COLLECTIVE",
    tag: "R.C.",
    alignment: "Lawful",
    alignColor: "#3a6a8a",
    status: "Active",
    statusColor: "#00ff88",
    desc: "A coalition of survivors who believe that structured society can be rebuilt from the remnants of the old world. Bureaucratic and slow-moving, but organizationally powerful. They operate a number of fortified settlements.",
    traits: ["Settlement governance", "Resource management", "Diplomatic corps", "Civilian protection"],
    relations: [
      { name: "D.A.V.", stance: "Neutral", color: "#8aaabb" },
      { name: "Iron Syndicate", stance: "Hostile", color: "#8b1a1a" },
      { name: "Free Zones Coalition", stance: "Friendly", color: "#2a6b3c" },
    ],
  },
  {
    name: "IRON SYNDICATE",
    tag: "I.S.",
    alignment: "Hostile",
    alignColor: "#8b1a1a",
    status: "Active",
    statusColor: "#c47a1e",
    desc: "A mercenary and extraction outfit that operates on pure profit motive. Known for aggressive territorial expansion and willingness to engage any target for the right price. Considered a primary threat by most organized factions.",
    traits: ["Mercenary operations", "Territory seizure", "Black market trade", "Hostile extraction"],
    relations: [
      { name: "D.A.V.", stance: "Hostile", color: "#8b1a1a" },
      { name: "Remnant Collective", stance: "Hostile", color: "#8b1a1a" },
      { name: "Free Zones Coalition", stance: "Hostile", color: "#8b1a1a" },
    ],
  },
  {
    name: "FREE ZONES COALITION",
    tag: "F.Z.C.",
    alignment: "Neutral",
    alignColor: "#5a9a7a",
    status: "Active",
    statusColor: "#00ff88",
    desc: "An informal network of independent settlements and wanderers who refuse alignment with any major power. Value autonomy above all else. Cooperative with D.A.V. on intelligence exchanges.",
    traits: ["Autonomy preservation", "Inter-settlement trade", "Resistance to occupation", "Scout networks"],
    relations: [
      { name: "D.A.V.", stance: "Allied", color: "#2a6b3c" },
      { name: "Remnant Collective", stance: "Friendly", color: "#2a6b3c" },
      { name: "Iron Syndicate", stance: "Hostile", color: "#8b1a1a" },
    ],
  },
];

export default function FactionsPage() {
  return (
    <PageWrap>
      <SecHeader tag="Intelligence — Factions" title="KNOWN FACTIONS" sub="// All intelligence is current as of last field update — verify before field deployment" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {FACTIONS.map(f => (
          <div key={f.tag} style={{ ...CARD, borderLeft: "2px solid " + f.alignColor + "66" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
              <div>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 4 }}>FACTION DOSSIER // {f.tag}</div>
                <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 15, fontWeight: 900, letterSpacing: 2 }}>{f.name}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}>
                <Badge label={f.alignment} color={f.alignColor} />
                <Badge label={f.status} color={f.statusColor} />
              </div>
            </div>
            <div style={{ color: "#3a5a6a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.8, marginBottom: 14 }}>{f.desc}</div>
            <Divider my={12} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
              <div>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 8 }}>KNOWN CAPABILITIES</div>
                {f.traits.map(t => (
                  <div key={t} style={{ display: "flex", gap: 8, marginBottom: 5, fontFamily: "'Courier New',monospace", fontSize: 10, color: "#2a4a5a", alignItems: "center" }}>
                    <span style={{ color: f.alignColor, fontSize: 8 }}>▶</span>{t}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 8 }}>FACTION RELATIONS</div>
                {f.relations.map(r => (
                  <div key={r.name} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6, alignItems: "center" }}>
                    <span style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 10 }}>{r.name}</span>
                    <Badge label={r.stance} color={r.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}
