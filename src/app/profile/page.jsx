'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Context/AuthContext';
import Link from 'next/link';

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
      <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const avatarUrl = user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=dc2626&color=fff&size=200`;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#3C3D37] py-16 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-[#1e201e] rounded-3xl p-8 shadow-2xl text-center">

          
          <div className="relative inline-block mb-6">
            <img
              src={avatarUrl}
              alt={user.name || 'User'}
              className="w-28 h-28 rounded-full object-cover border-4 border-red-500 shadow-lg"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=dc2626&color=fff&size=200`;
              }}
            />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#1e201e]" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
          <p className="text-[#697565] mb-8">{user.email}</p>

          
          <div className="bg-[#3C3D37] rounded-2xl p-5 text-left space-y-4 mb-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#697565] text-sm flex-shrink-0">Full Name</span>
              <span className="text-[#ecdfcc] font-medium text-right">{user.name}</span>
            </div>
            <div className="h-px bg-[#697565]/20" />
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#697565] text-sm flex-shrink-0">Email</span>
              <span className="text-[#ecdfcc] font-medium text-right truncate">{user.email}</span>
            </div>
            <div className="h-px bg-[#697565]/20" />
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#697565] text-sm flex-shrink-0">Photo URL</span>
              <span className="text-[#ecdfcc] font-medium text-sm text-right truncate max-w-[200px]">
                {user.image ? (
                  <a href={user.image} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    View Photo
                  </a>
                ) : (
                  <span className="text-[#697565]">Not set</span>
                )}
              </span>
            </div>
          </div>

         
          <div className="space-y-3">
            <Link
              href="/profile/update"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition text-center"
            >
              ✏️ Update Information
            </Link>
            <button
              onClick={handleLogout}
              className="w-full border border-red-500/40 hover:border-red-500 text-red-400 font-semibold py-3 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}