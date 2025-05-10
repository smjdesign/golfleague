// File: pages/tournaments.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import TournamentCard from '../components/TournamentCard';
import { supabase } from './_app';
import LoadingSkeletonCard from '../components/LoadingSkeletonCard';

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'

  useEffect(() => {
    fetchTournaments();
  }, [filter]);

  const fetchTournaments = async () => {
    try {
      // For development, we'll use mock data until Supabase is connected
      const today = new Date();
      const mockTournaments = [
        { 
          id: 1, 
          name: 'Spring Championship', 
          course: { name: 'Pine Valley Golf Club', location: 'Pine Valley, NJ' },
          date: new Date(today.getFullYear(), today.getMonth() + 1, 15), 
          completed: false,
          image_url: '/tournaments/tournament1.jpg'
        },
        { 
          id: 2, 
          name: 'Summer Classic', 
          course: { name: 'Augusta National', location: 'Augusta, GA' },
          date: new Date(today.getFullYear(), today.getMonth() + 2, 10), 
          completed: false,
          image_url: '/tournaments/tournament2.jpg'
        },
        { 
          id: 3, 
          name: 'Fall Invitational', 
          course: { name: 'Pebble Beach Golf Links', location: 'Pebble Beach, CA' },
          date: new Date(today.getFullYear(), today.getMonth() - 1, 5), 
          completed: true,
          image_url: '/tournaments/tournament3.jpg'
        },
        { 
          id: 4, 
          name: 'Winter Open', 
          course: { name: 'St Andrews Links', location: 'St Andrews, Scotland' },
          date: new Date(today.getFullYear(), today.getMonth() - 2, 20), 
          completed: true,
          image_url: '/tournaments/tournament4.jpg'
        },
      ];
      
      let filteredTournaments = [];
      switch(filter) {
        case 'upcoming':
          filteredTournaments = mockTournaments.filter(t => !t.completed);
          break;
        case 'past':
          filteredTournaments = mockTournaments.filter(t => t.completed);
          break;
        default:
          filteredTournaments = mockTournaments;
      }
      
      setTournaments(filteredTournaments);
      setLoading(false);
      
      /* Uncomment when Supabase is connected
      let query = supabase
        .from('tournaments')
        .select('*, course:courses(name, location)');
      
      if (filter === 'upcoming') {
        query = query.eq('completed', false);
      } else if (filter === 'past') {
        query = query.eq('completed', true);
      }
      
      const { data, error } = await query.order('date', { ascending: filter !== 'past' });
      
      if (error) throw error;
      setTournaments(data);
      */
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Tournaments | Golf League App</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-green-800 mb-8">Tournaments</h1>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
            >
              All Tournaments
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded ${filter === 'upcoming' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded ${filter === 'past' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'}`}
            >
              Past
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}