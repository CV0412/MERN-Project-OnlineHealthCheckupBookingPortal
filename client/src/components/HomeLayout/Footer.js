import React from "react";
import { NavLink } from "react-router-dom";
import "./../../styles/LayoutStyles.css";

const Footer = () => {
  return (
    <div className="footer">
      <h6 className="text-center text-white">
        Copyrights &copy;
        {new Date().getFullYear()} <span className="text-danger">|</span> Online
        Health Checkup Booking Portal <span className="text-danger">|</span> All
        Right Reserved
      </h6>
      <p className="text-center mt3">
        <NavLink to="/about">About Us</NavLink>|
        <NavLink to="/contact">Contact Us</NavLink>|
        <NavLink to="/policy">Privacy & Policy</NavLink>|
        <NavLink to="/terms">Terms & Conditions</NavLink>
      </p>
    </div>
  );
};

export default Footer;
