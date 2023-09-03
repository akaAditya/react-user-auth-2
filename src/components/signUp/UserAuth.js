import React, {  useRef, useState } from "react";
import "./UserAuth.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const UserAuth = () => {
  const [haveAccount, setHaveAccount] = useState(false);
  const history = useHistory();
  // const authContext = useContext(AuthContext);
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const dispatch = useDispatch();

  const userAuthHandler = () => {
    setHaveAccount((prev) => !prev);
  };

  const userForgotPasswordHandler = async () => {
    const fetchEmailInput = emailInput.current.value;
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDLiJAA2nnB-WBprrLUliC8uFhlF8Wlnck",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: fetchEmailInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res)=>console.log(res.json())).catch((err)=>console.log('EMAIL_NOT_FOUND', err));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const eneteredEmail = emailInput.current.value;
    const eneteredPassword = passwordInput.current.value;

    try {
      if (
        haveAccount &&
        eneteredPassword === confirmPasswordInput.current.value
      ) {
        await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLiJAA2nnB-WBprrLUliC8uFhlF8Wlnck`,
          {
            method: "POST",
            body: JSON.stringify({
              email: eneteredEmail,
              password: eneteredPassword,
              confirmPassword: confirmPasswordInput.current.value,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        throw new Error("Something went wrong, try again");
      } else if (!haveAccount) {
        await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLiJAA2nnB-WBprrLUliC8uFhlF8Wlnck`,
          {
            method: "POST",
            body: JSON.stringify({
              email: eneteredEmail,
              password: eneteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              let errorMessage = "Username or Password is incorrect";
              throw new Error(errorMessage);
            }
          })
          .then((data) => {
            // authContext.Login(data.idToken);
            // authContext.LocalID(data.localId);
            dispatch(authActions.login(data.idToken))
            history.replace("/home");
          })
          .catch((err) => err);
      } else {
        alert("password is not matched");
      }
    } catch {}
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="div-container">
          <form className="form" onSubmit={submitHandler}>
            <h1 style={{ color: "orangered" }}>
              {haveAccount ? "Sign Up" : "Login"}
            </h1>
            <div className="email-psw">
              <label className="email-label">Email</label>
              <input
                type="text"
                id="email-input"
                name="email"
                placeholder="your email"
                ref={emailInput}
                required
              />
              <br />
              <label className="password-label">Password</label>
              <input
                type="password"
                id="password-input"
                name="password-input"
                placeholder="your password"
                ref={passwordInput}
                
              />

              <br />
              {haveAccount && (
                <div className="confirm-psw-div">
                  <label className="password-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password-input"
                    name="password"
                    placeholder="confirm password"
                    ref={confirmPasswordInput}
                  />
                </div>
              )}
            </div>
            <br />
            <button className="btn-submit-form">
              {!haveAccount ? "Sign In" : "Sign Up"}
            </button>
            <div className="signIn">
              {haveAccount
                ? "Already have account?   "
                : "Don't have an account?   "}
              <button className="btn-change-form" onClick={userAuthHandler}>
                {!haveAccount ? "Sign Up" : "Sign In"}
              </button>
            </div>
            <div>
              <button
                className="btn-forgot-pass"
                onClick={userForgotPasswordHandler}
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserAuth;
