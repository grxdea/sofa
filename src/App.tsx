import React, { useState, useEffect } from 'react';
import { StatsTable } from './components/StatsTable';
import { parseCSV } from './utils/csvParser';
import { calculateStats } from './utils/statsCalculator';
import { PlayerStats } from './types/stats';

const PLAYERS = [
  { name: 'Ivica Zubac', file: 'ivica_zubac.csv' },
  { name: 'Walker Kessler', file: 'walker_kessler.csv' },
  { name: 'Khris Middleton', file: 'khris_middleton.csv' },
  { name: 'Jalen Green', file: 'jalen_green.csv' },
  { name: 'Jaren Jackson', file: 'jaren_jackson.csv' },
  { name: 'Mikal Bridges', file: 'mikal_bridges.csv' },
  { name: 'Josh Hart', file: 'josh_hart.csv' },
  { name: 'Evan Mobley', file: 'evan_mobley.csv' },
  { name: 'Rudy Gobert', file: 'rudy_gobert.csv' },
  { name: 'James Harden', file: 'james_harden.csv' },
  { name: 'Bobby Portis', file: 'bobby_portis.csv' },
  { name: 'DeAaron Fox', file: 'deaaron_fox.csv' },
];

function App() {
  const [players, setPlayers] = useState<PlayerStats[]>([]);

  const loadStats = async () => {
    try {
      const loadedPlayers = await Promise.all(
        PLAYERS.map(async ({ name, file }) => {
          const response = await fetch(`/stats/${file}`);
          const content = await response.text();
          const weeklyStats = parseCSV(content);
          
          return {
            name,
            weeklyStats,
            calculations: calculateStats(weeklyStats)
          };
        })
      );

      setPlayers(loadedPlayers);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-gray-100">
      <header className="bg-gradient-to-b from-black to-gray-900 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16">
              <img 
                src="/logo.png" 
                alt="Shit On Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Shit On Fantasy Assistant
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <StatsTable players={players} onRefresh={loadStats} />
      </main>
    </div>
  );
}

export default App;