import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import News from "./News";
import FeaturedPackages from "./sections/FeaturedPackages";
import Hero from "./sections/Hero";
import ReviewsStories from "./sections/Reviews";
import TopDestinations from "./sections/TopDestinations";
function Home() {
  return (
    <>
        <Hero/>
        <TopDestinations/>
        <FeaturedPackages/>
        <ReviewsStories/>
        <News/>
    </>
  );
}

export default Home;