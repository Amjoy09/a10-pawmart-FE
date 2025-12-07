import React from "react";
import Slider from "../components/Slider";
import "swiper/css";
import "swiper/css/navigation";
import PopularServices from "../components/PopularServices";
import WinterTips from "../components/WinterTips";
import ExpertVet from "../components/ExpertVet";

const Home = () => {
  return (
    <div>
      <div className="mt-30 md:mt-10">
        <Slider></Slider>
      </div>
      <PopularServices></PopularServices>
      <div className="md:px-15 px-0 mb-10">
        <WinterTips></WinterTips>
      </div>
      <div className="w-11/12 mx-auto mb-15">
        <ExpertVet></ExpertVet>
      </div>
    </div>
  );
};

export default Home;
