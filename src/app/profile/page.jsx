'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext';
import Link from 'next/link';
import { User, Mail, Shield, LogOut, Edit3, Camera, Layout } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/LoginPage?redirect=/profile');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-surface border-t-primary rounded-full animate-spin mb-6" />
        <p className="text-muted font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Accessing Profile</p>
      </div>
    );
  }

  if (!user) return null;

  const avatarUrl = user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=E63946&color=fff&size=200`;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background py-24 px-6 relative overflow-hidden">
 
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface border border-border p-8 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse" />
                <img
                  src={avatarUrl}
                  alt={user.name || 'User'}
                  className="w-32 h-32 rounded-full object-cover border-4 border-surface shadow-2xl relative z-10"
                />
                <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center border-4 border-surface z-20 hover:scale-110 transition-transform shadow-lg">
                  <Camera size={16} />
                </button>
              </div>

              <h1 className="text-2xl font-black text-white tracking-tighter mb-1 relative z-10">{user.name}</h1>
              <p className="text-muted text-xs font-bold uppercase tracking-widest mb-6 relative z-10">Premium Member</p>
              
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-background/50 rounded-xl border border-border text-[10px] font-black text-primary uppercase tracking-widest mb-8 relative z-10">
                 <Shield size={12} /> Verified Account
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 bg-background border border-border hover:bg-red-500/10 hover:border-red-500/50 text-red-400 font-black uppercase tracking-widest text-[10px] py-4 rounded-2xl transition-all duration-300 relative z-10"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>

            <div className="bg-surface/50 border border-border p-6 rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-primary border border-border">
                  <Layout size={18} />
                </div>
                <p className="text-white font-bold text-sm">Dashboard</p>
              </div>
              <Link href="/" className="text-muted hover:text-primary transition-colors">
                <Shield size={18} />
              </Link>
            </div>
          </div>

        
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface border border-border p-10 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Personal Information</h2>
                <Link href="/profile/update" className="flex items-center gap-2 text-muted hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                  <Edit3 size={14} /> Edit
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                    <User size={12} className="text-primary" /> Full Name
                  </p>
                  <p className="text-white font-bold text-lg">{user.name}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} className="text-primary" /> Email Address
                  </p>
                  <p className="text-white font-bold text-lg truncate">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                    <Shield size={12} className="text-primary" /> Member Since
                  </p>
                  <p className="text-white font-bold text-lg">May 2024</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-muted uppercase tracking-widest flex items-center gap-2">
                    <Camera size={12} className="text-primary" /> Profile Status
                  </p>
                  <p className="text-primary font-black text-lg uppercase tracking-tighter">Active</p>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-border">
                <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border">
                    <p className="text-white font-bold text-sm">Two-Factor Authentication</p>
                    <span className="px-3 py-1 bg-surface border border-border text-[10px] font-bold text-muted rounded-lg">Disabled</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border">
                    <p className="text-white font-bold text-sm">Password Status</p>
                    <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-[10px] font-black text-primary rounded-lg uppercase tracking-widest">Secure</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer">
                <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Courses Enrolled</p>
                <p className="text-4xl font-black">12</p>
              </div>
              <div className="bg-surface border border-border p-8 rounded-[2rem] text-white hover:scale-[1.02] transition-transform cursor-pointer shadow-xl">
                <p className="text-xs font-black uppercase tracking-widest mb-2 text-primary">Points Earned</p>
                <p className="text-4xl font-black">2,450</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}