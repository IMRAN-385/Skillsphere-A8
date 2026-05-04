import Image from "next/image";
import Link from "next/link";


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
      <div className="min-h-screen bg-[#3C3D37] flex items-center justify-center">
        <p className="text-red-400 text-xl">Failed to load courses. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#3C3D37] min-h-screen">

      <div className="max-w-7xl mx-auto px-5 pt-10 pb-4">
        <h1 className="text-4xl font-bold text-[#ecdfcc] mb-2">All Courses</h1>
        <p className="text-[#697565]">Browse and find your perfect course</p>
      </div>


      <form className="max-w-7xl mx-auto px-5 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search courses by title..."
            className="w-full p-3 rounded-xl bg-[#1e201e] text-[#ecdfcc] border border-[#697565]/30 focus:outline-none focus:border-red-500 transition placeholder-[#697565]"
          />
          <button
            type="submit"
            className="px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
          >
            Search
          </button>
          {search && (
            <Link
              href="/courses"
              className="px-4 bg-[#1e201e] hover:bg-[#3C3D37] text-[#697565] hover:text-white border border-[#697565]/30 rounded-xl font-medium transition flex items-center"
            >
              Clear
            </Link>
          )}
        </div>
        {search && (
          <p className="text-[#697565] text-sm mt-2">
            {filteredCourses.length} result{filteredCourses.length !== 1 ? 's' : ''} for &quot;{search}&quot;
          </p>
        )}
      </form>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-5 pb-16">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#1e201e] border border-[#3c3d37] shadow-lg rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={180}
                  className="w-full h-44 object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                  {course.level}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-[#ecdfcc] text-base font-semibold line-clamp-2 min-h-[48px]">
                  {course.title}
                </h2>

                <p className="text-[#697565] text-sm mt-2 line-clamp-2 flex-1">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mt-3 text-sm text-[#697565]">
                  <span>👤 {course.instructor}</span>
                  <span>⭐ {course.rating}</span>
                </div>

                <Link href={`/courses/${course.id}`} className="w-full mt-4">
                  <button className="w-full bg-[#697565] hover:bg-[#ecdfcc] hover:text-[#1e201e] text-[#1e201e] font-semibold py-3 rounded-xl transition">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-[#ecdfcc] text-2xl font-semibold mb-2">No courses found ❌</p>
            <p className="text-[#697565]">Try searching with a different keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;