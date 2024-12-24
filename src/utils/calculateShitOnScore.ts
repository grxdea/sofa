export const calculateShitOnScore = (weeklyScores: number[]) => {
  let score = 0;
  
  weeklyScores.forEach(points => {
    if (points > 60) score += 6;
    if (points > 55) score += 5;
    if (points > 50) score += 4.5;
    if (points > 45) score += 4;
    if (points > 40) score += 3.5;
    if (points > 35) score += 3;
    if (points > 30) score += 2.5;
    if (points > 25) score += 2;
    if (points > 20) score += 1.5;
  });

  return score;
};