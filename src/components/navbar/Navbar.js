import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import iconImage from "F:/ReactJS/user-authentication-part-2/src/assets/iconImg.png";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import AuthContext from "../../authStore/auth-context";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
    authContext.Logout()

  };
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
            <Link to="/home">Home</Link>
          </div>
          <div className="expenses">
            <Link to="/expense">Expense</Link>
          </div>
          <div className="about">
            <Link to="/aboutUs">About-Us</Link>
          </div>
          <div className="auth">
            <Link to="/auth">Register</Link>
          </div>
          <div>
            <button className="btn-logout" onClick={logoutHandler}>
            <Link to='/auth'>Sign Out</Link>
              
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
