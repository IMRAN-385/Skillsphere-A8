const detailpage = async ({ params }) => {
  const { id } = await params;
  const CoursePage = async () => {
    const res = await fetch("https://skillsphere-a8.vercel.app/data.json", {
      cache: "force-cache",
    });
    const data = await res.json();

    return (
      <div>
        <h2>hi</h2>
      </div>
    );
  };
};
export default detailpage;
