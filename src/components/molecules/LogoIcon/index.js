import Logo from "@/components/atoms/Icons/Logo";
import React from "react";
import { FaGraduationCap } from "react-icons/fa6";

const LogoIcon = ({ size }) => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <FaGraduationCap size={size} className="text-gray-700" />
      <Logo />
    </div>
  );
};

export default LogoIcon;
