import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2 className="md:text-3xl text-2xl font-semibold text-center mt-20 mb-10">
        All Winter Care Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-0 md:px-15 pb-15">
        {services.map((service) => (
          <ServiceCard service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
