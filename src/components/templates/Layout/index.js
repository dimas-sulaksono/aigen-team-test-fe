import Footer from "@/components/organism/Footer";
import Navbar from "@/components/organism/Navbar";
import React from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const hideNavbar = useSelector((state) => state.navbar.hideNavbar);
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
};

export default Layout;
