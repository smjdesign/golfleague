// File: pages/teams.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TeamCard from '../components/TeamCard';
import { supabase } from './_app';
import LoadingSkeletonCard from '../components/LoadingSkeletonCard';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      // For development, we'll use mock data until Supabase is connected
      const mockTeams = [
        { id: 1, name: 'Eagle Squadron', logo_url: '/logos/team1.png', player_count: 4, wins: 8, losses: 2 },
        { id: 2, name: 'Birdie Bandits', logo_url: '/logos/team2.png', player_count: 5, wins: 7, losses: 3 },
        { id: 3, name: 'Fairway Legends', logo_url: '/logos/team3.png', player_count: 4, wins: 6, losses: 4 },
        { id: 4, name: 'Par Breakers', logo_url: '/logos/team4.png', player_count: 5, wins: 5, losses: 5 },
      ];
      
      setTeams(mockTeams);
      setLoading(false);
      
      /* Uncomment when Supabase is connected
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setTeams(data);
      */
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Teams | Golf League App</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-green-800 mb-8">Teams</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}