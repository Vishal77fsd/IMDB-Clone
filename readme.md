# IMDB Clone

`Show Menu -> ` if isMenuOpen is true then show the menu hide it otherwise.

`searchInput -> ` if user type anything on the search bar then this will remove all of its previous children nodes and add new search text result.

`fetchMovies -> ` call the omdbapi and fetch the data

`watchlistEle -> ` if user click on bookmark icon then it will add it to watchlist and store the movie id in **localStorage**.

`removeElementFromWatchList() -> ` removes the element from localStorage.

`getDetails() -> ` fetch the details of movie using id and display it on DOM.

`getID -> ` Extract the id from the **window.location.href**.
