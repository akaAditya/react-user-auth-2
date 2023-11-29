import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import AuthContext from "../../authStore/auth-context";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const userFullName = useRef("");
  const userProfileURL = useRef("");

  const verifyEmailIdHandler = async () => {
    try {
      const response  = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDLiJAA2nnB-WBprrLUliC8uFhlF8Wlnck`,{
        method : 'POST',
        body : JSON.stringify({
          idToken : authContext.token,
          requestType : "VERIFY_EMAIL"
        }),
        headers: {
          'Content-Type' : 'application/json',
        }
      })
      const data = response.json();
      console.log(data, 'from verification link');
    } catch {}
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const eneteredFullName = userFullName.current.value;
    const enteredProfileURL = userProfileURL.current.value;
    // setName(authContext.profile[0].displayName);
    // setPhoto(authContext.profile[0].photoUrl);

    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLiJAA2nnB-WBprrLUliC8uFhlF8Wlnck",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authContext.token,
          displayName: eneteredFullName,
          photoUrl: enteredProfileURL,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => console.log(res.json()));
  };

  // UseEffect
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDLiJAA2nnB-WBprrLUliC8uFhlF8Wlnck",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authContext.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json()).then((data)=>console.log(data))
      .then((res) => authContext.ProfileData(res.users));
  }, [authContext]);

  return (
    <div>
      <div className="profile-div">
        <div>Winners never quite, Quitters never win.</div>
        <div>
          <button onClick={verifyEmailIdHandler}>Verify Email</button>
        </div>
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
          <input type="text" id="fname" ref={userFullName} />
          <label>Profile Photo URL: </label>
          <input type="text" id="photoUrl" ref={userProfileURL} />
          <button className="btn-submit">Submit</button>
        </form>
        {/* <div>
          {name} And {photo}
        </div> */}
      </div>
      <hr />
    </div>
  );
};

export default Profile;
