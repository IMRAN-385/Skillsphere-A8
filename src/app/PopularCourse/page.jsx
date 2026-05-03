import Image from "next/image";
import Link from "next/link";

const PopularCourse = async () => {
  // const res = await fetch("http://localhost:3000/data.json", {
  //   cache: "force-cache",
  // });
  const data = await res.json();

  const popularCourses = data
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="bg-[#3C3D37] py-10 px-5">
      <h2 className="text-center text-2xl font-bold text-[#ecdfcc] mb-8">
        
 Popular Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {popularCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[#1e201e] border border-[#3c3d37] shadow-lg rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
          >
           
            <figure className="px-4 pt-4">
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={180}
                className="rounded-xl w-full h-44 object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </figure>

            <div className="flex flex-col flex-1 p-4 items-center text-center gap-2">
              
            
              <h3 className="text-[#ecdfcc] text-base font-semibold leading-snug">
                {course.title}
              </h3>

          
              <p className="text-[#697565] text-sm">
                👨‍🏫 {course.instructor}
              </p>

           
              <div className="flex items-center justify-center gap-1 text-yellow-400 text-sm font-semibold">
                ⭐ {course.rating}
                <span className="text-[#697565] font-normal">/ 5</span>
              </div>

          
              <div className="mt-auto w-full pt-3">
                <Link href={`/courses/${course.id}`}>
                  <button className="btn w-full bg-[#697565] text-[#1e201e] border-none hover:bg-[#ecdfcc] hover:text-[#1e201e] font-semibold">
                    View Details
                  </button>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourse;