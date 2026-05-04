// ── Centralized API Layer ──────────────────────────────────────
// All backend requests go through this module.
// Base URL comes from environment variable (VITE_API_URL).
// Cookies are sent automatically for JWT auth (credentials: "include").

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Core request wrapper.
 * - Automatically sets JSON headers
 * - Sends HTTP-only cookies for auth
 * - Parses response and throws on error with server message
 */
const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // send HTTP-only JWT cookie
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ── Auth Endpoints ─────────────────────────────────────────────

/**
 * POST /api/auth/register
 * @param {{ name: string, email: string, password: string }} body
 */
export const registerUser = (body) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

/**
 * POST /api/auth/login
 * @param {{ email: string, password: string }} body
 */
export const loginUser = (body) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

/**
 * POST /api/auth/logout
 * Clears the JWT cookie on the server.
 */
export const logoutUser = () =>
  request("/auth/logout", { method: "POST" });

/**
 * GET /api/auth/profile
 * Returns the authenticated user's profile.
 * Requires a valid JWT cookie.
 */
export const getProfile = () => request("/auth/profile");

// ── Crypto Endpoints ───────────────────────────────────────────

/** GET /api/crypto — all tradable cryptocurrencies */
export const fetchAllCrypto = () => request("/crypto");

/** GET /api/crypto/gainers — top gainers sorted by 24h change desc */
export const fetchTopGainers = () => request("/crypto/gainers");

/** GET /api/crypto/new — newest listings sorted by date desc */
export const fetchNewListings = () => request("/crypto/new");

/**
 * POST /api/crypto — add a new cryptocurrency
 * @param {{ name: string, symbol: string, price: number, image: string, change24h: number }} body
 */
export const addCrypto = (body) =>
  request("/crypto", {
    method: "POST",
    body: JSON.stringify(body),
  });
