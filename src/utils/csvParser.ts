import { WeeklyStat } from '../types/stats';

export const parseCSV = (content: string): WeeklyStat[] => {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const [week, fpts, min] = values;
    
    return {
      week: parseInt(week, 10),
      fantasyPoints: fpts === '-' ? null : parseFloat(fpts),
      minutes: min === '-' ? null : parseFloat(min)
    };
  });
};