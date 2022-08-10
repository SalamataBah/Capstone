const express = require("express");
const router = express.Router();
const Parse = require("parse/node");
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('../utils/config')
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = "https://parseapi.back4app.com";


router.post("/login", async (req, res) => {
    const infoUser = req.body;
    try {
      // var currentUser = Parse.User.current();
      // if (currentUser) {
      //   Parse.User.logOut();
      // }
      const user = await Parse.User.logIn(
        infoUser.email,
        infoUser.password,
        infoUser.username
      );
      const sessionToken = user.getSessionToken();
      res.send({
        sessionToken: sessionToken,
        userInfo: user,
        loginMessage: "User logged in!",
        typeStatus: "success",
        infoUser: infoUser,
      });
    } catch (error) {
      res.send({
        loginMessage: error.message,
        typeStatus: "danger",
        infoUser: infoUser,
      });
    }
  });
  
router.post("/logout", async (req, res) => {
    try {
      await Parse.User.logOut();
      res.send({ logoutMessage: "User logged out!", typeStatus: "success" });
    } catch (error) {
      res.send({ logoutMessage: error.message, typeStatus: "danger" });
    }
  });
  
router.post("/register", async (req, res) => {
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

module.exports = router;