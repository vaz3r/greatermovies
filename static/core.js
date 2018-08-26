function openNav() {
    document.getElementById("mobile-nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mobile-nav").style.width = "0%";
}

var disqus_config = function () {
    this.page.url = "https://vaz3r.github.io/greatermovies/";
    this.page.identifier = "page-netflix-best-right-now";
};

function loadDisqus() {
    var d = document,
        s = d.createElement('script');
    s.src = 'https://greater-movies.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    s.async = true;
    (d.head || d.body).appendChild(s);
}

if (document.readyState === 'ready' || document.readyState === 'complete') {
    loadDisqus();
    console.log("completed");
} else {
    document.onreadystatechange = function () {
        if (document.readyState === 'ready' || document.readyState === 'complete') {
            loadDisqus();
            console.log("completed");
        }
    }
}