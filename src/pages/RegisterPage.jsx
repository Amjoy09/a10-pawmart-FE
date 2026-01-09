import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import auth from "../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
  });

  const { registerWithEmailPassword, setUser, handleGoogleSignin } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handlePasswordChange = (password) => {
    setPasswordStrength({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (pass.length < 6) {
      toast.error("Password must be at least 6 characters!", {
        position: "top-center",
      });
      setIsLoading(false);
      return;
    }
    if (!uppercase.test(pass)) {
      toast.error("Password must contain at least one uppercase letter!", {
        position: "top-center",
      });
      setIsLoading(false);
      return;
    }
    if (!lowercase.test(pass)) {
      toast.error("Password must contain at least one lowercase letter!", {
        position: "top-center",
      });
      setIsLoading(false);
      return;
    }

    registerWithEmailPassword(email, pass)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            photoUrl || "https://i.ibb.co.com/7JQ3q1C/default-avatar.png",
        })
          .then(() => {
            setUser(userCredential.user);
            toast.success("🎉 Sign Up Successful! Welcome to PawMart!", {
              position: "top-center",
              autoClose: 3000,
            });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to update profile. Please try again!", {
              position: "top-center",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = "Sign up failed. Please try again.";

        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "This email is already registered. Please login instead.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/weak-password":
            errorMessage =
              "Password is too weak. Please choose a stronger password.";
            break;
          case "auth/operation-not-allowed":
            errorMessage =
              "Email/password sign up is not enabled. Please contact support.";
            break;
        }

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const googleSignup = () => {
    setIsGoogleLoading(true);
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("🎉 Google Sign Up Successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google sign up failed. Please try again.", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 text-base-content flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-primary">Join</span>
            <span className="text-secondary"> PawMart</span>
          </h1>
          <p className="text-base-content/70">
            Create your account and join our pet community
          </p>
        </div>

        {/* Registration Card */}
        <div className="card bg-base-200 dark:bg-base-300 shadow-2xl border border-base-300">
          <div className="card-body p-6 md:p-8">
            <h2 className="card-title text-3xl font-bold mb-2 justify-center text-base-content">
              Create Account
            </h2>
            <p className="text-center text-base-content/70 mb-6">
              Start your journey with PawMart
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content">
                    Full Name
                  </span>
                </label>
                <input
                  className="input input-bordered w-full 
                    bg-base-100 border-base-300 
                    focus:border-primary focus:ring-2 focus:ring-primary/20
                    text-base-content placeholder:text-base-content/50"
                  name="name"
                  placeholder="Enter your full name"
                  type="text"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content">
                    Email Address
                  </span>
                </label>
                <input
                  className="input input-bordered w-full 
                    bg-base-100 border-base-300 
                    focus:border-primary focus:ring-2 focus:ring-primary/20
                    text-base-content placeholder:text-base-content/50"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Photo URL Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content">
                    Profile Photo URL{" "}
                    <span className="text-sm text-base-content/50">
                      (Optional)
                    </span>
                  </span>
                </label>
                <input
                  className="input input-bordered w-full 
                    bg-base-100 border-base-300 
                    focus:border-primary focus:ring-2 focus:ring-primary/20
                    text-base-content placeholder:text-base-content/50"
                  type="url"
                  name="photoUrl"
                  placeholder="https://example.com/your-photo.jpg"
                />
                <div className="label">
                  <span className="label-text-alt text-base-content/70">
                    Leave empty for default avatar
                  </span>
                </div>
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    className="input input-bordered w-full 
                      bg-base-100 border-base-300 pr-12
                      focus:border-primary focus:ring-2 focus:ring-primary/20
                      text-base-content placeholder:text-base-content/50"
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 
                      btn btn-ghost btn-sm p-1 
                      hover:bg-base-300 text-base-content/70"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <IoMdEye size={22} />
                    ) : (
                      <IoMdEyeOff size={22} />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        passwordStrength.length ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        passwordStrength.length
                          ? "text-green-500"
                          : "text-base-content/70"
                      }`}
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        passwordStrength.uppercase
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        passwordStrength.uppercase
                          ? "text-green-500"
                          : "text-base-content/70"
                      }`}
                    >
                      At least one uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        passwordStrength.lowercase
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        passwordStrength.lowercase
                          ? "text-green-500"
                          : "text-base-content/70"
                      }`}
                    >
                      At least one lowercase letter
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border-base-300 
                      checked:border-primary [--chkbg:var(--color-primary)] [--chkfg:white]"
                    required
                  />
                  <span className="label-text text-base-content/80">
                    I agree to the{" "}
                    <a href="/terms" className="link link-primary font-medium">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="link link-primary font-medium"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Sign Up Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary text-white text-lg font-semibold
                    ${isLoading ? "loading" : ""}
                    hover:bg-primary-focus active:scale-[0.98] transition-transform`}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider text-base-content/50 my-6">OR</div>

            {/* Google Sign Up */}
            <div className="form-control">
              <button
                onClick={googleSignup}
                disabled={isGoogleLoading}
                className="btn btn-outline border-base-300 
                  hover:bg-base-300 hover:border-base-400 
                  dark:hover:bg-base-400
                  text-base-content font-medium
                  active:scale-[0.98] transition-transform"
              >
                {isGoogleLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FcGoogle size={24} />
                )}
                <span>
                  {isGoogleLoading ? "Signing Up..." : "Continue with Google"}
                </span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8">
              <p className="text-base-content/80">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="link link-primary font-semibold text-lg
                    hover:text-primary-focus transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-base-300/50 border border-base-300 flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
              <span className="text-primary">🐾</span>
            </div>
            <div>
              <div className="font-semibold mb-1">Exclusive Pet Community</div>
              <div className="text-base-content/70">
                Connect with fellow pet lovers
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-base-300/50 border border-base-300 flex items-start gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg shrink-0">
              <span className="text-green-500">🎁</span>
            </div>
            <div>
              <div className="font-semibold mb-1">Welcome Bonus</div>
              <div className="text-base-content/70">
                Get discounts on your first order
              </div>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-base-content/50">
            🔒 Your information is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
