import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">SocietyApp</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-indigo-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900">John Doe</span>
                <span className="text-xs text-gray-500 font-medium">Flat A-101</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:opacity-90 transition-opacity">
                JD
              </div>
              <Link to="/login" className="ml-4 text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
