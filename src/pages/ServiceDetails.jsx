import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { toast } from "react-toastify";

const ServiceDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const { myId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleOpenForm = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please enter both name and email!");
      return; // stop execution
    }

    toast("Booking successful!");

    setFormData({
      name: "",
      email: "",
    });
  };

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.log(err));
  }, []);

  const findResult = services.find((service) => service.serviceId == myId);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-5 p-17 md:px-0 px-8">
        <img
          className="md:w-5/12 w-full h-105 rounded-lg md:border-4 border-none"
          src={findResult?.image}
          alt=""
        />
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">
            Service Name:{" "}
            <span className="text-xl">{findResult?.serviceName}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            Provider Name:{" "}
            <span className="text-xl">{findResult?.providerName}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            Provider E-mail:{" "}
            <span className="text-xl">{findResult?.providerEmail}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            Price: <span className="text-xl">{findResult?.price}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            Rating: <span className="text-xl">{findResult?.rating}</span>
          </h2>
          <h2 className="text-2xl font-semibold">
            Description:{" "}
            <span className="text-xl font-normal">
              {findResult?.description}
            </span>
          </h2>
          <h2 className="text-2xl font-semibold">
            Category: <span className="text-xl">{findResult?.category}</span>
          </h2>
          <button
            onClick={handleOpenForm}
            className="bg-black text-white mt-10 px-6 text-[20px] font-semibold py-2 rounded-sm cursor-pointer"
          >
            {!isOpen ? " Book This Service" : "Hide Booking Form"}
          </button>
        </div>
      </div>
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 md:w-4/12 w-11/12 mx-auto border border-gray-400 rounded-lg px-10 pb-18 pt-12 bg-gray-100 mb-10 mt-1"
        >
          <label className="text-xl font-semibold">Name</label>
          <input
            className="border border-gray-400 py-3 px-3 mb-4 bg-white rounded-sm"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <label className="text-xl font-semibold">Email</label>
          <input
            className="border border-gray-400 py-3 px-3 bg-white rounded-sm"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-black text-center text-white text-xl font-semibold py-3 mt-3 rounded-sm cursor-pointer"
          >
            Book Now
          </button>
        </form>
      )}
    </div>
  );
};

export default ServiceDetails;
