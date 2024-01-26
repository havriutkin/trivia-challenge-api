<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Trivia Challenge API</h1>
  <p align="center">
    A RESTful API for Trivia Challege app
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#trivia-challnege-info">About Trivia Challenge App</a></li>
        <li><a href="#overview">Short Overview</a></li>
      </ul>
    </li>
    <li> <a href="#features">Features</a> </li>
    <li> <a href="#project-structure">Project Structure</a> </li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#external-api">External API Interaction</a></li>
    <li><a href="#auth">Auth</a></li>
    <li><a href="#security">Secutiry</a></li>
    <li><a href="#error-hadnling-and-logging">Error Handling And Logging</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

In this section used technologies and project goals are described

### Built With

* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]

### Trivia Challenge Info
<p>Trivia Challange app - is a web app, that allows users to complete random quizes of different difficulty and keep track of their statistics.</p>
</p>Front-end is built using React and TaillwindCSS. More <a href="https://github.com/havriutkin/trivia-challenge-client">details here</a>.</p>
<p>Back-end is built using NodeJS, ExpressJS and PostgreSQL. More <a href="https://github.com/havriutkin/trivia-challenge-api">details here</a>.</p>
<p>Deployed application: <a href="https://trivia-challenge.havriutkin.com">Trivia Challenge</a></p>

### Overview
<p>Trivia Challenge API handles back-end logic of an app. Auth logic, interaction with database, security features are implemented.</p>

<!-- Features -->
## Features
<p>API provides following fetures:</p>
<ol>
  <li>
    Auth: login, create new user, login validation. JWT tokens are used.
  </li>
  <li>
    Buisness logic: create quizes, save and retrieve user's statistcs, get information about user, upload user's profile picture.
  </li>
  <li>
    Security: cors policy, helment (for setting up headers), auth middleware, logging.
  </li>
</ol>

<!-- Project Structure -->
## Project Structure
<p>
  /public      - folder for static files <br/>
  /src         - source code of a project <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;/config
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- project's configs (db connection setup, multer configuration, static data) <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;/controllers
    &nbsp;&nbsp;&nbsp;&nbsp;- handle business logic and interaction with DB  <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;/middleware
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- custom middlewares, s.t. errorHanlder and authMiddleware  <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;/models
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- contains SQL code that represents tables in DB  <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;/routes
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- connect controllers to route paths  <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;/services
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- handle interaction with external API  <br/>
  .env         &nbsp;&nbsp;&nbsp;- contains environment variables, s.t. database credentials (included in .gitignore)  <br/>
  index.js     &nbsp;&nbsp;&nbsp;- runs the server  <br/>
  activity.log &nbsp;&nbsp;&nbsp;- contains server's logs (included in .gitignore)  <br/>
</p>


<!-- Database Shema -->
## Database Schema
<p> DB is simple and contsins two tables: user and quiz. quiz table has foreign key on user.</p>
<p> It should be noted, that quiz tables represents already completed by certain user quiz.</p>


<!-- External API -->
## External API
<p>External API <a href="https://opentdb.com/api_config.php">"Open Trivia DB"</a> is used for generating quizes in different topics and with different difficulty.</p>

<!-- Auth -->
## Auth
<p>In this project, I did not want to use middlewares like Passport.js (even session middleware was not used), because I wanted to get deeper understanding of how auth works.</p>
<p>JWT token based auth was implemented as a result. Server encrypts user data in token and attach it to cookies header of a response.</p>


<!-- Security -->
## Security
<p>CORS are implemented to accept only one client origin, to prevent malisious sites from making request to API.</p>
<p>Auth are important is such an application. App keeps track of users's statistic. Thus, without proper auth seciruty anyone can send request to certain route, and get themselfes (or to any user) fake statistics.</p>
<p>Auth is secured by http-only cookies (to prevent XSS attacks) and SHA encryption algorithm. Besides, all user's password are hashed.</p>

<!-- Error Hadnling And Logging -->
## Error Hadnling And Logging
<p>Simple error handler middleware is implemented for handling non-expected errors.</p>
<p>Common logging is implemented using morgan library. Since I don't expect a lot of activity, single file logging is used.</p>


## Contact
Vladyslav Havriutkin - [@havriutkin](https://github.com/havriutkin) - havriutkin@gmail.com

Trivia Challenge App: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew

[Node.js]: https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/en

[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com

[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-000000?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org
