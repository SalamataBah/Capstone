## Documentation

* [Overview](#Overview)
* [Product Specs](#Product_specs)
* [Wireframes](#Wireframes)
* [Schema](#Schema)
* [Project_Plan](#Project_Plan)
* [Final_Product](#Final_Project)
	
# Overview
Description 

M&M( Match and Meet) is a website that helps students match and meet with a mentor


# Product_specs

User Stories: https://github.com/SalamataBah/Capstone-User-Stories

Core/Must-have Features:

- [x] Your app provides multiple opportunities for you to overcome difficult/ambiguous technical problems
	- [x]  Write a matching algorithm that can also auto suggest mentors 
	- [x]  View Mentor's Profile 
	- [x]  Search for someone 
	- [x]  Translate Search input in many languages(strect) 
	- [x]  Chat Feature (stretch)

- [x] Your app interacts with a database 
	- [x] 	Back4App or Firebase
- [x] You can log in/log out of your app as a user
	- [x] Implement a UI/UX for log in with a name or email and a password
- [x] You can sign up with a new user profile
	- [x] Users can sign up with Google/Facebook/LinkedIn Apis
- [x] Your app has an interesting cursor interaction (e.g. a custom tooltip on hover)
- [x] Your app demonstrates at least one component with complex visual styling (done by you, from scratch)
- [x] Your app uses a loading state to create visual polish

Stretch/Optional Features:
- [x] Having a very polished UI
- [x] Having a great App Idea that could be a real product


# Wireframes

https://www.figma.com/file/mqFEAK1kBKENVrBeT7s82P/Capstone?node-id=0%3A1
<img width="1195" alt="Screen Shot 2022-06-30 at 1 36 58 AM" src="https://user-images.githubusercontent.com/57270552/176632331-1b2b41e6-1414-4e65-95d2-2d7b035a1a5b.png">



# Schema

# Endpoints
<img width="1337" alt="Screen Shot 2022-07-11 at 11 16 41 AM" src="https://user-images.githubusercontent.com/57270552/178331138-a5fda7b4-75a3-4f9a-bdcb-5b723855cdbe.png">
<img width="825" alt="image" src="https://user-images.githubusercontent.com/57270552/178331243-516a2258-86a0-4726-a6a1-9c9606ca3bdc.png">

HTTP Verb|	Name	        |Description	                                 |User stories |
---------|----------------------|------------------------------------------------|-------------|
POST	 |profile	        |for all user profiles			         |1,2	       |
POST	 |profile/interest      |users edit their interests		         |1,2	       |
GET	 |user	                |retrieve all users	         		 |3	       |
POST	 |user	                |make changes in all user	                 |4            |
POST	 |userCoords		|get and update all user coordinates             |5            |

# Data Model

 column name	|Description	                                 |type         |
 --------------	|------------------------------------------------|-------------|
Skills	        |all users skills 			         |parse object |
Company     	|all users companies  				 |parse object |
User	        |all users info 				 |parse object |
Language	|all users languages 				 |parse object |
Match     	|all matched users 				 |parse object |
<img width="688" alt="image" src="https://user-images.githubusercontent.com/57270552/182435228-350ccfb6-c5f2-46a4-8d4b-c64fffec830d.png">

			
# Networking

List of network requests by screen

- HomeFeed/Profile
	- GET will query all user information
	- POST will query all modified user info


# Project_Plan

Week 1 - The goal of this week is to build the main frontend of the website and authenticate the users. Any technical problem will addressed to manager or during office hours.

- [x] Monday - Holiday 
- [x] Tuesday 
	- [x] Build the frontend of the home page (Header, Hero, About, Contact, Footer), FAQs, Success Stories Pages
- [x] Wednesday 
	- [x] Build the Login and Sign Up Pages 
	- [x] Build More frontend components
- [x] Thursday
	- [x] Integrate the authentication with  LinkedIn APIs
	- [x] Build Login and Sign Up Buttons
- [x] Friday 
	- [ ] Fix any roadblock 
	- [x] Create the user profiles for the user and mentor
	- [x] Finish set goals 

Week 2 - The goal of this week is to add functionalities to the frontend and start connecting the backend. Any technical problem will addressed to manager or during office hours.

- [x] Monday
	- [x] Office Hours 
	- [x] Create the Mentorship page where users can filter and find mentors (this include the search input)
	- [x] Write matching algorithm connected to find Mentor Button
- [x] Tuesday 
	- [ ] Pull Data from LinkedIn Api (UNABLE)
	- [x] Use Parse4Data or Firebase to store data
- [x] Wednesday 
	- [x] Office Hours	
	- [x] Display Search results 
- [x] Thursday
	- [ ] Allow User to contact mentor (STRETCH)
	- [ ] Allow User to share location on Google maps (STRETCH)
- [x] Friday 
	- [x] Fix any roadblock 
	- [x] Finish set goals 

Week 3 - The goal of this week is to meet all required features and ensure that they are fully functioning. Any technical problem will addressed to manager or during office hours.

- [x] Monday
	- [x] Office Hours 
	- [x] Implement Chat Features (STRETCH)
- [x] Tuesday 
	- [ ] Search Translation feature implemented 
	- [x] test matching algorithm is fully function. Can it auto suggest mentors based on user's chosen filters.
- [x] Wednesday 
	- [x] Office Hours	
	- [x] How can we differentiate mentees and mentors?? 
- [x] Thursday
	- [x] Debug??
	- [x] Fix??
- [x] Friday 
	- [x] Fix any roadblock 
	- [x] Finish set goals 

Week 4 - the goal of this week is to fix any ongoing issue, and hit optional features

Week 5 - The goal os this week is to polish code and UI 

Week 6 - Ensure that all core features are met and website is fully functionning and hosted

Week 7 - Prepare and present project


# Final_Project: 
https://www.loom.com/share/10fa54c4aeb340df8987d8d2662e5284
