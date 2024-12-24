export interface Player {
  name: string;
  team: string;
  stats: PlayerStats;
  fantasyStats: FantasyStats;
}

export interface PlayerStats {
  gamesPlayed: number;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  turnovers: number;
  technicalFouls: number;
  flagrantFouls: number;
  threePointsMade: number;
}

export interface FantasyStats {
  fantasyPointsPerMinute: number;
  averageWeeklyLow: number;
  averageWeeklyHigh: number;
  shitOnScore: number;
  weeklyScores: number[];
}