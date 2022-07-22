import * as React from "react";
import "./Login.css";
import axios from "axios";
import * as config from "../../config";
import { useEffect } from "react";

export default function Login({ handleLogin, goToProfile }) {
  const username = React.createRef();
  const password = React.createRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = async () => {
      try {
        console.log("Logging in");
        const res = await axios.post(`${config.API_BASE_URL}/login`, {
          username: username.current.value,
          password: password.current.value,
        });
        console.log("username: ", username.current.value);
        handleLogin(res.data.user);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    login();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="login">Login</div>
        <label className="form-input" id="username">
          <span>Username</span>
          <input ref={username}></input>
        </label>
        <label className="form-input" id="password">
          <span>Password</span>
          <input type="password" ref={password}></input>
        </label>
        <button type="submit" className="button" onClick={goToProfile}>
          Login
        </button>
      </form>
    </div>
  );
}
