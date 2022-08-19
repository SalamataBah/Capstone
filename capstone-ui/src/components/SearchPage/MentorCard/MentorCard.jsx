import React from "react";
import "./MentorCard.css";

export default function MentorCard({ mentors, searchVal, drop1, drop6 }) {
  console.log("mentors: ", mentors);
  let arr = [];

  drop6.forEach((element) => {
    mentors.forEach((ele) => {
      if (element === ele.language) {
        arr.unshift(ele);
      }
    });
  });
  drop1.forEach((element) => {
    mentors.forEach((ele) => {
      if (element === ele.skills) {
        arr.unshift(ele);
      }
    });
  });
  return (
    <div></div>
    // <div className="mentor-grid">
    //   {mentors?.map((match, index) => (
    //     <div key={index} className="card">
    //       <p className="card-text">Username: {match?.userInfo?.username}</p>
    //       <p className="card-text">Location: {match?.userInfo?.location}</p>
    //       <p className="card-text">Bio: {match?.userInfo?.bio}</p>
    //       <p className="card-text">Major: {match?.userInfo?.major}</p>
    //       <p className="card-text">Skills: {match?.userInfo?.skills}</p>
    //       {Array.isArray(match?.interestsInfo?.skills) &&
    //       match?.interestsInfo?.skills.length > 0 ? (
    //         <div>
    //           <p className="card-text match-interests"> </p>
    //           {match?.interestsInfo?.skills?.map((skill, key) => (
    //             <p key={key} className="card-text match-interests match-skills">
    //               {skill.name} {""}
    //             </p>
    //           ))}
    //         </div>
    //       ) : null}{" "}
    //     </div>
    //   ))}
    // </div>
  );
}
