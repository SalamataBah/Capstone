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
	- [x]  View Mentor's Profile 
	- [x]  Search for someone 
	- [ ]  Translate Search input in many languages 
	- [ ]  Chat Feature (stretch)

- [ ] Your app interacts with a database 
	- [x] 	Back4App or Firebase
- [ ] You can log in/log out of your app as a user
	- [x] Implement a UI/UX for log in with a name or email and a password
- [ ] You can sign up with a new user profile
	- [x] Users can sign up with Google/Facebook/LinkedIn Apis
- [ ] Your app has an interesting cursor interaction (e.g. a custom tooltip on hover)
- [ ] Your app demonstrates at least one component with complex visual styling (done by you, from scratch)
- [ ] Your app uses a loading state to create visual polish

Stretch/Optional Features:
- [ ] Having a very polished UI
- [ ] Having a great App Idea that could be a real product
- [ ] Resources Tab to see Scholarships and Opportunities
- [ ] Build the Chat, Notifications, Share location buttons  


# Wireframes

https://www.figma.com/file/mqFEAK1kBKENVrBeT7s82P/Capstone?node-id=0%3A1
<img width="1195" alt="Screen Shot 2022-06-30 at 1 36 58 AM" src="https://user-images.githubusercontent.com/57270552/176632331-1b2b41e6-1414-4e65-95d2-2d7b035a1a5b.png">



# Schema

# Endpoints
<img width="1337" alt="Screen Shot 2022-07-11 at 11 16 41 AM" src="https://user-images.githubusercontent.com/57270552/178331138-a5fda7b4-75a3-4f9a-bdcb-5b723855cdbe.png">
<img width="825" alt="image" src="https://user-images.githubusercontent.com/57270552/178331243-516a2258-86a0-4726-a6a1-9c9606ca3bdc.png">

HTTP Verb|	Name	|Description	                                 |User stories |
---------|--------------|------------------------------------------------|-------------|
POST	 |	        |					         |	       |
DELETE	 |      	| 					         |	       |
GET	 |	        |						 |	       |
POST	 |	        |				                 |             |
PUT	 |		|				                 |             |

# Data Model

 column name	|Description	                                 |type         |
 --------------	|------------------------------------------------|-------------|
tbd	        |					         |	       |
tbd     	| 					         |	       |
tbd	        |						 |	       |
tbd	        |				                 |             |

<img width="688" alt="image" src="https://user-images.githubusercontent.com/57270552/182435228-350ccfb6-c5f2-46a4-8d4b-c64fffec830d.png">

			
# Networking

List of network requests by screen

- HomeFeed
	- GET will query ...
	- POST will query ...
- CreatePost
	- GET will query ...
	- POST will query ...
- DirectMessage 
	- GET will query ...
	- POST will query ...
- ProfileScreen
	- GET will query ...
	- POST will query ...


# Project_Plan

Week 1 - The goal of this week is to build the main frontend of the website and authenticate the users. Any technical problem will addressed to manager or during office hours.

- [x] Monday - Holiday 
- [ ] Tuesday 
	- [x] Build the frontend of the home page (Header, Hero, About, Contact, Footer), FAQs, Success Stories Pages
- [ ] Wednesday 
	- [x] Build the Login and Sign Up Pages 
	- [x] Build More frontend components
- [ ] Thursday
	- [x] Integrate the authentication with  LinkedIn APIs
	- [x] Build Login and Sign Up Buttons
- [ ] Friday 
	- [ ] Fix any roadblock 
	- [x] Create the user profiles for the user and mentor
	- [x] Finish set goals 

Week 2 - The goal of this week is to add functionalities to the frontend and start connecting the backend. Any technical problem will addressed to manager or during office hours.

- [ ] Monday
	- [x] Office Hours 
	- [x] Create the Mentorship page where users can filter and find mentors (this include the search input)
	- [x] Write matching algorithm connected to find Mentor Button
- [ ] Tuesday 
	- [ ] Pull Data from LinkedIn Api (UNABLE)
	- [x] Use Parse4Data or Firebase to store data
- [ ] Wednesday 
	- [x] Office Hours	
	- [x] Display Search results 
- [ ] Thursday
	- [ ] Allow User to contact mentor (STRETCH)
	- [ ] Allow User to share location on Google maps (STRETCH)
- [ ] Friday 
	- [x] Fix any roadblock 
	- [x] Finish set goals 

Week 3 - The goal of this week is to meet all required features and ensure that they are fully functioning. Any technical problem will addressed to manager or during office hours.

- [ ] Monday
	- [x] Office Hours 
	- [ ] Implement Chat Features (STRETCH)
- [ ] Tuesday 
	- [ ] Search Translation feature implemented 
	- [x] test matching algorithm is fully function. Can it auto suggest mentors based on user's chosen filters.
- [ ] Wednesday 
	- [x] Office Hours	
	- [x] How can we differentiate mentees and mentors?? 
- [ ] Thursday
	- [x] Debug??
	- [x] Fix??
- [ ] Friday 
	- [x] Fix any roadblock 
	- [x] Finish set goals 

Week 4 - the goal of this week is to fix any ongoing issue, and hit optional features

Week 5 - The goal os this week is to polish code and UI 

Week 6 - Ensure that all core features are met and website is fully functionning and hosted

Week 7 - Prepare and present project


