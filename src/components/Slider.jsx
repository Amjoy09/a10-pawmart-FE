import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../assets/new-doggy.webp";
import img2 from "../assets/catty.jpg";
import img3 from "../assets/dogs-yello.jpg";
import img4 from "../assets/winter-dog.jpg";

const Slider = () => {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-[420px]"
      >
        <SwiperSlide>
          <img className="w-full" src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full border-2" src={img4} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
