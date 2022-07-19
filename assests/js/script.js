// This is the javascript file
var mainScreenDOM = document.querySelector("#outLayer");
var mainScreenDOMJQ = $('#outLayer');

var searchNewReleaseList = $('#nowShowing');
var searchPopularList = $('#Popular');
var searchTopRatedList = $('#TopRated');

var PopularPageNum;
var topRatedPageNum;

document.addEventListener('DOMContentLoaded', () => {
  let bodyElement = document.querySelector("body")
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
    bodyElement.style.position = "fixed";
    bodyElement.style.overflow = "hidden";
    bodyElement.style.width = "100%";
    bodyElement.style.height = "100%";
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
    bodyElement.style.position = "unset";
    bodyElement.style.overflow = "unset";
    bodyElement.style.width = "unset";
    bodyElement.style.height = "unset";
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});




function buttonClickNewRelease(event) {
  var appID = 'edae2dbf4933f27205a897a516b34101';
  var apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + appID;

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
  var apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + appID + '&language=en-US&page=' + pageNum;

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
  var pageNum = 1;
  var apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + appID + '&language=en-US&page=' + pageNum;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayMovieList(data);
    });
};

var displayMovieList = function (data) {
  mainScreenDOMJQ.empty();
  for (var i = 0; i < data.results.length; i++) {

    var posterPath = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;

    var cardLayer = document.createElement("div");
    cardLayer.classList.add('column', 'is-one-quarter-desktop', 'is-half-tablet');

    var cardLayerInner = document.createElement("div");
    cardLayerInner.classList.add('card');

    var cardLink = document.createElement("a");
    cardLink.setAttribute('href', "#");

    var cardImage = document.createElement("div");
    cardImage.classList.add('card-image');

    var cardFig = document.createElement("figure");
    cardFig.classList.add('image', 'is-5by2');

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