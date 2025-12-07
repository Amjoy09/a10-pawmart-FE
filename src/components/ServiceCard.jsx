import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        transition: { duration: 2 },
      }}
    >
      <div className="card bg-base-100 shadow-sm">
        <figure className="h-[250px]">
          <img src={service.image} alt="Winter Service for your Pet" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-between font-semibold">
            {service.serviceName}
            <div className="bg-yellow-100 flex items-center gap-1 rounded-xl px-3 py-0.5">
              <span className="text-[16px]">⭐</span>
              <span className="text-[22px]">{service.rating}</span>
            </div>
          </h2>
          <p className="text-gray-400 text-[16px]">{service.description}</p>
          <div className="card-actions justify-between items-center">
            <div className="text-xl font-semibold flex border items-center rounded-lg">
              <span className="bg-black text-white font-bold px-3 rounded-l-lg">
                $
              </span>
              <span className="px-1.5 rounded-r-lg"> {service.price}</span>
            </div>
            <Link
              to={`/details/${service.serviceId}`}
              className="bg-lime-700 text-white px-6 rounded-md py-2 text-xl font-semibold cursor-pointer"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
