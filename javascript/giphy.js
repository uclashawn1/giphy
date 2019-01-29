// Global variables

var topics = ["Altered Carbon", "SNL", "GOT", "Ozark", "The Flash", "Riverdale", "TWD", "Daredevil", "Outlander", "Gotham"];
var gifReturn = 25;

$(document).ready (function buildButton() {
    buildButton();
        $("#favGifs").html(JSON.parse(localStorage.getItem("favorites")));

// Build buttonBar
function buildButton() {
    $("#buttonBar").html("");
    for (i=0; i < topics.length; i++) {
        var newSeries = topics[i];
        var newButton = $("<button type='button'>");
        newButton.addClass("btn btn-primary gifButton");
        newButton.attr("tvSeries", newSeries);
        newButton.attr("type", "button");
        newButton.append(newSeries);
        $("#buttonBar").append(newButton);
        }
        // console.log(buildButton);
}
        
// Add new giph button
$("#search").on("click", function(event) {
    event.preventDefault();

    var newSeries = $("#addSeries").val().trim();
    topics.push(newSeries);
    $("#addSeries").val("");
    buildButton();
});

// Change limit parameter of Giphy API Query
$("#inputNumGif").on("change", function() {
    gifReturn = $("#inputNumGif").val();
    console.log(gifReturn);
});

// When user clicks a button call giphy API
$(document.body).on("click", ".gifButton", function() {
    var tvSer = $(this).attr("tvSeries");
    giphyAPI(tvSer);
});

// Favorite function
$(document.body).on("click", ".fa-star", function() {
    var favStatus = $(this).attr("favorite-status");
    var parentCard = $(this).attr("data-parent");
    var parentCardID = "#" + parentCard;
    console.log(parentCardID);
    
    // Add to Favorites
    if(favStatus === "No") {
        $(this).addClass("fas").removeClass("far");
        $(this).attr({'favorite-status': 'Yes'});
        var newFavCard = $("<Div>", {id: "fav"+parentCard, class: "favorites"});
        $(newFavCard).append($(parentCardID).html());
        $("#favGifs").append(newFavCard);
    } else {
        // Remove from Favorites
        $("[data-parent="+parentCard+"]").attr({'favorite-status': 'No'}).addClass("far").removeClass("fas");
        var removeFav = $("#fav"+parentCard);
        $(removeFav).remove();
        // console.log(removeFav);
    }
});

// Make gif state toggle when user clicks gif
$(document.body).on("click", ".card-img-top", function() {
    var gifState= $(this).attr("state");
    var gifStill= $(this).attr("still-link");
    var gifAnimated= $(this).attr("animated-link");

    if (gifState === "animated") {
        $(this).attr("src", gifStill);
        $(this).attr("state", "still");
    } else {
        $(this).attr("src", gifAnimated);
        $(this).attr("state", "animated");
    }  
});

// Query Giphy API
function giphyAPI (series) {
var tvSer = series;
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvSer + "&api_key=5tiUfP5wagg8jwabXVPZnALlEEZV9Lgk&limit="+ gifReturn;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var idTag= tvSer +i;
        idTagFixed= idTag.split(' ').join('');
        var card = $("<div>", {class: 'card', id: idTagFixed});
        var gifimage = $("<img>", {class: 'card-img-top img-fluid'});
        gifimage.attr("src", results[i].images.fixed_width_still.url);
        gifimage.attr({'animated-link': results[i].images.fixed_width.url});
        gifimage.attr({'still-link': results[i].images.fixed_width_still.url});
        gifimage.attr({'state': "still"});
        var cardBody = $("<div>", {class: 'card-body'});
        var cardTitle = $("<h4>", {class: 'card-title'});
        cardTitle.text(results[i].title);
        var rating = results[i].rating;
        var cardRating = $("<p>").text("Rating: " + rating);
        var favoriteBtn = $("<i class='far fa-star'></i>");
        favoriteBtn.attr({'favorite-status': 'No', 'data-parent': idTagFixed});
       
        // Build card
        cardBody.append(cardTitle);
        cardBody.append(favoriteBtn);
        cardBody.append(cardRating);
        //cardBody.append(cardDownloadBtn);
        card.append(gifimage);
        card.append(cardBody);
    
        // Add card to grid
        $(".card-columns").prepend(card);
        }
    })
    };
});
