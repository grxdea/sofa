import { WeeklyStat, StatCalculations } from '../types/stats';

const calculateWeeklyStats = (stats: WeeklyStat[]) => {
  // Group stats by week
  const weeklyGroups = stats.reduce((acc, stat) => {
    if (!acc[stat.week]) {
      acc[stat.week] = [];
    }
    acc[stat.week].push(stat);
    return acc;
  }, {} as Record<number, WeeklyStat[]>);

  // Calculate weekly averages, highs, and lows
  const weeklyHighs: number[] = [];
  const weeklyLows: number[] = [];
  const weeklyAverages: number[] = [];

  Object.values(weeklyGroups).forEach(weekStats => {
    const validScores = weekStats
      .filter(stat => stat.fantasyPoints !== null)
      .map(stat => stat.fantasyPoints as number);

    if (validScores.length > 0) {
      weeklyHighs.push(Math.max(...validScores));
      weeklyLows.push(Math.min(...validScores));
      weeklyAverages.push(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
    }
  });

  return {
    weeklyHighs,
    weeklyLows,
    weeklyAverages,
  };
};

const calculateShitOnScore = (stats: WeeklyStat[]) => {
  const scores = stats
    .filter(stat => stat.fantasyPoints !== null)
    .map(stat => stat.fantasyPoints as number);
  const totalGames = scores.length;

  const thresholds = [
    { points: 60, multiplier: 6 },
    { points: 55, multiplier: 5 },
    { points: 50, multiplier: 4.5 },
    { points: 45, multiplier: 4 },
    { points: 40, multiplier: 3.5 },
    { points: 35, multiplier: 3 },
    { points: 30, multiplier: 2.5 },
    { points: 25, multiplier: 2 },
    { points: 20, multiplier: 1.5 },
  ];

  const totalScore = thresholds.reduce((score, { points, multiplier }) => {
    const gamesAboveThreshold = scores.filter(s => s >= points).length;
    return score + (gamesAboveThreshold * multiplier);
  }, 0);

  return totalScore / totalGames;
};

export const calculateStats = (stats: WeeklyStat[]): StatCalculations => {
  const validStats = stats.filter(stat => stat.fantasyPoints !== null && stat.minutes !== null);
  const gamesMissed = stats.filter(stat => stat.fantasyPoints === null).length;

  // Calculate FPTS/Min
  const totalMinutes = validStats.reduce((sum, stat) => sum + (stat.minutes as number), 0);
  const totalPoints = validStats.reduce((sum, stat) => sum + (stat.fantasyPoints as number), 0);
  const fptsPerMin = totalMinutes > 0 ? totalPoints / totalMinutes : 0;

  // Calculate weekly stats
  const { weeklyHighs, weeklyLows, weeklyAverages } = calculateWeeklyStats(stats);
  const averageWeeklyHigh = weeklyHighs.reduce((sum, score) => sum + score, 0) / weeklyHighs.length;
  const averageWeeklyLow = weeklyLows.reduce((sum, score) => sum + score, 0) / weeklyLows.length;
  const weeklyAvg = weeklyAverages.reduce((sum, score) => sum + score, 0) / weeklyAverages.length;

  // Calculate Shit On Score
  const shitOnScore = calculateShitOnScore(validStats);

  return {
    fantasyPointsPerMinute: fptsPerMin,
    weeklyLow: averageWeeklyLow,
    weeklyHigh: averageWeeklyHigh,
    shitOnScore,
    weeklyAvg,
    gamesMissed
  };
};