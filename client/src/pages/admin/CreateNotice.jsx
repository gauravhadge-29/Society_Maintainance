import React from 'react';
import Navbar from '../../components/Navbar';

export default function CreateNotice() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 sm:p-10 text-center">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Post a Notice</h1>
            <p className="mt-2 text-indigo-100 font-medium">Keep residents informed with updates and announcements.</p>
          </div>
          
          <form className="px-6 py-8 sm:p-10 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Notice Title</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm" placeholder="e.g., Upcoming Maintenance Drive" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
              <textarea rows="6" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm" placeholder="Write your announcement here..."></textarea>
            </div>

            <div className="flex items-center gap-3 bg-red-50 p-4 rounded-xl border border-red-100">
              <input id="important" type="checkbox" className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer" />
              <label htmlFor="important" className="font-bold text-red-800 cursor-pointer">
                Mark as Important (Sends an email to all residents and pins to top)
              </label>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="px-8 py-3 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition-all">
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
