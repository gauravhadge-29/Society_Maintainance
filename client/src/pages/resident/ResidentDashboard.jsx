import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import StatusBadge from '../../components/StatusBadge';
import ImageModal from '../../components/ImageModal';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const STAT_CARDS = [
  { key: 'open',        label: 'Open',        color: 'amber',   icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg> },
  { key: 'in-progress', label: 'In Progress', color: 'sky',     icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg> },
  { key: 'resolved',    label: 'Resolved',    color: 'emerald', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
];

export default function ResidentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [complaintsRes, noticesRes] = await Promise.all([
          api.get('/complaints'),
          api.get('/notices')
        ]);
        setComplaints(complaintsRes.data.data || []);
        setNotices(noticesRes.data.data || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const counts = {
    'open': complaints.filter(c => c.status === 'open').length,
    'in-progress': complaints.filter(c => c.status === 'in-progress').length,
    'resolved': complaints.filter(c => c.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 animate-page">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">Track your complaints and society updates</p>
          </div>
          <Link
            to="/resident/complaints/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-primary-600/20 hover:shadow-md transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            New Complaint
          </Link>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {STAT_CARDS.map(card => (
            <div key={card.key} className="bg-white rounded-xl border border-slate-200/60 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <div className={`p-2.5 rounded-lg bg-${card.color}-50 text-${card.color}-600`}>
                {card.icon}
              </div>
              <div>
                <p className="text-[13px] font-medium text-slate-500">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 leading-tight">{loading ? '—' : counts[card.key]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Complaints — 3 cols */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">My Complaints</h2>
              <span className="text-xs font-medium text-slate-400">{complaints.length} total</span>
            </div>
            <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
              {loading ? (
                <div className="p-8 flex justify-center"><div className="spinner" /></div>
              ) : complaints.length === 0 ? (
                <div className="p-12 text-center">
                  <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  <p className="text-sm text-slate-500 mb-4">No complaints raised yet</p>
                  <Link to="/resident/complaints/new" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Raise your first complaint →
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {complaints.map(c => (
                    <li key={c._id}>
                      <Link to={`/complaints/${c._id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors group">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-primary-700 transition-colors truncate">{c.title}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[11px] font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md uppercase">{c.category || 'General'}</span>
                            <span className="text-[11px] text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <StatusBadge status={c.status} />
                          <svg className="w-4 h-4 text-slate-300 group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Notices — 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Notices</h2>
              <Link to="/notices" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors">View all</Link>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="p-8 flex justify-center"><div className="spinner" /></div>
              ) : notices.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/60 p-8 text-center">
                  <p className="text-sm text-slate-500">No active notices</p>
                </div>
              ) : (
                notices.slice(0, 4).map(notice => (
                  <div key={notice._id}
                    className={`bg-white rounded-xl border p-4 hover:shadow-sm transition-shadow relative overflow-hidden ${
                      notice.isImportant ? 'border-red-200 border-l-[3px] border-l-red-500' : 'border-slate-200/60'
                    }`}
                  >
                    {notice.isImportant && (
                      <span className="absolute top-2 right-2 text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md uppercase">Important</span>
                    )}
                    <h3 className="text-sm font-semibold text-slate-800 pr-16 mb-1">{notice.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">{notice.description}</p>

                    {notice.photo && (
                      <button onClick={() => setSelectedImage(notice.photo)} className="mb-3 block max-w-[10rem] rounded-lg overflow-hidden border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                        <img src={notice.photo} alt="Attachment" className="w-full h-auto object-cover hover:opacity-90 transition-opacity" />
                      </button>
                    )}

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-50">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${notice.isImportant ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary-600'}`}>
                        {notice.createdBy?.name?.substring(0,2).toUpperCase() || 'AD'}
                      </div>
                      <span className="text-[11px] text-slate-400">{new Date(notice.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
