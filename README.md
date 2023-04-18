# CONSOLE.LOG(KATA)

## Description

**Important concepts of the app:**

**Katas**: are unresolved javascript functions with pre-instructions to resolve them by returning what the instructions ask for

**Champions**: Games with users, to solve katas, where there is only one winner

This application is called Console.log(KATA) and it is an application to solve katas, such as function puzzles with instructions

 ![Home page Desktop](/src/assets/images/Readme/Home.png)
 ![Home page Mobile](/src/assets/images/Readme/Home%20Mobile.png)
 ![Profile Movil](/src/assets/images/Readme/Profile%20Mobile.png)
 ![Kata Detail Desktop](/src/assets/images/Readme/Kata%20Detail.png)
 

---
## Instructions

**SAMPLE .ENV**
```bash
REACT_APP_GITHUB="Client Id Github oath"
REACT_APP_BACKEND_URL="for example: http://localhost:8080"
REACT_APP_GITHUB_OAUTH_REDIRECT_URL="url redirect login localhost 3000"
REACT_APP_GOOGLE="client Id google Oauth"
REACT_APP_GOOGLE_SECRET="Secret Client Id google Oauth"
```

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 3000**.



Then, run:
```bash
npm install
```

To start the project run:
```bash
npm run start
```

---
## User stories 

### MVP

- User can sign up and create a new account
- User can login with Google, Github and an own login
- User can log out
- User can search katas by name, levels, and in order of levels 
- User can create solutions, create comments and see your solutions or comments and those of the rest
- User can console.log() everything on the kata function, and see the result of every code that writes

### Backlog

- User can create a Champions (to fight with other users)
- User can edit their avatar and username 
- User can see your Champions departure requests on Navbar
- User can Accept Champions request
- User can Start a Champions with other opponents (users)
- User can win a game and see their finished games

---

## Useful links

- [Presentation slides](https://slides.com/andrea_0o0_/console-log-kata/fullscreen)
- [Backend repository](https://github.com/Andrea0o0/Console.log-Backend)
- [Backend deploy](https://kataapp.fly.dev/)
- [Deployed app](https://console-log-kata.netlify.app/)


