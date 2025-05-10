// File: components/TournamentCard.js
import React from 'react';
import Link from 'next/link';

export default function TournamentCard({ tournament }) {
  // Format date to readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Check if tournament is upcoming
  const isUpcoming = new Date(tournament.date) > new Date();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-green-200">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
        
        {tournament.completed && (
          <div className="absolute top-4 right-4 bg-green-800 text-white px-3 py-1 rounded-full text-sm font-bold">
            Completed
          </div>
        )}
        
        {isUpcoming && !tournament.completed && (
          <div className="absolute top-4 right-4 bg-gold-400 text-white px-3 py-1 rounded-full text-sm font-bold">
            Upcoming
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-serif font-bold">{tournament.name}</h3>
          <p>{tournament.course.name}, {tournament.course.location}</p>
          <p className="font-bold">{formatDate(tournament.date)}</p>
        </div>
      </div>
      <div className="p-4">
        <Link 
          href={`/tournaments/${tournament.id}`}
          className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded inline-block transition-colors"
        >
          {tournament.completed ? 'View Results' : 'View Details'}
        </Link>
      </div>
    </div>
  );
}