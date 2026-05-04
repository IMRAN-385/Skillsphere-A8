'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from "@/Context/AuthContext";
import Image from "next/image";
import { Star, Clock, User, Award, PlayCircle, CheckCircle } from "lucide-react";

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [course, setCourse] = useState(null);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/LoginPage?redirect=/courses/${id}`);
    }
  }, [user, loading, id, router]);

  
  useEffect(() => {
    if (loading || !user) return;

    fetch("https://skillsphere-a8-55lz.vercel.app/data.json", {
      next: { revalidate: 3600 },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        const found = data.find((c) => c.id === parseInt(id));
        setCourse(found || null);
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [user, loading, id]);

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#697565] text-sm">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!course) {
    return (
      <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center flex-col gap-4">
        <p className="text-white text-3xl font-bold">Course Not Found</p>
        <button
          onClick={() => router.push('/courses')}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
        >
          ← Back to Courses
        </button>
      </div>
    );
  }

  const curriculum = [
    { title: "Introduction & Setup", duration: "45 min" },
    { title: "HTML & CSS Fundamentals", duration: "2 hours" },
    { title: "JavaScript Basics", duration: "3 hours" },
    { title: "DOM Manipulation & Events", duration: "2.5 hours" },
    { title: "Advanced JavaScript (ES6+)", duration: "3 hours" },
    { title: "Git & GitHub", duration: "1 hour" },
    { title: "Responsive Web Design", duration: "2 hours" },
    { title: "Project: Personal Portfolio", duration: "4 hours" },
    { title: "Final Project & Deployment", duration: "3 hours" },
  ];

  return (
    <div className="bg-[#3C3D37] min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-8">

       
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-10">
          <Image
            src={course.image}
            alt={course.title}
            width={1200}
            height={600}
            className="w-full h-[400px] md:h-[520px] object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex gap-3 mb-4 flex-wrap">
              <span className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
                {course.category}
              </span>
              <span className="px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

         
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="flex flex-wrap items-center gap-6 text-[#a3a39f] mb-8">
                <div className="flex items-center gap-2">
                  <User size={22} /><span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={22} /><span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={22} className="text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-[#ecdfcc] mb-4">About This Course</h2>
              <p className="text-[#a3a39f] leading-relaxed text-lg">{course.description}</p>
            </div>

         
            <div>
              <h2 className="text-3xl font-bold text-[#ecdfcc] mb-6 flex items-center gap-3">
                <PlayCircle size={32} className="text-blue-500" />
                Course Curriculum
              </h2>
              <div className="bg-[#1e201e] rounded-2xl p-6">
                {curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-gray-700 last:border-none hover:bg-[#252723] px-4 rounded-xl transition"
                  >
                    <div className="flex items-center gap-4">
                      <CheckCircle className="text-emerald-500 flex-shrink-0" size={22} />
                      <span className="text-[#d1d5db] font-medium">{item.title}</span>
                    </div>
                    <span className="text-[#697565] font-medium text-sm flex-shrink-0 ml-4">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-[#1e201e] rounded-3xl p-8 sticky top-8">
              <div className="text-center">
                <p className="text-6xl font-bold text-[#ecdfcc]">Free</p>
                <p className="text-[#697565] mt-2">Limited Time Offer</p>
              </div>
              <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all py-5 text-xl font-semibold rounded-2xl text-white">
                Enroll Now - Free
              </button>
              <div className="mt-8 space-y-5 text-[#a3a39f]">
                <div className="flex items-center gap-3">
                  <Award className="text-emerald-500 flex-shrink-0" size={24} />
                  <span>Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-emerald-500 flex-shrink-0" size={24} />
                  <span>Full Lifetime Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <PlayCircle className="text-emerald-500 flex-shrink-0" size={24} />
                  <span>Access on Mobile & TV</span>
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-[#697565]">
                30-Day Money Back Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}