// src/components/Home.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { auth, logout } = useContext(AuthContext);
  //   console.log(auth);
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center">
      <h1 className="text-3xl">Welcome, {auth.user.name}</h1>
      <p>Email: {auth.user.email}</p>
      <button
        onClick={logout}
        className="bg-[#e05653] border-[3px] border-black text-black font-bold uppercase p-2 mt-5 rounded-md shadow-btn-shadow focus:shadow-none focus:translate-y-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
