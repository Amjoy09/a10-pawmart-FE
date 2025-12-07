import React from "react";
import { useNavigate, useParams } from "react-router";
import auth from "../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formEmail = e.target.email.value;
    sendPasswordResetEmail(auth, formEmail)
      .then(() => {
        window.open("https://mail.google.com/mail/u/0/#inbox");
      })
      .catch((error) => {
        console.log(error);

        // ..
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-3/12 mx-auto mt-10 border border-gray-700 px-10 py-8 bg-neutral-100 rounded-lg"
      >
        <label className="text-xl font-semibold text-center">Email</label>
        <input
          className="border border-gray-400 py-3 px-3 mb-2 rounded-sm"
          type="email"
          name="email"
          defaultValue={email}
          placeholder="Your Email"
        />
        <button
          type="submit"
          className="bg-black text-center text-white text-xl font-semibold py-3 rounded-sm cursor-pointer"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
