import React from 'react';
import { PlayerCard } from './PlayerCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStats } from '../services/statsService';
import { usePlayerStore } from '../store/playerStore';

interface PlayerListProps {
  players: string[];
}

export const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
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
      <div className="space-y-4">
        {players.map((_, idx) => (
          <div key={idx} className="h-48 bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
        Error loading player data
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {playerQueries.map((query, idx) => (
        query.data && <PlayerCard key={idx} player={query.data} />
      ))}
    </div>
  );
};