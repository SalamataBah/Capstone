import React from "react";
import "./SearchPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import * as config from "../../config";
import { DebounceInput } from "react-debounce-input";
import MentorCard from "./MentorCard/MentorCard";
import Chat from "../Chat/Chat";
import io from "socket.io-client";
import Cookies from "js-cookie";

const socket = io.connect("http://localhost:3001");

export default function SearchPage(isLoading) {
  const [mentors, setMentors] = useState([]);
  console.log("mentors: ", mentors);
  const [searchVal, setSearchVal] = useState("");
  console.log("searchVal: ", searchVal);

  //Chat
  const [openChat, setOpenChat] = useState(false);
  const userId = localStorage.getItem("userInfo");
  // const userId = Cookies.get("objectId");
  console.log("userId: ", userId);
  const appRoom = "m&m";

  const joinChat = (e) => {
    e.preventDefault();
    if (userId == null) {
      socket.emit("join_room", appRoom);
    }
    setOpenChat(true);
  };

  const searching = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/allUsers/${searchVal}`).then((result) => {
      console.log("result: ", result.data.allUsersInterests);
      setMentors(result.data.allUsersInterests);
    });
  }, [searchVal]);

  // filters
  // dropdown States
  const [skillsDD, setSkillsDD] = useState(false);
  const [industryDD, setIndustryDD] = useState(false);
  const [professionDD, setProfessionDD] = useState(false);
  const [companyDD, setCompanyDD] = useState(false);
  const [languageDD, setLanguageDD] = useState(false);

  // filter array states

  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [profession, setProfession] = useState([]);
  const [company, setCompany] = useState([]);
  const [language, setLanguage] = useState([]);

  //dropdown Handlers

  const handleSkills = (e) => {
    setSearchVal(e.target.value);
    setSkills([...skills, e.target.value]);
  };
  const handleIndustry = (e) => {
    setSearchVal(e.target.value);
    setIndustry([...industry, e.target.value]);
  };
  const handleProfession = (e) => {
    setSearchVal(e.target.value);
    setProfession([...profession, e.target.value]);
  };
  const handleCompany = (e) => {
    setSearchVal(e.target.value);
    setCompany([...company, e.target.value]);
  };

  const handleLanguage = (e) => {
    setSearchVal(e.target.value);
    setLanguage([...language, e.target.value]);
  };

  const ClearFilters = () => {
    setSearchVal("");
    setSkills([]);
    setIndustry([]);
    setProfession([]);
    setCompany([]);
    setLanguage([]);
    setSkillsDD(false);
    setIndustryDD(false);
    setProfessionDD(false);
    setCompanyDD(false);
    setLanguageDD(false);
  };

  return (
    <div className="main">
      <div className="search-bar">
        <h1>Find a Match By Search</h1>
        <div className="search">
          <DebounceInput
            className="search"
            debounceTimeout={100}
            onChange={searching}
            placeholder="Search  by Name or Interest"
          />
        </div>
      </div>
      {/* filterss */}
      <div className="search-filter">
        <div className="filters">
          <div className="filter-drops">
            <h4 className="like-button" onClick={() => setSkillsDD(!skillsDD)}>
              Skills
            </h4>
            {skillsDD && (
              <ul className="filter-ul">
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="JavaScript"
                    defaultChecked={false}
                    onChange={handleSkills}
                  />
                  JavaScript
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Python"
                    defaultChecked={false}
                    onChange={handleSkills}
                  />
                  Python
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="C"
                    defaultChecked={false}
                    onChange={handleSkills}
                  />
                  C
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="C++"
                    defaultChecked={false}
                    onChange={handleSkills}
                  />
                  C++
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Java"
                    defaultChecked={false}
                    onChange={handleSkills}
                  />
                  Java
                </li>
              </ul>
            )}
          </div>
          <div className="filter-drops">
            <h4
              className="like-button"
              onClick={() => setIndustryDD(!industryDD)}
            >
              Industry
            </h4>
            {industryDD && (
              <ul className="filter-ul">
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Technology"
                    defaultChecked={false}
                    onChange={handleIndustry}
                  />
                  Technology
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Finance"
                    defaultChecked={false}
                    onChange={handleIndustry}
                  />
                  Finance
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Business"
                    defaultChecked={false}
                    onChange={handleIndustry}
                  />
                  Business
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Healthcare"
                    defaultChecked={false}
                    onChange={handleIndustry}
                  />{" "}
                  Healthcare
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Consulting"
                    defaultChecked={false}
                    onChange={handleIndustry}
                  />
                  Consulting
                </li>
              </ul>
            )}
          </div>
          <div className="filter-drops">
            <h4
              className="like-button"
              onClick={() => setProfessionDD(!professionDD)}
            >
              Profession
            </h4>
            {professionDD && (
              <ul className="filter-ul">
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Software Engineer"
                    defaultChecked={false}
                    onChange={handleProfession}
                  />
                  Software Engineer
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Product Manager"
                    defaultChecked={false}
                    onChange={handleProfession}
                  />{" "}
                  Product Manager
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Data Scientist"
                    defaultChecked={false}
                    onChange={handleProfession}
                  />{" "}
                  Data Scientist
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Consultant"
                    defaultChecked={false}
                    onChange={handleProfession}
                  />{" "}
                  Consultant
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Hardware Engineer"
                    defaultChecked={false}
                    onChange={handleProfession}
                  />{" "}
                  Hardware Engineer
                </li>
              </ul>
            )}
          </div>
          <div className="filter-drops">
            <h4
              className="like-button"
              onClick={() => setCompanyDD(!companyDD)}
            >
              Company
            </h4>
            {companyDD && (
              <ul className="filter-ul">
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="apple"
                    defaultChecked={false}
                    onChange={handleCompany}
                  />{" "}
                  Apple
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Goldman Sachs"
                    defaultChecked={false}
                    onChange={handleCompany}
                  />{" "}
                  Goldman Sachs
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="google"
                    defaultChecked={false}
                    onChange={handleCompany}
                  />{" "}
                  Google
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="meta"
                    defaultChecked={false}
                    onChange={handleCompany}
                  />{" "}
                  Meta
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Snap"
                    defaultChecked={false}
                    onChange={handleCompany}
                  />{" "}
                  Snap
                </li>
              </ul>
            )}
          </div>

          <div className="filter-drops">
            <h4
              className="like-button"
              onClick={() => setLanguageDD(!languageDD)}
            >
              Language
            </h4>
            {languageDD && (
              <ul className="filter-ul">
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="French"
                    defaultChecked={false}
                    onChange={handleLanguage}
                  />
                  French
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Arabic"
                    defaultChecked={false}
                    onChange={handleLanguage}
                  />
                  Arabic
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="English"
                    defaultChecked={false}
                    onChange={handleLanguage}
                  />
                  English
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="Spanish"
                    defaultChecked={false}
                    onChange={handleLanguage}
                  />
                  Spanish
                </li>
                <li className="filter-li">
                  <input
                    type="checkbox"
                    value="German"
                    defaultChecked={false}
                    onChange={handleLanguage}
                  />
                  German
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="clear-filters">
          <button onClick={ClearFilters}>Clear Filters</button>
        </div>
      </div>

      <div className="card">
        {mentors.map((mentor, ix) => (
          <div key={ix} className="card-inside">
            <p className="basic-info">Name: </p>
            <p className="card-text">{mentor.userInfo.username}</p>
            <p className="basic-info">Industry: </p>
            <p className="card-text">{mentor.userInfo.location}</p>
            <p className="basic-info">Bio: </p>
            <p className="card-text">{mentor.userInfo.bio}</p>
            <p className="basic-info">Major: </p>
            <p className="card-text">{mentor.userInfo.major}</p>
            <p className="basic-info">Skills: {mentor.userInfo.skills} </p>
            {Array.isArray(mentor.interests.skills) &&
            mentor.interests.skills.length > 0 ? (
              <div>
                <p className="card-text"> </p>
                {mentor.interests.skills.map((skill, key) => (
                  <p key={key} className="card-text">
                    {skill.name} {""}
                  </p>
                ))}
              </div>
            ) : null}
            <p className="basic-info">
              Companies: {mentor.userInfo.companies}{" "}
            </p>
            {Array.isArray(mentor.interests.companies) &&
            mentor.interests.companies.length > 0 ? (
              <div>
                {mentor.interests.companies.map((skill, key) => (
                  <p key={key} className="card-text">
                    {skill.name} {""}
                  </p>
                ))}
              </div>
            ) : null}
            <p className="basic-info">
              Languages: {mentor.userInfo.languages}{" "}
            </p>
            {Array.isArray(mentor.interests.languages) &&
            mentor.interests.languages.length > 0 ? (
              <div>
                <p className="card-text"> </p>
                {mentor.interests.languages.map((skill, key) => (
                  <p key={key} className="card-text">
                    {skill.name} {""}
                  </p>
                ))}
              </div>
            ) : null}
            <p className="button" onClick={joinChat}>
              Message
            </p>
          </div>
        ))}
      </div>
      {openChat ? (
        <Chat
          socket={socket}
          username={userId}
          room={appRoom}
          setOpenChat={setOpenChat}
        />
      ) : null}
    </div>
  );
}
