import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/SignUp";
import OtpVerification from "./components/OtpVerify";
import Login from "./components/Login";
import Home from "./components/Home";
import { AuthProvider, AuthContext } from "./context/AuthContext";

const App = () => {
  const [activationToken, setActivationToken] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/signup"
            element={<Signup setActivationToken={setActivationToken} />}
          />
          <Route
            path="/verify"
            element={<OtpVerification activationToken={activationToken} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { auth } = React.useContext(AuthContext);
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
