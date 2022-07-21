import * as React from "react";
import "./SignUp.css";
import axios from "axios";
import * as config from "../../config";
import { createRef } from "react";
import LinkedinLogin from "../LinkedinLogin/LinkedinLogin";

export default function SignUp({ handleLogin, goToLogin }) {
  const username = createRef();
  const password = createRef();
  const email = createRef();
  const role = createRef();
  const skills = createRef();
  const industry = createRef();
  const location = createRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const register = async () => {
      try {
        const res = await axios.post(`${config.API_BASE_URL}/register`, {
          username: username.current.value,
          password: password.current.value,
          email: email.current.value,
          role: role.current.value,
          skills: skills.current.value,
          industry: industry.current.value,
          location: location.current.value,
        });
        goToLogin(res.data.user);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    register();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="signUp">Register</div>
        <label className="form-input">
          <span>Email:</span>
          <input type="email" ref={email}></input>
        </label>
        <label className="form-input">
          <span>Username:</span>
          <input ref={username}></input>
        </label>
        <label className="form-input">
          <span>Password:</span>
          <input type="password" ref={password}></input>
        </label>
        <label className="form-input">
          Choose a role:
          <select name="role" id="role" ref={role}>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </label>
        <label className="form-input">
          <span>Skills:</span>
          <input ref={skills}></input>
        </label>
        <label className="form-input">
          Choose your area of interest:
          <select name="role" id="role" ref={industry}>
            <option value="Engineering">Engineering</option>
            <option value="Data">Data</option>
            <option value="Product Management">Product Management</option>
            <option value="UI/IX">UI/UX</option>
          </select>
        </label>
        <label className="form-input">
          Share Your Location :<input type="location" ref={location}></input>
        </label>
        <button type="submit" className="button">
          Register
        </button>
      </form>
      <LinkedinLogin />
      <p>
        Already Have an Account?{" "}
        <button className="button" type="submit" onClick={goToLogin}>
          Log In
        </button>
      </p>
    </div>
  );
}
