import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const ServiceDetails = () => {
  const [service, setService] = useState([]);
  const { myId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/services/${myId}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.log(err));
  }, [myId]);

  return (
    <div className="">
      <div className="flex justify-center flex-col md:flex-row items-center gap-5 py-17 md:px-0 px-8 ">
        <img
          className="md:w-5/12 w-full h-105 rounded-lg md:border-4 border-none"
          src={service?.image}
          alt="pet-service"
        />
        <div>
          <button
            className="btn bg-black text-white py-6 px-7 text-xl font-bold"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            ORDER / ADOPT
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div>
                <form className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                  <legend className="fieldset-legend pt-5 text-3xl font-bold">
                    Order/Adopt Form
                  </legend>

                  <label className="label text-lg font-semibold">
                    Buyer Name
                  </label>
                  <input
                    defaultValue={user?.displayName}
                    type="text"
                    className="input w-10/12 mx-auto"
                    placeholder="Your Name"
                  />

                  <label className="label text-lg font-semibold">
                    Buyer Email
                  </label>
                  <input
                    defaultValue={user?.email}
                    type="email"
                    className="input mx-auto w-10/12"
                    placeholder="Email"
                    readOnly
                  />

                  <label className="label text-lg font-semibold">
                    Product ID
                  </label>
                  <input
                    defaultValue={service?._id}
                    type="text"
                    className="input  w-10/12 mx-auto"
                    placeholder="Unique ID"
                    readOnly
                  />
                  <label className="label text-lg font-semibold">
                    Product Name
                  </label>
                  <input
                    defaultValue={service?.name}
                    type="text"
                    className="input  w-10/12 mx-auto"
                    placeholder="Product/Service Name"
                    readOnlys
                  />
                  <label className="label text-lg font-semibold">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    className="input  w-10/12 mx-auto"
                    placeholder="Product Quantity"
                  />
                  <label className="label text-lg font-semibold">Price</label>
                  <input
                    defaultValue={service?.price}
                    type="text"
                    className="input  w-10/12 mx-auto"
                    placeholder="Price"
                    readOnly
                  />

                  <label className="label text-lg font-semibold">Address</label>
                  <input
                    defaultValue={service?.location}
                    type="text"
                    className="input  w-10/12 mx-auto"
                    placeholder="Address"
                  />
                  <label className="label text-lg font-semibold">Date</label>
                  <input
                    type="number"
                    className="input  w-10/12 mx-auto"
                    placeholder="Date"
                  />
                  <label className="label text-lg font-semibold">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    className="input  w-10/12 mx-auto"
                    placeholder="Contact Number"
                  />
                  <label className="label text-lg font-semibold">
                    Additional Notes
                  </label>
                  <textarea
                    type="text"
                    className="input  w-10/12 mx-auto h-25"
                    placeholder="Comment Here..."
                  />
                </form>
                <button
                  type="submit"
                  className="btn btn-primary text-white text-center w-full mt-5 "
                >
                  Submit
                </button>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn bg-neutral-600 text-white">
                    Close Modal
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
