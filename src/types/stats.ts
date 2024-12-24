export interface PlayerStats {
  name: string;
  weeklyStats: WeeklyStat[];
  calculations: StatCalculations;
}

export interface WeeklyStat {
  week: number;
  fantasyPoints: number | null;
  minutes: number | null;
}

export interface StatCalculations {
  fantasyPointsPerMinute: number;
  weeklyLow: number;
  weeklyHigh: number;
  shitOnScore: number;
  weeklyAvg: number;
  gamesMissed: number;
}