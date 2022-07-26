import React from "react";
import { useState } from "react";
import Loading from "../../Loading/Loading";
import "./InterestEdit.css";
import Select from "react-select";

export default function InterestEdit({
  userInfo,
  onClickProfile,
  saveInterests,
  isLoading,
  skillsJson,
  addSkill,
  removeSkill,
  selectedSkill,
  setSelectedSkill,
}) {
  const [skillsClass, setSkillsClass] = useState("hidden");
  const [selection, setSelection] = useState("null");

  console.log("skillsJson: ", skillsJson);

  function handleSkillClass() {
    if (skillsClass == "skill-input") {
      setSkillsClass("hidden");
    } else {
      setSkillsClass("skill-input");
    }
  }

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="interests" id="interests">
      <div className="user-interests">
        <div className="container">
          <img></img>
          <h2>{userInfo.username}</h2>
          <div className="user-info">
            <p className="user-profile" onClick={onClickProfile}>
              {" "}
              Your Profile
            </p>
            <p className="user-profile active"> Interests </p>
          </div>
        </div>
        <div className="container">
          <p className="skills">Skills:</p>
          {userInfo?.interests?.skills &&
          Array.isArray(userInfo.interests.skills)
            ? userInfo.interests.skills.map((skill, key) => (
                <div key={key} className="skills">
                  <p className="skills-name">{skill.name}</p>
                  <p
                    className="skills-name remove-skills"
                    onClick={() => {
                      removeSkill(skill);
                    }}
                  >
                    X
                  </p>
                </div>
              ))
            : null}
          {skillsJson && skillsJson != [] && skillsClass != "hidden" ? (
            <div>
              <p>Select a skill category:</p>
              <Select
                className="selection"
                id="skill-selection"
                onChange={setSelection}
                defaultValue={selection}
                options={skillsJson.map((skill, key) => {
                  return {
                    label: skill.category,
                    value: key,
                  };
                })}
              />
            </div>
          ) : (
            <button className="button" onClick={handleSkillClass}>
              Add a new skill
            </button>
          )}
          {selection && skillsClass != "hidden" ? (
            <div>
              <p> Choose a skill:</p>
              <Select
                className="selection"
                defaultValue={selectedSkill}
                onChange={setSelectedSkill}
                id="skill-selection"
                options={skillsJson[selection.value]?.options?.map((skill) => {
                  return {
                    label: skill,
                    value: {
                      name: skill,
                      category: selection.label,
                      index: selection.value,
                    },
                  };
                })}
              />
              {selectedSkill ? null : (
                <div>
                  <p>Add your new skill:</p>
                  <input
                    placeholder="enter your skill"
                    type="text"
                    className={skillsClass}
                    id="add-skill"
                    onChange={() => addSkill(selection.label, selection.value)}
                  ></input>
                </div>
              )}
            </div>
          ) : null}
          <button
            className="button"
            onClick={() => {
              saveInterests();
              setSelectedSkill(null);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
