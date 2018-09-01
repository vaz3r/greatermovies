function openNav() {
    document.getElementById("mobile-nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mobile-nav").style.width = "0%";
}

// VIDEO MODAL
var vModal = document.getElementById("vModal");
var youtubeVideo = document.getElementById("youtubeVideo");

window.onclick = function(event) {
    if (event.target == vModal) {
        youtubeVideo.setAttribute("src", "");
        vModal.style.display = "none";
    }
};

function playVideo(videoID) {
    vModal.style.display = "flex";
    youtubeVideo.setAttribute("src", "https://www.youtube.com/embed/" + videoID + "?rel=0&amp;showinfo=0");
}