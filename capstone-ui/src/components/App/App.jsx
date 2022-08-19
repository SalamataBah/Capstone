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
import Contact from "../Contact/Contact";
import SuccesStories from "../SuccessStories/SuccessStories";
import ProfileCard from "../Profile/ProfileCard/ProfileCard";
import * as config from "../../config";
import ProfileEdit from "../Profile/ProfileEdit/ProfileEdit";
import Interests from "../Profile/Interests/Interests";
import InterestEdit from "../Profile/InterestEdit/InterestEdit";
import Match from "../Match/Match";
import SearchPage from "../SearchPage/SearchPage";
import CurrentLocation from "../Maps/currentLocation";
import Maps from "../Maps/test/marker";
import { useMapContext } from "../../contexts/MapContext";
import FavoriteMatch from "../FavoriteMatch/FavoriteMatch";

function App() {
  const navigate = useNavigate();
  const { getLocation } = useMapContext();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userInfo") != null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  console.log("userInfo: ", userInfo);

  const [skillsJson, setSkillsJson] = useState("");
  const [newSkill, setNewSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [company, setCompany] = useState("");
  const [language, setLanguage] = useState("");

  const handleResults = (results) => {
    console.log("My location: ", results);
    <div className="card">{results[0].formatted_address} </div>;
  };

  const onError = (type, status) => console.log(type, status);

  function getCompany() {
    const companyValue = document.getElementById("add-company");
    const companyInput = companyValue?.value || "";
    setCompany(companyInput);
  }

  function removeCompany(company) {
    setIsLoading(true);
    axios
      .post(`${config.API_BASE_URL}/profile/interests/remove`, {
        companies: company,
      })
      .then(function () {
        getInterests();
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }

  function getLanguage() {
    const langValue = document.getElementById("add-language");
    const langInput = langValue?.value || "";
    setLanguage(langInput);
  }

  function removeLanguage(language) {
    setIsLoading(true);
    axios
      .post(`${config.API_BASE_URL}/profile/interests/remove`, {
        language: language,
      })
      .then(function () {
        getInterests();
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }

  const [matches, setMatches] = useState([]);
  const [offset, setOffset] = useState(0);
  const matchLimit = 2;
  const [fetchMatch, setFetchMatch] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userInfo") && userInfo?.interests) {
      if (matches.length === 0 && !fetchMatch) {
        createMatch({});
      }
      getMatches(matchLimit + offset, 0);
    }
  }, [userInfo]);

  useEffect(() => {
    setIsLoading(true);
    if (window.performance) {
      if (
        window.localStorage.getItem("userInfo") &&
        !userInfo &&
        String(window.performance.getEntriesByType("navigation")[0].type) ===
          "reload"
      ) {
        refreshPage();
      }
    }
    setIsLoading(false);
  }, []);

  const goToMatch = () => {
    if (matches.length === 0) {
      getMatches(matchLimit, 0);
      createMatch({});
    }
    navigate("/profile/match");
  };

  const goToSearch = () => {
    navigate("/profile/search");
  };

  async function getMatches(limit, offset) {
    await axios
      .get(`${config.API_BASE_URL}/matches`, {
        params: {
          limit: limit,
          offset: offset,
        },
      })
      .then((response) => {
        if (response.data.typeStatus == "success") {
          if (offset == 0) {
            setMatches(response.data.matchesInfo);
          } else if (
            matches.length >= matchLimit &&
            response.data.matchesInfo[0] &&
            !matches.includes(response.data.matchesInfo[0])
          ) {
            let newMatches = matches.concat(response.data.matchesInfo);
            setMatches(newMatches);
          }
        }
      });
  }

  async function createMatch(params) {
    setFetchMatch(true);
    if (userInfo && userInfo != 0) {
      await axios
        .post(`${config.API_BASE_URL}/matches`, {
          params: params,
        })
        .then(function (response) {
          console.log("response: ", response);
        })
        .catch(function (error) {
          console.log("error: ", error);
        });
    }
    setFetchMatch(false);
  }
  function refreshPage() {
    setIsLoading(true);
    const loggedUser = window.localStorage.getItem("userInfo");
    if (loggedUser) {
      const currUser = JSON.parse(loggedUser);
      axios
        .post(`${config.API_BASE_URL}/login`, {
          email: currUser.email,
          username: currUser.username,
          password: currUser.password,
        })
        .then(function (response) {
          setUserInfo(response.data.userInfo);
          setMatches([]);
          setTimeout(getInterests, 300);
          getMatches(matchLimit, 0);
          setTimeout(!isLoading, 1000);
        })
        .catch(function (error) {
          console.log("error: ", error);
        });
    }
  }
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
        if (response.data.typeStatus == "danger") {
          alert("Error with logging in !");
          navigate("/login");
        } else {
          window.localStorage.setItem(
            "sessionToken",
            response.data.sessionToken
          );
          getLocation();
          setUserInfo(response.data.userInfo);
          console.log("response: ", response);
          // window.localStorage.setItem(
          //   "userInfo",
          //   JSON.stringify({
          //     objectId: response.data.userInfo.objectId,
          //     email: email,
          //     password: password,
          //   })
          // );
          setMatches([]);
          setSelectedSkill(null);
          setOffset(0);
          navigate("/profile");
        }
        setIsLoading(false);
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
        window.localStorage.clear();
        navigate("/login");
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
      .then(function () {
        setMatches([]);
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

  const goToEditInterests = () => {
    setLanguage("");
    navigate("/profile/interests/edit");
  };
  const saveInfo = async () => {
    setIsLoading(true);
    let roles = [];
    if (userInfo.roles) {
      roles = userInfo.roles;
    }
    roles.push(document.getElementById("roles").value);

    await axios
      .post(`${config.API_BASE_URL}/profile`, {
        major: document.getElementById("major").value,
        bio: document.getElementById("bio").value,
        location: document.getElementById("location").value,
        roles: roles,
      })
      .then(function (response) {
        setUserInfo(response.data.userInfo);
        navigate("/profile");
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async function getInterests() {
    await axios
      .get(`${config.API_BASE_URL}/profile/interests`)
      .then((response) => {
        if (userInfo) {
          setSkillsJson(response.data.skillsJson);
          setCompany(response.data.company);
          setIsLoading(false);
          setUserInfo({
            ...userInfo,
            interests: {
              languages: response.data.languages,
              skills: response.data.skills,
              companies: response.data.companies,
            },
          });
          setIsLoading(false);
        } else if (response.data.typeStatus == "danger") {
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const saveInterests = () => {
    setIsLoading(true);
    axios
      .post(`${config.API_BASE_URL}/profile/interests`, {
        interests: {
          languages: language,
          companies: company,
          skills: selectedSkill
            ? selectedSkill.value
            : newSkill
            ? newSkill
            : null,
        },
      })
      .then(function () {
        getInterests();
        navigate("/profile/interests");
        setLanguage("");
        setCompany("");
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function addSkill(category, index) {
    if (document.getElementById("add-skill")) {
      setNewSkill({
        name: document.getElementById("add-skill").value,
        category: category,
        index: index,
      });
    }
  }

  function removeSkill(skills) {
    setIsLoading(true);
    axios
      .post(`${config.API_BASE_URL}/profile/interests/remove`, {
        skills: skills,
      })
      .then(function () {
        getInterests();
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
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
    if (!userInfo.interests && !isLoading) {
      getInterests();
    }
    navigate("/profile/interests");
  };

  const goToEditInfo = () => {
    navigate("/profile/edit");
  };

  const goToMap = () => {
    navigate("/location");
  };
  const goToLiked = () => {
    getMatches(10, 0);
    navigate("/favorite");
  };
  return (
    <div className="App">
      <main>
        <Navbar isLoggedIn={isLoggedIn} onClickLogOut={handleLogout} />
        {/* <Navbar isLoggedIn={isLoggedIn} onClickLogOut={handleLogout} /> */}

        {/* {isLoggedIn && (
          <ProfileEdit userInfo={userInfo} onClickLogOut={handleLogout} />
        )} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/header" element={<Header />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
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
              <ProfileEdit
                userInfo={userInfo}
                onClickInterests={goToInterests}
                isLoading={isLoading}
                goToEditInfo={goToEditInfo}
                setUserInfo={setUserInfo}
                onClickMatch={goToMatch}
                onClickSearch={goToSearch}
                onClickMap={goToMap}
                onClickFav={goToLiked}
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
                saveInfo={saveInfo}
              />
            }
          />
          <Route
            path="/profile/interests"
            element={
              <Interests
                userInfo={userInfo}
                isLoading={isLoading}
                onClickProfile={goToProfile}
                onEditInterests={goToEditInterests}
              />
            }
          />
          <Route
            path="/favorite"
            element={
              <FavoriteMatch
                isLoading={isLoading}
                matches={matches}
                getMatches={getMatches}
                createMatch={createMatch}
                goToLiked={goToLiked}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/profile/interests/edit"
            element={
              <InterestEdit
                userInfo={userInfo}
                isLoading={isLoading}
                onClickProfile={goToProfile}
                saveInterests={saveInterests}
                skillsJson={skillsJson}
                company={company}
                getCompany={getCompany}
                removeCompany={removeCompany}
                addSkill={addSkill}
                removeSkill={removeSkill}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
                language={language}
                getLanguage={getLanguage}
                removeLanguage={removeLanguage}
              />
            }
          />
          <Route
            path="/profile/match"
            element={
              <Match
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                matches={matches}
                getMatches={getMatches}
                offset={offset}
                setOffset={setOffset}
                matchLimit={matchLimit}
                goToMatch={goToMatch}
                createMatch={createMatch}
              />
            }
          />
          <Route path="/profile/search" element={<SearchPage />} />
          <Route
            path="/location"
            element={
              <div>
                <CurrentLocation
                  onFetchAddress={handleResults}
                  onError={onError}
                >
                  {({ getCurrentLocation, loading }) => (
                    <p
                      className="button"
                      onClick={getCurrentLocation}
                      disabled={loading}
                    >
                      Find Match on Map
                    </p>
                  )}
                </CurrentLocation>
                <Maps userInfo={userInfo} />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
