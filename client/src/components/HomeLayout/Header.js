import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "./../../images/healthcheckuplogo.png";

function Header() {
  const token = localStorage.getItem("token");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info ">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand p-3">
            <img src={logo} alt="logo" style={{ width: "auto", height: 60 }} />
            &#160;&#160; ONLINE HEALTH CHECKUP BOOKING PORTAL
          </Link>
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-light">
                Home
              </NavLink>
            </li>

            {token ? (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink to="/dashboard" className="nav-link text-light">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/dashboard/apply-doctor"
                    className="nav-link text-light"
                  >
                    Apply Doctor
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link text-light">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link text-light">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
