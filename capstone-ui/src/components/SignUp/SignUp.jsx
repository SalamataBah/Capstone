import * as React from "react";
import "./SignUp.css";
import axios from "axios";
import * as config from "../../config";
import { createRef } from "react";
import LinkedinLogin from "../LinkedinLogin/LinkedinLogin";
import Loading from "../Loading/Loading";

export default function SignUp({ onClickLogIn, onClickSignUp, isLoading }) {
  return (
    <div className="signUp" id="sign-up">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <h1> Register An Account</h1>
          <input
            id="email"
            className="sign-input"
            type="email"
            placeholder="enter a valid email"
            required
          ></input>
          <br />
          <input
            id="username"
            className="sign-input"
            type="username"
            placeholder="enter a valid username"
            required
          ></input>
          <br />
          <input
            id="password"
            className="sign-input"
            type="password"
            placeholder="enter a valid password"
            required
          ></input>
          <br />
          <input
            id="confirm-password"
            className="sign-input"
            type="password"
            placeholder="confirm password"
            required
          ></input>
          <br />
          <button type="submit" className="button" onClick={onClickSignUp}>
            {" "}
            Register{" "}
          </button>

          <p> Already registered an Account? </p>
          <button type="submit" className="button" onClick={onClickLogIn}>
            {" "}
            Login{" "}
          </button>
          <p> Prefer to Sign Up With LinkedIn? </p>
          <LinkedinLogin />
        </div>
      )}
    </div>
  );
}
