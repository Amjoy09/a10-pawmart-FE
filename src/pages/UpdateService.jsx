import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const UpdateService = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [service, setService] = useState();
  const [category, setCategory] = useState(service?.category);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://a10-pawmart.vercel.app/services/${id}`)
      .then((res) => {
        setService(res.data);
        setCategory(res.data.category);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = parseInt(form.price.value);
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    const date = form.date.value;
    const email = form.email.value;

    const formData = {
      name,
      category,
      price,
      location,
      description,
      image,
      date,
      email,
      createdAt: service?.createdAt,
    };

    axios
      .put(`https://a10-pawmart.vercel.app/update/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        navigation("/my-services");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-xl mx-auto bg-base-200 dark:bg-base-300 shadow-lg rounded-xl p-4 md:p-6 my-6 md:my-10 transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-base-content">
          Update Service Information
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Product/Pet Name */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Product / Pet Name
            </label>
            <input
              defaultValue={service?.name}
              type="text"
              name="name"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-100 text-base-content
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                transition-all duration-200"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Category
            </label>
            <select
              value={category}
              name="category"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-100 text-base-content
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                transition-all duration-200"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" className="bg-base-100 text-base-content">
                Select Category
              </option>
              <option value="Pets" className="bg-base-100 text-base-content">
                Pets
              </option>
              <option
                value="Accessories"
                className="bg-base-100 text-base-content"
              >
                Accessories
              </option>
              <option
                value="Care Products"
                className="bg-base-100 text-base-content"
              >
                Care Products
              </option>
              <option value="Foods" className="bg-base-100 text-base-content">
                Foods
              </option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Price
            </label>
            <input
              defaultValue={service?.price}
              type="number"
              name="price"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-100 text-base-content
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                transition-all duration-200"
              min="0"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Location
            </label>
            <input
              defaultValue={service?.location}
              type="text"
              name="location"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-100 text-base-content
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Description
            </label>
            <textarea
              defaultValue={service?.description}
              name="description"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-100 text-base-content
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                transition-all duration-200"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Image URL
            </label>
            <input
              defaultValue={service?.image}
              type="url"
              name="image"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-100 text-base-content
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                transition-all duration-200"
              required
            />
          </div>

          {/* Date (Pick Up) */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Pick Up Date
            </label>
            <input
              defaultValue={service?.date}
              type="date"
              name="date"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-100 text-base-content
                focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                transition-all duration-200"
              required
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block font-medium mb-1 text-base-content">
              Your Email
            </label>
            <input
              value={user?.email}
              type="email"
              name="email"
              className="w-full border border-base-300 rounded-lg p-2 
                bg-base-200 dark:bg-base-300 text-base-content/70
                cursor-not-allowed"
              readOnly
              disabled
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-2 rounded-lg font-semibold cursor-pointer
              transition-all duration-200
              ${
                isSubmitting
                  ? "bg-blue-400 dark:bg-blue-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              } 
              text-white shadow-md hover:shadow-lg`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </span>
            ) : (
              "Update Service"
            )}
          </button>

          {/* Cancel/Back Button */}
          <button
            type="button"
            onClick={() => navigation("/my-services")}
            className="w-full p-2 rounded-lg font-semibold cursor-pointer
              transition-all duration-200
              bg-base-300 hover:bg-base-400 
              dark:bg-base-200 dark:hover:bg-base-300
              text-base-content border border-base-300
              hover:shadow-md"
          >
            Cancel
          </button>
        </form>

        {/* Form Preview Card */}
        <div className="mt-8 pt-6 border-t border-base-300">
          <h3 className="text-lg font-medium mb-3 text-base-content">
            Preview
          </h3>
          <div className="bg-base-100 rounded-lg p-4 border border-base-300">
            <div className="flex items-start gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src={service?.image}
                    alt={service?.name}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-base-content">{service?.name}</h4>
                <div className="badge badge-outline mt-1">{category}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-base-content/80 line-clamp-2">
              {service?.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-primary">
                {service?.price} Taka
              </span>
              <span className="text-sm text-base-content/70">
                {service?.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
