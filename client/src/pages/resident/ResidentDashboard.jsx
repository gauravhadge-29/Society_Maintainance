import React from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';

export default function ResidentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Complaints</h1>
          <Link to="/resident/complaints/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2 w-max">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Raise Complaint
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-yellow-50 text-yellow-600 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Open</p>
              <p className="text-3xl font-black text-gray-900 mt-1">3</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">In Progress</p>
              <p className="text-3xl font-black text-gray-900 mt-1">1</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-green-50 text-green-600 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resolved</p>
              <p className="text-3xl font-black text-gray-900 mt-1">12</p>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {/* Dummy List Item */}
            <li className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide border border-indigo-100">
                    Plumbing
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    Water leaking in master bathroom
                  </h3>
                </div>
                <div className="flex items-center gap-4 self-start md:self-auto">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                    Open
                  </span>
                  <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Oct 24, 2023</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </div>
            </li>
            <li className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide border border-indigo-100">
                    Electricity
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    Power fluctuation in living room
                  </h3>
                </div>
                <div className="flex items-center gap-4 self-start md:self-auto">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                    Resolved
                  </span>
                  <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Oct 20, 2023</span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
