import * as React from "react";
import "./SignUp.css";
import axios from "axios";
import * as config from "../../config";
import LinkedinLogin from "../LinkedinLogin/LinkedinLogin";

export default function SignUp({ handleLogin, goToLogin }) {
  const username = React.createRef();
  const password = React.createRef();
  const email = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const register = async () => {
      try {
        const res = await axios.post(`${config.API_BASE_URL}/register`, {
          username: username.current.value,
          password: password.current.value,
          email: email.current.value,
        });
        handleLogin(res.data.user);
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
          <span>Email</span>
          <input type="email" ref={email}></input>
        </label>
        <label className="form-input">
          <span>Username</span>
          <input ref={username}></input>
        </label>
        <label className="form-input">
          <span>Password</span>
          <input type="password" ref={password}></input>
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
