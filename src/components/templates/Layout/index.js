import Footer from "@/components/organism/Footer";
import Navbar from "@/components/organism/Navbar";
import React from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const hideNavbar = useSelector((state) => state.navbar.hideNavbar);
  return (
    <div className="min-h-svh flex flex-col">
      {!hideNavbar && <Navbar />}
      <div className="flex-grow flex flex-col">
        {children}
      </div>
      {!hideNavbar && <Footer />}
    </div>
  );
};

export default Layout;
