export const fmtDate = (d: string) => {
  try {
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return d || "";
  }
};

export const fmtTS = () =>
  new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

export const tierColor = (t: number) => (t <= 2 ? "#2a6b3c" : t <= 4 ? "#c47a1e" : "#8b1a1a");
export const statColor = (s: string) =>
  s === "Safe" ? "#2a6b3c" : s === "Caution" ? "#c47a1e" : "#8b1a1a";
export const evStatColor = (s: string) =>
  ({ Upcoming: "#00ff88", Ongoing: "#c47a1e", Completed: "#3a6b4a", Cancelled: "#8b1a1a" }[s] || "#3a5a6a");
export const evTypeColor = (t: string) =>
  ({ Training: "#2a6b3c", Official: "#00ff88", Research: "#3a5a8a", Emergency: "#8b1a1a" }[t] || "#3a5a6a");
export const prioColor = (p: string) =>
  ({ Normal: "#3a5a6a", High: "#c47a1e", Critical: "#8b1a1a" }[p] || "#3a5a6a");
