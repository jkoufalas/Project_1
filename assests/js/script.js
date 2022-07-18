// This is the javascript file
var mainScreenDOM = document.querySelector("#outLayer");
var mainScreenDOMJQ = $('#outLayer');

var searchNewReleaseList = $('#nowShowing');
var searchPopularList = $('#Popular');
var searchTopRatedList = $('#TopRated');

var PopularPageNum;
var topRatedPageNum;




function buttonClickNewRelease(event) {
    var appID = 'edae2dbf4933f27205a897a516b34101';
    var apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ appID;
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayMovieList(data);
  });
};

function buttonClickPopular(event) {
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

function buttonClickTopRated() {
  console.log("data");

  var appID = 'edae2dbf4933f27205a897a516b34101';
  //var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key='+ appID + '&language=en-US&page='+ pageNum;
  
fetch(apiUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  displayMovieList(data);
});
};

var displayMovieList = function (data){
  mainScreenDOMJQ.empty();
    for( var i = 0 ; i < data.results.length; i++){

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

        cardFig.appendChild(cardImg);
        cardImage.appendChild(cardFig);
        cardLink.appendChild(cardImage);
        cardLayerInner.appendChild(cardLink);
        cardLayer.appendChild(cardLayerInner);
        mainScreenDOM.appendChild(cardLayer);
    }

};



searchNewReleaseList.on('click', buttonClickNewRelease);
searchPopularList.on('click', buttonClickPopular);
searchTopRatedList.on('click', buttonClickTopRated);