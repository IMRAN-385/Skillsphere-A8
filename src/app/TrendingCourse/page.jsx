import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Sparkles, Star, User, Clock, ChevronRight } from "lucide-react";

async function getCourses() {
  const res = await fetch("https://skillspheree.vercel.app/data.json", {
    cache: "no-store", 
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function TrendingCoursePage() {
  let courses = [];
  let newCourses = [];
  let error = false;

  try {
    const data = await getCourses();

    if (!Array.isArray(data)) throw new Error("Invalid data");

    courses = [...data]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);

    newCourses = [...data]
      .sort((a, b) => b.id - a.id)
      .slice(0, 3);
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
        <div className="text-6xl mb-6 animate-bounce">😢</div>
        <h2 className="text-2xl font-black text-white mb-2">Technical Difficulty</h2>
        <p className="text-muted mb-8">We couldn't fetch the trending lists. Please try again later.</p>
        <Link href="/" className="px-8 py-3 bg-primary text-white font-black rounded-xl">Back to Campus</Link>
      </div>
    );
  }

  const CourseCard = ({ course, badge, badgeColor }) => (
    <div className="group bg-surface border border-border rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-2xl flex flex-col">
      <div className="relative h-60 overflow-hidden m-3 rounded-[2rem]">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title || "Course"}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
        <div className={`absolute top-4 left-4 ${badgeColor} text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg`}>
          {badge}
        </div>
      </div>

      <div className="p-8 pt-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={14} className={`${i <= Math.floor(course.rating) ? 'text-primary fill-primary' : 'text-muted'}`} />
          ))}
          <span className="text-white font-black text-sm ml-2">{course.rating}</span>
        </div>

        <h3 className="text-white text-xl font-bold leading-tight line-clamp-2 min-h-[56px] group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center gap-3 mt-6 pb-6 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-muted text-[10px] font-bold uppercase tracking-wider">Instructor</p>
            <p className="text-white font-bold text-sm leading-none">{course.instructor}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-muted">
            <Clock size={16} />
            <span className="text-xs font-bold uppercase tracking-tighter">{course.duration}</span>
          </div>
          <Link href={`/courses/${course.id}`}>
            <button className="bg-surface-hover hover:bg-primary hover:text-white text-white font-black text-[10px] uppercase tracking-widest px-6 py-4 rounded-2xl transition-all duration-300 border border-border">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
       
        <div className="mb-24">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-primary mb-4">
                <TrendingUp size={24} />
                <p className="font-black uppercase tracking-[0.4em] text-xs">Hot This Week</p>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
                Trending <span className="text-primary">Now</span>
              </h2>
            </div>
            <Link href="/courses" className="group flex items-center gap-2 text-muted hover:text-white font-bold text-sm transition-all border-b border-border pb-1">
              View All Trends <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} badge="🔥 Trending" badgeColor="bg-primary" />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-24" />

    
        <div>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-yellow-500 mb-4">
                <Sparkles size={24} />
                <p className="font-black uppercase tracking-[0.4em] text-xs">Just Landed</p>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter">
                New <span className="text-yellow-500">Releases</span>
              </h2>
            </div>
            <Link href="/courses" className="group flex items-center gap-2 text-muted hover:text-white font-bold text-sm transition-all border-b border-border pb-1">
              Fresh Arrivals <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {newCourses.map((course) => (
              <CourseCard key={course.id} course={course} badge="✨ New" badgeColor="bg-yellow-500" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}