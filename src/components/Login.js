import { useState, useEffect } from "react";
import fire from "../config/Firebase";
import "../styles/Login.css";
import NavBar from "./Navbar";
function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogIn,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;
  
  return (
    <>
    <section className="header">
        <NavBar />
      </section>
    <section className="login">
      <div className="login-container">
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btn-container">
          {hasAccount ? (
            <>
              <button className="login-btn" onClick={handleLogIn}>
                Sign in
              </button>
              <p>
                Don't have an account ?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={handleSignUp}>
                Sign up
              </button>
              <p>
                Have an account ?{" "}
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
    </>
  );
}

export default Login;
