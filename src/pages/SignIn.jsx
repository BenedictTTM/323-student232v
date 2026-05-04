import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCookie, setShowCookie] = useState(true);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(form);
      setUser(data.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white font-sans relative">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none">
            <path
              d="M512.147 692C412.697 692 332.147 611.45 332.147 512C332.147 412.55 412.697 332 512.147 332C601.247 332 675.547 396.95 690.047 481H854.047C838.347 311.1 694.497 180 512.147 180C328.897 180 180.147 328.75 180.147 512C180.147 695.25 328.897 844 512.147 844C694.497 844 838.347 712.9 854.047 543H690.047C675.547 627.05 601.247 692 512.147 692Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
          <h1 className="text-[28px] font-semibold mb-2">
            Sign in to Coinbase
          </h1>
          <p className="text-[15px] text-gray-400 mb-8 leading-relaxed">
            Welcome back. Enter your credentials to access your account.
          </p>

          {/* Error banner */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-900/40 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="signin-email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="signin-email"
              name="email"
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-[15px]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="signin-password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="signin-password"
              name="password"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-[15px]"
            />
          </div>

          {/* Submit */}
          <button
            id="signin-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-60 text-white font-semibold rounded-full transition-colors text-[15px] cursor-pointer mb-6"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Cookie Banner */}
      {showCookie && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0b0d] border-t border-gray-800 px-6 py-4 flex items-center justify-between z-50">
          <p className="text-sm text-gray-400 max-w-3xl">
            We use strictly necessary cookies to enable essential functions, such
            as security and authentication. For more information, see our{" "}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              Cookie Policy
            </a>
            .
          </p>
          <button
            id="signin-dismiss-cookie"
            onClick={() => setShowCookie(false)}
            className="ml-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
