import React, { useState } from 'react';
import { Player } from '../types/player';
import { StatCard } from './StatCard';
import { StatOverlay } from './StatOverlay';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const [isStatsVisible, setIsStatsVisible] = useState(true);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  const overallScore = Math.round(
    (player.fantasyStats.shitOnScore * 0.4) +
    (player.fantasyStats.fantasyPointsPerMinute * 30) +
    (player.fantasyStats.averageWeeklyHigh * 0.2)
  );

  const getOverlayData = (stat: string) => {
    switch (stat) {
      case 'fptsMin':
        return {
          labels: ['Current FPTS/Min', 'Last 5 Games', 'Season Average'],
          values: [
            player.fantasyStats.fantasyPointsPerMinute,
            player.fantasyStats.fantasyPointsPerMinute * 0.9,
            player.fantasyStats.fantasyPointsPerMinute * 1.1
          ]
        };
      case 'shitOn':
        return {
          labels: ['Total Score', 'Games Above 30', 'Games Above 40', 'Games Above 50'],
          values: [
            player.fantasyStats.shitOnScore,
            player.fantasyStats.weeklyScores.filter(s => s > 30).length,
            player.fantasyStats.weeklyScores.filter(s => s > 40).length,
            player.fantasyStats.weeklyScores.filter(s => s > 50).length
          ]
        };
      case 'weeklyLow':
        return {
          labels: ['Average Low', 'Lowest Score', 'Second Lowest', 'Third Lowest'],
          values: [
            player.fantasyStats.averageWeeklyLow,
            Math.min(...player.fantasyStats.weeklyScores),
            ...player.fantasyStats.weeklyScores.sort((a, b) => a - b).slice(1, 3)
          ]
        };
      case 'weeklyHigh':
        return {
          labels: ['Average High', 'Highest Score', 'Second Highest', 'Third Highest'],
          values: [
            player.fantasyStats.averageWeeklyHigh,
            Math.max(...player.fantasyStats.weeklyScores),
            ...player.fantasyStats.weeklyScores.sort((a, b) => b - a).slice(1, 3)
          ]
        };
      default:
        return { labels: [], values: [] };
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 rounded-xl p-6 hover:translate-y-[-2px] transition-all duration-200 border border-gray-800/30 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] backdrop-blur-sm">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700/50 shadow-lg backdrop-blur-sm">
              <span className="text-xl">🏃</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-100">{player.name}</h3>
              <span className="text-sm text-gray-500">{player.team}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-gray-500">Overall Score</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {overallScore}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setIsStatsVisible(!isStatsVisible)}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            {isStatsVisible ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
        
        {isStatsVisible && (
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon="⚡"
              label="FPTS/Min"
              value={player.fantasyStats.fantasyPointsPerMinute}
              onClick={() => setActiveOverlay('fptsMin')}
            />
            
            <StatCard
              icon="📈"
              label="Shit On Score"
              value={player.fantasyStats.shitOnScore}
              onClick={() => setActiveOverlay('shitOn')}
            />
            
            <StatCard
              icon="📉"
              label="Weekly Low"
              value={player.fantasyStats.averageWeeklyLow}
              onClick={() => setActiveOverlay('weeklyLow')}
            />
            
            <StatCard
              icon="🎯"
              label="Weekly High"
              value={player.fantasyStats.averageWeeklyHigh}
              onClick={() => setActiveOverlay('weeklyHigh')}
            />
          </div>
        )}
      </div>

      {activeOverlay && (
        <StatOverlay
          isOpen={!!activeOverlay}
          onClose={() => setActiveOverlay(null)}
          title={`${player.name} - ${activeOverlay === 'fptsMin' ? 'Fantasy Points Per Minute' : 
                                   activeOverlay === 'shitOn' ? 'Shit On Score Details' :
                                   activeOverlay === 'weeklyLow' ? 'Weekly Low Analysis' :
                                   'Weekly High Analysis'}`}
          data={getOverlayData(activeOverlay)}
        />
      )}
    </>
  );
};