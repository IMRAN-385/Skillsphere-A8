import PopularCourse from "./PopularCourse/page";
import Banner from "./Banner/page";
import LearningPage from "./LearningSection/page";
import TeacherPage from "./TeacherSection/page";

export default function Home() {
  return (
    <div className="flex flex-col" >
      <Banner />
      <PopularCourse />
      <LearningPage />
      <TeacherPage />
    </div>
  );
}