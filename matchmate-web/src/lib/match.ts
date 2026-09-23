import type { Group, FootballLevel } from "@/data/groups";
import type { MoodTag } from "@/data/moods";

export type MatchPrefs = {
  tags: MoodTag[];
  level?: FootballLevel;
  school?: string;
  size?: "small" | "big";
  global?: boolean;
};

export const PREFS_KEY = "matchmate:prefs";
export const JOINED_KEY = "matchmate:joined";

function jitter(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % 5;
}

/**
 * Simple frontend match score — tag overlap plus a few preference bonuses.
 * Not an AI model; intentionally transparent for the prototype.
 */
export function matchScore(group: Group, prefs: MatchPrefs): number {
  const { tags } = prefs;
  let score = 56 + jitter(group.id);

  if (tags.length === 0) {
    score += 14;
  } else {
    const hits = tags.filter((t) => group.activities.includes(t)).length;
    score += Math.round((hits / tags.length) * 34);
    // Cheering style conflicts
    if (tags.includes("chill") && !tags.includes("loud") && group.socialStyle === "loud") score -= 10;
    if (tags.includes("loud") && !tags.includes("chill") && group.socialStyle === "chill") score -= 8;
  }

  if (prefs.level) {
    if (group.footballLevel === prefs.level) score += 6;
    else if (group.footballLevel === "mixed") score += 3;
    else if (
      (prefs.level === "first" && group.footballLevel === "fan") ||
      (prefs.level === "fan" && group.footballLevel === "first")
    )
      score -= 6;
  }
  if (prefs.school && group.schools.includes(prefs.school)) score += 3;
  if (prefs.size === "small" && group.maxMembers <= 5) score += 3;
  if (prefs.size === "big" && group.maxMembers >= 6) score += 3;
  if (prefs.global) score += group.foreignFriendly ? 4 : -5;

  return Math.max(35, Math.min(98, score));
}

export function rankGroups(list: Group[], prefs: MatchPrefs) {
  return list
    .map((group) => ({ group, score: matchScore(group, prefs) }))
    .sort((a, b) => b.score - a.score);
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}
