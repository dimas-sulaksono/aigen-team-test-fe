import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <section
      className="bg-gray-50 "
      style={{
        backgroundImage: "url('/academy.jpeg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center px-5 py-8 mx-auto md:h-screen lg:py-0 bg-opacity-50 backdrop-blur-xs">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
