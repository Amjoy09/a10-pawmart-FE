import React from "react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import img1 from "../assets/acur1.jpg";
import img2 from "../assets/acur2.webp";
import img3 from "../assets/acur4.jpg";

const Slider = () => {
  const slides = [
    {
      image: img1,
      tagline: "Find Your Furry Friend Today!",
      subtitle: "Discover the perfect companion waiting for you",
      bgOpacity: "bg-opacity-40",
    },
    {
      image: img2,
      tagline: "Adopt, Don't Shop — Give a Pet a Home.",
      subtitle: "Save a life and make a loyal friend forever",
      bgOpacity: "bg-opacity-50",
    },
    {
      image: img3,
      tagline: "Because Every Pet Deserves Love and Care.",
      subtitle: "Join us in creating better lives for our animal friends",
      bgOpacity: "bg-opacity-45",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-lg shadow-2xl">
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation, Autoplay, EffectFade]}
        className="mySwiper h-[500px] md:h-[600px]"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        speed={1000}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={`Pet adoption slide ${index + 1}`}
              />
              {/* Dark Overlay for better text readability */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 ${slide.bgOpacity}`}
              ></div>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl">
                  {/* Tagline with animation */}
                  <div className="mb-6 overflow-hidden">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-slide-up">
                      {slide.tagline}
                    </h2>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light max-w-2xl">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Slide Number Indicator */}
            <div className="absolute bottom-8 right-8 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
              {index + 1} / {slides.length}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button className="swiper-button-prev-custom w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button className="swiper-button-next-custom w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
