import React from "react";

const Shop = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Our Pet Shop 🐾
        </h1>
        <p className="text-base-content/70 mb-10">
          Explore premium products for your beloved pets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Pet Food</h2>
            <p className="text-base-content/70">
              Nutritious and high-quality food for all breeds.
            </p>
          </div>

          <div className="card bg-base-200 shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Accessories</h2>
            <p className="text-base-content/70">
              Stylish and comfortable accessories for your pets.
            </p>
          </div>

          <div className="card bg-base-200 shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Toys</h2>
            <p className="text-base-content/70">
              Fun and safe toys to keep your pets active.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
