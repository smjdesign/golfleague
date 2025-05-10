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

// File: components/CourseCard.js
import React from 'react';
import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-green-200">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-serif font-bold">{course.name}</h3>
          <p>{course.location}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-600">Par</p>
            <p className="font-bold">{course.par}</p>
          </div>
          <div>
            <p className="text-gray-600">Holes</p>
            <p className="font-bold">{course.holes}</p>
          </div>
          <div>
            <p className="text-gray-600">Difficulty</p>
            <p className="font-bold">{course.difficulty}</p>
          </div>
        </div>
        <Link 
          href={`/courses/${course.id}`}
          className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded block text-center transition-colors"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

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

// File: components/LoadingSkeletonCard.js
export default function LoadingSkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-green-100"></div>
      <div className="p-6">
        <div className="h-6 bg-green-100 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-green-50 rounded w-full mb-2"></div>
        <div className="h-4 bg-green-50 rounded w-2/3 mb-6"></div>
        <div className="h-10 bg-green-100 rounded w-full"></div>
      </div>
    </div>
  );
}

// File: components/admin/AdminDashboard.js
import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-serif text-green-800 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/admin/teams"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-serif text-green-800 mb-4">Team Management</h2>
          <p className="text-gray-700 mb-4">Add, edit, and remove teams from the league</p>
          <div className="flex justify-end">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Manage →</span>
          </div>
        </Link>
        
        <Link 
          href="/admin/courses"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-serif text-green-800 mb-4">Course Management</h2>
          <p className="text-gray-700 mb-4">Manage golf courses and their details</p>
          <div className="flex justify-end">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Manage →</span>
          </div>
        </Link>
        
        <Link 
          href="/admin/tournaments"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-serif text-green-800 mb-4">Tournament Management</h2>
          <p className="text-gray-700 mb-4">Create and organize tournaments</p>
          <div className="flex justify-end">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Manage →</span>
          </div>
        </Link>
        
        <Link 
          href="/admin/players"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-serif text-green-800 mb-4">Player Management</h2>
          <p className="text-gray-700 mb-4">Register and manage players</p>
          <div className="flex justify-end">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Manage →</span>
          </div>
        </Link>
        
        <Link 
          href="/admin/scores"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-serif text-green-800 mb-4">Score Management</h2>
          <p className="text-gray-700 mb-4">Record and update tournament scores</p>
          <div className="flex justify-end">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Manage →</span>
          </div>
        </Link>
        
        <Link 
          href="/admin/settings"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-serif text-green-800 mb-4">League Settings</h2>
          <p className="text-gray-700 mb-4">Configure league settings and rules</p>
          <div className="flex justify-end">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Configure →</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

// File: components/admin/TeamManagement.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../../pages/_app';

export default function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentTeam, setCurrentTeam] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      // For development, we'll use mock data until Supabase is connected
      const mockTeams = [
        { id: 1, name: 'Eagle Squadron', logo_url: '/logos/team1.png' },
        { id: 2, name: 'Birdie Bandits', logo_url: '/logos/team2.png' },
        { id: 3, name: 'Fairway Legends', logo_url: '/logos/team3.png' },
        { id: 4, name: 'Par Breakers', logo_url: '/logos/team4.png' },
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTeam = () => {
    setFormMode('add');
    setFormData({ name: '', logo_url: '' });
    setShowForm(true);
  };

  const handleEditTeam = (team) => {
    setFormMode('edit');
    setCurrentTeam(team);
    setFormData({
      name: team.name,
      logo_url: team.logo_url,
    });
    setShowForm(true);
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;

    try {
      // For development, we'll mock the deletion
      setTeams(teams.filter(team => team.id !== teamId));
      
      /* Uncomment when Supabase is connected
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);
      
      if (error) throw error;
      */
      
      alert('Team deleted successfully!');
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete team.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formMode === 'add') {
        // For development, we'll mock the addition
        const newTeam = {
          id: teams.length + 1,
          ...formData,
        };
        setTeams([...teams, newTeam]);
        
        /* Uncomment when Supabase is connected
        const { data, error } = await supabase
          .from('teams')
          .insert(formData)
          .select();
        
        if (error) throw error;
        setTeams([...teams, data[0]]);
        */
        
        alert('Team added successfully!');
      } else {
        // For development, we'll mock the update
        const updatedTeams = teams.map(team => 
          team.id === currentTeam.id ? { ...team, ...formData } : team
        );
        setTeams(updatedTeams);
        
        /* Uncomment when Supabase is connected
        const { error } = await supabase
          .from('teams')
          .update(formData)
          .eq('id', currentTeam.id);
        
        if (error) throw error;
        fetchTeams(); // Refresh the list
        */
        
        alert('Team updated successfully!');
      }
      
      setShowForm(false);
      setFormData({ name: '', logo_url: '' });
    } catch (error) {
      console.error('Error saving team:', error);
      alert('Failed to save team.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-green-800">Team Management</h1>
        <button
          onClick={handleAddTeam}
          className="bg-green-700 hover:bg-green-600 text-white// Components for the Golf League App

// File: components/Layout.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../pages/_app';

export default function Layout({ children, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-beige-50">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="bg-green-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-serif font-bold flex items-center">
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Golf League
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
              <Link href="/teams" className="hover:text-gold-400 transition-colors">Teams</Link>
              <Link href="/courses" className="hover:text-gold-400 transition-colors">Courses</Link>
              <Link href="/tournaments" className="hover:text-gold-400 transition-colors">Tournaments</Link>
              <Link href="/standings" className="hover:text-gold-400 transition-colors">Standings</Link>
              
              {user ? (
                <>
                  {user.app_metadata?.role === 'admin' && (
                    <Link href="/admin" className="hover:text-gold-400 transition-colors">Admin</Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="mt-4 md:hidden pb-4 space-y-2">
              <Link href="/" className="block py-2 hover:text-gold-400 transition-colors">Home</Link>
              <Link href="/teams" className="block py-2 hover:text-gold-400 transition-colors">Teams</Link>
              <Link href="/courses" className="block py-2 hover:text-gold-400 transition-colors">Courses</Link>
              <Link href="/tournaments" className="block py-2 hover:text-gold-400 transition-colors">Tournaments</Link>
              <Link href="/standings" className="block py-2 hover:text-gold-400 transition-colors">Standings</Link>
              
              {user ? (
                <>
                  {user.app_metadata?.role === 'admin' && (
                    <Link href="/admin" className="block py-2 hover:text-gold-400 transition-colors">Admin</Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-red-300 hover:text-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login" 
                  className="block py-2 hover:text-gold-400 transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-green-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Golf League</h3>
              <p className="text-green-200">Bringing golf enthusiasts together since 2023.</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-green-200 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/teams" className="text-green-200 hover:text-white transition-colors">Teams</Link></li>
                <li><Link href="/courses" className="text-green-200 hover:text-white transition-colors">Courses</Link></li>
                <li><Link href="/standings" className="text-green-200 hover:text-white transition-colors">Standings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Contact</h3>
              <p className="text-green-200">Email: info@golfleague.com</p>
              <p className="text-green-200">Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 border-t border-green-800 pt-4 text-center text-green-300 text-sm">
            &copy; {new Date().getFullYear()} Golf League App. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

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