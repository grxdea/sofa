import React, { useState } from 'react';
import { PlayerStats } from '../types/stats';

interface StatsTableProps {
  players: PlayerStats[];
  onRefresh: () => void;
}

const formatNumber = (value: number | undefined | null, decimals: number = 2): string => {
  if (value === undefined || value === null || isNaN(value)) {
    return '-';
  }
  return value.toFixed(decimals);
};

const defaultSort = {
  field: 'weeklyAvg' as keyof PlayerStats['calculations'],
  direction: 'desc' as 'asc' | 'desc'
};

const columnOrder: (keyof PlayerStats['calculations'])[] = [
  'gamesMissed',
  'fantasyPointsPerMinute',
  'weeklyLow',
  'weeklyHigh',
  'weeklyAvg',
  'shitOnScore'
];

const columnHeaders: Record<keyof PlayerStats['calculations'], string> = {
  gamesMissed: 'GAMES MISSED',
  fantasyPointsPerMinute: 'FPTS/MIN',
  weeklyLow: 'WEEKLY LOW',
  weeklyHigh: 'WEEKLY HIGH',
  weeklyAvg: 'WEEKLY AVG',
  shitOnScore: 'SHIT ON SCORE'
};

export const StatsTable: React.FC<StatsTableProps> = ({ players, onRefresh }) => {
  const [sortField, setSortField] = useState<keyof PlayerStats['calculations']>(defaultSort.field);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSort.direction);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof PlayerStats['calculations']) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const resetTable = () => {
    setSortField(defaultSort.field);
    setSortDirection(defaultSort.direction);
    setSearchTerm('');
  };

  const sortedPlayers = [...players]
    .filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a.calculations[sortField] ?? 0;
      const bValue = b.calculations[sortField] ?? 0;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

  return (
    <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 rounded-xl p-6 border border-gray-800/30 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900/50 border border-gray-800/30 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            onClick={resetTable}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Reset Table
          </button>
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Refresh Stats
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800/50">
              <th className="text-left p-3 text-gray-400">PLAYER</th>
              {columnOrder.map((field) => (
                <th
                  key={field}
                  className="text-left p-3 text-gray-400 cursor-pointer hover:text-gray-200"
                  onClick={() => handleSort(field)}
                >
                  <div className="flex items-center gap-2">
                    {columnHeaders[field]}
                    {sortField === field && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => (
              <tr
                key={player.name}
                className="border-b border-gray-800/30 hover:bg-gray-900/30"
              >
                <td className="p-3 text-gray-200">{player.name}</td>
                {columnOrder.map((field) => (
                  <td key={field} className="p-3 text-gray-200">
                    {formatNumber(player.calculations[field], field === 'gamesMissed' ? 0 : 2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};