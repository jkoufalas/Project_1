// This is the javascript file
var mainScreenDOM = document.querySelector("#outLayer");
var mainScreenDOMJQ = $('#outLayer');

var searchNewReleaseList = $('#nowShowing');
var searchPopularList = $('#Popular');
var searchTopRatedList = $('#TopRated');
var searchList = $('#search');
var favouritesList = $('#favourites');
var openMovieModal = document.querySelector("#ex1");
var bodyLoc = document.querySelector("body");




var favoriteList;


function init() {
  favoriteList = [];
  favoriteList.push(238);
  favoriteList.push(438148);
  favoriteList.push(616037);
  favoriteList.push(361743);
  favoriteList.push(453395);
};

function buttonClickNewRelease(event) {
    var appID = 'edae2dbf4933f27205a897a516b34101';
    var apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ appID;
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displayMovieList(data);
  });
};

function buttonClickPopular(event, pageNum) {
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key='+ appID + '&language=en-US&page='+ pageNum;
  
fetch(apiUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  displayMovieList(data);
});
};

function buttonClickTopRated(event, pageNum) {
  console.log("data");

  var appID = 'edae2dbf4933f27205a897a516b34101';
  //var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+ appID + '&language=en-US&page='+ pageNum;
  
fetch(apiUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  displayMovieList(data);
});
};

function buttonSearch(event, title) {

  var appID = 'edae2dbf4933f27205a897a516b34101';
  var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key='+ appID + '&language=en-US&page='+ pageNum + '&query=' + title;

fetch(apiUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  displayMovieList(data);
});
};

function buttonOpenModal(event) {
  var element = event.target;
  var movieNum = element.getAttribute("movie-id");
  console.log("button Pressed - "+movieNum);

  openMovieModal.setAttribute("style", "display: inline-block");
  bodyLoc.setAttribute("style", "display: inline-block; overflow: hidden");
  /*
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key='+ appID + '&language=en-US&page='+ pageNum + '&query=' + title;

fetch(apiUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  displayMovieList(data);
});
*/
};

function buttonSearchFavourites(event) {
  mainScreenDOMJQ.empty();

  for( var i = 0 ; i < favoriteList.length; i++){
    var appID = 'edae2dbf4933f27205a897a516b34101';
    var apiUrl = 'https://api.themoviedb.org/3/movie/' + favoriteList[i] + '?api_key='+ appID + '&language=en-US';
  
    fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {    
      
      var posterPath = 'https://image.tmdb.org/t/p/w500'+data.poster_path;
 
      var cardLayer = document.createElement("div");
      cardLayer.classList.add('column','is-one-quarter-desktop','is-half-tablet');

      var cardLayerInner = document.createElement("div");
      cardLayerInner.classList.add('card');

      var cardLink = document.createElement("a");
      cardLink.setAttribute('href', "#");

      var cardImage = document.createElement("div");
      cardImage.classList.add('card-image');

      var cardFig = document.createElement("figure");
      cardFig.classList.add('image','is-5by2');

      var cardImg = document.createElement("img");
      cardImg.setAttribute('src', posterPath);
      cardImg.setAttribute('movie-id', data.id);


      cardFig.appendChild(cardImg);
      cardImage.appendChild(cardFig);
      cardLink.appendChild(cardImage);
      cardLayerInner.appendChild(cardLink);
      cardLayer.appendChild(cardLayerInner);
      mainScreenDOM.appendChild(cardLayer);
      




    });
  }
    

  }


var displayMovieList = function (data){
  mainScreenDOMJQ.empty();
    for( var i = 0 ; i < data.results.length; i++){
        //this skips movies with no posters
        if(data.results[i].poster_path == null){
          continue;
        }
        var posterPath = 'https://image.tmdb.org/t/p/w500'+data.results[i].poster_path;
 
        var cardLayer = document.createElement("div");
        cardLayer.classList.add('column','is-one-quarter-desktop','is-half-tablet');

        var cardLayerInner = document.createElement("div");
        cardLayerInner.classList.add('card');

        var cardLink = document.createElement("a");
        cardLink.setAttribute('href', "#");

        var cardImage = document.createElement("div");
        cardImage.classList.add('card-image');

        var cardFig = document.createElement("figure");
        cardFig.classList.add('image','is-5by2');

        var cardImg = document.createElement("img");
        cardImg.setAttribute('src', posterPath);
        cardImg.setAttribute('movie-id', data.results[i].id);

        cardFig.appendChild(cardImg);
        cardImage.appendChild(cardFig);
        cardLink.appendChild(cardImage);
        cardLayerInner.appendChild(cardLink);
        cardLayer.appendChild(cardLayerInner);
        mainScreenDOM.appendChild(cardLayer);
    }
};

init();



searchNewReleaseList.on('click', buttonClickNewRelease);
searchPopularList.on('click', event =>  buttonClickPopular(event, 1));
searchTopRatedList.on('click', event => buttonClickTopRated(event, 1));
searchList.on('click', event => buttonSearch(event, "minion"));
favouritesList.on('click', buttonSearchFavourites);
mainScreenDOMJQ.on('click', buttonOpenModal);
