import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );

  const [token, setToken] = useState(() => localStorage.getItem("access") || null);

  const login = (data) => {
    // ✅ Full safe store
    localStorage.setItem("user", JSON.stringify(data.user || data));
    if (data.tokens) {
      localStorage.setItem("access", data.tokens.access);
      localStorage.setItem("refresh", data.tokens.refresh);
      setToken(data.tokens.access);
    }
    setUser(data.user || data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

