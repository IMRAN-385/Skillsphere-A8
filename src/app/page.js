import PopularCourse from "./PopularCourse/page";
import Banner from "./Banner/page";
import LearningPage from "./LearningSection/page";

export default function Home() {
  return (
    <div className="flex flex-col" >
      <Banner />
      <PopularCourse />
      <LearningPage />
    </div>
  );
}