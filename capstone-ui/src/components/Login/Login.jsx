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
    <div className="login" id="login">
      <h1>Login</h1>
      <input
        id="email"
        className="login-input"
        type="email"
        placeholder="enter a valid email"
        required
      ></input>
      <br />
      <input
        id="username"
        className="login-input"
        type="username"
        placeholder="enter a valid username"
        required
      ></input>
      <br />
      <input
        id="password"
        className="login-input"
        type="password"
        placeholder="enter a valid password"
        required
      ></input>
      <br />
      <button type="submit" className="button" onClick={onClickLogIn}>
        {" "}
        Log In{" "}
      </button>
      <p>Don't have an Account? Create one!</p>
      <button type="submit" className="button" onClick={onClickSignUp}>
        {" "}
        Sign Up{" "}
      </button>
      <p>Or Log in With Your Linkedin Account!</p>
      <LinkedinLogin />
    </div>
  );
}
