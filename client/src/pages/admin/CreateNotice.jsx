import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function CreateNotice() {
  const [formData, setFormData] = useState({ title: '', description: '', isImportant: false });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('isImportant', formData.isImportant);
      if (file) data.append('photo', file);

      await api.post('/notices', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/notices');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar />
        <main className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto w-full animate-page">

          {/* Back */}
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-medium mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            Back
          </button>

          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-6 py-6 border-b border-slate-100">
              <h1 className="text-xl font-bold text-slate-900">Create Notice</h1>
              <p className="text-sm text-slate-500 mt-1">Keep residents informed with updates and announcements.</p>
            </div>

            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-page" role="alert">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                  {error}
                </div>
              )}

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">Notice Title</label>
                <input id="title" type="text" name="title" value={formData.title} onChange={handleInputChange} required
                  className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 hover:border-slate-400"
                  placeholder="e.g., Upcoming Maintenance Drive" />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea id="description" rows="5" name="description" value={formData.description} onChange={handleInputChange} required
                  className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 hover:border-slate-400 resize-none"
                  placeholder="Write your announcement here..." />
              </div>

              {/* File upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Attach Image <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/30 transition-all duration-200 cursor-pointer relative">
                  <div className="p-5 text-center">
                    <svg className="mx-auto h-7 w-7 text-slate-400 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5V19.5a1.5 1.5 0 001.5 1.5z" />
                    </svg>
                    <p className="text-sm text-slate-600 font-medium">{file ? file.name : 'Click to upload'}</p>
                    <p className="text-xs text-slate-400 mt-0.5">PNG, JPG up to 5MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                {file && (
                  <button type="button" onClick={() => setFile(null)} className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Remove file</button>
                )}
              </div>

              {/* Important toggle */}
              <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${formData.isImportant ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}>
                <input
                  type="checkbox"
                  name="isImportant"
                  checked={formData.isImportant}
                  onChange={handleInputChange}
                  className="mt-0.5 h-4 w-4 text-red-600 border-slate-300 rounded focus:ring-red-500 cursor-pointer"
                />
                <div>
                  <p className={`text-sm font-semibold ${formData.isImportant ? 'text-red-800' : 'text-slate-700'}`}>Mark as Important</p>
                  <p className={`text-xs mt-0.5 ${formData.isImportant ? 'text-red-600' : 'text-slate-500'}`}>
                    Sends an email notification to all residents and pins to top
                  </p>
                </div>
              </label>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => navigate(-1)} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">Cancel</button>
                <button type="submit" disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white text-sm font-semibold rounded-xl shadow-sm shadow-primary-600/20 hover:shadow-md transition-all duration-200">
                  {loading && <div className="spinner" style={{ width: '1rem', height: '1rem', borderWidth: '2px', borderTopColor: 'white', borderColor: 'rgba(255,255,255,0.3)' }} />}
                  {loading ? 'Publishing...' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
