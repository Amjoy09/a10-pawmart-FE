import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { setUser, handleGoogleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("🎉 Login Successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = "Login failed! Please check your email or password.";

        switch (error.code) {
          case "auth/invalid-credential":
            errorMessage = "Invalid email or password.";
            break;
          case "auth/user-not-found":
            errorMessage = "No account found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
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

  const googleSignin = () => {
    setIsGoogleLoading(true);
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("🎉 Google Login Successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google login failed. Please try again.", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  const handleForget = () => {
    if (!email) {
      toast.warning("Please enter your email first", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    navigate(`/forget/${email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 text-base-content flex items-center justify-center p-4">
      <ToastContainer
        position="top-center"
        theme="colored"
        className="mt-16 md:mt-4"
      />

      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-primary">Paw</span>
            <span className="text-secondary">Mart</span>
          </h1>
          <p className="text-base-content/70">
            Welcome back to your pet paradise
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-200 dark:bg-base-300 shadow-2xl border border-base-300">
          <div className="card-body p-6 md:p-8">
            <h2 className="card-title text-3xl font-bold mb-6 justify-center text-base-content">
              Sign In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content">
                    Email Address
                  </span>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
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

                <div className="label">
                  <button
                    type="button"
                    onClick={handleForget}
                    className="label-text-alt link link-hover text-primary 
                      font-medium hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary text-white text-lg font-semibold
                    ${isLoading ? "loading" : ""}
                    hover:bg-primary-focus active:scale-[0.98] transition-transform`}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider text-base-content/50 my-6">OR</div>

            {/* Google Sign In */}
            <div className="form-control">
              <button
                onClick={googleSignin}
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
                  {isGoogleLoading ? "Signing In..." : "Continue with Google"}
                </span>
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-8">
              <p className="text-base-content/80">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="link link-primary font-semibold text-lg
                    hover:text-primary-focus transition-colors"
                >
                  Sign Up Now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info/Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm">
          <div className="p-4 rounded-lg bg-base-300/50 border border-base-300">
            <div className="font-semibold mb-1">🐾 PawMart</div>
            <div className="text-base-content/70">Join our community</div>
          </div>
          <div className="p-4 rounded-lg bg-base-300/50 border border-base-300">
            <div className="font-semibold mb-1">🛡️ Secure</div>
            <div className="text-base-content/70">Your data is protected</div>
          </div>
          <div className="p-4 rounded-lg bg-base-300/50 border border-base-300">
            <div className="font-semibold mb-1">🚚 Fast Delivery</div>
            <div className="text-base-content/70">Across the country</div>
          </div>
        </div>

        {/* Demo Credentials (for development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 card bg-base-300 border border-base-300">
            <div className="card-body p-4">
              <h3 className="card-title text-sm font-semibold mb-2">
                Demo Credentials
              </h3>
              <div className="space-y-1 text-xs">
                <p>Email: demo@example.com</p>
                <p>Password: demo123</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
