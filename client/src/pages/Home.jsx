import FeaturedPackages from "./sections/FeaturedPackages";
import Hero from "./sections/Hero";
import ReviewsStories from "./sections/Reviews";
import TopDestinations from "./sections/TopDestinations";
import { useState } from "react";
import NearbyMap from "./sections/NearbyMaps";

function Home() {
  const [showNearby, setShowNearby] = useState(false);
  
  return (
    <>
      <Hero onDiscover={() => setShowNearby(true)} />
      {showNearby && <NearbyMap />}
      <TopDestinations/>
      <FeaturedPackages/>
      <ReviewsStories/>
    </>
  );
}

export default Home;