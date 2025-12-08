import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/my-services?email=${user?.email}`)
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
          .delete(`http://localhost:3000/delete/${id}`)
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
    <div>
      <div className="overflow-x-auto">
        <table className="table pl-5">
          {/* head */}
          <thead>
            <tr>
              <th>Name & Category</th>
              <th>Other Information</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {myServices.map((service) => (
              <tr>
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
                      <div className="font-bold">{service?.name}</div>
                      <div className="text-sm opacity-50">
                        {service?.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {service?.description}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Address: {service?.location}
                  </span>
                </td>
                <td>{service?.price} Taka</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleDelete(service?._id)}
                    className="btn btn-ghost btn-xs bg-red-700 text-white"
                  >
                    Delete
                  </button>
                  <Link to={`/update-service/${service?._id}`}>
                    {" "}
                    <button className="btn btn-ghost btn-xs bg-blue-700 text-white">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;
