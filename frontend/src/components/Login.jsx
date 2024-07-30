import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import BackgroundWrapper from "./BackgroundWrapper";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://project-2-signup-login-with-auth-backend.onrender.com/api/user/login",
        formData
      );

      console.log("Login success:", response.data);
      login(response.data.userDetails);
      navigate("/home");
    } catch (error) {
      // console.error("Error during login:", error.response.data);
      setError(error.response ? error.response.data.message : error.message);
      // console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundWrapper>
      <div className="bg-[#fbf3eb] text-[#e05653] flex flex-col justify-center items-center rounded p-5 border-2 border-black shadow-custom-shadow">
        {loading && <ClipLoader color="#0000ff" loading={loading} size={50} />}
        {!loading && (
          <form
            onSubmit={handleSubmit}
            className="md:w-[400px] flex flex-col justify-evenly gap-2 pb-[10px]"
          >
            <div className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-300 p-2  rounded-sm focus:outline-none focus:border-black"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent border-b border-gray-300 p-2  rounded-sm focus:outline-none focus:border-black"
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              type="submit"
              className="bg-[#e05653] border-[3px] border-black text-black font-bold uppercase p-2 mt-5 rounded-md shadow-btn-shadow focus:shadow-none focus:translate-y-2"
            >
              Login
            </button>
          </form>
        )}

        <span className="text-center text-black ">
          Don't have an account?
          <Link to="/signup" className="text-[#e05653] pl-1">
            Sign Up
          </Link>
        </span>
      </div>
    </BackgroundWrapper>
  );
};

export default Login;
