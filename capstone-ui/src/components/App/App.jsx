import React from "react";
import Navbar from "../../../src/components/Navbar/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Parse from "parse/dist/parse.min.js";
import About from "../About/About";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import _ from "lodash";
import Login from "../Login/Login";
import { useState } from "react";
import axios from "axios";
import SignUp from "../SignUp/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") != null
  );
  const [profileCreated, setProfileCreated] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);
  // For every network request, add a custom header for the logged in user
  // The backend API can check the header for the user id
  //
  // Note: This isn't a secure practice, but is convenient for prototyping.
  // In production, you would add an access token instead of (or in addition to)
  // the user id, in order to authenticate the request
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
    console.log(user);
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();

    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Navbar />
          <SignUp />
          <Login />
          <Header />
          <Footer />

          <Routes>
            <Route path="/header" element={<Header />} />
            <Route
              path="/register"
              element={<SignUp handleLogin={handleLogin} />}
            />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/About" element={<About />} />
            {/* <Route path="/Contact" element={<Contact />} />
            <Route path="/FAQs" element={<FAQs />} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
