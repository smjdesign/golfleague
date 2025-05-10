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