import axios from "axios";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((res) => {
        setMyOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  // Function to manually create the PDF without jsPDF-autotable
  const generatePDF = () => {
    if (myOrders.length === 0) {
      alert("No orders to download!");
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
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  // Alternative: Simple text-based PDF
  const generateSimplePDF = () => {
    if (myOrders.length === 0) {
      alert("No orders to download!");
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
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="space-x-2">
          <button
            onClick={generatePDF}
            disabled={myOrders.length === 0}
            className={`px-4 py-2 rounded font-medium ${
              myOrders.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            📥 Download Report (Table)
          </button>

          <button
            onClick={generateSimplePDF}
            disabled={myOrders.length === 0}
            className={`px-4 py-2 rounded font-medium ${
              myOrders.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            📄 Download Report (Simple)
          </button>
        </div>
      </div>

      {myOrders.length === 0 ? (
        <div className="text-center py-8 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Qty
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myOrders.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {order?.productName}
                  </td>
                  <td className="px-4 py-3 text-sm">${order?.price}</td>
                  <td className="px-4 py-3 text-sm">{order?.contactNumber}</td>
                  <td className="px-4 py-3 text-sm">{order?.address}</td>
                  <td className="px-4 py-3 text-sm">
                    {order?.productQuantity}
                  </td>
                  <td className="px-4 py-3 text-sm">{order?.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
