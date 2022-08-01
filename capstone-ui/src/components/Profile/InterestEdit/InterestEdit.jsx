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
  company,
  removeCompany,
  getCompany,
  language,
  getLanguage,
  removeLanguage,
}) {
  const [skillsClass, setSkillsClass] = useState("hidden");
  const [selection, setSelection] = useState("null");
  const [companyClass, setCompanyClass] = useState("hidden");
  const [languageClass, setLanguageClass] = useState("hidden");

  function handleSkillClass() {
    if (skillsClass == "skill-input") {
      setSkillsClass("hidden");
    } else {
      setSkillsClass("skill-input");
    }
  }

  function handleCompanyClass() {
    if (companyClass == "skill-input") {
      setCompanyClass("hidden");
    } else {
      setCompanyClass("skill-input");
    }
  }
  function handleLanguageClass() {
    if (languageClass == "skill-input") {
      setLanguageClass("hidden");
    } else {
      setLanguageClass("skill-input");
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
          <p className="skills">Companies:</p>
          {userInfo?.interests?.companies &&
          Array.isArray(userInfo.interests.companies)
            ? userInfo.interests.companies.map((company, key) => (
                <div key={key} className="skills">
                  <p className="skills-name">{company.name}</p>
                  <p
                    className="skills-name remove-skills"
                    onClick={() => {
                      removeCompany(getCompany);
                    }}
                  >
                    X
                  </p>
                </div>
              ))
            : null}
          <br />
          {companyClass == "hidden" ? (
            <div>
              <button className="button" onClick={handleCompanyClass}>
                Add a company
              </button>{" "}
            </div>
          ) : (
            <input
              placeholder="enter your company of interest"
              type="text"
              className={companyClass}
              id="add-company"
              onChange={getCompany}
            ></input>
          )}{" "}
          {company && company != "" ? (
            <div className="skills">
              <p className="skills-name">{company.name}</p>{" "}
            </div>
          ) : null}
          <p className="skills">Languages:</p>
          {userInfo?.interests?.languages &&
          Array.isArray(userInfo.interests.languages)
            ? userInfo.interests.languages.map((language, key) => (
                <div key={key} className="skills">
                  <p className="skills-name">{language.name}</p>
                  <p
                    className="skills-name remove-skills"
                    onClick={() => {
                      removeLanguage(language);
                    }}
                  >
                    X
                  </p>
                </div>
              ))
            : null}
          <br />
          {languageClass == "hidden" ? (
            <div>
              <button className="button" onClick={handleLanguageClass}>
                Add a language
              </button>{" "}
            </div>
          ) : (
            <input
              placeholder="enter your company of interest"
              type="text"
              className={languageClass}
              id="add-language"
              onChange={getLanguage}
            ></input>
          )}{" "}
          {language && language != "" ? (
            <div className="skills">
              <p className="skills-name">{language.name}</p>{" "}
            </div>
          ) : null}
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
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
