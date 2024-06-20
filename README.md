# Social Network API

## Description
This is a basic social network app backend, consisting of routes that an administrator can build into an app that will allow them to do CRUD on users, friends, "thoughts" (posts) and "reactions" (comments on those posts)

## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Badges](#badges)
  - [Contribution](#contribution)
  - [Contact Me](#contact)

  ## Installation
  With Node.js, one simply needs to download the repo and use ```npm i && npm run seed && npm start``` and then one can access the API through a browser like insomnia.

  ## Usage
  Included with this repo is a demo video of how to use the features of the API, simply open the file titled DEMO.webm in whatever video program of choice for a comprehensive example. To use the API, one must first seed the database. Seeding data is included, but a user would obviously be encouraged to fill the database with information that might actually be relevant and seeding information isn't strictly necessary for the database to run but it will make getting experience with the routes more fluid. Once the database is seeded and run with ```npm start``` users can access the database on their local machine at localhost:3001. There is no HTML page attached to these sites, so a user would have to use a browser like Insomnia that allows for other kinds of requests in the URL (strictly speaking this can be done in Chrome or most web browsers, it is just much easier in a dedicated browser). The two main branches of the API are ```users``` and ```thoughts```, with friends and reactions being a subset of those two branches respectively.

  ## Badges
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## How to Contribute
  Users that seek to contribute can simply fork and use as they please, or if they seek to contribute further to the model itself there is room to expand. Obviously for this to be used for a real social media, one needs to add authorization of what user is logged in. Currently all that needs to happen for friends to add one another is for one to enter the id of another and they are both added, but in a normal social media environment one must consent to being added as a friend. To implement this we would probably need to add a new field on the user model, probably an array of user Id's of all the people that have sent friend requests to a user. A route to send a friend request, a route to delete a friend request from the sender's side, a route to decline/delete a friend request from the recipient's side. "Accepting" a friend request could just use the current add friends route and delete the friend request from the recepient's side. Another thing that could be added is a "media" field for posts and perhaps also reactions. This would probably be fairly trivial to add on the database side but might involve a lot of deciding on limits for file sizes.

  ## Contact
  My github is [danaptoneil](https://github.com/danaptoneil)

   My email is is danpatoneil@gmail.com

  ## License
  This project is published under the [MIT](https://opensource.org/licenses/MIT) license
