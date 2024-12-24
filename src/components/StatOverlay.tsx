import React from 'react';

interface StatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: {
    labels: string[];
    values: (number | string)[];
  };
}

export const StatOverlay: React.FC<StatOverlayProps> = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-gray-900 rounded-xl p-6 max-w-lg w-full shadow-xl border border-gray-800/30" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-100">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <span className="text-xl">×</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {data.labels.map((label, i) => (
                  <th key={i} className="text-left p-2 text-gray-400 border-b border-gray-800">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {data.values.map((value, i) => (
                  <td key={i} className="p-2 text-gray-200">{typeof value === 'number' ? value.toFixed(1) : value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}