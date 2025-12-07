import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router";

const PopularServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="md:text-3xl text-xl font-semibold text-center mt-20 mb-10">
        Popular Winter Care Services
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 px-0 md:px-15">
        {services.slice(0, 6).map((service) => (
          <ServiceCard service={service}></ServiceCard>
        ))}
      </div>
      <div className="py-12 flex justify-center">
        <Link
          to="/services"
          className="text-xl font-semibold bg-fuchsia-700 text-white px-5 py-2 rounded-sm"
        >
          View All Services
        </Link>
      </div>
    </div>
  );
};

export default PopularServices;
