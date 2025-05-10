// Components for the Golf League App

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