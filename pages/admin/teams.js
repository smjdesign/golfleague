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