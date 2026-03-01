import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">
          About PawMart 🐾
        </h1>

        <p className="text-base-content/70 mb-6">
          PawMart was created with one mission — to provide quality products and
          build a loving pet community.
        </p>

        <p className="text-base-content/70 mb-6">
          We believe pets are family. That’s why we carefully select every
          product to ensure safety, comfort, and happiness.
        </p>

        <p className="text-base-content/70">
          Join thousands of happy pet lovers who trust PawMart every day.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
