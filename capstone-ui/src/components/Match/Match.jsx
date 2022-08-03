import React from "react";
import "./Match.css";
import Loading from "../Loading/Loading";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Match({
  isLoading,
  setIsLoading,
  matches,
  getMatches,
  matchLimit,
  offset,
  setOffset,
  createMatch,
  goToMatch,
}) {
  return isLoading || !matches || !Array.isArray(matches) ? (
    <Loading></Loading>
  ) : matches.length == 0 ? (
    <p className="card-text">No Match Found!</p>
  ) : (
    <div className="match" id="match">
      {matches.map((match, index) => (
        <div key={index} className="card">
          <p className="card-text">{match.userInfo.username}</p>
          <p className="card-text">{match.userInfo.location}</p>
          <p className="card-text">{match.userInfo.skills}</p>
          {Array.isArray(match.interestsInfo.skills) &&
          match.interestsInfo.skills.length > 0 ? (
            <div>
              <p className="card-text match-interests">Skills:</p>
              {match.interestsInfo.skills.map((skill, key) => (
                <p key={key} className="card-text match-interests match-skills">
                  {skill.name}
                </p>
              ))}
            </div>
          ) : null}{" "}
          {match.scoreInfo.display_private ? (
            <div>
              <p>{`${match.userInfo.username} gave you a heart!`}</p>
            </div>
          ) : null}
          {
            <button
              className="button"
              onClick={async () => {
                setIsLoading(true);
                const liked = match.scoreInfo.liked;
                await createMatch({
                  matchId: match.userInfo.objectId,
                  liked: !liked,
                });
                await getMatches(10, 0);
                await goToMatch();
                setIsLoading(false);
              }}
            >
              {" "}
              {match.scoreInfo.liked ? <FaHeart /> : <FaRegHeart />}
            </button>
          }
        </div>
      ))}
      {matches.length < matchLimit ? null : (
        <button
          className="button"
          onClick={() => {
            const newOffset = parseInt(offset) + parseInt(matchLimit);
            getMatches(matchLimit, newOffset);
            setOffset(newOffset);
          }}
        >
          {" "}
          Load More{" "}
        </button>
      )}
    </div>
  );
}
