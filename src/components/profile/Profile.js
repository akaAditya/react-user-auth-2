import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const userFullName = useRef();
    const userProfileURL = useRef();
    const formSubmitHandler = async (event)=>{
        event.preventDefault()
        const eneteredFullName = userFullName.current.value;
        const enteredProfileURL = userProfileURL.current.value;

        await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCedCWGFgq0burWoy-SLWzy8D-H-FOQADU',{
            method: 'POST',
            body : JSON.stringify({
                fullName : eneteredFullName,
                profileURL : enteredProfileURL,
                returnSecureToken : true
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res=>console.log(res.json()))
        console.log('Details submitted successfully')
    }
  return (
    <div>
      <div className="profile-div">
        <div>Winners never quite, Quitters never win.</div>

        <div className="profile-heading">
          Your profile is 64% completed. A complete Profile has higher chances
          of landing a job. <Link to="/profile">Complete Now</Link>
        </div>
      </div>
      <hr />
      <div className="contact-div">
        <div className="contact-heading">
          <h3>Contact Details</h3>
          <button className="btn-cancel">Cancel</button>
        </div>
        <form onSubmit={formSubmitHandler}>
          <label>Full Name: </label>
          <input type="text" ref={userFullName}/>
          <label>Profile Photo URL: </label>
          <input type="text" ref={userProfileURL}/>
          <button className="btn-submit">Submit</button>
        </form>
      </div>
      <hr />
    </div>
  );
};

export default Profile;
