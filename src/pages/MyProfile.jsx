import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenForm = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    })
      .then(() => {
        setUser({ ...user, photoURL: photoUrl, displayName: name });
      })
      .catch((error) => {
        console.log(error);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="avatar pt-10">
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
          <img src={user.photoURL} />
        </div>
      </div>
      <p className="text-xl font-semibold text-gray-600">
        <span className="text-xl font-bold text-black">Name: </span>
        {user?.displayName}
      </p>
      <p className="text-xl font-semibold text-gray-600">
        <span className="text-xl font-bold text-black">Email: </span>
        {user?.email}
      </p>
      <button
        onClick={handleOpenForm}
        className="btn px-8 py-5 bg-black text-white"
      >
        {!isOpen ? " Update Your Profile" : "Hide Update Form"}
      </button>

      {isOpen && (
        <form
          onSubmit={handleUpdate}
          className="flex flex-col gap-3 w-3/12 border border-gray-400 rounded-lg px-10 pb-18 pt-12 bg-emerald-50 mb-10 mt-1"
        >
          <label className="text-xl font-semibold">Name</label>
          <input
            className="border border-gray-400 py-3 px-3 mb-4 bg-white rounded-sm"
            defaultValue={user?.displayName}
            type="text"
            name="name"
            placeholder="Your Name"
          />

          <label className="text-xl font-semibold">Photo URL</label>
          <input
            defaultValue={user?.photoURL}
            className="border border-gray-400 py-3 px-3 bg-white rounded-sm"
            type="text"
            name="photoUrl"
            placeholder="Photo URL"
          />

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-800 text-center text-white text-xl font-semibold py-3 mt-3 rounded-sm cursor-pointer"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default MyProfile;
