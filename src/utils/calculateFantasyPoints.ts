export const calculateFantasyPoints = (stats: {
  points: number;
  assists: number;
  rebounds: number;
  doubleDouble: boolean;
  tripleDouble: boolean;
  turnovers: number;
  technicalFouls: number;
  flagrantFouls: number;
  blocks: number;
  steals: number;
  threePointsMade: number;
}) => {
  let points = 0;

  // Base stats
  points += stats.assists * 1;
  points += stats.rebounds * 1;
  points += stats.doubleDouble ? 1 : 0;
  points += stats.tripleDouble ? 2 : 0;
  points += stats.turnovers * -1;
  points += stats.technicalFouls * -2;
  points += stats.flagrantFouls * -2;
  points += stats.points * 0.5;
  points += stats.blocks * 2;
  points += stats.steals * 2;
  points += stats.threePointsMade * 0.5;

  // Bonuses
  if (stats.points >= 50) points += 3;
  else if (stats.points >= 40) points += 2;
  
  if (stats.assists >= 15) points += 3;
  if (stats.rebounds >= 20) points += 2;

  return points;
};