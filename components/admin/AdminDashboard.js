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