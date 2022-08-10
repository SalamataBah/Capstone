const express = require("express");
const router = express.Router();
const Parse = require("parse/node");
const fs = require("fs");
const {sortUsersCoords} = require('../utils/sortedDistance')


async function removeInterest(objectName, itemKey, itemValue, currentUser) {
    const Object = Parse.Object.extend(objectName);
    const query = new Parse.Query(Object);
    query.equalTo(itemKey, itemValue);
    query.equalTo("User1", currentUser);
    const entry = await query.find();
    if (entry.length > 0) {
      entry[0].destroy();
    }
  }
  async function getInterestQuery(currentUser, objectName) {
    const Object = await Parse.Object.extend(objectName);
    const query = new Parse.Query(Object);
    query.equalTo("User1", currentUser);
    return await query.find();
  }

router.get("/profile/interests", async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    const currentUser = Parse.User.current();
    if (currentUser) {
      const userSkills = await getInterestQuery(currentUser, "Skills");
      const skillsData = fs.readFileSync("data/skills.json");
      const skillsJson = await JSON.parse(skillsData);
  
      const userCompanies = await getInterestQuery(currentUser, "Company");
      const companyData = fs.readFileSync("data/companies.json");
      const companyJson = await JSON.parse(companyData);
  
      const userLanguages = await getInterestQuery(currentUser, "Language");
  
      res.send({
        skills: userSkills,
        skillsJson: skillsJson.skills,
        companies: userCompanies,
        companyJson: companyJson.companies,
        languages: userLanguages,
        message: "got user interests ",
        typeStatus: "success",
      });
    } else {
      res.send({ message: "no user found!", typeStatus: "danger" });
    }
  });
  
router.post("/profile/interests", async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    const infoInterests = req.body;
    try {
      const Skills = Parse.Object.extend("Skills");
      const skills = new Skills();
      const skillsData = fs.readFileSync("data/skills.json");
      const skillsJson = await JSON.parse(skillsData);
  
      const Company = Parse.Object.extend("Company");
      const company = new Company();
      const companyData = fs.readFileSync("data/companies.json");
      const companyJson = await JSON.parse(companyData);
  
      const Language = Parse.Object.extend("Language");
      const language = new Language();
  
      const uiSkills = infoInterests.interests.skills;
      const uiCompany = infoInterests.interests.companies;
      const uiLanguage = infoInterests.interests.languages;
  
      const currentUser = Parse.User.current();
      if (currentUser) {
        let respSkills = null;
        if (uiSkills) {
          const query = new Parse.Query(Skills);
          query.equalTo("User1", currentUser);
          query.equalTo("name", uiSkills.name);
          const results = await query.find();
          if (!results[0]) {
            const optionIndex = uiSkills.index;
            let userSkills = skillsJson.skills[optionIndex];
            if (!userSkills.options.includes(uiSkills.name)) {
              userSkills.options.push(uiSkills.name);
              skillsJson.skills[optionIndex] = userSkills;
              const result = JSON.stringify(skillsJson);
              fs.writeFile("data/skills.json", result, (error) => {
                if (error) {
                  throw error;
                }
              });
            }
            skills.set("name", uiSkills.name);
            skills.set("category", uiSkills.category);
            let relations = skills.relation("User1");
            relations.add(currentUser);
            respSkills = await skills.save();
          }
        }
        let respCompany = null;
        if (uiCompany != "") {
          const query = new Parse.Query(Company);
          query.equalTo("User1", currentUser);
          query.equalTo("name", uiCompany);
          const results = await query.find();
          if (results.length == 0) {
            company.set("name", uiCompany);
            let relations = company.relation("User1");
            relations.add(currentUser);
            respCompany = await company.save();
          }
        }
        let respLanguage = null;
        if (uiLanguage) {
          const query = new Parse.Query(Language);
          query.equalTo("User1", currentUser);
          query.equalTo("name", uiLanguage);
          const results = await query.find();
          if (results.length == 0) {
            language.set("name", uiLanguage);
            let relations = language.relation("User1");
            relations.add(currentUser);
            respLanguage = await language.save();
          }
        }
        res.send({
          skills: respSkills,
          company: respCompany,
          language: respLanguage,
          userInfo: currentUser,
          message: "interests saved!",
          typeStatus: "success",
          infoInterests: infoInterests,
        });
      } else {
        res.send({
          skills: null,
          userInfo: null,
          message: "cannot find a user currently",
          typeStatus: "danger",
          infoInterests: infoInterests,
        });
      }
    } catch (error) {
      res.send({
        message: error.message,
        infoInterests: infoInterests,
        typeStatus: "danger",
      });
    }
  });
  
router.post("/profile/interests/remove", async (req, res) => {
    const removeInfo = req.body;
    Parse.User.enableUnsafeCurrentUser();
    const currentUser = Parse.User.current();
    try {
      if (currentUser) {
        if (removeInfo.skills) {
          removeInterest("Skills", "name", removeInfo.skills.name, currentUser);
        }
        if (removeInfo.company) {
          removeInterest("Company", removeInfo.company, currentUser);
        }
        if (removeInfo.language) {
          removeInterest("Language", removeInfo.language, currentUser);
        }
        res.send({ message: "success", removeInfo: removeInfo, entry: entry[0] });
      } else {
        res.send({ message: "no user found", typeStatus: "danger" });
      }
    } catch (error) {
      res.send({ message: error.message, typeStatus: "danger" });
    }
  });

router.post("/profile", async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    const infoUser = req.body;
    console.log("infoUser: ", infoUser);
    try {
      const currentUser = Parse.User.current();
      if (currentUser) {
        if (infoUser.location && infoUser.location != "") {
          currentUser.set("location", infoUser.location);
        }
        if (infoUser.bio && infoUser.bio != "") {
          currentUser.set("bio", infoUser.bio);
        }
        if (infoUser.major && infoUser.major != "") {
          currentUser.set("major", infoUser.major);
        }
        if (infoUser.roles) {
          currentUser.set("roles", infoUser.roles);
        }
        if (infoUser.coordinate) {
          console.log("infoUser.coordinate: ", infoUser.coordinate);
          currentUser.set("coordinate", infoUser.coordinate);
        }
  
        await currentUser.save();
        res.send({
          userInfo: currentUser,
          saveInfoMessage: "User info saved!",
          typeStatus: "success",
          infoUser: infoUser,
        });
      } else {
        res.send({
          userInfo: "",
          saveInfoMessage: "No user found",
          typeStatus: "danger",
          infoUser: infoUser,
        });
      }
    } catch (error) {
      res.send({
        saveInfoMessage: error.message,
        typeStatus: "danger",
        infoUser: infoUser,
      });
    }
  });

router.get("/allUsers", async (req, res) => {
    try {
      const query = new Parse.Query("User");
      const entries = await query.find();
      let allUsersInterests = [];
      let interestsInfo = [];
      let usersInfo = [];
      for (let i = 0; i < entries.length; i++) {
        const userInfo = entries[i];
        const interests = await getUserData(userInfo);
        interestsInfo.push(interests);
        usersInfo.push(userInfo);
        allUsersInterests.push({
          userInfo: userInfo,
          interests: interests,
        });
      }
      res.send({
        message: "table retrieved",
        allUsersInterests: allUsersInterests,
        typeStatus: "success",
      });
    } catch (err) {
      res.send({ message: "Error retrieving users", typeStatus: "danger" });
    }
  });
  
router.get("/allUsersCoords", async (req, res) => {
    try {
      const query = new Parse.Query("User");
      const entries = await query.find();
      let allUsersInterests = [];
      let interestsInfo = [];
      let usersInfo = [];
      for (let i = 0; i < entries.length; i++) {
        const userInfo = entries[i];
        const interests = await getUserData(userInfo);
        interestsInfo.push(interests);
        usersInfo.push(userInfo);
        allUsersInterests.push({
          userInfo: userInfo,
          interests: interests,
        });
      }
      res.send({
        message: "table retrieved",
        allUsersInterests: allUsersInterests,
        typeStatus: "success",
      });
    } catch (err) {
      res.send({ message: "Error retrieving users", typeStatus: "danger" });
    }
  });
  
  let sortedProximity = []
router.post("/allUsersCoords", async(req, res,) => {  
    sortedProximity = sortUsersCoords(req.body.obj, req.body.currentUserLat, req.body.currentUserLng)  
  })
  
function checkUserInterests(searchVal, interestInfo, usersInfo) {
    const userInfoJson = usersInfo.toJSON();
    for (let skill of interestInfo.skills) {
      const jsonSkill = skill.toJSON();
      if (jsonSkill.name?.toLowerCase().includes(searchVal)) {
        return true;
      }
    }
    for (let company of interestInfo.companies) {
      const jsonCompany = company.toJSON();
      if (jsonCompany.name?.toLowerCase().includes(searchVal)) {
        return true;
      }
    }
    for (let language of interestInfo.languages) {
      const jsonLanguage = language.toJSON();
      if (jsonLanguage.name?.toLowerCase().includes(searchVal)) {
        return true;
      }
    }
    return false;
  }
  
router.get("/allUsers/:searchInput", async (req, res) => {
    const searchVal = req.params.searchInput.toLowerCase();
    try {
      const query = new Parse.Query("User");
      const entries = await query.find();
      let allInfo = [];
      let interestsInfo = [];
      let usersInfo = [];
      for (let i = 0; i < entries.length; i++) {
        const userInfo = entries[i];
        const interests = await getUserData(userInfo);
        interestsInfo.push(interests);
        usersInfo.push(userInfo);
        allInfo.push({
          userInfo: userInfo,
          interests: interests,
        });
      }
  
      let allUsersInterests = allInfo.filter((info) =>
        checkUserInterests(searchVal, info.interests, info.userInfo)
      );
  
      res.send({
        message: "table retrieved",
        allUsersInterests: allUsersInterests,
        entries: entries,
        typeStatus: "success",
      });
    } catch (err) {
      res.send({ message: "Error retrieving users", typeStatus: "danger" });
    }
  });
  
router.get("/allSkills", async (req, res) => {
    try {
      const parseQuery = new Parse.Query("Skills");
      const entries = await parseQuery.find();
      res.send({
        message: "table retrieved",
        entries: entries,
        typeStatus: "success",
      });
    } catch (err) {
      res.send({
        userTableMessage: "Error getting user table",
        typeStatus: "danger",
      });
    }
  });
  
router.get("/allCompanies", async (req, res) => {
    try {
      const parseQuery = new Parse.Query("Company");
      const entries = await parseQuery.find();
      res.send({
        message: "table retrieved",
        entries: entries,
        typeStatus: "success",
      });
    } catch (err) {
      res.send({
        userTableMessage: "Error getting user table",
        typeStatus: "danger",
      });
    }
  });
  
router.get("/allLanguages", async (req, res) => {
    try {
      const parseQuery = new Parse.Query("Language");
      const entries = await parseQuery.find();
      res.send({
        message: "table retrieved",
        entries: entries,
        typeStatus: "success",
      });
    } catch (err) {
      res.send({
        userTableMessage: "Error getting user table",
        typeStatus: "danger",
      });
    }
  });
  
router.post("/userCoords", async (req, res) => {
    Parse.User.enableUnsafeCurrentUser();
    const infoUser = req.body;
    const lat = infoUser?.lat;
    const lng = infoUser?.lng;
  
    const CoordObject = Parse.Object.extend("User");
    const coords = new CoordObject();
  
    const currentUser = Parse.User.current();
    try {
      if (currentUser) {
        currentUser.set("coordinate", new Parse.GeoPoint(lat, lng));
        await currentUser.save();
      }
    } catch (error) {
      console.log("error", error);
      res.send({
        saveInfoMessage: error.message,
        typeStatus: "danger",
        infoUser: infoUser,
        currentUser: currentUser,
      });
    }
  });
  
module.exports = router;