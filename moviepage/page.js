const movieImg = document.getElementById("movie-img");
const movieTitle = document.getElementById("movie-title");
const movieRating = document.getElementById("movie-rating");
const movieLanguage = document.getElementById("movie-language");
const movieCountry = document.getElementById("movie-country");
const movieRuntime = document.getElementById("movie-runtime");
const title = document.getElementById("title");
const movieGenre = document.getElementById("movie-genre");
const moviePlot = document.getElementById("movie-plot");
const movieActors = document.getElementById("movie-actors");
const movieDirector = document.getElementById("movie-director");
const movieReleasedYear = document.getElementById("movie-released");
const movieBoxOffice = document.getElementById("movie-box-office");

async function getDetails() {
  const id = getID();

  console.log(id);
  if (id) {
    // api call
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=69346ae`
    )
      .then((data) => data.json())
      .catch((err) => console.log(err));

    // console.log(response);

    // displaying data in page.html

    title.innerText = response.Title ? response.Title : "Title Not Found";
    movieImg.src = response.Poster;
    movieImg.alt = response.Title;

    movieTitle.innerText = "Name : " + response.Title;

    movieRating.innerText =
      "Rating : " +
      response.imdbRating +
      `${response.imdbRating === "N/A" ? "" : "/10"}`;

    movieLanguage.innerHTML = "Language : " + response.Language;
    movieCountry.innerText = "Country : " + response.Country;

    movieRuntime.innerText = "Runtime : " + response.Runtime;

    movieGenre.innerText = "Genre : " + response.Genre;

    moviePlot.innerText = "Plot : " + response.Plot;

    movieActors.innerText = "Actors : " + response.Actors;
    movieDirector.innerText = "Director : " + response.Director;
    movieReleasedYear.innerText =
      "Released Year : " + `${response.Relased ? response.Relased : "N/A"}`;
    movieBoxOffice.innerText =
      "Box Office Collection : " +
      `${response.BoxOffice ? response.BoxOffice : "N/A"}`;
  }
}

getDetails();

// return the id
function getID() {
  let string = window.location.href;
  let strLen = string.length;
  const id = string.substring(string.indexOf("?") + 4, strLen);
  // console.log(id);
  return id;
}
