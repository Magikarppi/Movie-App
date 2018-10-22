const params = (new URL(document.location)).searchParams;
const searchTerm = params.get('search');
const movies_div = document.querySelector('.movies_container');
const loader = document.querySelector('.loader');
const input = document.querySelector('input');
const form = document.querySelector('form');

const state = {
    searchTerm: '',
    results: {
        movie: [] 
    }
};

state.searchTerm = searchTerm;

input.addEventListener('keyup', function (e) {
    state.searchTerm = input.value;
});

form.addEventListener('submit', function(e){
    e.preventDefault();
        if(history.pushState){
            var newURL = window.location.protocol + '//' + window.location.host + window.location.pathname + '?search=' + state.searchTerm;
            window.history.pushState({path:newURL},'', newURL);
        }
    getMovie();
});


getMovie();

function getMovie(){
    state.results.movie.page = 1;
    getMovieApi(state.searchTerm, state.results.movie.page)
        .then(json => state.results.movie = json)
        .then(renderMovies);  
}

async function getMovieApi(searchTerm, pageNumber){
    loader.classList.add('active');
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=521a54d05a71e09e0c762514575059a7&language=en-US&page=${pageNumber}&include_adult=true&query=${searchTerm}`);
    const json = await response.json();
    return json;
}

function getMoreMovies() {
    state.results.movie.page++;
    getMovieApi(state.searchTerm, state.results.movie.page)
        .then(function(data){
            data.results.forEach(function (element) {
                state.results.movie.results.push(element);
            })
        })
        .then(renderMovies);
}

function renderMovies(){
    input.value = state.searchTerm;
    loader.classList.remove('active');
    movies_div.innerHTML = '';
    if (state.results.movie.results === null || state.results.movie.results.length === 0){
        movies_div.innerHTML = '<p>The search resulted in zero movies</p>';
    }
    const results_num = document.createElement('p');
    results_num.classList.add('results_num');
    results_num.innerHTML = `Search results: ${state.results.movie.results.length} movies`;
    movies_div.appendChild(results_num);
    

    state.results.movie.results.forEach(element =>{
        const a = document.createElement('a');
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const img = document.createElement('img');
        const overview = document.createElement('p');
        h2.innerHTML = element.title;
        h3.innerHTML = element.release_date;
        overview.innerHTML = element.overview;
        const img_baseURL = "https://image.tmdb.org/t/p/w500";
        a.href = `G:KOODAuS/projektit/Leffasivu/movieInfo.html?movieId=${element.id}&query=${searchTerm}`;
        img.src = `${img_baseURL}${element.poster_path}`;
        if (element.poster_path === null){
            img.src = "noImage.png"
        }
        img.classList.add('movie_img');
        a.classList.add('info');
        div.classList.add('movie_details');
        h2.classList.add('title');
        h3.classList.add('release_date');
        overview.classList.add('overview');
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(overview);
        a.appendChild(img);
        a.appendChild(div);
        movies_div.appendChild(a);
    });
    if (state.results.movie.page < state.results.movie.total_pages){
        const more_div = document.createElement('div');
        more_div.classList.add('more_movies');
        more_div.textContent = 'More';
        movies_div.appendChild(more_div);
        const load = document.querySelector('.more_movies');
        load.addEventListener('click', function(){
            getMoreMovies();
        });
    }
    
}
