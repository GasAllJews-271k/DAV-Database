import { PageWrap, SecHeader, CARD, Badge, Divider } from "@/components/Primitives";
import { tierColor, statColor } from "@/lib/helpers";

const ENEMIES = [
  {
    id: "ENT-001",
    name: "VOIDWALKER",
    tier: 5,
    status: "Danger",
    classification: "Autonomous Anomaly",
    threat: "EXTREME",
    desc: "A highly mobile anomalous entity capable of dimensional displacement. First encountered in Zone 14-Kappa. Exhibits apparent intelligence and selective target engagement. No known reliable containment method.",
    behaviors: ["Dimensional phasing", "Selective aggression", "Rapid repositioning", "Environmental camouflage"],
    countermeasures: ["High-intensity light exposure delays phase cycle", "Group engagement only — solo contact prohibited", "Withdraw if target lock exceeds 8 seconds"],
    encounters: 14,
    losses: 3,
  },
  {
    id: "ENT-007",
    name: "SCAVENGER UNIT",
    tier: 2,
    status: "Caution",
    classification: "Hostile Personnel",
    threat: "MODERATE",
    desc: "Disorganized raiders operating in small squads (3-8 units). Iron Syndicate-adjacent but not officially affiliated. Target resource caches and isolated personnel. Predictable patrol patterns.",
    behaviors: ["Cache raiding", "Ambush tactics", "Opportunistic engagement", "Rapid retreat under pressure"],
    countermeasures: ["Avoid known cache routes after dark", "Numerical superiority recommended (2:1+)", "Feint engagement triggers retreat in 70% of encounters"],
    encounters: 89,
    losses: 4,
  },
  {
    id: "ENT-012",
    name: "STALKER CONSTRUCT",
    tier: 4,
    status: "Danger",
    classification: "Mechanical Entity",
    threat: "HIGH",
    desc: "Automated patrol construct of unknown origin. Operates in pairs. Equipped with threat-detection systems that persist through standard concealment methods. Neutralized units have been observed self-repairing over extended periods.",
    behaviors: ["Paired patrol routes", "Persistent threat tracking", "Area denial", "Self-repair protocols"],
    countermeasures: ["EMP disruption confirmed effective (temporary)", "Simultaneous dual neutralization prevents repair cascade", "Avoid patrol corridors between 0200-0600 UTC"],
    encounters: 31,
    losses: 7,
  },
  {
    id: "ENT-019",
    name: "BREACH ENTITY",
    tier: 6,
    status: "Danger",
    classification: "Unclassified Anomaly",
    threat: "CRITICAL",
    desc: "Documented only through survivor accounts and partial sensor data. Appears exclusively in Zone THE BREACH. Scale and capabilities exceed all known threat categories. All field teams are prohibited from engagement. Observation only.",
    behaviors: ["Zone-bound (THE BREACH only)", "Extreme scale", "Unknown motivation", "Environmental distortion field"],
    countermeasures: ["DO NOT ENGAGE", "Observation drones only — no personnel within 500m", "Immediate withdrawal if entity exits THE BREACH perimeter"],
    encounters: 3,
    losses: 11,
  },
  {
    id: "ENT-023",
    name: "SYNDICATE ENFORCER",
    tier: 3,
    status: "Caution",
    classification: "Hostile Personnel — Elite",
    threat: "HIGH",
    desc: "Iron Syndicate heavy combat unit. Well-equipped and operating under direct Syndicate command. Deployed for high-value target extraction and territorial enforcement. More disciplined than standard Scavenger units.",
    behaviors: ["Coordinated squad tactics", "Heavy suppression", "Target-specific missions", "No retreat protocols"],
    countermeasures: ["Avoid Syndicate-controlled territory", "Intelligence gathering recommended before any engagement", "Request Director authorization before any counter-operation"],
    encounters: 22,
    losses: 6,
  },
];

export default function EnemiesPage() {
  return (
    <PageWrap>
      <SecHeader tag="Intelligence — Threats" title="THREAT DATABASE" sub="// All entity data is compiled from field reports — accuracy varies by source" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ENEMIES.map(e => (
          <div key={e.id} style={{ ...CARD, borderLeft: "2px solid " + tierColor(e.tier) + "88" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <div>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 4, marginBottom: 4 }}>THREAT FILE // {e.id}</div>
                <div style={{ color: "#c8d6e5", fontFamily: "'Courier New',monospace", fontSize: 14, fontWeight: 900, letterSpacing: 2 }}>{e.name}</div>
                <div style={{ color: "#2a4a5a", fontFamily: "'Courier New',monospace", fontSize: 9, marginTop: 3 }}>{e.classification}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}>
                <Badge label={"TIER " + e.tier} color={tierColor(e.tier)} />
                <Badge label={e.status} color={statColor(e.status)} />
                <Badge label={e.threat} color={tierColor(e.tier)} />
              </div>
            </div>
            <div style={{ color: "#3a5a6a", fontFamily: "'Courier New',monospace", fontSize: 11, lineHeight: 1.8, marginBottom: 14 }}>{e.desc}</div>
            <Divider my={12} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 14 }}>
              <div>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 8 }}>OBSERVED BEHAVIORS</div>
                {e.behaviors.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, fontFamily: "'Courier New',monospace", fontSize: 10, color: "#2a4a5a" }}>
                    <span style={{ color: tierColor(e.tier), fontSize: 8, flexShrink: 0 }}>▶</span>{b}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: "#1a3a4a", fontFamily: "'Courier New',monospace", fontSize: 8, letterSpacing: 3, marginBottom: 8 }}>COUNTERMEASURES</div>
                {e.countermeasures.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, fontFamily: "'Courier New',monospace", fontSize: 10, color: "#2a4a5a", lineHeight: 1.5 }}>
                    <span style={{ color: "#00ff88", fontSize: 8, flexShrink: 0, marginTop: 2 }}>✓</span>{c}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, fontFamily: "'Courier New',monospace", fontSize: 9 }}>
              <div style={{ color: "#1a3a4a" }}>ENCOUNTERS: <span style={{ color: "#8aaabb" }}>{e.encounters}</span></div>
              <div style={{ color: "#1a3a4a" }}>LOSSES: <span style={{ color: "#8b1a1a" }}>{e.losses}</span></div>
            </div>
          </div>
        ))}
      </div>
    </PageWrap>
  );
}
