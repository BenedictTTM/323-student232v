import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // Get initials for avatar
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Profile Content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Avatar & Name */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-gray-500 mt-1">Coinbase Member</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Account Details
            </h2>
            <div className="space-y-4">
              <InfoRow label="Full Name" value={user?.name} />
              <InfoRow label="Email Address" value={user?.email} />
              <InfoRow
                label="Member Since"
                value={user?.createdAt ? formatDate(user.createdAt) : "—"}
              />
              <InfoRow
                label="Last Updated"
                value={user?.updatedAt ? formatDate(user.updatedAt) : "—"}
              />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/cryptocurrencies"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-colors"
              >
                Browse Cryptocurrencies
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-sm font-semibold rounded-full transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value || "—"}</span>
    </div>
  );
}
