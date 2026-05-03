import Image from "next/image";
import Link from "next/link";

// const CoursePage = async () => {
//   const res = await fetch("http://localhost:3000/data.json", );
//   const data = await res.json();

  return (
    <div className="bg-[#3C3D37]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto p-5">
        {data.map((course) => (
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
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={course.id <= 3}
              />
            </figure>

            <div className="card-body items-center text-center flex flex-col flex-1 p-4">
              <h2 className="card-title text-[#ecdfcc] text-base font-semibold leading-snug">
                {course.title}
              </h2>
              <p className="text-[#697565] text-sm mt-2 flex-1">
                {course.description}
              </p>
              <div className="card-actions mt-4 w-full">
                <Link
                  href={`/courses/${course.id}`}
                  className="w-full flex justify-center"
                >
                  <button className="btn w-full  bg-[#697565] text-[#1e201e] border-none hover:bg-[#ecdfcc] hover:text-[#1e201e] font-semibold">
                    Details
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
export default CoursePage;
