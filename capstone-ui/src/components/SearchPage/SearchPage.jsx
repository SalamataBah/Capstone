import React from "react";
import "./SearchPage.css";
import MentorCard from "./MentorCard/MentorCard";
import Menu from "./Menu/Menu";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch("https://api-staging.codingcoach.io/mentors")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setMentors(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  console.log("data:", mentors.data);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="main">
        <div className="search-bar">
          <h1>Find a Mentor</h1>
          <div className="search">
            <input placeholder="Search for a mentor" />
          </div>
        </div>
        <Menu />
        <MentorCard mentors={mentors} />
      </div>
    );
  }
}
