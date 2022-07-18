const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const {PARSE_APP_ID, PARSE_JAVASCRIPT_KEY} = require('./config')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = "https://parseapi.back4app.com"

app.post('/register', async (req, res) => {
  let user = new Parse.User(req.body)
  console.log('user: ', user);
  console.log('req.body: ', req.body);

  try {
      await user.signUp()
      res.status(201)    
      res.send({"user" : user})
  } catch (error) {
      res.status(400)
      res.send({"error" : "Failed to create user: " + error })
  }
})

app.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password)
    res.send({"user" : user})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Login failed: " + error })
  }
})
// Set up Linkedin OAuth here 
var router = express.Router();
const request = require('superagent');

router.get('/profile', function(req, res, next){
  requestAccessToken(req.body.code, req.query.state)
  .then(response => {
    requestProfile(response.body.access_token)
    .then(response =>{
      console.log('response: ', response.body);

      res.render('profile', {profile: response.body})
    } );
  })
  .catch((error) => {
    res.status(500).send(`${error}`)
  })
})

function requestAccessToken(code, state){
  return request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send('redirect_uri= http://localhost:3000/profile')
    .send('client_id=86bj0k3tnixpok')
    .send('client_secret=9XSEs7KoTrAeu78b')
    .send(`code=${code}`)
    .send(`state=${state}`)
}

function requestProfile(token) {
  return request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
  .set('Authorization', `Bearer ${token}`)
}
module.exports = app;
