// At first only 10 cards 
// are supposed to be shown 
// out of 100 cards.

//select all available cards
var cards = document.getElementsByClassName("card");
//currently shown cards
var shownNo = 10;

//Button "SHOW MORE MOVIES" OnClick
function loadMore() {
    for (var i = shownNo; i <= cards.length - 1; i++) {
        if (i <= shownNo + 10) {
            if (cards[i].style.display == "none") {
                cards[i].style.display = "flex";
            }
        }
    }
    
    shownNo += 10;
}
