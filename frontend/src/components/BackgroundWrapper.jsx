import React from "react";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="bg-[#e05653] w-[100dvw] h-[100dvh] text-white flex flex-col-reverse justify-end gap-5  md:flex-row md:justify-evenly items-center p-[30px]">
      <div className="  flex flex-col items-center justify-center text-black">
        <p className="text-4xl font-bold ">Welcome </p>
        <p className="text-xl pb-[8px]">We are glad to have you here</p>
        {children}
      </div>
      <div>
        <img
          className="md:w-[500px]  md:mt-[80px] rounded-md bg-cover bg-no-repeat bg-center"
          src="/login-bg.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default BackgroundWrapper;
