import { createContext, useContext, useState, useEffect } from "react";
import { getProfile, logoutUser } from "../utils/api";

const AuthContext = createContext(null);

/**
 * AuthProvider — wraps the app to provide global auth state.
 *
 * On mount, tries to restore the session by calling GET /profile
 * with the existing HTTP-only cookie. If the cookie is valid,
 * the user is automatically logged in.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from HTTP-only cookie on app load
  useEffect(() => {
    const restore = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch {
        // No valid session — user stays null
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore logout errors (cookie may already be cleared)
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth state from any component.
 * Returns: { user, setUser, logout, loading }
 */
export const useAuth = () => useContext(AuthContext);
