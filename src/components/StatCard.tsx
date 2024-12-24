import React, { useState } from 'react';

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  onClick: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, onClick }) => {
  return (
    <div 
      className="flex items-center gap-3 bg-gray-900/30 rounded-lg p-3 shadow-inner border border-gray-800/20 cursor-pointer hover:bg-gray-900/40 transition-colors"
      onClick={onClick}
    >
      <span className="text-xl bg-gray-800/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md backdrop-blur-sm">
        {icon}
      </span>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-300">{value.toFixed(2)}</p>
      </div>
    </div>
  );
}