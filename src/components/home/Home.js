import React from "react";
import { Link } from "react-router-dom";
import './Home.css'
const Home = () => {
  return (
    <div>
      <div className="home-div">
        <div>Welcome to my Expense Tracker</div>
        <div className="profile-heading">
          Your Profile is incomplete. <Link to="/profile">Complete Now</Link>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Home;
