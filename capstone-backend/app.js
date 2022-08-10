"use strict";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const user = require("./routes/user.js");
const matching = require("./routes/matching.js");
const auth = require("./routes/auth.js");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("It works!");
// });
app.use("/", auth);
app.use("/user", user);
app.use("/matches", matching);


module.exports = app;
