import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
  const [error, setError] = useState(null);
  const login = (userData) => {
    setAuth({ isAuthenticated: true, user: userData });
  };
  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
