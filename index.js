const verticalLogo = document.getElementById("vertical");
const horizontalLogo = document.getElementById("horizontal");
const menu = document.getElementById("menu");
const moviesSection = document.getElementById("movies-section");
const more = document.getElementById("more");

let isMenuOpen = false;
let searchInput = document.getElementById("search-text");

// is menu open or not
verticalLogo.addEventListener("click", () => {
  verticalLogo.classList.add("hidden");
  horizontalLogo.classList.remove("hidden");
  horizontalLogo.classList.add("block");
  isMenuOpen = true;
  showMenu();
});

horizontalLogo.addEventListener("click", () => {
  verticalLogo.classList.remove("hidden");
  verticalLogo.classList.add("block");
  horizontalLogo.classList.add("hidden");
  isMenuOpen = false;
  showMenu();
});

// if isMenuOpen is true the show other wise hide
function showMenu() {
  if (isMenuOpen) {
    menu.classList.remove("hidden");
    menu.classList.add("block", "animate-upDown");
  } else {
    menu.classList.replace("animate-upDown", "animate-downUp");
    menu.classList.remove("block");
    menu.classList.add("hidden");
  }
}

// add event listener on searchInput
searchInput.addEventListener("keyup", (e) => {
  let searchText = e.target.value;

  // removing previous child nodes
  if (moviesSection.hasChildNodes()) {
    while (moviesSection.hasChildNodes()) {
      moviesSection.removeChild(moviesSection.firstChild);
    }
  }
  fetchMovies(searchText);
});

// page to go on another page
let page = 1;
async function fetchMovies(searchText) {
  // console.log(searchText ? searchText : "batman");
  const response = await fetch(
    `https://www.omdbapi.com/?s=${
      searchText ? searchText : "random"
    }&page=${page}&apikey=69346ae`
  );

  // parsing the response in json
  const movies = await response.json();
  // console.log(movies.totalResults);

  let data = movies.Search;

  if (data) {
    data.map((movie) => {
      //   console.log(movie);
      const movieId = movie.imdbID;

      // check for watchlist
      let watchLists = JSON.parse(localStorage.getItem("movieslist"));
      let isWatchList = watchLists?.includes(movieId);
      //   Creating ele for ul
      const ele = document.createElement("li");
      const imgEle = document.createElement("img");
      const divEle = document.createElement("div");

      const divContainer = document.createElement("div");
      const watchlistEle = document.createElement("img");

      //   divContainer element
      divContainer.innerText = `${
        isWatchList ? "Added to watchlist" : "Add to watchlist"
      }`;
      divContainer.classList.add("ml-2", "mt-2", "text-red-400");

      //   watchlist element
      watchlistEle.src = `${
        isWatchList ? "./assets/bookmarkwhite.png" : "./assets/bookmark.png"
      }`;

      watchlistEle.classList.add("h-[20px]");
      watchlistEle.alt = movieId;
      watchlistEle.dataset.id = movieId;
      watchlistEle.classList.add("invert");

      // add watchlist to local storage
      watchlistEle.addEventListener("click", (e) => {
        // movieslist
        let movieId = [];
        movieId.push(e.target.dataset.id);

        let oldMoviesId = JSON.parse(localStorage.getItem("movieslist"));

        if (oldMoviesId === null) {
          localStorage.setItem("movieslist", JSON.stringify(movieId));
        } else {
          // if movieId is already there then remove it
          if (oldMoviesId.includes(movieId[0])) {
            console.log(movieId[0]);
            let newMovieId = oldMoviesId.filter((id) => id !== movieId[0]);
            localStorage.setItem("movieslist", JSON.stringify(newMovieId));
          } else {
            let newMovieId = [...oldMoviesId, movieId[0]];
            localStorage.setItem("movieslist", JSON.stringify(newMovieId));
          }
        }

        window.location = `https://64c240d9d36fab6eb3dbc8d6--statuesque-puppy-cd9c8f.netlify.app/index.html`;
      });

      divContainer.appendChild(watchlistEle);
      //   adding class to the element
      ele.classList.add(
        "h-[28rem]",
        "border",
        "rounded-md",
        "w-[15rem]",
        "cursor-pointer",
        "bg-black",
        "overflow-hidden",
        "text-white",
        "font-mono"
      );
      imgEle.classList.add(
        "object-cover",
        "h-[20rem]",
        "w-[15rem]",
        "m-auto",
        "overflow-hidden"
      );
      divEle.classList.add(
        "font-semibold",
        "text-left",
        "mt-2",
        "ml-2",
        "text-[16px]",
        "text-wrap"
      );

      imgEle.src = movie.Poster;
      imgEle.alt = movie.Title;
      imgEle.dataset.id = movie.imdbID;
      ele.appendChild(imgEle);
      ele.appendChild(divEle);
      ele.appendChild(divContainer);

      divEle.innerText = movie.Title.substring(0, 20);
      moviesSection.appendChild(ele);

      // addeventlistener on imgEle to open it in new page
      imgEle.addEventListener("click", (e) => {
        console.log(e.target);
        window.location = `https://64c217dc1e18e8575cb34a91--statuesque-puppy-cd9c8f.netlify.app/moviepage/page.html?id=${imgEle.dataset.id}`;
      });
    });
  }
}

// handling click on more
more.addEventListener("click", () => {
  if (page < 10) {
    page++;
    fetchMovies();
  }
});

fetchMovies();
