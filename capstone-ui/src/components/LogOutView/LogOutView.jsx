import * as React from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import "./LoggedOutView";

export default function LoggedOutView({ handleLogin }) {
  return (
    <div>
      <Login handleLogin={handleLogin} />
      <SignUp handleLogin={handleLogin} />
    </div>
  );
}
