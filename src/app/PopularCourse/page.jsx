import Image from "next/image";
import Link from "next/link";
import { Star, User } from "lucide-react";

const PopularCourse = async () => {
  const res = await fetch("https://skillsphere-a8-55lz.vercel.app/data.json", {
    cache: "force-cache",
  });

  const data = await res.json();


  const popularCourses = data
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="bg-[#343727dc] py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold text-[#ecdfcc] mb-12">
          Popular Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#1e201e] border border-[#3c3d37] rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-xl group"
            >
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={220}
                  className="w-full h-56 object-cover rounded-t-3xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {course.level}
                </div>
              </div>

          
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[#ecdfcc] text-xl font-semibold leading-tight line-clamp-2 min-h-[52px]">
                  {course.title}
                </h3>

                <div className="flex text-2xl items-center gap-2 mt-4 text-[#bec7bb]">
                  <User size={18} />
                  <span>{course.instructor}</span>
                </div>

               
                <div className="flex items-center gap-1 mt-3">
                  <div className="flex text-yellow-400">
                    <Star size={20} className="fill-current" />
                  </div>
                  <span className="text-[#ecdfcc] font-semibold text-lg">
                    {course.rating}
                  </span>
                  <span className="text-[#697565]">/ 5</span>
                </div>

             
                <p className="text-[#697565] text-sm mt-2">
                  ⏱ {course.duration}
                </p>

              
                <div className="mt-auto pt-6">
                  <Link href={`/courses/${course.id}`} className="block">
                    <button className="w-full bg-[#697565] hover:bg-[#ecdfcc] hover:text-[#1e201e] text-[#1e201e] font-semibold py-3.5 rounded-2xl transition-all duration-200">
                      View Details
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