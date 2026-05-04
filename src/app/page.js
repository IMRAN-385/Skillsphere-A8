'use client';

import { useAuth } from "@/Context/AuthContext";
import PopularCourse from "./PopularCourse/page";
import Banner from "./Banner/page";
import LearningPage from "./LearningSection/page";
import TeacherPage from "./TeacherSection/page";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      {user && (
        <div className="bg-[#1E201E] text-white p-4 flex items-center gap-4">
          <img
            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}&background=dc2626&color=fff`}
            alt={user.name || 'User'}
            className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
          />
          <div>
            <h2 className="text-lg font-semibold">Welcome back, {user.name}!</h2>
            <p className="text-sm text-[#697565]">Enjoy your learning journey.</p>
          </div>
        </div>
      )}
      <Banner />
      <PopularCourse />
      <TeacherPage />
      <LearningPage />
    </div>
  );
}