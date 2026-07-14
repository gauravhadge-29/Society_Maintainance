import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ImageModal from '../../components/ImageModal';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

export default function NoticeBoard() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get('/notices');
        setNotices(response.data.data || []);
      } catch (err) {
        setError('Failed to load notices.');
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className={`min-h-screen bg-surface ${isAdmin ? 'flex flex-col md:flex-row' : ''}`}>
      {isAdmin && <Sidebar />}
      <div className={isAdmin ? 'flex-1 min-w-0' : 'w-full'}>
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full animate-page">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Notice Board</h1>
            <p className="text-sm text-slate-500">Stay updated with the latest announcements</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><div className="spinner" /></div>
          ) : error ? (
            <div className="text-center py-16">
              <svg className="w-10 h-10 text-red-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
              <p className="text-sm text-red-500 font-medium">{error}</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H6.75a.75.75 0 01-.75-.75V6.75a.75.75 0 01.75-.75h2.5c.704 0 1.402-.03 2.09-.09m0 9.93c.89.318 1.753.712 2.59 1.17" /></svg>
              <p className="text-sm text-slate-500 font-medium">No notices posted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map(notice => (
                <div key={notice._id}
                  className={`bg-white rounded-xl border overflow-hidden hover:shadow-sm transition-shadow relative ${
                    notice.isImportant ? 'border-red-200 border-l-[3px] border-l-red-500' : 'border-slate-200/60'
                  }`}>

                  <div className="p-5 sm:p-6">
                    {notice.isImportant && (
                      <span className="absolute top-3 right-3 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md uppercase tracking-wide">Important</span>
                    )}

                    <h2 className="text-lg font-semibold text-slate-900 pr-20 mb-2">{notice.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap mb-4">{notice.description}</p>

                    {notice.photo && (
                      <button onClick={() => setSelectedImage(notice.photo)}
                        className="mb-4 block max-w-xs rounded-lg overflow-hidden border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 shadow-sm">
                        <img src={notice.photo} alt="Attachment" className="w-full h-auto object-cover hover:opacity-90 transition-opacity" />
                      </button>
                    )}

                    <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${notice.isImportant ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary-600'}`}>
                        {notice.createdBy?.name?.substring(0,2).toUpperCase() || 'AD'}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{notice.createdBy?.name || 'Admin Team'}</p>
                        <p className="text-[11px] text-slate-400">{new Date(notice.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
