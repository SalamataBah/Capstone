import * as React from "react";
import "./Login.css";
import axios from "axios";
import * as config from "../../config";

export default function Login({ handleLogin }) {
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
        console.log("res.data.user: ", res.data.user.username);
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
        <label className="form-input">
          <span>Username</span>
          <input ref={username}></input>
        </label>
        <label className="form-input">
          <span>Password</span>
          <input type="password" ref={password}></input>
        </label>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
}
