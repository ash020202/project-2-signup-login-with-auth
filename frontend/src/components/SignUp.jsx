import React, { useContext, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BackgroundWrapper from "./BackgroundWrapper";

const Signup = ({ setActivationToken }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { error, setError } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://project-2-signup-login-with-auth-backend.onrender.com/api/user/register",
        formData
      );
      // console.log("Signup success:", response.data.activationToken);
      setActivationToken(response.data.activationToken);
      navigate("/verify");
    } catch (error) {
      // console.error("Error during signup:", error.response);
      setError(error.response ? error.response.data.message : error.message);
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
            className="md:w-[400px] flex flex-col justify-evenly gap-2 pb-[10px]"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-[100%] bg-transparent border-b border-gray-300 p-2  rounded-sm focus:outline-none focus:border-black"
              />
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
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            <button
              type="submit"
              className="bg-[#e05653] border-[3px] border-black text-black font-bold uppercase p-2 mt-5 rounded-md shadow-btn-shadow focus:shadow-none focus:translate-y-2"
            >
              Sign Up
            </button>
          </form>
        )}
        <span className="text-center text-black">
          Already have an account?
          <Link to="/login" className="text-[#e05653] pl-1">
            Login
          </Link>
        </span>
      </div>
    </BackgroundWrapper>
  );
};

export default Signup;
