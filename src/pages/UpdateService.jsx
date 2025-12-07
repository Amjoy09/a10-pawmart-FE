import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const UpdateService = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [service, setService] = useState();
  const [category, setCategory] = useState(service?.category);
  const navigation = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/services/${id}`).then((res) => {
      setService(res.data);
      setCategory(res.data.category);
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
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

    axios.put(`http://localhost:3000/update/${id}`, formData).then((res) => {
      console.log(res.data);
    });
    navigation("/my-services").catch((err) => {
      console.log(err);
    });
  };
  return (
    <div>
      {" "}
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Information
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Product/Pet Name */}
          <div>
            <label className="block font-medium mb-1">Product / Pet Name</label>
            <input
              defaultValue={service?.name}
              type="text"
              name="name"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              value={category}
              name="category"
              className="w-full border rounded-lg p-2"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Pets">Pets</option>
              <option value="Accessories">Accessories</option>
              <option value="Care Products">Care Products</option>
              <option value="Foods">Foods</option>
            </select>
          </div>

          {/* Price (0 if Pets) */}
          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              defaultValue={service?.price}
              type="number"
              name="price"
              className="w-full border rounded-lg p-2"
              min="0"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              defaultValue={service?.location}
              type="text"
              name="location"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              defaultValue={service?.description}
              name="description"
              className="w-full border rounded-lg p-2"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              defaultValue={service?.image}
              type="url"
              name="image"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Date (Pick Up) */}
          <div>
            <label className="block font-medium mb-1">Pick Up Date</label>
            <input
              defaultValue={service?.date}
              type="date"
              name="date"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          {/* Email (Readonly) */}
          <div>
            <label className="block font-medium mb-1">Your Email</label>
            <input
              value={user?.email}
              type="email"
              name="email"
              className="w-full border rounded-lg p-2 bg-gray-100"
              readOnly
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
