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

// MOVIES ===================================================================================

function fetchDatabase() {
    var cards = document.getElementById("cards");

    if (cards !== null) {
        var database = cards.getAttribute("data-uri");

        if (database !== undefined) {
            var httpClient = new XMLHttpRequest();

            httpClient.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var json = JSON.parse(httpClient.responseText);
                    var adCount = 5;

                    for (var i = 0; i <= json.data.length - 1; i++) {
                        var index = i + 1;

                        var obj = json.data[i];

                        var card_template = '<article class="card"> <figure class="card-left"> <img alt="{#TITLE}" src="{#IMAGE}"/> </figure> <article class="card-right"> <h2> <span>#{#INDEX}</span> {#TITLE}</h2> <div class="card-ratings"> <div class="rating"> <span title="IMDb" class="imdb">IMDb</span> <span class="card-score">{#RATING}</span> </div><div class="rating"> <span title="Runtime" class="runtime"> <span class="icon-stopwatch"></span> </span> <span class="card-score">{#TIME}</span> </div></div><article title="{#TITLE} Summary" class="fan-review"> <p>{#SUMMARY}</p></article> <article class="buttons"> <a> <div class="button-trailer" onclick="playVideo(\'{#TRAILER}\');"> <span class="icon-youtube"></span> WATCH TRAILER </div></a> </article> </article> </article>';

                        if (!obj.rating.includes("/10")) {
                            rating = obj.rating + "/10";
                        } else {
                            rating = obj.rating
                        }

                        card_template = card_template.replace(/{#TITLE}/gi, obj.title);
                        card_template = card_template.replace(/{#IMAGE}/gi, obj.image);
                        card_template = card_template.replace(/{#INDEX}/gi, index);
                        card_template = card_template.replace(/{#RATING}/gi, rating);
                        card_template = card_template.replace(/{#TIME}/gi, obj.runtime);
                        card_template = card_template.replace(/{#SUMMARY}/gi, obj.summary);
                        card_template = card_template.replace(/{#TRAILER}/gi, obj.trailer.replace("https://www.youtube.com/watch?v=", ""));

                        cards.innerHTML += card_template;
                        
                        if (index == adCount) {
                            if (index <= 40) {
                                cards.innerHTML += '<ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-9y+et+3f-up+17f" data-ad-client="ca-pub-7903023966618400" data-ad-slot="9915892709"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
                                adCount += 5;
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            }
                        }

                        if (index >= 80) {
                            break;
                        }
                    }
                }
            };

            var paths = window.location.pathname.split('/');
            var url = "";

            if (paths[1].includes("movies")) {
                url = "https://f001.backblazeb2.com/file/movies-db/";
                httpClient.open("GET", url + database + '.json', true);
                httpClient.send();
            } 
            
            if (paths[1].includes("tv")) {
                url = "https://f001.backblazeb2.com/file/tvshows-db/";
                httpClient.open("GET", url + database + '.json', true);
                httpClient.send();
            }
            
            // else {
            //     httpClient.open("GET", window.location.origin + "/" + paths[1] + '/database/' + database + '.json', true);
            //     httpClient.send();
            // }
        }
    }
}

fetchDatabase();

// TRAILERS ===================================================================================

function fetchTrailers() {
    var trailersList = document.getElementById("trailersList");

    if (trailersList !== null) {
        var database = trailersList.getAttribute("dataType");

        if (database !== undefined) {

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
                }
            };

            xhttp.open("GET", 'https://greatermovies.com/trailers/data/' + database + '.json', true);
            xhttp.send();
        }
    }
}

fetchTrailers();