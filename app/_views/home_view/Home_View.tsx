import Home_Hero from "./home_components/Home_Hero";
import Home_Hero_Card from "./home_components/Home_Hero_Card";
import Home_Popular from "./home_components/Home_Popular";
import Home_Category from "./home_components/Home_Category";
import Home_Arrivals from "./home_components/Home_Arrivals";
import Home_Review from "./home_components/Home_Review";

const Home_View = () => {
  return (
    <>
      <Home_Hero />
      <Home_Hero_Card />
      <Home_Category />
      <Home_Popular />
      <Home_Arrivals />
      <Home_Review />
    </>
  );
};

export default Home_View;
