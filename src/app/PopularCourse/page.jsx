import Image from "next/image";
import Link from "next/link";
import { Star, User } from "lucide-react";

const PopularCourse = async () => {
  const res = await fetch("https://skillspheree.vercel.app/data.json", {
    cache: "no-store",
  });

  const data = await res.json();


  const popularCourses = data
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="bg-background py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <p className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-3">Top Rated</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Popular <span className="text-primary">Courses</span>
            </h2>
          </div>
          <Link href="/courses" className="text-muted hover:text-white font-bold text-sm transition-all border-b border-border pb-1">
            View All Courses
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {popularCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-surface border border-border rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-2xl flex flex-col"
            >
              <div className="relative h-64 overflow-hidden m-3 rounded-[2rem]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-white/10">
                  {course.level}
                </div>
              </div>

              <div className="p-8 pt-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className={`${i <= Math.floor(course.rating) ? 'text-primary fill-primary' : 'text-muted'}`} />
                  ))}
                  <span className="text-white font-black text-sm ml-2">{course.rating}</span>
                </div>

                <h3 className="text-white text-2xl font-bold leading-tight line-clamp-2 min-h-[64px] group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-3 mt-6 pb-6 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-surface-hover border border-border flex items-center justify-center">
                    <User size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-muted text-[10px] font-bold uppercase tracking-wider">Instructor</p>
                    <p className="text-white font-bold text-sm">{course.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2 text-muted">
                    <span className="text-sm font-bold">⏱ {course.duration}</span>
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <button className="bg-surface-hover hover:bg-primary hover:text-white text-white font-black text-xs uppercase tracking-widest px-6 py-4 rounded-2xl transition-all duration-300 border border-border">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCourse;