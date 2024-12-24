import axios from 'axios';
import * as cheerio from 'cheerio';
import { Player } from '../types/player';
import { calculateFantasyPoints } from '../utils/calculateFantasyPoints';
import { calculateShitOnScore } from '../utils/calculateShitOnScore';

const cache = new Map<string, Player>();

export const fetchPlayerStats = async (playerName: string): Promise<Player> => {
  // Check cache first
  if (cache.has(playerName)) {
    return cache.get(playerName)!;
  }

  // For development purposes, return mock data
  // In production, this would make actual API calls to basketball-reference.com
  const mockPlayer: Player = {
    name: playerName,
    team: 'NBA Team',
    stats: {
      gamesPlayed: 50,
      points: 20,
      assists: 5,
      rebounds: 5,
      steals: 1,
      blocks: 1,
      turnovers: 2,
      technicalFouls: 0,
      flagrantFouls: 0,
      threePointsMade: 2
    },
    fantasyStats: {
      fantasyPointsPerMinute: 0.5,
      averageWeeklyLow: 25,
      averageWeeklyHigh: 45,
      shitOnScore: 15,
      weeklyScores: [30, 35, 40, 25, 28]
    }
  };

  // Store in cache
  cache.set(playerName, mockPlayer);
  
  return mockPlayer;
};