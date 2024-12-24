import React from 'react';
import { PlayerCard } from './PlayerCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStats } from '../services/statsService';
import { usePlayerStore } from '../store/playerStore';

interface TeamSectionProps {
  teamName: string;
  players: string[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ teamName, players }) => {
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const playerQueries = players.map(player => 
    useQuery({
      queryKey: ['player', player],
      queryFn: () => fetchPlayerStats(player),
      onSuccess: (data) => setPlayer(data)
    })
  );

  const isLoading = playerQueries.some(query => query.isLoading);
  const isError = playerQueries.some(query => query.isError);

  if (isLoading) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">{teamName}</h2>
        <div className="animate-pulse space-y-4">
          {players.map((_, idx) => (
            <div key={idx} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">{teamName}</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading player data
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{teamName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playerQueries.map((query, idx) => (
          query.data && <PlayerCard key={idx} player={query.data} />
        ))}
      </div>
    </div>
  );
};