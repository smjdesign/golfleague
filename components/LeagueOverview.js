// File: components/LeagueOverview.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../pages/_app';

export default function LeagueOverview() {
  const [upcomingTournament, setUpcomingTournament] = useState(null);
  const [topTeams, setTopTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // For development, we'll use mock data until Supabase is connected
      const mockUpcomingTournament = {
        id: 1,
        name: 'Spring Championship',
        course: { name: 'Pine Valley Golf Club', location: 'Pine Valley, NJ' },
        date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15),
        image_url: '/tournaments/tournament1.jpg'
      };
      
      const mockTopTeams = [
        { id: 1, name: 'Eagle Squadron', wins: 8, losses: 2, points: 24 },
        { id: 2, name: 'Birdie Bandits', wins: 7, losses: 3, points: 21 },
        { id: 3, name: 'Fairway Legends', wins: 6, losses: 4, points: 18 },
      ];
      
      setUpcomingTournament(mockUpcomingTournament);
      setTopTeams(mockTopTeams);
      setLoading(false);
      
      /* Uncomment when Supabase is connected
      // Fetch upcoming tournament
      const { data: tournamentData, error: tournamentError } = await supabase
        .from('tournaments')
        .select('*, course:courses(*)')
        .eq('completed', false)
        .order('date')
        .limit(1);
      
      if (tournamentError) throw tournamentError;
      
      if (tournamentData.length > 0) {
        setUpcomingTournament(tournamentData[0]);
      }
      
      // Fetch top teams
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select('*')
        .order('points', { ascending: false })
        .limit(3);
      
      if (teamsError) throw teamsError;
      setTopTeams(teamsData);
      */
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date to readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <section className="mb-10">
        <div className="bg-green-800 text-white rounded-lg p-6 shadow-lg">
          <h1 className="text-4xl font-serif mb-2">Welcome to Golf League</h1>
          <p className="text-xl">Track your team, compete in tournaments, and climb the rankings!</p>
        </div>
      </section>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-64 bg-green-100 rounded-lg mb-6"></div>
          <div className="h-48 bg-green-100 rounded-lg"></div>
        </div>
      ) : (
        <>
          {upcomingTournament && (
            <section className="mb-10">
              <h2 className="text-3xl font-serif text-green-800 mb-4">Next Tournament</h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48 bg-green-200">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-2xl font-serif">{upcomingTournament.name}</h3>
                    <p>{upcomingTournament.course.name}, {upcomingTournament.course.location}</p>
                    <p className="font-bold">{formatDate(upcomingTournament.date)}</p>
                  </div>
                </div>
                <div className="p-4">
                  <Link href={`/tournaments/${upcomingTournament.id}`} className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded inline-block transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </section>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-serif text-green-800 mb-4">Top Teams</h2>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <ul className="divide-y divide-green-100">
                  {topTeams.map((team, index) => (
                    <li key={team.id} className="p-4 hover:bg-green-50">
                      <Link href={`/teams/${team.id}`} className="flex items-center">
                        <span className="font-bold text-green-800 w-8">{index + 1}</span>
                        <span className="flex-grow">{team.name}</span>
                        <span className="text-green-700 font-bold">{team.points} pts</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-green-50">
                  <Link href="/standings" className="text-green-700 hover:text-green-600 font-medium">
                    View Full Standings →
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-serif text-green-800 mb-4">Quick Links</h2>
              <div className="grid grid-cols-1 gap-4">
                <Link href="/teams" className="bg-green-700 hover:bg-green-600 text-white rounded-lg p-6 shadow-md transition-colors">
                  <h3 className="text-xl font-bold mb-2">Teams</h3>
                  <p>Browse all teams in the league</p>
                </Link>
                <Link href="/courses" className="bg-green-700 hover:bg-green-600 text-white rounded-lg p-6 shadow-md transition-colors">
                  <h3 className="text-xl font-bold mb-2">Courses</h3>
                  <p>Explore our partner golf courses</p>
                </Link>
                <Link href="/tournaments" className="bg-green-700 hover:bg-green-600 text-white rounded-lg p-6 shadow-md transition-colors">
                  <h3 className="text-xl font-bold mb-2">Tournaments</h3>
                  <p>View upcoming and past tournaments</p>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}