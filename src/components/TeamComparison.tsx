import React from 'react';
import { PlayerList } from './PlayerList';

interface TeamComparisonProps {
  teamOne: {
    name: string;
    players: string[];
  };
  teamTwo: {
    name: string;
    players: string[];
  };
}

export const TeamComparison: React.FC<TeamComparisonProps> = ({ teamOne, teamTwo }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {teamOne.name}
          </h2>
          <div className="w-32 h-32 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            <span className="text-4xl">🏀</span>
          </div>
        </div>
        <PlayerList players={teamOne.players} />
      </div>
      
      <div className="hidden lg:flex items-center justify-center">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-800/50 to-transparent"></div>
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {teamTwo.name}
          </h2>
          <div className="w-32 h-32 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            <span className="text-4xl">🏀</span>
          </div>
        </div>
        <PlayerList players={teamTwo.players} />
      </div>
    </div>
  );
};