import React from "react";
import "./SearchPage.css";
import MentorCard from "./MentorCard/MentorCard";
import Menu from "./Menu/Menu";
import { useState, useEffect } from "react";
import axios from "axios";
import * as config from "../../config";

export default function SearchPage() {
  const [mentors, setMentors] = useState([]);
  console.log("mentors: ", mentors);
  const [searchInput, setSearchInput] = useState("");
  console.log("searchInput: ", searchInput);

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/matches`).then((response) => {
      console.log("response: ", response);
      setMentors(response.data);
    });
  }, []);

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput != "") {
      const filteredData = mentors.data.filter((mentor) => {
        console.log("filteredData: ", filteredData);
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
  // const content =
  //   searchInput.length > 1
  //     ? filteredResults?.map((mentor) => {
  //         return (
  //           <div className="mentor-grid">
  //             <button className="country-location">
  //               {mentor.usersInfo.user_1}
  //             </button>
  //             {/* <a className="avatar" href={mentor.avatar}></a> */}
  //             {/* <button className="like-button">Add to Favorite</button>
  //             <h2 className="name">{mentor.usersInfo}</h2>
  //             <h4 className="role">{mentor.title}</h4>
  //             {/* <p className="bio">{mentor.description}</p>
  //             <button className="tags">{mentor.tags}</button> */}
  //             <button>Get Connected</button>
  //           </div>
  //         );
  //       })
  //     : mentors?.data?.map((mentor) => {
  //         return (
  //           <div className="mentor-grid">
  //             <button className="country-location">
  //               {mentor.usersInfo.user_1}
  //             </button>
  //             {/* <a className="avatar" href={mentor.avatar}></a>
  //             <button className="like-button">Add to Favorite</button>
  //             <h2 className="name">{mentor.name}</h2>
  //             <h4 className="role">{mentor.title}</h4>
  //             {/* <p className="bio">{mentor.description}</p>
  //             <button className="tags">{mentor.tags}</button> */}
  //             <button>Get Connected</button>
  //           </div>
  //         );
  //       });

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
      {/* {content} */}
    </div>
  );
}
