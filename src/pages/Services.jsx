import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/services?category=${category}`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, [category]);
  return (
    <div>
      <select
        onChange={(e) => setCategory(e.target.value)}
        defaultValue="Pick a Category"
        className="select font-semibold ml-15 mt-13"
      >
        <option disabled={true}>Pick a Category</option>
        <option value="Pets">Pets</option>
        <option value="Foods">Foods</option>
        <option value="Accessories">Accessories</option>
        <option value="Care Products">Care Products</option>
      </select>
      <h2 className="md:text-3xl text-2xl font-semibold text-center mt-20 mb-10">
        Pet Adoption & Supply Services
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
