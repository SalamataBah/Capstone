const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Parse = require("parse/node");
const { PARSE_APP_ID, PARSE_JAVASCRIPT_KEY } = require("./config");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = "https://parseapi.back4app.com";

app.get("/", (req, res) => {
  res.send("It works!");
});

app.get("/allUsers", async (req, res) => {
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

app.get("/allUsers/:searchInput", async (req, res) => {
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

app.get("/allSkills", async (req, res) => {
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

app.get("/allCompanies", async (req, res) => {
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

app.get("/allLanguages", async (req, res) => {
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

function handleErrorParse(error) {
  if (error?.code) {
    switch (error.code) {
      case parent.Error.INVALID_SESSION_TOKEN:
        Parse.User.logOut();
        res.redirect("/login");
        break;
    }
  }
}

app.post("/userCoords", async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  const infoUser = req.body;
  console.log("infoUser in backend: ", infoUser);
  const lat = infoUser?.lat;
  const lng = infoUser?.lng;

  const CoordObject = Parse.Object.extend("User");
  const coords = new CoordObject();
  // const points = new Parse.GeoPoint(20, -20);
  // console.log("point: ", points);

  const currentUser = Parse.User.current();
  try {
    console.log("currentUser in back: ", currentUser.toJSON());
    if (currentUser) {
      console.log("infoUser in IF: ", infoUser);
      currentUser.set("coordinate", new Parse.GeoPoint(lat, lng));
      // coords.set("coordinate", new Parse.GeoPoint(30.0, -20.0));
      // if (infoUser.coordinate) {
      //   console.log("infoUser.coordinate 2ND IFFF: ", infoUser.coordinate);

      //   coords.set("coordinate", new Parse.GeoPoint(30.0, -20.0));
      // }

      await currentUser.save();
      console.log("I am saving");
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

app.post("/login", async (req, res) => {
  const userRef = new Parse.Object("User");
  Parse.User.enableUnsafeCurrentUser();
  const infoUser = req.body;
  try {
    var currentUser = Parse.User.current();
    if (currentUser) {
      Parse.User.logOut();
    }
    const user = await Parse.User.logIn(
      infoUser.email,
      infoUser.password,
      infoUser.username
    );
    res.send({
      userInfo: user,
      loginMessage: "User logged in!",
      typeStatus: "success",
      infoUser: infoUser,
    });
  } catch (error) {
    handleErrorParse(error);
    res.send({
      loginMessage: error.message,
      typeStatus: "danger",
      infoUser: infoUser,
    });
  }
});

app.post("/logout", async (req, res) => {
  try {
    await Parse.User.logOut();
    res.send({ logoutMessage: "User logged out!", typeStatus: "success" });
  } catch (error) {
    res.send({ logoutMessage: error.message, typeStatus: "danger" });
  }
});

app.post("/register", async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  var currentUser = Parse.User.current();
  if (currentUser) {
    Parse.User.logOut();
  }
  const infoUser = req.body;
  console.log("infoUser in Register: ", infoUser);
  let user = new Parse.User();
  user.set("username", infoUser.username);
  user.set("email", infoUser.email);
  user.set("password", infoUser.password);
  try {
    await user.signUp();
    await Parse.User.logIn(infoUser.email, infoUser.password);
    res.send({
      signupMessage: "User signed up!",
      typeStatus: "success",
      infoUser: infoUser,
    });
  } catch (error) {
    res.send({
      signupMessage: error.message,
      typeStatus: "danger",
      infoUser: infoUser,
    });
  }
});
app.post("/profile", async (req, res) => {
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

app.get("/profile/interests", async (req, res) => {
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

app.post("/profile/interests", async (req, res) => {
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

app.post("/profile/interests/remove", async (req, res) => {
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

app.post("/matches", async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  const params = req.body.params;
  const currentUser = Parse.User.current();

  try {
    if (currentUser) {
      if (params.liked) {
        updateMatch(params, currentUser);
      } else {
        getMatches(currentUser);
      }
      res.send({ message: "success match", typeStatus: "success" });
    } else {
      res.send({ message: "no user found!", typeStatus: "danger" });
    }
  } catch (error) {
    res.send({ message: error.message, typeStatus: "danger" });
  }
});

app.get("/matches", async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();
  const limit = req.query["limit"];
  const offset = req.query["offset"];

  try {
    if (currentUser) {
      let matchData = await getMatchData(limit, offset, currentUser);
      res.send(matchData);
    } else {
      res.send({ message: "no user found!", typeStatus: "danger" });
    }
  } catch (error) {
    res.send({ message: "cannot get match data", typeStatus: "danger" });
  }
});

async function updateMatch(params, currentUser) {
  const Match = Parse.Object.extend("Match");
  const matchQuery = new Parse.Query(Match);
  matchQuery.equalTo("user_1", currentUser.id);
  matchQuery.equalTo("user_2", params.matchId);
  let matchResults = await matchQuery.first();

  matchResults.set("liked", params.liked);
  await matchResults.save();
  const privateInfo = new Parse.Query(Match);
  privateInfo.equalTo("user_2", currentUser.id);
  privateInfo.equalTo("user_1", params.matchId);
  let privateInfoResults = await privateInfo.first();
  if (privateInfoResults) {
    privateInfoResults.set("display_private", params.liked);
    await privateInfoResults.save();
  }
}

async function createNewMatch(match, matchScore, user1, user2) {
  match.set("score", matchScore);
  match.set("liked", false);
  match.set("user_1", user1);
  match.set("user_2", user2);
  match.set("display_private", false);

  await match.save();
}

function calculateScore(interest, category1, category2, weight1, weight2) {
  let user1Interest1 = [];
  let user1Interest2 = [];
  for (let i = 0; i < interest.user_1.length; i++) {
    user1Interest1 = user1Interest1.concat(interest.user_1[i].get(category1));
    user1Interest2.push(interest.user_1[i].get(category2));
  }
  let user2Interest1 = [];
  let user2Interest2 = [];
  for (let i = 0; i < interest.user_2.length; i++) {
    user2Interest1 = user2Interest1.concat(interest.user_2[i].get(category1));
    user2Interest2.push(interest.user_2[i].get(category2));
  }
  try {
    let category1Score = compareRoles(user1Interest1, user2Interest1, weight1);
    let category2Score = compareRoles(user1Interest2, user2Interest2, weight2);
    let totalScore = category1Score + category2Score;
    return totalScore;
  } catch (error) {
    console.log("error: ", error);
    return 0;
  }
}

function compareRoles(role1, role2, weight) {
  if (!role1 || !role2) {
    return 0;
  }
  let matches = 0;
  for (let i = 0; i < role1.length; i++) {
    let match = false;
    for (let j = 0; j < role2.length; j++) {
      if (role1[i] == role2[j]) {
        match = true;
        break;
      }
    }
    if (match) {
      matches++;
    }
  }
  let total = role1.length + role2.length;
  if (total == 0) {
    return 0;
  }
  return (matches / total) * weight;
}

const skillWeight = 0.5;
const skillNameWeight = 0.2;
const rolesWeight = 0.3;

function getScore(skills, roles) {
  const skillScore = calculateScore(
    skills,
    "category",
    "name",
    skillWeight,
    skillNameWeight
  );
  const roleScore = compareRoles(roles.user_1, roles.user_2, rolesWeight);

  return skillScore + roleScore;
}

async function getMatches(currentUser) {
  const query = new Parse.Query(Parse.User);
  query.notEqualTo("objectId", currentUser.id);
  const entries = await query.find();

  const Match = Parse.Object.extend("Match");
  let count = 0;
  entries.forEach(async (entry) => {
    const matchInfo = await getUserData(entry);
    const currentUserInfo = await getUserData(currentUser);
    count++;
    if (!matchInfo.skills || !currentUserInfo.skills) {
      return;
    }

    const skillsInfo = {
      user_1: currentUserInfo.skills,
      user_2: matchInfo.skills,
    };
    const rolesInfo = {
      user_1: currentUserInfo.roles,
      user_2: matchInfo.roles,
    };
    const matchScore = getScore(skillsInfo, rolesInfo);

    const matchQuery = new Parse.Query(Match);
    matchQuery.equalTo("user_1", currentUser.id);
    matchQuery.equalTo("user_2", entry.id);
    let matchResults = await matchQuery.first();

    const matchQuery2 = new Parse.Query(Match);
    matchQuery2.equalTo("user_2", currentUser.id);
    matchQuery2.equalTo("user_1", entry.id);
    let matchResults2 = await matchQuery2.first();

    if (matchResults) {
      matchResults.set("score", matchScore);
      matchResults2.set("score", matchScore);
    } else {
      const match = new Match();
      const match2 = new Match();
      if (matchScore) {
        createNewMatch(match, matchScore, currentUser.id, entry.id);
        createNewMatch(match2, matchScore, entry.id, currentUser.id);
      }
    }
  });
}
async function getMatchData(limit, offset, currentUser) {
  const Match = Parse.Object.extend("Match");
  const query = new Parse.Query(Match);

  query.equalTo("user_1", currentUser.id);
  query.descending("score");
  query.limit(parseInt(limit));
  query.skip(parseInt(offset));

  const results = await query.find();

  let usersInfo = [];
  let scoreInfo = [];
  let interestsInfo = [];

  for (let i = 0; i < results.length; i++) {
    let userId = results[i].get("user_2");
    const newQuery = new Parse.Query(Parse.User);
    newQuery.equalTo("objectId", userId);
    const userInfo = await newQuery.first();
    const interests = await getUserData(userInfo);

    usersInfo.push(userInfo);
    scoreInfo.push({
      score: results[i].get("score"),
      liked: results[i].get("liked"),
      display_private: results[i].get("display_private"),
    });
    interestsInfo.push(interests);
  }
  let matchesInfo = usersInfo.map(function (_, i) {
    return {
      userInfo: usersInfo[i],
      scoreInfo: scoreInfo[i],
      interestsInfo: interestsInfo[i],
    };
  });
  return {
    matchesInfo: matchesInfo,
    results: results,
    message: "matches found!",
    typeStatus: "success",
  };
}
async function removeInterest(objectName, itemKey, itemValue, currentUser) {
  const Object = Parse.Object.extend(objectName);
  const query = new Parse.Query(Object);
  query.equalTo(itemKey, itemValue);
  query.equalTo("User1", currentUser);
  const entry = await query.find();
  entry[0]?.destroy();
}
async function getInterestQuery(currentUser, objectName) {
  const Object = await Parse.Object.extend(objectName);
  const query = new Parse.Query(Object);
  query.equalTo("User1", currentUser);
  return await query.find();
}
async function getUserData(user) {
  const Skills = Parse.Object.extend("Skills");
  const skillsQuery = new Parse.Query(Skills);
  skillsQuery.equalTo("User1", user);
  const userSkills = await skillsQuery.find();

  const Company = Parse.Object.extend("Company");
  const compQuery = new Parse.Query(Company);
  compQuery.equalTo("User1", user);
  const userCompanies = await compQuery.find();

  const Language = Parse.Object.extend("Language");
  const langQuery = new Parse.Query(Language);
  langQuery.equalTo("User1", user);
  const userLanguages = await langQuery.find();

  return {
    skills: userSkills,
    companies: userCompanies,
    languages: userLanguages,
    roles: user.get("roles"),
  };
}

module.exports = app;
