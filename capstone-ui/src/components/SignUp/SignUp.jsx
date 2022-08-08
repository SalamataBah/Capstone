import * as React from "react";
import "./SignUp.css";
import axios from "axios";
import * as config from "../../config";
import { createRef } from "react";
import LinkedinLogin from "../LinkedinLogin/LinkedinLogin";
import Loading from "../Loading/Loading";

export default function SignUp({ onClickLogIn, onClickSignUp, isLoading }) {
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="submitFormCont">
      <form className="submitForm">
        <div className="signupHeading">
          <h2> Register An Account</h2>
        </div>

        <div className="inputCont">
          <input
            id="email"
            className="sign-input"
            type="email"
            placeholder="enter a valid email"
            required
          ></input>
        </div>

        <div className="inputCont">
          <input
            id="username"
            className="sign-input"
            type="username"
            placeholder="enter a valid username"
            required
          ></input>
        </div>

        <div className="inputCont">
          <input
            id="password"
            className="sign-input"
            type="password"
            placeholder="enter a valid password"
            required
          ></input>
        </div>

        <div className="inputCont">
          <input
            id="confirm-password"
            className="sign-input"
            type="password"
            placeholder="confirm password"
            required
          ></input>
        </div>

        <button type="submit" className="SignUpbutton" onClick={onClickSignUp}>
          {" "}
          Register{" "}
        </button>

        <p> Already registered an Account? </p>
        <button type="submit" className="SignUpbutton" onClick={onClickLogIn}>
          {" "}
          Login{" "}
        </button>
      </form>
      <p> Prefer to Sign Up With LinkedIn? </p>
      <LinkedinLogin />
    </div>
  );
}
