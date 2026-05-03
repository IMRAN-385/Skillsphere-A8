import Image from "next/image";

const DetailPage = async ({ params }) => {
  // const { id } = await params;
  
  // const res = await fetch("http://localhost:3000/data.json", {
  //   cache: "force-cache",
  // });
  // const data = await res.json();
  
  // const course = data.find((c) => c.id === parseInt(id));

  // if (!course) {
  //   return <div>No Course</div>;
  // }

  return (
    <div className="bg-[#3C3D37] min-h-screen p-5">
      <div className="max-w-2xl mx-auto bg-[#1e201e] p-8 rounded-2xl">
        <Image
          src={course.image}
          alt={course.title}
          width={500}
          height={300}
          className="rounded-xl w-full h-80 object-cover"
        />
        <h1 className="text-3xl font-bold text-[#ecdfcc] mt-6">
          {course.title}
        </h1>
        <p className="text-[#697565] mt-4">{course.description}</p>
      </div>
    </div>
  );
};

export default DetailPage;