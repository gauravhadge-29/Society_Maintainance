import React from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Placeholder */}
      <aside className="w-full md:w-64 bg-white shadow-sm border-r border-gray-100 hidden md:block min-h-screen p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">SocietyAdmin</span>
        </div>
        <nav className="space-y-2">
          <Link to="/admin/dashboard" className="bg-indigo-50 text-indigo-700 font-semibold px-4 py-3 rounded-xl block transition-colors">Dashboard</Link>
          <Link to="/admin/dashboard" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium px-4 py-3 rounded-xl block transition-colors">Complaints</Link>
          <Link to="/notices" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium px-4 py-3 rounded-xl block transition-colors">Notices</Link>
          <Link to="/admin/dashboard" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium px-4 py-3 rounded-xl block transition-colors">Residents</Link>
        </nav>
      </aside>

      <main className="flex-1">
        <Navbar />
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of society operations</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center">
              <p className="text-gray-500 font-semibold mb-1">Total Complaints</p>
              <h2 className="text-4xl font-black text-gray-900">45</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center border-b-4 border-b-yellow-400">
              <p className="text-gray-500 font-semibold mb-1">Open</p>
              <h2 className="text-4xl font-black text-gray-900">12</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center border-b-4 border-b-green-400">
              <p className="text-gray-500 font-semibold mb-1">Resolved</p>
              <h2 className="text-4xl font-black text-gray-900">30</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 flex flex-col justify-center items-center text-center border-b-4 border-b-red-500 bg-red-50">
              <p className="text-red-700 font-bold mb-1">Overdue</p>
              <h2 className="text-4xl font-black text-red-700">3</h2>
            </div>
          </div>

          {/* Overdue Complaints Section */}
          <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Attention Required (Overdue)</h3>
              <Link to="/admin/dashboard" className="text-sm text-indigo-600 font-semibold hover:text-indigo-800">View All</Link>
            </div>
            <ul className="divide-y divide-gray-100">
              <li className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h4 className="text-md font-bold text-gray-900">Elevator not working in Block B</h4>
                    <p className="text-sm text-gray-500 mt-1">Reported by Flat B-402 • 10 days ago</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">High Priority</span>
                    <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors">Review</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
