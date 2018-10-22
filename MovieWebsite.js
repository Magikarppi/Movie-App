const url = "https://api.themoviedb.org/3/search/movie?api_key=521a54d05a71e09e0c762514575059a7&language=en-US&page=1&include_adult=false&query=";

function runSearch() {
    const windowURL = window.location.href;
    const movieURL = new URL(windowURL);
    const searchParam = movieURL.searchParams.get("search");
    var urlSearch = url + searchParam;

    fetch(urlSearch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Create list of movie search results
        for (i=0; i < data.results.length; i++){
        const movie = document.querySelector(".movies_container");
        const newDiv = document.createElement('div');
        const titleAnchor = document.createElement('a');
        const title = document.createTextNode(data.results[i].title);
        const movieImg = document.createElement('img');
        const baseURL = "https://image.tmdb.org/t/p/w500";
        const posterURL = data.results[i].poster_path;
        const imgURL = baseURL + posterURL;
        titleAnchor.appendChild(title);
        titleAnchor.href = "G:KOODAuS/projektit/Leffasivu/movieInfo.html?movieId=" + data.results[i].id
        + "&query=" + searchParam;
        movieImg.src = imgURL;
        movieImg.setAttribute('width', '175');
        movieImg.setAttribute('alt', 'na');
        movieImg.setAttribute('class', 'imageDiv'); /////
        newDiv.setAttribute('class', 'everyMovie');
        newDiv.appendChild(titleAnchor);
        newDiv.appendChild(movieImg);
        movie.appendChild(newDiv);
    }
    return data; // Should I return anything or not?
    })
    .catch(function (err) {
        console.log(err);
    })
}

window.addEventListener("load", runSearch);


