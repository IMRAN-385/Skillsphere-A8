import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Sparkles } from "lucide-react";

async function getCourses() {
  const res = await fetch("https://skillsphere-a8-55lz.vercel.app/data.json", {
    next: { revalidate: 3600 },
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
      <div className="min-h-screen bg-[#1e201e] flex items-center justify-center">
        <p className="text-red-400 text-xl">Failed to load courses 😢</p>
      </div>
    );
  }

  return (
    <section className="bg-[#1e201e] min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">

      
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp size={32} className="text-red-500" />
          <div>
            <h2 className="text-3xl font-bold text-[#ecdfcc]">Trending Courses</h2>
            <p className="text-[#697565] mt-1">Most popular courses this week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#3C3D37] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={course.image || "/placeholder.png"}
                  alt={course.title || "Course"}
                  width={400}
                  height={200}
                  className="w-full h-44 object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                   Trending
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-[#ecdfcc] font-semibold line-clamp-2 mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-[#697565]">
                  <span>👤 {course.instructor}</span>
                  <span>⭐ {course.rating}</span>
                </div>
                <Link href={`/courses/${course.id}`} className="block mt-4">
                  <button className="w-full bg-[#697565] hover:bg-[#ecdfcc] hover:text-[#1e201e] text-[#1e201e] font-semibold py-2.5 rounded-xl transition text-sm">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

       
        <div className="flex items-center gap-3 mb-10">
          <Sparkles size={32} className="text-yellow-400" />
          <div>
            <h2 className="text-3xl font-bold text-[#ecdfcc]">New Releases</h2>
            <p className="text-[#697565] mt-1">Fresh courses just added</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#3C3D37] rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src={course.image || "/placeholder.png"}
                  alt={course.title || "Course"}
                  width={400}
                  height={200}
                  className="w-full h-44 object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-semibold">
                  ✨ New
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-[#ecdfcc] font-semibold line-clamp-2 mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-[#697565]">
                  <span>👤 {course.instructor}</span>
                  <span>⏱ {course.duration}</span>
                </div>
                <Link href={`/courses/${course.id}`} className="block mt-4">
                  <button className="w-full bg-[#697565] hover:bg-[#ecdfcc] hover:text-[#1e201e] text-[#1e201e] font-semibold py-2.5 rounded-xl transition text-sm">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}