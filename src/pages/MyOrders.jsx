import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get("https://a10-pawmart.vercel.app/orders")
      .then((res) => {
        setMyOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Failed to load orders",
          text: "Please try again later",
        });
      });
  };

  // Filter orders based on active tab
  const filteredOrders = myOrders.filter(() => {
    if (activeTab === "all") return true;
    // Add more filter logic if needed
    return true;
  });

  // Function to manually create the PDF without jsPDF-autotable
  const generatePDF = () => {
    if (myOrders.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No orders",
        text: "There are no orders to download!",
      });
      return;
    }

    try {
      // Create a new PDF document
      const doc = new jsPDF();

      // Set title
      doc.setFontSize(18);
      doc.text("Order Report", 20, 20);

      // Set date
      doc.setFontSize(11);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

      // Create headers
      const headers = [
        ["#", "Product", "Price", "Phone", "Location", "Quantity", "Date"],
      ];

      // Create rows
      const rows = myOrders.map((order, index) => [
        index + 1,
        order.productName || "",
        `$${order.price || 0}`,
        order.contactNumber || "",
        order.address || "",
        order.productQuantity || "",
        order.date || "",
      ]);

      // Manually create table without autoTable
      let yPos = 40;
      const colWidths = [10, 40, 20, 30, 40, 20, 30];
      const lineHeight = 10;

      // Draw headers with background
      doc.setFillColor(41, 128, 185);
      doc.setTextColor(255, 255, 255);
      doc.rect(20, yPos - 5, 170, lineHeight, "F");

      let xPos = 20;
      headers[0].forEach((header, i) => {
        doc.text(header, xPos + 2, yPos);
        xPos += colWidths[i];
      });

      yPos += lineHeight;
      doc.setTextColor(0, 0, 0);

      // Draw rows
      rows.forEach((row, rowIndex) => {
        if (yPos > 280) {
          // Check if we need a new page
          doc.addPage();
          yPos = 20;
        }

        // Alternate row colors
        if (rowIndex % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(20, yPos - 5, 170, lineHeight, "F");
        }

        xPos = 20;
        row.forEach((cell, i) => {
          doc.text(String(cell), xPos + 2, yPos);
          xPos += colWidths[i];
        });

        yPos += lineHeight;
      });

      // Save the PDF
      doc.save(`order_report_${Date.now()}.pdf`);

      Swal.fire({
        icon: "success",
        title: "PDF Downloaded",
        text: "Order report has been downloaded successfully!",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to generate PDF. Please try again.",
      });
    }
  };

  // Alternative: Simple text-based PDF
  const generateSimplePDF = () => {
    if (myOrders.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No orders",
        text: "There are no orders to download!",
      });
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Order Report", 20, 20);

    // Add generation date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    // Start position for content
    let y = 40;

    // Add each order
    myOrders.forEach((order, index) => {
      doc.setFontSize(12);
      doc.text(`Order #${index + 1}:`, 20, y);
      y += 8;

      doc.setFontSize(10);
      doc.text(`Product: ${order.productName}`, 30, y);
      y += 6;
      doc.text(`Price: $${order.price}`, 30, y);
      y += 6;
      doc.text(`Quantity: ${order.productQuantity}`, 30, y);
      y += 6;
      doc.text(`Phone: ${order.contactNumber}`, 30, y);
      y += 6;
      doc.text(`Location: ${order.address}`, 30, y);
      y += 6;
      doc.text(`Date: ${order.date}`, 30, y);
      y += 10;

      // Add a separator line
      doc.line(20, y, 190, y);
      y += 5;

      // Add new page if content exceeds page
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    // Save the PDF
    doc.save(`order_report_simple_${Date.now()}.pdf`);

    Swal.fire({
      icon: "success",
      title: "PDF Downloaded",
      text: "Simple order report has been downloaded!",
    });
  };

  // Refresh orders
  const handleRefresh = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
              My Orders
            </h1>
            <p className="text-base-content/70 mt-1">
              Total Orders:{" "}
              <span className="font-semibold">{myOrders.length}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRefresh}
              className="btn btn-outline btn-sm md:btn-md 
                border-base-300 hover:border-primary
                dark:border-base-300 dark:hover:border-primary"
            >
              🔄 Refresh
            </button>

            <div className="flex gap-2">
              <button
                onClick={generatePDF}
                disabled={myOrders.length === 0}
                className={`btn btn-sm md:btn-md flex-1 ${
                  myOrders.length === 0 ? "btn-disabled" : "btn-primary"
                }`}
              >
                <span className="hidden sm:inline">📥 Table Report</span>
                <span className="sm:hidden">📥 Table</span>
              </button>

              <button
                onClick={generateSimplePDF}
                disabled={myOrders.length === 0}
                className={`btn btn-sm md:btn-md flex-1 ${
                  myOrders.length === 0 ? "btn-disabled" : "btn-success"
                }`}
              >
                <span className="hidden sm:inline">📄 Simple Report</span>
                <span className="sm:hidden">📄 Simple</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {myOrders.length === 0 ? (
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body text-center py-10">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p className="text-base-content/70 mb-4">
                You haven't placed any orders yet.
              </p>
              <button className="btn btn-primary">Browse Products</button>
            </div>
          </div>
        ) : (
          filteredOrders.map((order, i) => (
            <div key={i} className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="badge badge-primary badge-sm mb-1">
                      Order #{i + 1}
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1">
                      {order?.productName}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      ${order?.price}
                    </div>
                    <div className="text-sm text-base-content/70">
                      Qty: {order?.productQuantity}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-base-content/70">📞</span>
                    <span>{order?.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base-content/70">📍</span>
                    <span className="line-clamp-1">{order?.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base-content/70">📅</span>
                    <span>{order?.date}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-outline btn-sm border-base-300">
                    View Details
                  </button>
                  <button className="btn btn-primary btn-sm">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        {myOrders.length === 0 ? (
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body text-center py-16">
              <div className="text-8xl mb-6">📦</div>
              <h3 className="text-2xl font-semibold mb-3">No Orders Found</h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
              <div className="space-x-3">
                <button className="btn btn-primary">Browse Products</button>
                <button className="btn btn-outline border-base-300">
                  View Services
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-200 dark:bg-base-300 rounded-xl border border-base-300 shadow-sm">
            <table className="table w-full text-base-content">
              <thead className="bg-base-300 dark:bg-base-400">
                <tr>
                  <th className="text-base-content font-semibold">#</th>
                  <th className="text-base-content font-semibold">Product</th>
                  <th className="text-base-content font-semibold">Price</th>
                  <th className="text-base-content font-semibold">Phone</th>
                  <th className="text-base-content font-semibold">Location</th>
                  <th className="text-base-content font-semibold">Qty</th>
                  <th className="text-base-content font-semibold">Date</th>
                  <th className="text-base-content font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, i) => (
                  <tr
                    key={i}
                    className="hover:bg-base-300/50 dark:hover:bg-base-400/50"
                  >
                    <td className="font-medium">{i + 1}</td>
                    <td>
                      <div className="font-semibold">{order?.productName}</div>
                    </td>
                    <td>
                      <span className="font-bold text-primary">
                        ${order?.price}
                      </span>
                    </td>
                    <td className="font-mono">{order?.contactNumber}</td>
                    <td className="max-w-xs truncate">{order?.address}</td>
                    <td>
                      <span className="badge badge-outline border-base-300">
                        {order?.productQuantity}
                      </span>
                    </td>
                    <td>{order?.date}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-outline border-base-300">
                          View
                        </button>
                        <button className="btn btn-xs btn-primary">
                          Track
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {myOrders.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-base-content">
            Order Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <span className="text-primary text-xl">📦</span>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Total Orders</p>
                    <p className="text-2xl font-bold">{myOrders.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <span className="text-green-500 text-xl">💰</span>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Total Spent</p>
                    <p className="text-2xl font-bold">
                      $
                      {myOrders
                        .reduce(
                          (sum, order) => sum + (parseFloat(order.price) || 0),
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <span className="text-blue-500 text-xl">📅</span>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Latest Order</p>
                    <p className="text-lg font-bold truncate">
                      {myOrders[0]?.date || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 border border-base-300">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <span className="text-purple-500 text-xl">📞</span>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">
                      Average Price
                    </p>
                    <p className="text-2xl font-bold">
                      $
                      {(
                        myOrders.reduce(
                          (sum, order) => sum + (parseFloat(order.price) || 0),
                          0
                        ) / myOrders.length || 0
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
