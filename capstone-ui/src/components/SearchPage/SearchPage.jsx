import React from "react";
import "./SearchPage.css";
import MentorCard from "./MentorCard/MentorCard";
import Menu from "./Menu/Menu";
import { useState, useEffect } from "react";
import axios from "axios";
import * as config from "../../config";
import { DebounceInput } from "react-debounce-input";

export default function SearchPage() {
  const [mentors, setMentors] = useState([]);
  console.log("mentors: ", mentors);
  const [searchVal, setSearchVal] = useState("");
  console.log("searchVal: ", searchVal);

  const searching = (e) => {
    setSearchVal(e.target.value);
  };

  const URL = `${config.API_BASE_URL}/allUsers/${searchVal}`;
  console.log("URL: ", URL);

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/allUsers/${searchVal}`).then((result) => {
      console.log("result: ", result.data.allUsersInterests);
      setMentors(result.data.allUsersInterests);
    });
  }, [searchVal]);

  return (
    <div className="search-bar">
      <h1>Find a Mentor</h1>
      <div className="search">
        <DebounceInput
          className="search"
          debounceTimeout={100}
          onChange={searching}
        />
      </div>
      <div className="card">
        {mentors.map((mentor, ix) => (
          <div key={ix} className="card">
            <p className="card-text">Username: {mentor.userInfo.username} </p>
            <p className="card-text">Location: {mentor.userInfo.location} </p>
            <p className="card-text">Bio: {mentor.userInfo.bio} </p>
            <p className="card-text">Major: {mentor.userInfo.major} </p>
            <p className="card-text">Skills: {mentor.userInfo.skills} </p>
            {Array.isArray(mentor.interests.skills) &&
            mentor.interests.skills.length > 0 ? (
              <div>
                <p className="card-text match-interests"> </p>
                {mentor.interests.skills.map((skill, key) => (
                  <p
                    key={key}
                    className="card-text match-interests match-skills"
                  >
                    {skill.name} {""}
                  </p>
                ))}
              </div>
            ) : null}
            <p className="card-text">Companies: {mentor.userInfo.companies} </p>
            {Array.isArray(mentor.interests.companies) &&
            mentor.interests.companies.length > 0 ? (
              <div>
                <p className="card-text match-interests"> </p>
                {mentor.interests.companies.map((skill, key) => (
                  <p
                    key={key}
                    className="card-text match-interests match-skills"
                  >
                    {skill.name} {""}
                  </p>
                ))}
              </div>
            ) : null}
            <p className="card-text">Languages: {mentor.userInfo.languages} </p>
            {Array.isArray(mentor.interests.languages) &&
            mentor.interests.languages.length > 0 ? (
              <div>
                <p className="card-text match-interests"> </p>
                {mentor.interests.languages.map((skill, key) => (
                  <p
                    key={key}
                    className="card-text match-interests match-skills"
                  >
                    {skill.name} {""}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
