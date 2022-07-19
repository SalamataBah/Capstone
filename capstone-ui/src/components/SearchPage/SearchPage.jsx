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
      console.log("response: ", response);
    });
  }, []);

  const handleSearch = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput != "") {
      const filteredData = mentors.filter((mentor) => {
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
  console.log("mentorData: ", mentors);
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

      {searchInput.length > 1
        ? filteredResults.map((mentor) => {
            console.log("filteredResults: ", filteredResults);
            return <div>{mentor.name}</div>;
          })
        : mentors.data.map((mentor) => {
            return <div> {mentor.name}</div>;
          })}
    </div>
  );
}
//   const handleSearch = (e) => {
//     const keyword = e.target.value;
//     if (keyword !== "") {
//       const results = mentors.filter((mentor) => {
//         return mentor.searchInput
//           .toLowerCase()
//           .startsWith(keyword.toLowerCase());
//       });

//       setMentors(results);
//     } else {
//       setMentors(mentors);
//     }

//     setsearchInput(keyword);
//   };

//   useEffect(() => {
//     fetch("https://api-staging.codingcoach.io/mentors")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setMentors(result);
//         },
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//   }, []);
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <div className="main">
//         <div className="search-bar">
//           <h1>Find a Mentor</h1>
//           <div className="search">
//             <input
//               placeholder="Search for a mentor"
//               onChange={handleSearch}
//               value={searchInput}
//             />
//           </div>
//         </div>
//         <Menu />
//         <MentorCard mentors={mentors} />
//       </div>
//     );
//   }
// }
