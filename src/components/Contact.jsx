import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary text-center mb-8">
          Contact Us 📩
        </h1>

        <form className="card bg-base-200 shadow-xl p-8 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
          />

          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
          ></textarea>

          <button className="btn btn-primary text-white">Send Message</button>
        </form>

        <div className="mt-8 text-center text-base-content/70">
          <p>Email: support@pawmart.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Location: Narayanganj, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
