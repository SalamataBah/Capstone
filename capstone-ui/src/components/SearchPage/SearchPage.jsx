import React from "react";
import "./SearchPage.css";
import MentorCard from "./MentorCard/MentorCard";
import Menu from "./Menu/Menu";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get(`https://api-staging.codingcoach.io/mentors`).then((response) => {
      setMentors(response.data);
    });
  }, []);

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput != "") {
      const filteredData = mentors.data.filter((mentor) => {
        return Object.values(mentor)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLocaleLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(mentors);
    }
  };
  const content =
    searchInput.length > 1
      ? filteredResults?.map((mentor) => {
          return (
            <div className="mentor-grid">
              <button className="country-location">{mentor.country}</button>
              <a className="avatar" href={mentor.avatar}></a>
              <button className="like-button">Add to Favorite</button>
              <h2 className="name">{mentor.name}</h2>
              <h4 className="role">{mentor.title}</h4>
              {/* <p className="bio">{mentor.description}</p>
              <button className="tags">{mentor.tags}</button> */}
              <button>Get Connected</button>
            </div>
          );
        })
      : mentors?.data?.map((mentor) => {
          return (
            <div className="mentor-grid">
              <button className="country-location">{mentor.country}</button>
              <a className="avatar" href={mentor.avatar}></a>
              <button className="like-button">Add to Favorite</button>
              <h2 className="name">{mentor.name}</h2>
              <h4 className="role">{mentor.title}</h4>
              {/* <p className="bio">{mentor.description}</p>
              <button className="tags">{mentor.tags}</button> */}
              <button>Get Connected</button>
            </div>
          );
        });

  return (
    <div className="search-bar">
      <h1>Find a Mentor</h1>
      <div className="search">
        <input
          placeholder="Search for a mentor"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchInput}
        />
      </div>
      {content}
    </div>
  );
}
