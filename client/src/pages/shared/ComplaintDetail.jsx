import React from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function ComplaintDetail() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-indigo-600 flex items-center gap-2 font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Complaints
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wide">Plumbing</span>
                  <span className="text-sm text-gray-500 font-medium">Submitted Oct 24, 2023</span>
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900">Water leaking in master bathroom</h1>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 rounded-lg text-sm font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">Open</span>
                <span className="px-4 py-2 rounded-lg text-sm font-bold bg-red-100 text-red-800 border border-red-200">High Priority</span>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              There is a severe leak coming from the pipe under the sink. It's pooling onto the floor and might cause water damage if not fixed quickly.
            </p>
          </div>
          
          {/* Photos */}
          <div className="p-8 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Attached Photos</h3>
            <div className="flex gap-4">
              <div className="w-32 h-32 bg-gray-200 rounded-xl border border-gray-300 flex items-center justify-center overflow-hidden">
                 <span className="text-xs text-gray-500 font-medium">Image 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <h3 className="text-xl font-bold text-gray-900 mb-6">Status History</h3>
        <div className="relative pl-4 sm:pl-6 border-l-2 border-indigo-200 space-y-8">
          
          {/* Timeline Item */}
          <div className="relative">
            <div className="absolute -left-6 sm:-left-8 mt-1.5 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow"></div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-900">Complaint Raised</span>
                <span className="text-sm text-gray-500 font-medium">Oct 24, 10:00 AM</span>
              </div>
              <p className="text-gray-600 text-sm">Status set to <span className="font-semibold text-yellow-600">Open</span> by John Doe</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
