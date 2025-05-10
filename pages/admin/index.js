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