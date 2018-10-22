const url =  "https://api.themoviedb.org/3/trending/all/day?api_key=521a54d05a71e09e0c762514575059a7";
const input = document.querySelector('input');
const form = document.querySelector('form');
const trending = document.querySelector('#trendingInfo');
form.addEventListener('submit', function(e){
    e.preventDefault();
})
input.addEventListener('keyup', function (e) {
    const keyName = e.key;

    if (keyName === 'Enter') {
        const searchParam = input.value;
        location.href = "G:/KOODAuS/Projektit/Leffasivu/MovieWebsite.html" + "?search=" + searchParam;
    }
})

async function trendingMovie(){
    const response = await fetch(url);
    const json = await response.json();
    const i = Math.floor(Math.random() * json.results.length);
    const posterPath = json.results[i].poster_path;
    const backdropPath = json.results[i].backdrop_path;
    const trendingBaseURL = "https://image.tmdb.org/t/p/w185";
    const trendingMovieSmall = trendingBaseURL + posterPath;
    document.body.style.background = ` 
  linear-gradient(
    rgba(0, 0, 0, .1),  
    rgba(80, 44, 84, .7)
  ), url('https://image.tmdb.org/t/p/w1280${backdropPath}')`;
    const imageElement = document.createElement('img');
    imageElement.src = trendingMovieSmall;
    imageElement.classList.add('trendingMovieSmall');
    const movieInfo = document.createElement('div');
    const moviePic = document.createElement('div');
    const movieRating = document.createElement('div');
    movieInfo.classList.add('movieInfo');
    moviePic.classList.add('moviePic');
    movieRating.classList.add('movieRating');
    const trendingLink = document.createElement('a');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    p.innerHTML = `${json.results[i].vote_average} <span class='rating_text'>Rating</span>`;
    if (json.results[i].title == undefined){
        h2.innerHTML = json.results[i].name;
    } else {
        h2.innerHTML = json.results[i].title;
    }
    if (json.results[i].release_date === undefined){
        h3.innerHTML = '';
    } else {
    h3.innerHTML = json.results[i].release_date;
    }
    trendingLink.setAttribute('href', 'G:KOODAuS/projektit/Leffasivu/movieInfo.html?movieId=' + 
    json.results[i].id + '&query=' + json.results[i].title);
    trendingLink.classList.add('trendingLink');
    moviePic.appendChild(imageElement);
    movieInfo.appendChild(h2);
    movieInfo.appendChild(h3);
    movieRating.appendChild(p);
    trendingLink.appendChild(movieInfo);
    trendingLink.appendChild(moviePic);
    trendingLink.appendChild(movieRating);
    trending.appendChild(trendingLink);
    document.querySelector("#trendingInfo").appendChild(trendingLink);
}
window.addEventListener("load", trendingMovie); 