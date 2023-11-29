import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import iconImg from "../../assets/iconImg.png";
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
            <img src={iconImg} alt="icon" className="icon" />
          </Link>
        </div>
        <div className="headers">
          <div className="home">
            <Link to="/home" style={{textDecoration: 'none', color:'#fff'}}>Home</Link>
          </div>
          <div className="expenses">
            <Link to="/expense" style={{textDecoration: 'none', color:'#fff'}}>Expense</Link>
          </div>
          <div className="about">
            <Link to="/aboutUs" style={{textDecoration: 'none', color:'#fff'}}>About-Us</Link>
          </div>
          <div className="auth">
            <Link to="/auth" style={{textDecoration: 'none', color:'#fff'}}>Register</Link>
          </div>
          <div>
            <button className="btn-logout" onClick={logoutHandler}>
            <Link to='/auth' style={{textDecoration: 'none', color:'#fff'}}>Sign Out</Link>
              
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
