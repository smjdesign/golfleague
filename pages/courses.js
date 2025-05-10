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