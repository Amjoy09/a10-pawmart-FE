import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleSignout = () => {
    signOut(auth);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-15">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li>
            <li>
              <NavLink to="/add-service">Add Service</NavLink>
            </li>
            <li>
              <NavLink to="/my-services">My Services</NavLink>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl border-rose-300 bg-cyan-900 text-rose-300 h-[60px]"
        >
          🐹 WarmPaws🐶
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" className="font-medium text-lg">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className="font-medium text-lg">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="font-medium text-lg">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-service" className="font-medium text-lg">
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-services" className="font-medium text-lg">
              My Services
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end space-x-5">
        <div className="relative group">
          {user && (
            <>
              <img
                className="w-15 h-14 rounded-full border-3 p-0.5 object-cover"
                src={user.photoURL}
                alt={`${user.displayName || "User"} avatar`}
              />

              {/* The new hover overlay element */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full cursor-pointer">
                <span className="text-white text-xs font-semibold p-1 text-center">
                  {user.displayName || "User Name"}
                </span>
              </div>
            </>
          )}
        </div>

        {user ? (
          <Link
            to="/login"
            onClick={handleSignout}
            className="btn text-white text-xl bg-orange-700"
          >
            Logout
          </Link>
        ) : (
          <Link to="/login" className="btn text-white text-xl bg-orange-700">
            Login/Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
