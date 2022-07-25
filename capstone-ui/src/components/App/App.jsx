import React from "react";
import Navbar from "../../../src/components/Navbar/Navbar";
import Header from "../Header/Header";
import About from "../About/About";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import _ from "lodash";
import Login from "../Login/Login";
import { useState, useEffect } from "react";
import axios from "axios";
import SignUp from "../SignUp/SignUp";
import Home from "../Home/Home";
import Faqs from "../FAQs/FAQs";
import SuccesStories from "../SuccessStories/SuccessStories";
import ProfileCard from "../ProfileCard/ProfileCard";
import * as config from "../../config";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userInfo") != null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const handleLoginParse = async () => {
    window.localStorage.clear();
    setIsLoading(true);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await axios
      .post(`${config.API_BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data.typeStatus == "error") {
          alert("Error with logging in !");
          navigate("/login");
        } else {
          setUserInfo(response.data.userInfo);
          console.log("response: ", response);
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify({
              objectId: response.data.userInfo.objectId,
              email: email,
              password: password,
            })
          );
          navigate("profile");
        }
        setIsLoading(false);
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
        window.localStorage.clear();
        setIsLoading(false);
      });
  };

  const handleSignUpParse = async () => {
    if (
      document.getElementById("password").value !==
      document.getElementById("confirm-password").value
    ) {
      alert("Password must be the same!");
    } else {
      setIsLoading(true);
      await axios
        .post(`${config.API_BASE_URL}/register`, {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          username: document.getElementById("username").value,
        })
        .then(function (response) {
          console.log("response: ", response);
          if (response.data.typeStatus === "success") {
            navigate("/login");
          }
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleLogout = async () => {
    await axios
      .post(`${config.API_BASE_URL}/logout`, {})
      .then(function (response) {
        setUserInfo("");
        window.localStorage.clear();
        navigate("/home");
        setIsLoading(false);
        setIsLoggedIn(false);
      })
      .catch(function (error) {
        window.localStorage.clear();
        console.log(error);
      });
  };

  async function getInterests() {
    await axios
      .get(`${config.API_BASE_URL}/profile/interests`)
      .then((response) => {
        if (response.data.skills && userInfo) {
          setIsLoading(false);
          setUserInfo({
            ...userInfo,
            interests: {
              skills: response.data.skills,
            },
          });
          setIsLoading(false);
        } else if (response.data.typeStatus == "danger") {
          setIsLoading(false);
        }
      });
  }
  const goToLogin = () => {
    navigate("/login");
  };
  const goToSignUp = () => {
    navigate("/register");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToInterests = () => {
    if (!userInfo.interests) {
      setTimeout(getInterests, 500);
    }
    navigate("/profile/interests");
  };

  const goToEditInfo = () => {
    navigate("/profile/edit");
  };
  return (
    <div className="App">
      <main>
        <Navbar isLoggedIn={isLoggedIn} onClickLogOut={handleLogout} />

        {/* {isLoggedIn && (
          <ProfileCard userInfo={userInfo} onClickLogOut={handleLogout} />
        )} */}
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
            element={
              <SignUp
                onClickSignUp={handleSignUpParse}
                onClickLogIn={goToLogin}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/login"
            element={
              <Login
                onClickLogIn={handleLoginParse}
                isLoading={isLoading}
                onClickSignUp={goToSignUp}
              />
            }
          />
          <Route
            path="/logout"
            element={
              <Login
                onClickLogIn={handleLoginParse}
                isLoading={isLoading}
                onClickSignUp={goToSignUp}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileCard
                userInfo={userInfo}
                onClickInterests={goToInterests}
                isLoading={isLoading}
                goToEditInfo={goToEditInfo}
              />
            }
          />
          <Route
            path="/profile/interests"
            element={
              <ProfileCard
                userInfo={userInfo}
                onClickInterests={goToInterests}
                isLoading={isLoading}
                goToEditInfo={goToEditInfo}
              />
            }
          />
          <Route
            path="/profile/edit/"
            element={
              <ProfileCard
                userInfo={userInfo}
                onClickInterests={goToInterests}
                isLoading={isLoading}
                goToEditInfo={goToEditInfo}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
