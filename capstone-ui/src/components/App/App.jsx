import React from "react";
import Navbar from "../../../src/components/Navbar/Navbar";
import Header from "../Header/Header";
import About from "../About/About";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import _ from "lodash";
import Login from "../Login/Login";
import { useState } from "react";
import axios from "axios";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";
import Faqs from "../FAQs/FAQs";
import SuccesStories from "../SuccessStories/SuccessStories";
import ProfileCard from "../ProfileCard/ProfileCard";

function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") != null
  );

  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id");
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        current_user_id: currentUserId,
      };
    }
  };
  addAuthenticationHeader();

  const handleLogout = () => {
    localStorage.removeItem("current_user_id");
    axios.defaults.headers.common = {};
    setIsLoggedIn(false);
  };

  const handleLogin = (user) => {
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();
    setIsLoggedIn(true);
    setUserInfo(user);
    console.log("name", user.username);
  };

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="App">
      <main>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        {isLoggedIn && <ProfileCard />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/header" element={<Header />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/about"
            element={
              <>
                <About isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              </>
            }
          />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/successStories" element={<SuccesStories />} />

          <Route
            path="/register"
            element={<SignUp handleLogin={handleLogin} goToLogin={goToLogin} />}
          />

          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
