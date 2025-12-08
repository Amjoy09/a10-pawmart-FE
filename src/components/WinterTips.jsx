import React from "react";
import petImg from "../assets/feed-pets-in-winter.jpg";

const WinterTips = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-around px-6 md:px-20 md:py-25 py-10 md:bg-yellow-300 bg-lime-300 rounded-lg gap-8">
      <div className="md:px-15 px-6">
        <h1 className="md:text-[30px] text-[20px] font-bold mb-7 md:text-green-600 text-red-900">
          Why Adopt from PawMart?
        </h1>
        <ul class="md:text-xl text-md list-disc space-y-3 font-semibold">
          <li>Save a life today.</li>
          <li>Fight puppy mills.</li>
          <li>Give a pet a second chance. </li>
          <li>Purebreds & mixes available. </li>
          <li>Ensure visibility and identification </li>
          <li>Rescue pets love harder.</li>
          <li>Free lifelong support.</li>
          <li>Adopt, don’t shop.</li>
        </ul>
      </div>
      <figure className="md:w-180 w-full ">
        <img
          className="md:rounded-full rounded-lg border-4 border-emerald-900"
          src={petImg}
          alt=""
        />
      </figure>
    </div>
  );
};

export default WinterTips;
