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
          className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Team
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-serif text-green-800 mb-4">
            {formMode === 'add' ? 'Add New Team' : 'Edit Team'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Team Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="logo_url">
                Logo URL
              </label>
              <input
                type="text"
                id="logo_url"
                name="logo_url"
                value={formData.logo_url}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {formMode === 'add' ? 'Add Team' : 'Update Team'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-green-50 rounded w-full mb-2"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Team Name</th>
                <th className="py-3 px-4 text-left">Logo</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr 
                  key={team.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}
                >
                  <td className="py-3 px-4">{team.id}</td>
                  <td className="py-3 px-4 font-medium">{team.name}</td>
                  <td className="py-3 px-4">
                    {team.logo_url ? (
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-serif font-bold text-green-800">
                          {team.name.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">No logo</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTeam(team)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(team.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}// Components for the Golf League App

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
