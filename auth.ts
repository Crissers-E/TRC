import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize state from localStorage immediately
    const authStatus = localStorage.getItem("admin_authenticated");
    return authStatus === "true";
  });

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const login = () => {
    localStorage.setItem("admin_authenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
