function openNav() {
    document.getElementById("mobile-nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mobile-nav").style.width = "0%";
}

// VIDEO MODAL ===============================================================================
var vModal = document.getElementById("vModal");
var youtubeVideo = document.getElementById("youtubeVideo");

window.onclick = function (event) {
    if (event.target == vModal) {
        youtubeVideo.setAttribute("src", "");
        vModal.style.display = "none";
    }
};

function playVideo(videoID) {
    vModal.style.display = "flex";
    youtubeVideo.setAttribute("src", "https://www.youtube.com/embed/" + videoID + "?rel=0&amp;showinfo=0&autoplay=1");
}

// TRAILERS ===================================================================================
var trailersList = document.getElementById("trailersList");
var dataID = trailersList.getAttribute("dataType");

function fetchData(database) {
    fetch('https://greatermovies.com/trailers/data/' + database + '.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    data.trailers.forEach(function (obj) {
                        if (obj.image.includes("http")) {
                            if (!trailersList.innerHTML.includes(obj.title)) {
                                var trailerCard = document.createElement("article");
                                trailerCard.className = "trailer-card";
                                trailerCard.onclick = function () {
                                    playVideo(obj.video_url.replace("https://www.youtube.com/watch?v=", ""));
                                };

                                var cardTrailer = document.createElement("article");
                                cardTrailer.className = "card-trailer";

                                var cardPlay = document.createElement("img");
                                cardPlay.className = "trailer-play";
                                cardPlay.src = "https://greatermovies.com/static/play.png";
                                cardPlay.alt = "play";

                                var cardPoster = document.createElement("img");
                                cardPoster.title = obj.title;
                                cardPoster.alt = obj.title;
                                cardPoster.src = obj.image;

                                var cardTitle = document.createElement("h2");
                                cardTitle.innerText = obj.title;

                                cardTrailer.appendChild(cardPlay);
                                cardTrailer.appendChild(cardPoster);
                                cardTrailer.appendChild(cardTitle);

                                trailerCard.appendChild(cardTrailer);

                                trailersList.appendChild(trailerCard);
                            }
                        } else {
                            console.log("NO_IMG");
                        }
                    });
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function getData(database) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.responseText);

            data.trailers.forEach(function (obj) {
                if (obj.image.includes("http")) {
                    if (!trailersList.innerHTML.includes(obj.title)) {
                        var trailerCard = document.createElement("article");
                        trailerCard.className = "trailer-card";
                        trailerCard.onclick = function () {
                            playVideo(obj.video_url.replace("https://www.youtube.com/watch?v=", ""));
                        };

                        var cardTrailer = document.createElement("article");
                        cardTrailer.className = "card-trailer";

                        var cardPlay = document.createElement("img");
                        cardPlay.className = "trailer-play";
                        cardPlay.src = "https://greatermovies.com/static/play.png";
                        cardPlay.alt = "play";

                        var cardPoster = document.createElement("img");
                        cardPoster.title = obj.title;
                        cardPoster.alt = obj.title;
                        cardPoster.src = obj.image;

                        var cardTitle = document.createElement("h2");
                        cardTitle.innerText = obj.title;

                        cardTrailer.appendChild(cardPlay);
                        cardTrailer.appendChild(cardPoster);
                        cardTrailer.appendChild(cardTitle);

                        trailerCard.appendChild(cardTrailer);

                        trailersList.appendChild(trailerCard);
                    }
                }
            });
        } else {
            console.log(this.status);
        }
    };

    xhttp.open("GET", 'https://greatermovies.com/trailers/data/' + database + '.json', true);
    xhttp.send();
}

if (dataID !== "") {
    getData(dataID);
}

// Notifications ==========================================================================
var OneSignal = window.OneSignal || [];
OneSignal.push(function () {
    OneSignal.init({
        appId: "b475ce00-919f-47cc-a6a6-d68dbd1087a9",
        autoRegister: false,
        notifyButton: {
            enable: true,
        },
    });
});