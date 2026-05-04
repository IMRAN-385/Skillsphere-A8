import Image from "next/image";
import Link from "next/link";
import { Search, Star, User, Clock, Filter, X } from "lucide-react";

async function getCourses() {
  const res = await fetch("https://skillsphere-a8-55lz.vercel.app/data.json", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

const CoursePage = async ({ searchParams }) => {
  const params = await searchParams;
  const search = params?.search?.trim() || "";

  let data = [];
  let fetchError = false;

  try {
    data = await getCourses();
  } catch {
    fetchError = true;
  }

  const filteredCourses = search
    ? data.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  if (fetchError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-black text-white mb-2">Oops! Something went wrong</h2>
        <p className="text-muted mb-8">We couldn't load the courses. Please check your connection and try again.</p>
        <Link href="/courses" className="px-8 py-3 bg-primary text-white font-black rounded-xl">Retry</Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <Search size={12} /> Discover Knowledge
          </div>
          <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10">
            The <span className="text-primary">Academy</span>
          </h1>
          <p className="text-muted text-sm md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Unlock your potential with our elite selection of industry-leading courses. Master new technologies and advance your career today.
          </p>
        </div>
      </div>

      {/* Search Bar - Professional Sticky */}
      <div className="sticky top-[80px] md:top-[100px] z-[45] px-6 mb-24 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <form className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-700" />
            <div className="relative flex items-center bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-3 md:p-4 pr-4 md:pr-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              <div className="pl-6 pr-4 text-muted group-focus-within:text-primary transition-colors">
                <Search size={24} />
              </div>
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search for your next skill..."
                className="flex-1 bg-transparent border-none text-white font-bold placeholder-muted/50 focus:ring-0 py-4 text-sm md:text-xl"
              />
              {search && (
                <Link href="/courses" className="p-2 text-muted hover:text-white transition-colors mr-3">
                  <X size={22} />
                </Link>
              )}
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white font-black uppercase tracking-widest text-[10px] md:text-xs px-8 md:px-12 py-4 md:py-5 rounded-[2rem] transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                Find
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-surface/50 backdrop-blur-sm border border-white/5 rounded-[3rem] overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-2xl flex flex-col hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden m-4 rounded-[2.5rem]">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-6 right-6 bg-background/80 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-2xl border border-white/10 shadow-xl">
                    {course.level}
                  </div>
                </div>

                <div className="p-10 pt-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 mb-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className={`${i <= Math.floor(course.rating) ? 'text-primary fill-primary' : 'text-white/10'}`} />
                    ))}
                    <span className="text-white font-black text-sm ml-2">{course.rating}</span>
                  </div>

                  <h3 className="text-white text-2xl font-black leading-tight tracking-tight line-clamp-2 min-h-[64px] group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-muted text-sm mt-6 line-clamp-2 leading-relaxed font-medium">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 mt-8 pb-8 border-b border-white/5">
                    <div className="w-12 h-12 rounded-2xl bg-background border border-white/5 flex items-center justify-center shadow-inner">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-muted text-[10px] font-black uppercase tracking-widest mb-1">Lead Mentor</p>
                      <p className="text-white font-black text-sm leading-none">{course.instructor}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-2 text-muted font-black text-[10px] uppercase tracking-widest">
                      <Clock size={16} className="text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <button className="bg-surface hover:bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] px-8 py-5 rounded-[1.5rem] transition-all duration-300 border border-white/5 shadow-xl hover:shadow-primary/20">
                        Enroll Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-surface/50 rounded-[3rem] border border-dashed border-border">
            <div className="text-6xl mb-6">🏜️</div>
            <h2 className="text-3xl font-black text-white mb-4">No Courses Found</h2>
            <p className="text-muted mb-8">We couldn't find any courses matching your search. Try different keywords.</p>
            <Link href="/courses" className="px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20">
               Show All Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;