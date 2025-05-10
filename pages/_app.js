// Project structure for the Golf League App

// File: pages/_app.js
import '../styles/globals.css';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Layout from '../components/Layout';

// We'll initialize Supabase here but we can add real credentials later
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = supabase.auth.session();
    setUser(session?.user || null);
    setLoading(false);

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <Layout user={user}>
      <Component {...pageProps} user={user} supabase={supabase} />
    </Layout>
  );
}

export default MyApp;

// File: pages/index.js
import React from 'react';
import Head from 'next/head';
import LeagueOverview from '../components/LeagueOverview';

export default function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Golf League App</title>
        <meta name="description" content="Manage your golf league with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <LeagueOverview />
      </main>
    </div>
  );
}

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

// File: pages/courses.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CourseCard from '../components/CourseCard';
import { supabase } from './_app';
import LoadingSkeletonCard from '../components/LoadingSkeletonCard';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // For development, we'll use mock data until Supabase is connected
      const mockCourses = [
        { id: 1, name: 'Pine Valley Golf Club', location: 'Pine Valley, NJ', par: 72, holes: 18, image_url: '/courses/course1.jpg', difficulty: 'Hard' },
        { id: 2, name: 'Augusta National', location: 'Augusta, GA', par: 72, holes: 18, image_url: '/courses/course2.jpg', difficulty: 'Hard' },
        { id: 3, name: 'Pebble Beach Golf Links', location: 'Pebble Beach, CA', par: 72, holes: 18, image_url: '/courses/course3.jpg', difficulty: 'Medium' },
        { id: 4, name: 'St Andrews Links', location: 'St Andrews, Scotland', par: 72, holes: 18, image_url: '/courses/course4.jpg', difficulty: 'Medium' },
      ];
      
      setCourses(mockCourses);
      setLoading(false);
      
      /* Uncomment when Supabase is connected
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCourses(data);
      */
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Courses | Golf League App</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-green-800 mb-8">Courses</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <LoadingSkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

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

// File: pages/admin/index.js
import React from 'react';
import Head from 'next/head';
import AdminDashboard from '../../components/admin/AdminDashboard';
import { supabase } from '../_app';

export default function Admin({ user }) {
  // Check if user is authenticated and has admin role
  const isAdmin = user && user.app_metadata?.role === 'admin';

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>Please log in to access the admin area.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You do not have permission to access this area.</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Admin Dashboard | Golf League App</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <AdminDashboard />
      </main>
    </div>
  );
}

// File: pages/admin/teams.js
import React from 'react';
import Head from 'next/head';
import TeamManagement from '../../components/admin/TeamManagement';
import { supabase } from '../_app';

export default function AdminTeams({ user }) {
  // Check if user is authenticated and has admin role
  const isAdmin = user && user.app_metadata?.role === 'admin';

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>You do not have permission to access this area.</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Team Management | Golf League App</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <TeamManagement />
      </main>
    </div>
  );
}

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