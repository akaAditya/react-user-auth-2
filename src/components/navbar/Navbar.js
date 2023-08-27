import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import iconImage from "F:/ReactJS/user-authentication-part-2/src/assets/iconImg.png";
import AuthContext from "../../authStore/auth-context";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <nav className="nav">
        <div>
          <Link to="/">
            <img src={iconImage} alt="icon" className="icon" />
          </Link>
        </div>
        <div className="headers">
          <div className="home">
            <Link to="/">Home</Link>
          </div>
          <div className="product">
            <Link to="/products">Products</Link>
          </div>
          <div className="about">
            <Link to="/aboutUs">About-Us</Link>
          </div>
          <div className="auth">
            <Link to="/auth">Register</Link>
          </div>
          <div>
            <button className="btn-logout" onClick={()=> authContext.Logout()}>
              Sign Out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
