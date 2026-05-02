const coursePage = async () => {
  const res = await fetch("https://skillsphere-a8.vercel.app/data.json");
  const data = await res.json();
  return (
    <div className="grid grid-cols-3 gap-5 mx-auto p-5">
      {data.map((course) => (
        <div key={course.id}>
          <div className="card w-96 h-100 shadow-lg border border-[#3c3d37] bg-[#1e201e] text-[#ecdfcc]">
            <figure className="px-6 pt-6">
              <img
                src={course.image}
                alt={course.title}
                // className="rounded-xl w-full h-48 object-cover"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title text-[#ecdfcc]">{course.title}</h2>

              <p className="text-[#697565] text-sm">{course.description}</p>

              <div className="card-actions mt-3">
                <button className="btn bg-[#697565] text-[#1e201e] border-none hover:bg-[#ecdfcc] hover:text-[#1e201e]">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default coursePage;
