import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
  };

  const dashboardLink = user?.role === 'admin' ? '/admin/dashboard' : '/resident/dashboard';

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'text-primary-700 bg-primary-50'
        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={dashboardLink} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-sm shadow-primary-600/20 group-hover:shadow-md group-hover:shadow-primary-600/30 transition-shadow">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight hidden sm:block">SocietyHub</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {user?.role === 'resident' && (
              <>
                <NavLink to="/resident/dashboard" end className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/resident/complaints/new" className={navLinkClass}>New Complaint</NavLink>
              </>
            )}
            <NavLink to="/notices" end className={navLinkClass}>Notices</NavLink>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Profile dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-800 leading-tight">{user.name}</span>
                    <span className="text-[11px] text-slate-500 font-medium leading-tight">
                      {user.role === 'admin' ? 'Administrator' : `Flat ${user.flatNo}`}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-white uppercase">
                    {user.name?.substring(0, 2)}
                  </div>
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200/60 py-1.5 z-20 animate-page">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                      </div>
                      <Link to={dashboardLink} onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                        Dashboard
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-page">
          <div className="px-4 py-3 space-y-1">
            {user?.role === 'resident' && (
              <>
                <NavLink to="/resident/dashboard" end onClick={() => setMobileOpen(false)} className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/resident/complaints/new" onClick={() => setMobileOpen(false)} className={navLinkClass}>New Complaint</NavLink>
              </>
            )}
            <NavLink to="/notices" end onClick={() => setMobileOpen(false)} className={navLinkClass}>Notices</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
