import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://a10-pawmart.vercel.app/my-services?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyServices(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://a10-pawmart.vercel.app/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount == 1) {
              const filterData = myServices.filter(
                (service) => service._id != id
              );
              setMyServices(filterData);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen p-4">
      {/* Mobile Card View - Visible on small screens */}
      <div className="md:hidden space-y-4">
        {myServices.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg">No services found</p>
          </div>
        ) : (
          myServices.map((service) => (
            <div
              key={service._id}
              className="card bg-base-200 shadow-xl border border-base-300"
            >
              <div className="card-body p-4">
                {/* Service Header with Image and Name */}
                <div className="flex items-start gap-3">
                  <div className="avatar flex-shrink-0">
                    <div className="mask mask-squircle w-16 h-16">
                      <img
                        src={service?.image}
                        alt={service?.name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="card-title text-base font-bold">
                      {service?.name}
                    </h3>
                    <div className="badge badge-outline mt-1">
                      {service?.category}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-3">
                  <p className="text-sm line-clamp-3">{service?.description}</p>
                </div>

                {/* Location and Price */}
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Location:</span>
                    <span className="text-base-content/70">
                      {service?.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Price:</span>
                    <span className="text-base-content font-bold">
                      {service?.price} Taka
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions justify-end mt-4">
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => handleDelete(service?._id)}
                      className="btn btn-error btn-sm flex-1 
                        bg-red-600 hover:bg-red-700 
                        dark:bg-red-500 dark:hover:bg-red-600 
                        text-white"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/update-service/${service?._id}`}
                      className="flex-1"
                    >
                      <button
                        className="btn btn-primary btn-sm w-full
                          bg-blue-600 hover:bg-blue-700 
                          dark:bg-blue-500 dark:hover:bg-blue-600 
                          text-white"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View - Hidden on mobile, visible on medium and above */}
      <div className="hidden md:block overflow-x-auto bg-base-100">
        <table className="table table-zebra w-full text-base-content">
          {/* head */}
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th></th>
              <th>Name & Category</th>
              <th>Other Information</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myServices.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  No services found
                </td>
              </tr>
            ) : (
              myServices.map((service) => (
                <tr key={service._id}>
                  <td></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={service?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base-content">
                          {service?.name}
                        </div>
                        <div className="text-sm text-base-content/70">
                          {service?.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {service?.description}
                    <br />
                    <span
                      className="badge badge-ghost badge-sm 
                        text-base-content border-base-300 mt-1"
                    >
                      Address: {service?.location}
                    </span>
                  </td>
                  <td className="font-medium text-base-content">
                    {service?.price} Taka
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() => handleDelete(service?._id)}
                      className="btn btn-xs 
                        bg-red-600 hover:bg-red-700 
                        dark:bg-red-500 dark:hover:bg-red-600 
                        text-white"
                    >
                      Delete
                    </button>
                    <Link to={`/update-service/${service?._id}`}>
                      <button
                        className="btn btn-xs 
                          bg-blue-600 hover:bg-blue-700 
                          dark:bg-blue-500 dark:hover:bg-blue-600 
                          text-white"
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Empty State for both mobile and desktop */}
      {myServices.length === 0 && (
        <div className="text-center py-10">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No Services Yet</h3>
            <p className="text-base-content/70 mb-6">
              You haven't added any services yet. Create your first service to
              get started!
            </p>
            <Link to="/add-service">
              <button className="btn btn-primary">
                Add Your First Service
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;
