// File: components/StandingsTable.js
import React, { useState } from 'react';

export default function StandingsTable({ standings, loading }) {
  const [sortField, setSortField] = useState('points');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedStandings = [...standings].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Render a sort indicator for the table header
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-green-100 rounded w-full mb-4"></div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-green-50 rounded w-full mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full">
        <thead>
          <tr className="bg-green-800 text-white">
            <th className="py-3 px-4 text-left">Rank</th>
            <th className="py-3 px-4 text-left">Team</th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('played')}
            >
              Played {renderSortIndicator('played')}
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('wins')}
            >
              Wins {renderSortIndicator('wins')}
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('losses')}
            >
              Losses {renderSortIndicator('losses')}
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('points')}
            >
              Points {renderSortIndicator('points')}
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer"
              onClick={() => handleSort('avg_score')}
            >
              Avg. Score {renderSortIndicator('avg_score')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStandings.map((team, index) => (
            <tr 
              key={team.id} 
              className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}
            >
              <td className="py-4 px-4 font-bold">{index + 1}</td>
              <td className="py-4 px-4 font-medium">{team.team}</td>
              <td className="py-4 px-4">{team.played}</td>
              <td className="py-4 px-4 text-green-700 font-medium">{team.wins}</td>
              <td className="py-4 px-4 text-red-500">{team.losses}</td>
              <td className="py-4 px-4 font-bold">{team.points}</td>
              <td className="py-4 px-4">{team.avg_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}