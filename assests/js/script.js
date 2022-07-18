// This is the javascript file
var mainScreenDOM = document.querySelector("#outerClass");
var mainScreenDOMJQ = $('#outerClass');

var searchNewReleaseList = $('#nowShowing');



function buttonClickNewRelease(event) {
    var appID = 'edae2dbf4933f27205a897a516b34101';
    var apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ appID;
    console.log('Got Here');
  
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    mainScreenDOMJQ.empty();
    for( var i = 0 ; i < data.results.length; i++){
        var outerLayer = document.createElement("div");
        var posterPath = 'https://image.tmdb.org/t/p/w500'+data.results[i].poster_path;
        outerLayer.classList.add('columns', 'is-multiline');
        console.log(posterPath);

        var cardLayer = document.createElement("div");
        cardLayer.classList.add('column','is-one-quarter-desktop','is-half-tablet');

        var cardLayerInner = document.createElement("div");
        cardLayerInner.classList.add('card');

        var cardImage = document.createElement("div");
        cardImage.classList.add('card-image');

        var cardFig = document.createElement("figure");
        cardFig.classList.add('image','is-3by2');

        var cardImg = document.createElement("img");
        cardImg.setAttribute('src', posterPath);

        cardFig.appendChild(cardImg);
        cardImage.appendChild(cardFig);
        cardLayerInner.appendChild(cardImage);
        cardLayer.appendChild(cardLayerInner);
        outerLayer.appendChild(cardLayer);
        mainScreenDOM.appendChild(outerLayer);
    }
  });
};



searchNewReleaseList.on('click', buttonClickNewRelease);