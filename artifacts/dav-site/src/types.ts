export interface Session {
  uid: string;
  email: string;
  username?: string;
  level: number;
  rank?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "Normal" | "High" | "Critical";
  published: boolean;
  date?: string;
  createdAt?: unknown;
}

export interface GameEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: "Training" | "Official" | "Research" | "Emergency";
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  desc?: string;
  host?: string;
  published: boolean;
  log?: string[];
  createdAt?: unknown;
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  level: number;
  rank?: string;
  createdAt?: unknown;
}

export const RANK_META: Record<number, { label: string; color: string }> = {
  6: { label: "Director", color: "#00ff88" },
  5: { label: "Division Director", color: "#c47a1e" },
  4: { label: "Senior Operative", color: "#8aaabb" },
  3: { label: "Operative", color: "#3a6a8a" },
  2: { label: "Associate", color: "#5a9a7a" },
  1: { label: "Recruit", color: "#4a5a6a" },
};

export const canManage = (l: number) => l >= 5;
export const canLog = (l: number) => l >= 3;

export const DISCORD = "https://discord.gg/rK2BwaHH";
export const GAME = "https://www.roblox.com/games/10899299831/Remnants";
export const NAV_LINKS = ["Home", "Lore", "Factions", "Enemies", "Events", "Ranks", "Rules"];
