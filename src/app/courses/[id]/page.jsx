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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-surface border-t-primary rounded-full animate-spin mb-6" />
        <p className="text-muted font-black uppercase tracking-widest text-xs animate-pulse">Loading course details...</p>
      </div>
    );
  }

  if (!user) return null;

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-8 px-6 text-center">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Course <span className="text-primary">Not Found</span></h1>
        <p className="text-muted max-w-md mx-auto">We couldn't find the course you're looking for. It might have been moved or removed.</p>
        <button
          onClick={() => router.push('/')}
          className="px-10 py-4 bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-primary/20"
        >
          ← Back to Campus
        </button>
      </div>
    );
  }

  const curriculum = [
    { title: "Introduction & Setup", duration: "45 min", type: "Video" },
    { title: "HTML & CSS Fundamentals", duration: "2 hours", type: "Reading" },
    { title: "JavaScript Basics", duration: "3 hours", type: "Video" },
    { title: "DOM Manipulation & Events", duration: "2.5 hours", type: "Quiz" },
    { title: "Advanced JavaScript (ES6+)", duration: "3 hours", type: "Video" },
    { title: "Git & GitHub", duration: "1 hour", type: "Reading" },
    { title: "Responsive Web Design", duration: "2 hours", type: "Video" },
    { title: "Project: Personal Portfolio", duration: "4 hours", type: "Project" },
    { title: "Final Project & Deployment", duration: "3 hours", type: "Video" },
  ];

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Cinematic Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover scale-105 blur-[2px] opacity-40"
          priority
          loading="eager"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 w-full pb-16">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                {course.category || 'Development'}
              </span>
              <span className="px-4 py-1.5 bg-surface/80 backdrop-blur-md text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                {course.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.95] tracking-tighter max-w-4xl mb-8">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-muted">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
                  <User size={18} className="text-primary" />
                </div>
                <span className="font-bold text-sm text-foreground">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                <span className="font-bold text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={18} className="text-primary fill-primary" />
                <span className="font-black text-white ml-1">{course.rating}</span>
                <span className="text-xs ml-1">(4.8k reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            
            <section>
              <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-6">Course Description</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted leading-relaxed text-lg sm:text-xl">
                  {course.description || "Take your skills to the next level with this comprehensive course. Designed for all skill levels, this curriculum covers everything from the basics to advanced concepts used by industry professionals."}
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Curriculum</h2>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{curriculum.length} Modules</span>
              </div>
              
              <div className="space-y-4">
                {curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-6 bg-surface border border-border rounded-3xl hover:border-primary/30 hover:bg-surface-hover transition-all duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center font-black text-primary group-hover:scale-110 transition-transform">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg leading-none mb-2">{item.title}</h4>
                        <p className="text-muted text-[10px] font-bold uppercase tracking-widest">{item.type} • {item.duration}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <PlayCircle size={20} className="text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Enrollment Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-surface border border-border p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
                
                <div className="relative">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-white tracking-tighter">FREE</span>
                    <span className="text-muted text-sm line-through">$199.99</span>
                  </div>
                  <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-8">Limited time offer</p>
                  
                  <button className="w-full bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all transform active:scale-95 mb-8">
                    Enroll Now
                  </button>

                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <CheckCircle size={18} className="text-primary" /> Certificate of Completion
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <CheckCircle size={18} className="text-primary" /> 24/7 Expert Support
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <CheckCircle size={18} className="text-primary" /> Full Lifetime Access
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <CheckCircle size={18} className="text-primary" /> Access on Mobile & TV
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-surface/30 border border-border p-6 rounded-[2rem] text-center">
                <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-2">Money back guarantee</p>
                <p className="text-white font-bold text-xs">Secure Checkout with SSL Encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}