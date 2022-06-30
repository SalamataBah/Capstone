## Documentation

* [Overview](#Overview)
* [Product Specs](#Product_specs)
* [Wireframes](#Wireframes)
* [Schema](#Schema)
* [Project_Plan](#Project_Plan)
	
# Overview
Description 

M&M( Match and Meet) is a website that helps students match and meet with a mentor


# Product_specs

User Stories: https://github.com/SalamataBah/Capstone-User-Stories

Core/Must-have Features:

- [ ] Your app provides multiple opportunities for you to overcome difficult/ambiguous technical problems
	- [ ]  Write a matching algorithm that can also auto suggest mentors 
	- [ ]  Fetch Data from LinkedIn API to create user profiles and pull out information
	- [ ]  View Mentor's Profile 
	- [ ]  Search for someone 
	- [ ]  Translate Search input in many languages 
	- [ ]  Post/Comment/Like posts
	- [ ]  Chat Feature

- [ ] Your app interacts with a database 
	- [ ] 	Back4App or Firebase
- [ ] You can log in/log out of your app as a user
	- [ ] Implement a UI/UX for log in with a name or email and a password
- [ ] You can sign up with a new user profile
	- [ ] Users can sign up with Google/Facebook/LinkedIn Apis
- [ ] Your app has an interesting cursor interaction (e.g. a custom tooltip on hover)
- [ ] Your app demonstrates at least one component with complex visual styling (done by you, from scratch)
- [ ] Your app uses a loading state to create visual polish

Stretch/Optional Features:
- [ ] Having a very polished UI
- [ ] Having a great App Idea that could be a real product
- [ ] Resources Tab to see Scholarships and Opportunities


# Wireframes

https://www.figma.com/file/mqFEAK1kBKENVrBeT7s82P/Capstone?node-id=0%3A1
<img width="1195" alt="Screen Shot 2022-06-30 at 1 36 58 AM" src="https://user-images.githubusercontent.com/57270552/176632331-1b2b41e6-1414-4e65-95d2-2d7b035a1a5b.png">



# Schema

HTTP Verb|	Name	|Description	                                 |User stories
POST	 |shoes	        |Add a shoe to a user's collection	         |2
DELETE	 |shoes/id	|Remove a shoe from a user's collection          |2
GET	 |shoes	        |Fetch the list of shoe's in a user's collection |2, 4
POST	 |users	        |Create a new user account	                 |3
PUT	 |users/id	|Update user's profile data	                 |4

# Project_Plan

Week 1 - The goal of this week is to build the main frontend of the website and authenticate the users. Any technical problem will addressed to manager or during office hours.

- [x] Monday - Holiday 
- [ ] Tuesday 
	- [ ] Build the frontend of the home page (Header, Hero, About, Contact, Footer), FAQs, Success Stories Pages
	- [ ] Build Login and Sign Up Buttons
	- [ ] Build the Chat, Notifications, Share location buttons  
- [ ] Wednesday 
	- [ ] Build the Login and Sign Up Pages 
	- [ ] Integrate the authentication with Facebook and Google and LinkedIn APIs
	- [ ] Create the user profiles for the user and mentor
	- [ ] Office Hours	
- [ ] Thursday
	- [ ] Create the Mentorship page where users can filter and find mentors (this include the search input)
	- [ ] Create the feed page where users can see posts and comment and like them
- [ ] Friday 
	- [ ] Fix any roadblock 
	- [ ] Finish set goals 

Week 2 - The goal of this week is to add functionalities to the frontend and start connecting the backend. Any technical problem will addressed to manager or during office hours.

- [ ] Monday
	- [ ] Office Hours 
	- [ ] Write matching algorithm connected to find Mentor Button
- [ ] Tuesday 
	- [ ] Pull Data from LinkedIn Api 
	- [ ] Use Parse4Data or Firebase to store data
- [ ] Wednesday 
	- [ ] Office Hours	
	- [ ] Display Search results 
- [ ] Thursday
	- [ ] Allow User to contact mentor
	- [ ] Allow User to share location on Google maps
- [ ] Friday 
	- [ ] Fix any roadblock 
	- [ ] Finish set goals 

Week 3 - The goal of this week is to meet all required features and ensure that they are fully functioning. Any technical problem will addressed to manager or during office hours.

- [ ] Monday
	- [ ] Office Hours 
	- [ ] Implement Chat Features
- [ ] Tuesday 
	- [ ] Search Translation feature implemented 
	- [ ] test matching algorithm is fully function. Can it auto suggest mentors based on user's chosen filters.
- [ ] Wednesday 
	- [ ] Office Hours	
	- [ ] How can we differentiate mentees and mentors?? 
- [ ] Thursday
	- [ ] Debug??
	- [ ] Fix??
- [ ] Friday 
	- [ ] Fix any roadblock 
	- [ ] Finish set goals 

Week 4 - the goal of this week is to fix any ongoing issue, and hit optional features

Week 5 - The goal os this week is to polish code and UI 

Week 6 - Ensure that all core features are met and website is fully functionning and hosted

Week 7 - Prepare and present project


