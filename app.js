
// look for a file in node_modules called express and give variable express the value of all that code in file express
const express = require("express");

// initialize the Server and Port
const app = express();
const port = 3000;

// For the assignment, make sure favoriteMovieList is in the global scope
let favoriteMovieList = [
  "Street Kings",
  "Heat",
  "Ready Player One",
  "Step Brothers",
  "The Town",
  "Watchmen"
];
let dogBreeds = ["Australian Shepard", "Pug", "Doberman"];
const person = {
  firstName: "Thilanka (Tah-Lahgn-Ka)",
  lastName: "Rodrigo",
  movies: favoriteMovieList,
};
const today = new Date();

let movieString = favoriteMovieList.join(", ");
let dogString = dogBreeds.join(", ");
let firstName = "Initial Value";

// Global scope variables so that all routes can gain access to them
let globalFirstName = null;
let globalLastName = null;
let newMovie = null;
let newDogBreed = null;

// Define the default server route (aka "/") for our server
app.get("/", (req, res) => {
  res.send(
    `My name is ${person.firstName} ${person.lastName} and today's date is ${today}`
  );
});

// An example route for sending a simple string
app.get("/hello-class", (req, res) => {
  console.log("Hello Class Route");
  res.send("Hello Class!");
});

// A route for sending a string
app.get("/favorite-movies", (req, res) => {
  res.send(`Favorite movies: ${movieString}`);
});

app.get("/dog-breeds", (req, res) => {
  console.log("dog page");
  res.send(`Dog breeds: ${dogString}`);
});

// This route will get the user's info from the query params and assign those values to the global variables
// Example url: http://localhost:4000/save-user-info?firstName=Timmy&lastName=Turner
app.get("/save-user-info", (req, res) => {
  console.log("Search Route");
  // req.query is an object containing key/value pairs of the query params entered into the url after the ?
  console.log(req.query);

  // These lines are getting the firstName and lastName query param values from req.query
  const queryParamFirstName = req.query.firstName;
  const queryParamLastName = req.query.lastName;
  console.log("queryParamFirstName ", +queryParamFirstName);
  console.log("queryParamLastName ", +queryParamLastName);

  // This res.send() will always send the user info since queryParamFirstName and queryParamLastName are in this route handler function scope
  res.send(
    "User Info => " + "Name: " + queryParamFirstName + " " + queryParamLastName
  );

  globalFirstName = queryParamFirstName;
  globalLastName = queryParamLastName;

  res.send(
    "User Info => " + "Name: " + queryParamFirstName + " " + queryParamLastName
  );
});

app.get("/show-user-info", (req, res) => {
  // This route will only work AFTER /save-user-info has been run
  res.send("User Info => " + "Name: " + globalFirstName + " " + globalLastName);
});

app.get("/search", (req, res) => {
  console.log("req.query: req.query");
  firstName = req.query.firstName;
  res.send(`Search Route. First Name: ${firstName}`);
});

app.get("/add-movie", (req, res) => {
  console.log(req.query);
  console.log(newMovie)
  newMovie = req.query.newMovie;
  res.send("saved new movie:" + newMovie);
  console.log(newMovie);
  favoriteMovieList.push(newMovie);

  console.log(favoriteMovieList);
  movieString = favoriteMovieList.join(", ");
  console.log(movieString);
});



app.get("/add-dog-breed", (req, res) => {
  console.log("add-dog-breed");
  console.log(req.query);
  newDogBreed = req.query.newDogBreed;
  res.send("Saved this new new dog breed: " + newDogBreed);
  console.log(newDogBreed);
  dogBreeds.push(newDogBreed)  
  console.log(dogBreeds)
  dogString = dogBreeds.join(", ");
  console.log(dogString);
});
//Finally, run the server!
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

