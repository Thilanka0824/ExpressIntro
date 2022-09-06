const express = require("express");
const app = express();
const port = 3000;

const today = new Date();
const name = "Thilanka(Tah-Lahgn-Kah) Rodrigo"
const favoriteMovieList = [
  "Street Kings",
  "Heat",
  "Ready Player One",
  "Step Brothers",
  "The Town",
  "Watchmen",
];

const movieString = favoriteMovieList.join(", "); 

const person = 
{   
    firstName: "Thilanka (Tah-Lahgn-Kah)",
    lastName: "Rodrigo",
    movies: favoriteMovieList
};


app.get("/", (req, res) => {
  res.send(`My name is ${person.firstName} ${person.lastName} and today's date is ${today}`);
});

app.get('/list-movies', (req, res) => {
    res.send(`Favorite movies: ${movieString}`);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
