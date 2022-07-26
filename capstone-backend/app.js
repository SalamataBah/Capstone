const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('./config')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

app.get("/", (req, res) => {
  res.send("It works!")
})

function handleErrorParse(error){
  if (error?.code){
    switch (error.code){
      case parent.Error.INVALID_SESSION_TOKEN: Parse.User.logOut();
      res.redirect('/login');
      break
    }
  }
}
app.post('/login', async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  const infoUser = req.body;
  console.log('infoUser: ', infoUser);
  try {
      var currentUser = Parse.User.current();
      if (currentUser) {
          Parse.User.logOut();
      } 
      const user = await Parse.User.logIn(infoUser.email, infoUser.password, infoUser.username,);
      console.log('user: ', user);
      res.send({ userInfo: user, loginMessage: "User logged in!", typeStatus: "success", infoUser: infoUser });
  } catch (error) {
    handleErrorParse(error);
      res.send({ loginMessage: error.message, typeStatus: "danger", infoUser: infoUser });
  }
})

app.post('/logout', async (req, res) => {

  try {
      await Parse.User.logOut();
      res.send({ logoutMessage: "User logged out!", typeStatus: "success" });
  } catch (error) {
      res.send({ logoutMessage: error.message, typeStatus: "danger" });
  }
})

app.post('/register', async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  var currentUser = Parse.User.current();
      if (currentUser) {
          Parse.User.logOut();
      } 
  const infoUser = req.body;
  let user = new Parse.User();
  user.set("username", infoUser.username);
  user.set("email", infoUser.email);
  user.set("password", infoUser.password);
  

  try {
      await user.signUp();
      await Parse.User.logIn(infoUser.email, infoUser.password);
      res.send({ signupMessage: "User signed up!", typeStatus: 'success', infoUser: infoUser });
  }
  catch (error) {
      res.send({ signupMessage: error.message, typeStatus: 'danger', infoUser: infoUser });
  }
})
app.post('/profile', async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  const infoUser = req.body;

  try {
      const currentUser = Parse.User.current();
      console.log('currentUser: ', currentUser);
      if (currentUser) {
          if (infoUser.role && infoUser.role != "") {
              currentUser.set("role", infoUser.role);
          }
          if (infoUser.bio && infoUser.bio != "") {
            currentUser.set("bio", infoUser.bio);
          }
          if (infoUser.location && infoUser.location != "") {
            currentUser.set("bio", infoUser.location);
          }
          if (infoUser.major && infoUser.major != "") {
            currentUser.set("major", infoUser.major);
          }
          if (infoUser.roles) {
            currentUser.set("roles", infoUser.roles);
          }
          
          await currentUser.save()
          console.log('currentUser: ', currentUser);
          res.send({ userInfo: currentUser, saveInfoMessage: "User info saved!", typeStatus: "success", infoUser: infoUser });
      } else {
          res.send({ userInfo: "", saveInfoMessage: "No user found", typeStatus: "danger", infoUser: infoUser });
      }
  } catch (error) {
      
      res.send({ saveInfoMessage: error.message, typeStatus: "danger", infoUser: infoUser });
  }
})

app.get('/profile/interests', async(req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  const currentUser = Parse.User.current();
  if (currentUser){
    const userSkills = await getInterestQuery(currentUser, "Skills");
    const skillsData = fs.readFileSync('data/skills.json');
    console.log('skillsData: ', skillsData);
    const skillsJson = await JSON.parse(skillsData)
    console.log('skillsJson: ', skillsJson);
    res.send({skills: userSkills, skillsJson: skillsJson.skills, message: "got user interests ", typeStatus:"success" })
  }
  else{
    res.send({message: "no user found!", typeStatus: "danger"})
  }
})

app.post ('/profile/interests', async (req, res) => {
  Parse.User.enableUnsafeCurrentUser();
  const infoInterests = req.body;
  try{
    const Skills = Parse.Object.extend("Skills");
    const skills = new Skills();
    const skillsData = fs.readFileSync('data/skills.json');
    const skillsJson = await JSON.parse(skillsData)

    const currentUser = Parse.User.current();
    if (currentUser){
      if (infoInterests.interests.skills){
        const query = new Parse.Query(Skills);
        query.equalTo("User", currentUser);
        query.equalTo("name", infoInterests.interests.skills.name);
        const results = await query.find();
        console.log('results: ', results);
        if (!results[0]){
          let userSkills = skillsJson.skills[infoInterests.interests.skills.skillIndex];
          if (!userSkills.options.includes(infoInterests.interests.skills.name)){
            userSkills.options.push(infoInterests.interests.skills.name);
            skillsJson.skills[infoInterests.interests.skills.skillIndex] = userSkills;
            const result = JSON.stringify(skillsJson);
            fs.writeFile('data/skills.json', result, error => {
              if (error){
                throw error
              }
            })
          }
          skills.set("name", infoInterests.interests.skills.name)
          skills.set("category", infoInterests.interests.skills.category)
          let relations = skills.relation('User');
          relations.add("currentUser");
          await skills.save()
        }
      }
      res.send({skills: skills, userInfo: currentUser, message: "interests saved!", typeStatus: "success", infoInterests: infoInterests})
    } else {
      res.send({skills: skills, userInfo: null, message: "cannot find a user currently", typeStatus: "danger", infoInterests: infoInterests})
    }
  }
  catch(error){
    res.send( {message: error.message, infoInterests: infoInterests, typeStatus: "danger"})
  }
})

async function  getInterestQuery(currentUser, objectName){
  const Object = await Parse.Object.extend(objectName);
  const query = new Parse.Query(Object);
  query.equalTo("User", currentUser);
  return await query.find();

}
// async function getUserData(user){
//   const Skills = Parse.Object.extend("Skills");
//   const skillsQuery = new Parse.Query(Skills);
//   skillsQuery.equalTo("User", user);
//   const userSkills = await skillsQuery.find();
//   return({skills: userSkills})
// }

module.exports = app;
