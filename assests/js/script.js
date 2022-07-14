// This is the javascript file
var mainScreenDOM = document.querySelector("#mainScreen");
var mainScreenDOMJQ = $('#mainScreen');

var searchNewReleaseList = document.querySelector("#newRelease");



function buttonClickNewRelease(event) {
    var appID = 'edae2dbf4933f27205a897a516b34101';
    var apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+ appID;
  
  //get city lat long from name
  fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    mainScreenDOMJQ.empty();
    for( var i = 0 ; i < data.results.length; i++){
        var containerList = document.createElement("img");
        var posterPath = 'https://image.tmdb.org/t/p/w500'+data.results[i].poster_path;
        containerList.setAttribute('src', posterPath);
        mainScreenDOM.appendChild(containerList);
    }
  });
}



searchNewReleaseList.addEventListener('click', buttonClickNewRelease);