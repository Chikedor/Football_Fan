import React from 'react';

import { teams } from '../data/teams';
import type { Team } from '../types/team';

interface TeamSelectorProps {
  onSelectTeam: (team: Team) => void;
}

export function TeamSelector({ onSelectTeam }: TeamSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {teams.map(team => (
        <button
          key={team.id}
          onClick={() => onSelectTeam(team)}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <img
            src={team.logo}
            alt={`${team.name} logo`}
            className="w-20 h-20 object-contain mb-2"
          />
          <span className="text-lg font-semibold text-gray-800">{team.name}</span>
        </button>
      ))}
    </div>
  );
}
