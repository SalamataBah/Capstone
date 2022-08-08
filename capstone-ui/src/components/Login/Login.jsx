import * as React from "react";
import "./Login.css";
import axios from "axios";
import * as config from "../../config";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import LinkedinLogin from "../LinkedinLogin/LinkedinLogin";

export default function Login({ onClickLogIn, onClickSignUp, isLoading }) {
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="loginForm">
      <div className="heading" id="login">
        <h2>Login Into Your Account</h2>
      </div>
      <div className="login-input">
        <input
          id="email"
          className="input-values"
          type="email"
          placeholder="enter a valid email"
          required
        ></input>
      </div>
      <div className="login-input">
        <input
          id="username"
          className="input-values"
          type="username"
          placeholder="enter a valid username"
          required
        ></input>
      </div>
      <div className="login-input">
        <input
          id="password"
          className="input-values"
          type="password"
          placeholder="enter a valid password"
          required
        ></input>
      </div>
      <div className="heading">
        <button type="submit" className="loginbutton" onClick={onClickLogIn}>
          {" "}
          Log In{" "}
        </button>
        <p>Don't have an Account? Create one!</p>
        <button type="submit" className="loginbutton" onClick={onClickSignUp}>
          {" "}
          Sign Up{" "}
        </button>

        <p>Or Log in With Your Linkedin Account!</p>
        <LinkedinLogin />
      </div>
    </div>
  );
}
