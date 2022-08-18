const express = require("express");
const router = express.Router();
const Parse = require("parse/node");
const {sortUsersCoords} = require('../utils/sortedDistance')

let sortedProximity = []
router.post("/allUsersCoords", async(req, res,) => {  
    sortedProximity = sortUsersCoords(req.body.obj, req.body.currentUserLat, req.body.currentUserLng)  
  })

router.post("/", async (req, res) => {
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
  
router.get("/", async (req, res) => {
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
    if (!interest?.user_1?.length || !interest?.user_2?.length){
      return 0 
    }
    let user1Interest1 = [];
    let user1Interest2 = [];
    for (let i = 0; i < interest.user_1.length; i++) {
      if (Array.isArray(interest.user_1[i][category1])){
        user1Interest1 = user1Interest1.concat(interest.user_1[i].get(category1));
      } else {
        user1Interest2.push(interest.user_1[i].get(category2));
      }
    }
    let user2Interest1 = [];
    let user2Interest2 = [];
    for (let i = 0; i < interest.user_2.length; i++) {
      if (Array.isArray(interest.user_2[i][category1])){
        user2Interest1 = user2Interest1.concat(interest.user_2[i].get(category1));
      }
      else {
        user2Interest2.push(interest.user_2[i].get(category2));
      }
    }
      let category1Score = calculateArrayScore(user1Interest1, user2Interest1, weight1);
      let category2Score = calculateArrayScore(user1Interest2, user2Interest2, weight2);
      let totalScore = category1Score + category2Score;
      console.log('totalScore: ',  category1Score + category2Score);
      return  category1Score + category2Score;
   
  }
  
const calculateNodeScore = (interest, cat1, cat2, wght1, wght2) =>{
    if (!interest?.user_1?.length || !interest?.user_2?.length){
      return 0 
    }
    let user1cat1 = []
    let user1cat2 = []
    for (let i = 0; i < interest.user_1.length; i++){
      if (Array.isArray(interest.user_1[i].get(cat1))){
        user1cat1 = user1cat1.concat(interest.user_1[i].get(cat1));
      } else {
        user1cat1.push(interest.user_1[i].get(cat1));
      }
      user1cat2.push(interest.user_1[i].get(cat2));
    }
  
    let user2cat1 = []
    let user2cat2 = []
    for (let i = 0; i < interest.user_2.length; i++){
      if (Array.isArray(interest.user_2[i].get(cat1))){
        user2cat1 = user2cat1.concat(interest.user_2[i].get(cat1));
      } else {
        user2cat1.push(interest.user_2[i].get(cat1));
      }
      user2cat2.push(interest.user_2[i].get(cat2));
    }
    try {
      let cat1Score = calculateArrayScore(user1cat1, user2cat1, wght1);
      let cat2Score = calculateArrayScore(user2cat1, user2cat2, wght2);
      let totalScore = cat1Score + cat2Score
      console.log('totalScore: ', totalScore);
      return totalScore
    } catch(error){
      console.log('error: ', error);
      return 0 
    }
  }
function calculateArrayScore(array1, array2, weight) {
    if (!array1 || !array2) {
      return 0;
    }
    let matches = 0;
    for (let i = 0; i < array1.length; i++) {
      let match = false;
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] == array2[j]) {
          match = true;
          break;
        }
      }
      if (match) {
        matches++;
      }
    }
    let total = array1.length + array2.length;
    if (total == 0) {
      return 0;
    }
    return (matches / array1.length).toFixed(3) * weight;
  }
  
  // total weight = 1
  const skillNameWeight = 0.08;
  const rolesWeight = 0.07;
  const distanceWeight = 0.25;
  const skillCategoryWeight = 0.12;
  const languageNameWeight = 0.12;
  const companyNameWeight = 0.12;
  const industryNameWeight = 0.12;
  const positionNameWeight = 0.12;
  
  
function getScore(skills, roles, sortedProximity,companies,languages) {
  
    const skillScore = calculateNodeScore(
      skills,
      "category",
      "name",
      skillCategoryWeight,
      skillNameWeight
    );
    const languageScore = calculateArrayScore(
      languages?.user_1[0]?.id,
      languages?.user_2[0]?.id,
      languageNameWeight
    )
  
    const companyScore = calculateArrayScore(
      companies?.user_1,
      companies?.user_2,
      companyNameWeight
    )  
    
    const roleScore = calculateArrayScore(
      roles.user_1, 
      roles.user_2,
      rolesWeight
    );
    const distanceScore = calculateNodeScore(
      sortedProximity.user_1,
      sortedProximity.user_2, 
      distanceWeight
    );
    
    const totalScore = skillScore + roleScore  + companyScore + languageScore
    console.log('companyScore: ', companyScore);
    // console.log('totalScore: ', totalScore);
    
    // console.log('companyScore: ', companyScore);
    // console.log('roleScore: ', roleScore);
    // console.log('skillScore: ', skillScore);
    // console.log('totalScore: ', totalScore);
     return skillScore + roleScore + distanceScore + companyScore + languageScore;
  
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
  
      console.log('rolesInfo: ', rolesInfo);
  
      const companyInfo = {
        user_1: currentUserInfo.companies,
        user_2: matchInfo.companies
      }
    
      const languageInfo = {
        user_1: currentUserInfo.languages,
        user_2: matchInfo.languages
      }
  
      const distanceInfo = {
        user_1: currentUserInfo.sortedProximity,
        user_2: matchInfo.sortedProximity
      }
      const matchScore = getScore(skillsInfo, rolesInfo, distanceInfo, companyInfo, languageInfo);
  
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
      sortedProximity: sortedProximity,
    };
  }
  
module.exports = router;