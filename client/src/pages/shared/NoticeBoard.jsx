import React from 'react';
import Navbar from '../../components/Navbar';

export default function NoticeBoard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">Society Notice Board</h1>
          <p className="text-lg text-gray-600 font-medium">Stay updated with the latest announcements from the admin.</p>
        </div>

        <div className="space-y-6">
          {/* Important Notice */}
          <div className="bg-white rounded-2xl shadow-md border-l-4 border-red-500 p-6 sm:p-8 hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              Important
            </div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900 pr-16">Annual General Meeting 2023</h2>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Dear Residents, the Annual General Meeting for this year has been scheduled for next Sunday at the clubhouse. We will discuss maintenance hikes, upcoming festival celebrations, and general security upgrades. Please make sure at least one member from each flat attends.
            </p>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">
                AD
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Admin Team</p>
                <p className="text-xs text-gray-500 font-medium">Oct 26, 2023</p>
              </div>
            </div>
          </div>

          {/* Normal Notice */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Swimming Pool Maintenance</h2>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              The society swimming pool will be closed for deep cleaning and maintenance from Wednesday to Friday this week. It will reopen on Saturday morning. Apologies for the inconvenience.
            </p>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                AD
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Admin Team</p>
                <p className="text-xs text-gray-500 font-medium">Oct 22, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
