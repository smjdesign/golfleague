// File: components/TeamCard.js
import React from 'react';
import Link from 'next/link';

export default function TeamCard({ team }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="bg-green-700 h-32 flex items-center justify-center p-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <span className="text-2xl font-serif font-bold text-green-800">{team.name.charAt(0)}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-green-800 mb-2">{team.name}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-600">Players</p>
            <p className="font-bold">{team.player_count}</p>
          </div>
          <div>
            <p className="text-gray-600">Record</p>
            <p className="font-bold">{team.wins}W - {team.losses}L</p>
          </div>
        </div>
        <Link 
          href={`/teams/${team.id}`}
          className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded block text-center transition-colors"
        >
          View Team
        </Link>
      </div>
    </div>
  );
}