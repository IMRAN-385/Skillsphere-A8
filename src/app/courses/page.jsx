
import Image from "next/image";
import Link from "next/link";

const CoursePage = async ({ searchParams }) => {
  const params = await searchParams; 
  const res = await fetch("https://skillsphere-a8-55lz.vercel.app/data.json");
  const data = await res.json();


   const search = params?.search || "";

    const filteredCourses = data.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#3C3D37]">
     <form className="max-w-7xl mx-auto p-5">
  <div className="flex gap-2">
    <input
      type="text"
      name="search"
      defaultValue={search}
      placeholder="Search by title..."
      className="w-full p-3 rounded-lg bg-[#1e201e] text-[#ecdfcc] border border-[#3c3d37]"
    />

    <button
      type="submit"
      className="px-5 bg-[#697565] text-[#1e201e] rounded-lg font-semibold"
    >
      Search
    </button>
  </div>
</form>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto p-5">
  {filteredCourses.length > 0 ? (
    filteredCourses.map((course) => (
      <div
        key={course.id}
        className="card bg-[#1e201e] border border-[#3c3d37] shadow-lg rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-200"
      >
        <figure className="px-4 pt-4">
          <Image
            src={course.image}
            alt={course.title}
            width={400}
            height={180}
            className="rounded-xl w-full h-44 object-cover"
          />
        </figure>

        <div className="card-body items-center text-center flex flex-col flex-1 p-4">
          <h2 className="card-title text-[#ecdfcc] text-base font-semibold">
            {course.title}
          </h2>

          <p className="text-[#697565] text-sm mt-2 flex-1">
            {course.description}
          </p>

          <Link
            href={`/courses/${course.id}`}
            className="w-full mt-4"
          >
            <button className="btn w-full bg-[#697565] text-[#1e201e] border-none hover:bg-[#ecdfcc]">
              Details
            </button>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-[#ecdfcc] col-span-full">
      No courses found ❌
    </p>
  )}
</div>
    </div>
  );
};
export default CoursePage;
