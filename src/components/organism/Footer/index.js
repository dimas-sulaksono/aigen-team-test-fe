import React from "react";
import { FaQuestionCircle, FaShieldAlt, FaFileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          © 2025 EduPay. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaQuestionCircle className="mr-1" />
            <span className="text-sm">Help</span>
          </a>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaShieldAlt className="mr-1" />
            <span className="text-sm">Privacy</span>
          </a>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaFileAlt className="mr-1" />
            <span className="text-sm">Terms</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
