import { type Announcement } from "@/types";
import { prioColor } from "@/lib/helpers";
import { Badge } from "@/components/Primitives";

export default function AnnouncementBanner({ announcements }: { announcements: Announcement[] }) {
  const pub = announcements.filter(a => a.published);
  if (!pub.length) return null;
  const a = pub.find(x => x.priority === "Critical") || pub.find(x => x.priority === "High") || pub[0];
  const c = prioColor(a.priority);
  return (
    <div style={{ background: c + "0c", borderBottom: "1px solid " + c + "33", padding: "6px 16px", display: "flex", alignItems: "center", gap: 8, fontFamily: "'Courier New',monospace", fontSize: 10, flexWrap: "wrap" }}>
      <Badge label={a.priority} color={c} />
      <span style={{ color: "#8aabb0", fontWeight: 700 }}>{a.title}</span>
      <span style={{ color: "#2a4a5a", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>— {a.content.slice(0, 100)}{a.content.length > 100 ? "..." : ""}</span>
    </div>
  );
}
