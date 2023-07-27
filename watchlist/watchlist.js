const watchListMovies = document.getElementById("watchlistmovies");
const headingInfo = document.getElementById("heading-info");

const watchListData = JSON.parse(localStorage.getItem("movieslist"));
// console.log(watchListData);
if (watchListData === null) {
  headingInfo.classList.remove("hidden");
  headingInfo.classList.add("block");
} else {
  watchListData.map(async (watchlist) => {
    const liEle = document.createElement("li");
    const divEle = document.createElement("div");
    const infoDivEleContainer = document.createElement("div");
    const headingEle = document.createElement("h1");
    const ratingEle = document.createElement("h3");
    const imgEle = document.createElement("img");
    const yearEle = document.createElement("h3");
    const removeEle = document.createElement("button");

    const data = await fetch(
      `https://www.omdbapi.com/?i=${watchlist}&apikey=69346ae`
    )
      .then((data) => data.json())
      .catch((err) => console.log(err));

    //   console.log(data);
    // adding image in imgElement
    imgEle.src = data.Poster;
    imgEle.dataset.id = data.imdbID;

    headingEle.innerText = data.Title;
    ratingEle.innerText =
      data.imdbRating + `${data.imdbRating !== "N/A" ? "/10" : ""}`;
    yearEle.innerText = data.Year;
    removeEle.type = "button";
    removeEle.innerText = "Remove from watchlist";
    removeEle.dataset.id = data.imdbID;

    //   console.log(removeEle);
    //   adding ele into infoDivEleContainer
    infoDivEleContainer.appendChild(headingEle);
    infoDivEleContainer.appendChild(ratingEle);
    infoDivEleContainer.appendChild(yearEle);
    infoDivEleContainer.appendChild(removeEle);

    //    adding event listener to remove
    removeEle.addEventListener("click", (e) => removeElementFromWatchList(e));

    imgEle.addEventListener("click", (e) => {
      console.log(e.target);
      window.location = `https://64c217dc1e18e8575cb34a91--statuesque-puppy-cd9c8f.netlify.app/moviepage/page.html?id=${imgEle.dataset.id}`;
    });

    //   adding styles into removeEle
    removeEle.classList.add(
      "border",
      "p-1",
      "text-black",
      "bg-red-300",
      "rounded-md",
      "border-none"
    );

    //   adding styles into infoDivEleContainer
    infoDivEleContainer.classList.add(
      "text-white",
      "flex",
      "flex-col",
      "justify-end"
    );
    //   adding styles to liEle
    liEle.classList.add(
      "w-[25rem]",
      "p-4",
      "mt-4",
      "border",
      "grid",
      "grid-cols-2",
      "gap-0"
    );

    //   adding styles to divEle
    divEle.classList.add("h-[10rem]", "border", "m-auto", "overflow-hidden");

    //   adding style to ratingEle
    ratingEle.classList.add("text-blue-500");

    //   adding imgEle into divEle
    divEle.appendChild(imgEle);

    //   adding styles to imgEle
    imgEle.classList.add("object-contain", "w-[10rem]");

    //   adding element to li
    liEle.appendChild(divEle);
    liEle.appendChild(infoDivEleContainer);

    //   adding li to its parent
    watchListMovies.appendChild(liEle);
  });
}

// remove element from localstorage
function removeElementFromWatchList(e) {
  const id = e.target.dataset.id;

  const oldIds = JSON.parse(localStorage.getItem("movieslist"));

  //   console.log();

  if (oldIds.includes(id)) {
    const newIds = oldIds.filter((oldId) => oldId !== id);
    localStorage.setItem("movieslist", JSON.stringify(newIds));
    console.log(newIds);
  }
  window.alert("Removed from watchlist");
  window.location = "https://64c217dc1e18e8575cb34a91--statuesque-puppy-cd9c8f.netlify.app/watchlist/watchlist.html";
}
