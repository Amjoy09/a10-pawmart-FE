import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((res) => {
        setMyOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {myOrders.map((order, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{order?.productName}</td>
                <td>{order?.price}</td>
                <td>{order?.contactNumber}</td>
                <td>{order?.address}</td>
                <td>{order?.productQuantity}</td>
                <td>{order?.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
