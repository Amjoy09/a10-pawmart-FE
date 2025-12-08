import React from "react";
import expImg1 from "../assets/services-hero-image2.jpg";
import expImg2 from "../assets/serv-2.jpeg";
import expImg3 from "../assets/serv-pet-exp.jpg";

const ExpertVet = () => {
  return (
    <div>
      <h1 className="md:text-4xl text-3xl font-bold text-center mb-0 md:mb-8 py-10">
        Meet Our Pet Heroes
      </h1>
      <div className="flex gap-7 flex-col md:flex-row justify-center">
        <div className="card bg-base-100 md:w-96 w-full shadow-sm">
          <figure className="px-10 md:pt-10 pt-1">
            <img src={expImg3} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold">
              {" "}
              Dr. Michael Chen, DVM, DACVS
            </h2>
            <h2 className="text-[16px] font-semibold ">
              {" "}
              Board-Certified Veterinary Surgeon
            </h2>
            <p className="text-justify my-4">
              A graduate of Cornell University, Dr. Chen specializes in complex
              orthopedic and soft tissue surgeries, utilizing the latest
              minimally invasive techniques to ensure rapid recovery.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Read Bio</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 md:w-96 w-full shadow-sm">
          <figure className="px-10 pt-10">
            <img src={expImg1} alt="Shoes" className="rounded-xl w-full" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold"> Dr. Sarah Jenkins, VMD</h2>
            <h2 className="text-[16px] font-semibold ">
              {" "}
              Exotic & Avian Pet Care
            </h2>
            <p className="text-justify my-4">
              With over a decade of experience treating birds, reptiles, and
              pocket pets, Dr. Jenkins ensures that all pets receive expert
              care, no matter their species.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Read Bio</button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 md:w-96 w-full shadow-sm">
          <figure className="px-10 pt-10 ">
            <img src={expImg2} alt="Shoes" className="rounded-xl w-full h-43" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold"> Dr. Emily Davis, DVM</h2>
            <h2 className="text-[16px] font-semibold ">
              {" "}
              Feline Medicine & Preventative Care
            </h2>
            <p className="text-justify my-4">
              Dr. Davis is passionate about creating a stress-free environment
              for her feline patients. She focuses on lifelong wellness plans
              and loves educating new cat owners.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Read Bio</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertVet;
