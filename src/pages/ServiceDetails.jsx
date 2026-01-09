import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const ServiceDetails = () => {
  const [service, setService] = useState([]);
  const { myId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://a10-pawmart.vercel.app/services/${myId}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.log(err));
  }, [myId]);

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const productName = form.productName.value;
    const productQuantity = parseInt(form.productQuantity.value);
    const price = parseInt(form.price.value);
    const address = form.address.value;

    const contactNumber = form.contactNumber.value;
    const notes = form.notes.value;

    const formData = {
      buyerName,
      buyerEmail,
      productId: myId,
      productName,
      productQuantity,
      price,
      address,
      date: new Date(),
      contactNumber,
      notes,
    };

    axios
      .post("https://a10-pawmart.vercel.app/orders", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <div className="flex justify-center flex-col md:flex-row items-center gap-5 py-17 md:px-0 px-8 ">
        <img
          className="md:w-5/12 w-10/12 h-40 md:h-105 rounded-lg md:border-4 border-none"
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
                <form
                  onSubmit={handleOrder}
                  className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
                >
                  <legend className="fieldset-legend pt-5 text-3xl font-bold">
                    Order/Adopt Form
                  </legend>

                  <label className="label text-lg font-semibold">
                    Buyer Name
                  </label>
                  <input
                    name="buyerName"
                    defaultValue={user?.displayName}
                    type="text"
                    className="input w-10/12 mx-auto"
                    placeholder="Your Name"
                  />

                  <label className="label text-lg font-semibold">
                    Buyer Email
                  </label>
                  <input
                    name="buyerEmail"
                    defaultValue={user?.email}
                    type="email"
                    className="input mx-auto w-10/12"
                    placeholder="Email"
                    readOnly
                    required
                  />

                  <label className="label text-lg font-semibold">
                    Product ID
                  </label>
                  <input
                    name="productId"
                    defaultValue={service?._id}
                    type="text"
                    className="input w-10/12 mx-auto"
                    placeholder="Unique ID"
                    readOnly
                  />
                  <label className="label text-lg font-semibold">
                    Product Name
                  </label>
                  <input
                    name="productName"
                    defaultValue={service?.name}
                    type="text"
                    className="input w-10/12 mx-auto"
                    placeholder="Product/Service Name"
                    readOnly
                    required
                  />
                  <label className="label text-lg font-semibold">
                    Product Quantity
                  </label>
                  <input
                    name="productQuantity"
                    type="number"
                    className="input  w-10/12 mx-auto"
                    placeholder="Product Quantity"
                    required
                  />
                  <label className="label text-lg font-semibold">Price</label>
                  <input
                    name="price"
                    defaultValue={service?.price}
                    type="text"
                    className="input  w-10/12 mx-auto"
                    placeholder="Price"
                    readOnly
                  />

                  <label className="label text-lg font-semibold">Address</label>
                  <input
                    name="address"
                    type="text"
                    className="input  w-10/12 mx-auto"
                    placeholder="Address"
                  />
                  <label className="label text-lg font-semibold">Date</label>
                  <input
                    name="date"
                    type="date"
                    className="input  w-10/12 mx-auto"
                    placeholder="Date"
                  />
                  <label className="label text-lg font-semibold">
                    Contact Number
                  </label>
                  <input
                    name="contactNumber"
                    type="number"
                    className="input  w-10/12 mx-auto"
                    placeholder="Contact Number"
                    required
                  />
                  <label className="label text-lg font-semibold">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    type="text"
                    className="input  w-10/12 mx-auto h-25"
                    placeholder="Leave Your Comment Here..."
                  />
                  <button
                    type="submit"
                    className="btn btn-primary text-white text-center w-full mt-5 "
                  >
                    Order
                  </button>
                </form>
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
