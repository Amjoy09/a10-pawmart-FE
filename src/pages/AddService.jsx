import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
    };

    console.log(formData);

    axios.post("http://localhost:3000/services", formData).then((res) => {
      console.log(res);
      if (res.data.acknowledged) {
        Swal.fire({
          title: "Listing Added Successfully!",
          icon: "success",
          draggable: true,
        });
        form.reset();
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product/Pet Name */}
        <div>
          <label className="block font-medium mb-1">Product / Pet Name</label>
          <input
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
            name="category"
            className="w-full border rounded-lg p-2"
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddService;
