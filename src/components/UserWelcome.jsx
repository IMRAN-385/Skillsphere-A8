'use client';

import { useAuth } from "@/Context/AuthContext";

export default function UserWelcome() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-background pt-8 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-surface to-background rounded-[2rem] p-6 sm:p-10 border border-border shadow-2xl">
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-primary/5 rounded-full blur-[80px]" />

          <div className="relative flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <img
                src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=E63946&color=fff`}
                alt={user.name || 'User'}
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] object-cover border-4 border-surface shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-surface rounded-full shadow-lg" />
            </div>

            <div className="text-center sm:text-left">
              <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-3">Student Dashboard</p>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tighter">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">{user.name}</span>!
              </h2>
              <p className="text-muted text-base sm:text-lg max-w-lg leading-relaxed">
                Your learning progress is looking great today. Continue where you left off and achieve your goals.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-8">
                 <div className="bg-surface/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-border text-xs font-bold text-foreground flex items-center gap-2">
                   <span className="text-primary">🎓</span> 12 Courses in progress
                 </div>
                 <div className="bg-surface/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-border text-xs font-bold text-foreground flex items-center gap-2">
                   <span className="text-primary">🔥</span> 5 Day streak
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}