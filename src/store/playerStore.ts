import { create } from 'zustand';
import { Player } from '../types/player';

interface PlayerStore {
  players: Record<string, Player>;
  setPlayer: (player: Player) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  players: {},
  setPlayer: (player) => 
    set((state) => ({
      players: {
        ...state.players,
        [player.name]: player
      }
    }))
}));