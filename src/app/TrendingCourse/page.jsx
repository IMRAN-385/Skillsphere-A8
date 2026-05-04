import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

const TrendingCourses = async () => {
  let courses = [];
  let newCourses = [];
  let error = false;

  try {
    const res = await fetch(
      "https://skillsphere-a8-55lz.vercel.app/data.json",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    // Safety check
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    // ✅ Trending (by rating)
    courses = [...data]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);

    // ✅ New Releases (by date)
    newCourses = [...data]
      .sort(
        (a, b) =>
          new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0)
      )
      .slice(0, 3);
  } catch (err) {
    console.error("Error:", err);
    error = true;
  }

  // ❌ Error fallback
  if (error) {
    return (
      <p className="text-center text-red-400 py-10">
        Failed to load courses 😢
      </p>
    );
  }

  // ❌ Empty state fallback
  if (!courses.length && !newCourses.length) {
    return (
      <p className="text-center text-gray-400 py-10">
        No courses available
      </p>
    );
  }

  return (
    <section className="bg-[#1e201e] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Trending Header */}
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp size={32} className="text-red-500" />
          <div>
            <h2 className="text-3xl font-bold text-[#ecdfcc]">
              Trending Courses
            </h2>
            <p className="text-[#697565] mt-1">
              Most popular courses this week
            </p>
          </div>
        </div>

        {/* Trending Courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#3C3D37] rounded-2xl overflow-hidden hover:scale-[1.02] transition"
            >
              <Image
                src={course.image || "/placeholder.png"}
                alt={course.title || "Course"}
                width={400}
                height={200}
                className="w-full h-44 object-cover"
              />

              <div className="p-5">
                <h3 className="text-[#ecdfcc] font-semibold line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  ⭐ {course.rating || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* New Releases */}
        <h2 className="text-2xl font-bold text-white mb-6">
          New Releases
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#3C3D37] rounded-2xl p-5 hover:scale-[1.02] transition"
            >
              <h3 className="text-white font-medium line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {course.instructor || "Unknown Instructor"}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrendingCourses;