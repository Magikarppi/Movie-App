const searchTerm = (new URL(document.location)).searchParams.get('query');
const movieId = (new URL(document.location)).searchParams.get('movieId');
const loader = document.querySelector('.loader');
const movie_container = document.querySelector('.movie_container');
const movie_wrapper = document.querySelector('.movie_wrapper');

const state = {
    movie: undefined
}

function getTheMovie(movieId){
    loader.classList.add('active');
    return fetch( `https://api.themoviedb.org/3/movie/${movieId}?api_key=521a54d05a71e09e0c762514575059a7&language=en-US&append_to_response=videos,recommendations`)
    .then(response => response.json())
    .then(data => state.movie = data)
}

getTheMovie(movieId)
    .then(renderMovie)
    .then(renderRecommend);

function renderMovie(){
    document.body.style.background = `
        linear-gradient(
            rgba(0, 0, 0, .7),  
            rgba(80, 44, 84, .9)
          ), url('https://image.tmdb.org/t/p/w1280/${state.movie.backdrop_path}')`;
    const movie_info_div = document.createElement('div');
    const movie_pic_div = document.createElement('div');
    const movie_img = document.createElement('img');
    const plot = document.createElement('p');
    const rating = document.createElement('p');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const a = document.createElement('a');
    const linkText = document.createTextNode('Back');
    a.classList.add('a_back');
    a.appendChild(linkText);
    a.title = 'More details';
    if (searchTerm === '') {
        a.href = 'index.html'
    } else {
        a.href = 'MovieWebsite.html' + '?search=' + searchTerm;
    }
    movie_info_div.classList.add('movie_info');
    movie_pic_div.classList.add('movie_pic');
    movie_img.classList.add('movie_img');
    rating.classList.add('rating');
    
    movie_img.src = `https://image.tmdb.org/t/p/w300/${state.movie.poster_path}`;
    movie_pic_div.appendChild(movie_img);
    
    if (state.movie.title === undefined){
        h2.innerHTML = state.movie.name;
    } else {
        h2.innerHTML = state.movie.title;
    }
    if (state.movie.release_date === undefined){
        h3.innerHTML = '';
    } else {
        h3.innerHTML = state.movie.release_date
    }
    
    plot.innerHTML = state.movie.overview;
    if (state.movie.rating === undefined){
        rating.innerHTML = '';
    } else {
    rating.innerHTML = state.movie.rating;
    }

    movie_info_div.appendChild(h2);
    movie_info_div.appendChild(h3);
    movie_info_div.appendChild(plot);
    movie_info_div.appendChild(rating);
    movie_container.appendChild(movie_info_div);
    movie_container.appendChild(movie_pic_div);
    movie_wrapper.appendChild(a);
    movie_wrapper.appendChild(movie_container);

    
    let trailer = state.movie.videos.results.find(trailer => trailer.type === 'Trailer');
    
    if (trailer) {
        const a_trailer = document.createElement('a');
        a_trailer.href = `https://www.youtube.com/watch?v=${trailer.key}`;
        a_trailer.target = '_blank';
        a_trailer.classList.add('a_trailer');
        a_trailer.textContent = 'WATCH TRAILER';
        movie_info_div.appendChild(a_trailer);
    }
}    

    function renderRecommend(){
        const results = state.movie.recommendations.results;
        const movie_recommend_div = document.createElement('div');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        const rec_link_1 = document.createElement('a');
        const rec_link_2 = document.createElement('a');
        const rec_link_3 = document.createElement('a');
        movie_recommend_div.classList.add('movie_recommend');
        const rec_img_1 = document.createElement('img');
        const rec_img_2 = document.createElement('img');
        const rec_img_3 = document.createElement('img');
        const p_rec = document.createElement('p');
        p_rec.classList.add('p_rec');
        p_rec.innerHTML = "Recommended movies";
        rec_img_1.classList.add('rec_img');
        rec_img_2.classList.add('rec_img');
        rec_img_3.classList.add('rec_img');
        rec_img_1.src = `https://image.tmdb.org/t/p/w500/${results[0].poster_path}`
        rec_img_2.src = `https://image.tmdb.org/t/p/w500/${results[1].poster_path}`
        rec_img_3.src = `https://image.tmdb.org/t/p/w500/${results[2].poster_path}`
        rec_link_1.href = `G:KOODAuS/projektit/Leffasivu/movieInfo.html?movieId=${results[0].id}&query=${searchTerm}`;
        rec_link_2.href = `G:KOODAuS/projektit/Leffasivu/movieInfo.html?movieId=${results[1].id}&query=${searchTerm}`;
        rec_link_3.href = `G:KOODAuS/projektit/Leffasivu/movieInfo.html?movieId=${results[2].id}&query=${searchTerm}`;
        span1.classList.add('toolTipText');
        span2.classList.add('toolTipText');
        span3.classList.add('toolTipText');
        span1.innerHTML = `<strong class="rec_title">${results[0].title}</strong> ${results[0].release_date}`;
        span2.innerHTML = `<strong class="rec_title">${results[1].title}</strong> ${results[1].release_date}`;
        span3.innerHTML = `<strong class="rec_title">${results[2].title}</strong> ${results[2].release_date}`;
        rec_link_1.appendChild(rec_img_1);
        rec_link_2.appendChild(rec_img_2);
        rec_link_3.appendChild(rec_img_3);
        rec_link_1.appendChild(span1);
        rec_link_2.appendChild(span2);
        rec_link_3.appendChild(span3);
        movie_recommend_div.appendChild(p_rec);
        movie_recommend_div.appendChild(rec_link_1);
        movie_recommend_div.appendChild(rec_link_2);
        movie_recommend_div.appendChild(rec_link_3);
        movie_container.appendChild(movie_recommend_div);
        movie_wrapper.appendChild(movie_container);
    }






















































// const url = "https://api.themoviedb.org/3/search/movie?api_key=521a54d05a71e09e0c762514575059a7&language=en-US&page=1&include_adult=false&query=";

// function displayMovie(){
//     const url_string = window.location.href;
//     const movieURL = new URL(url_string);
//     const movieId = Number(movieURL.searchParams.get("movieId"));
//     const queryString = movieURL.searchParams.get("query");
//     const urlSearch = url + queryString;
//     fetch(urlSearch)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         for (i=0; i < data.results.length; i++){
//             if (data.results[i].id === movieId){
//                 document.getElementById("movieTitleP").innerHTML = data.results[i].title;
//                 const moviePosterImg = document.createElement('img');
//                 const posterPath = data.results[i].poster_path;
//                 const baseURL = "https://image.tmdb.org/t/p/w500";
//                 const imgURL = baseURL + posterPath;
//                 moviePosterImg.src = imgURL;
//                 moviePosterImg.setAttribute('width', '200');
//                 moviePosterImg.setAttribute('height', '200');
//                 moviePosterImg.setAttribute('alt', 'na');
//                 moviePosterImg.setAttribute('div', 'theImage')
//                 const moviePlot = data.results[i].overview;
//                 document.getElementById("moviePlotText").innerHTML = moviePlot;
//                 document.getElementById("moviePoster").appendChild(moviePosterImg);
//             }
//         } return data;
//     })
//     .catch(function(err) {
//         console.log(err);
//     })
// };
// window.addEventListener("load", displayMovie);