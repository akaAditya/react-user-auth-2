import React, { useRef } from "react";
import "./SignUp.css";
const SignUp = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const eneteredEmail = emailInput.current.value;
    const eneteredPassword = passwordInput.current.value;
    const eneteredConfirmPassword = confirmPasswordInput.current.value;
    try {
      if (eneteredPassword === eneteredConfirmPassword) {
        await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCedCWGFgq0burWoy-SLWzy8D-H-FOQADU`,
          {
            method: "POST",
            body: JSON.stringify({
              email: eneteredEmail,
              password: eneteredPassword,
              confirmPassword: eneteredConfirmPassword,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Successfully user account created");

        throw new Error("Something went wrong, try again");
      } else {
        alert("password is not matched");
      }
    } catch {}
  };

  return (
    <React.Fragment>
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
          <label>Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="your email"
            ref={emailInput}
            required
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="your password"
            ref={passwordInput}
            required
          />
          <br />
          <label>Confirm Password</label>
          <input
            type="password"
            name="password"
            placeholder="confirm password"
            ref={confirmPasswordInput}
            required
          />
          <br />
          <button>Sign Up</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
