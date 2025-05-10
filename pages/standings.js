// File: pages/standings.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import StandingsTable from '../components/StandingsTable';
import { supabase } from './_app';

export default function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('overall'); // 'overall', 'team', 'player'

  useEffect(() => {
    fetchStandings();
  }, [filter]);

  const fetchStandings = async () => {
    try {
      // For development, we'll use mock data until Supabase is connected
      const mockStandings = [
        { id: 1, team: 'Eagle Squadron', played: 10, wins: 8, losses: 2, points: 24, avg_score: 72.5 },
        { id: 2, team: 'Birdie Bandits', played: 10, wins: 7, losses: 3, points: 21, avg_score: 73.2 },
        { id: 3, team: 'Fairway Legends', played: 10, wins: 6, losses: 4, points: 18, avg_score: 74.1 },
        { id: 4, team: 'Par Breakers', played: 10, wins: 5, losses: 5, points: 15, avg_score: 74.8 },
        { id: 5, team: 'Bunker Busters', played: 10, wins: 3, losses: 7, points: 9, avg_score: 76.3 },
        { id: 6, team: 'Bogey Brigade', played: 10, wins: 1, losses: 9, points: 3, avg_score: 78.9 },
      ];
      
      setStandings(mockStandings);
      setLoading(false);
      
      /* Uncomment when Supabase is connected
      const { data, error } = await supabase
        .rpc('get_standings', { filter_type: filter })
      
      if (error) throw error;
      setStandings(data);
      */
    } catch (error) {
      console.error('Error fetching standings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Standings | Golf League App</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-green-800 mb-8">League Standings</h1>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => setFilter('overall')}
              className={`px-4 py-2 rounded ${filter === 'overall' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
            >
              Overall
            </button>
            <button 
              onClick={() => setFilter('team')}
              className={`px-4 py-2 rounded ${filter === 'team' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
            >
              By Team
            </button>
            <button 
              onClick={() => setFilter('player')}
              className={`px-4 py-2 rounded ${filter === 'player' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
            >
              By Player
            </button>
          </div>
        </div>
        
        <StandingsTable standings={standings} loading={loading} />
      </main>
    </div>
  );
}