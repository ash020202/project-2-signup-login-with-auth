import React, { useContext, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import BackgroundWrapper from "./BackgroundWrapper";
import { AuthContext } from "../context/AuthContext";

const OtpVerify = ({ activationToken }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { error, setError } = useContext(AuthContext);
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/verify",
        { otp, activationToken }
      );
      setError(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error during verification:", error.response.data);
      setError(error.response.data.message);
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
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={otp}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-300 p-2  rounded-sm focus:outline-none focus:border-black"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-[#e05653] border-[3px] border-black text-black font-bold uppercase p-2 mt-5 rounded-md shadow-btn-shadow focus:shadow-none focus:translate-y-2"
            >
              Verify OTP
            </button>
          </form>
        )}

        <span className="text-center text-black ">
          Facing issues?
          <Link to="/signup" className="text-[#e05653] pl-1">
            Sign Up Again
          </Link>
        </span>
      </div>
    </BackgroundWrapper>
  );
};

export default OtpVerify;
