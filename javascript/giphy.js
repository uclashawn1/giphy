// Global variables

var topics = ["Altered Carbon", "SNL", "GOT", "Ozark", "The Flash", "Riverdale", "TWD", "Daredevil", "Outlander", "Gotham"];
var gifReturn = 25;

// Document.ready function to render HTML into index
$(document).ready (function buildButton() {
    buildBtnBar();



// Build button bar function that will execute a series of tasks/functions to create the area where buttons will
// reside
function buildBtnBar() {
    // jquery expression that will create and place buttons in the button bar
    $("#buttonBar").html("");
    // expression that finds the variable "i" in the topis[array] and iterate through it and then
    for (var i=0; i < topics.length; i++) {
    // declaration of local variables to be used in following expressions
        var newSeries = topics[i];
        var newButton = $("<button type='button'>");
    // dot notation that takes the "newButton variable" and adds 2 bootstrap classes and a css class
        newButton.addClass("btn btn-success gifButton");
    // dot notation that takes the "newButton variable" and adds 2 bootstrap classes and a css class    
        newButton.attr("tvSeries", newSeries);
        newButton.attr("type", "button");
        newButton.append(newSeries);
        $("#buttonBar").append(newButton);
    }
// console.log(buildBtnBar);
}

// Add new gif-button
$("#search").on("click", function(event) {
    event.preventDefault();

    var newSeries = $("#addSeries").val().trim(newSeries);
    topics.push(newSeries);
    // console.log(topics);
    $("#addSeries").val('');
    buildBtnBar();
    
});

// Choose limit parameter of gify API queries
$("#inputNumgif").on("change", function() {
    gifReturn = $("#inputNumgif").val();
    console.log(gifReturn);
});

// jquery to call gify API when user clicks gif button
$(document.body).on("click", ".gifButton", function() {
    // var tvSeries= [""];
    var tvSer = $(this).attr("tvSeries");
    // var tvSeries = "";
    gifyAPI(tvSer);
});

// Favorite function
$(document.body).on("click", ".fa-star", function() {
    var favStatus = $(this).attr("favorite-status");
    var parentCard = $(this).attr("data-parent");
    var parentCardID = "#" + parentCard;
    console.log(parentCardID);

// adding to favorite's section
if(favStatus === "No") {
    $(this).addClass("fas").removeClass("far");
    $(this).attr({'favorite-status': 'Yes'});
    var newFavCard = $("<div>", {id: "fav"+parentCard, class: "favorites"});
    $(newFavCard).append($(parentCardID).html());
    $("#favgifs").append(newFavCard);
} else {
// removing from favorites
    $("[data-parent="+parentCard+"]").attr({'favorite-status': 'No'}).addClass("far").removeClass("fas");
    var removeFav = $("#fav"+parentCard);
    $(removeFav).remove();
    // console.log(removeFav);
}
});

// toggle gif state when user clicks
$(document.body).on("click", ".card-img-top", function() {
    var gifState= $(this).attr("state");
    var gifStill= $(this).attr("still-link");
    var gifAnimated= $(this).attr("animate-link");

    if (gifState === "animated") {
        $(this).attr("src", gifStill);
        $(this).attr("state", "still");
    } else {
        $(this).attr("src", gifAnimated);
        $(this).attr("state", "animated");
    }
});

// gify API query

function gifyAPI () {
    // var tvSeries = newSeries;
    // var tvSer = tvSeries;
    var tvSer = $(this).data("search");
    // var xhr = $.get("http://api.gify.com/v1/gifs/search?q=ryan+gosling&api_key=5tiUfP5wagg8jwabXVPZnALlEEZV9Lgk&limit=25");
    // xhr.done(function(data) { console.log("success got data", data); });
    var queryURL = "https://api.gify.com/v1/gifs/search?q=" + tvSer + "&api_key=5tiUfP5wagg8jwabXVPZnALlEEZV9Lgk&limit="+ gifReturn;

    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {

    // gifReturn.then(function(response) {
        // var results = response.data;
        // console.log(results);
        // for (var i = 0; i < results.length; i++) {

// may need this {
            // var idTag = tvSer +i;
            // idTagFixed= idTag.split('').join('');
            // var card = $("<div>", {class: 'card', id: idTagFixed});
// may need this }

            // var gifImage = $("<img>", {class: 'card-img-top img-fluid'});
     var gifImage = $("<img>", {class: 'card-img-top img-fluid'});
            

         gifImage.attr("src", results[i].images.fixed_height_still.url);    
         var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
            // gifImage.attr("src", results[i].images.fixed_width_still.url);
            // gifImage.attr({'animated-link': results[i].images.fixed_width.url});
            // gifImage.attr({'still-link': results[i].images.fixed_width_still.url});
            // gifImage.attr({'state': "still"});
  
                gifImage.addClass(".card-img-top");
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", staticSrc);
                gifImage.attr("data-animate", defaultAnimatedSrc);

            var cardBody = $("<div>", {class: 'card-body'});
            var cardTitle = $("<h4>", {class: 'card-title'});
            cardTitle.text(results[i].title);

            var rating = results[i].rating;
            var cardRating = $("<p>").text("Rating: " + rating);
            

            var favoriteBtn = $("<i class='far fa-star'></i>");
            favoriteBtn.attr({'favorite-status': 'No', 'data-parent': idTagFixed});

            // build card
            // cardBody.append(cardTitle);
            // cardBody.append(favoriteBtn);
            cardBody.append(cardRating);
            cardBody.append(gifImage);
            // cardBody.append(cardBody);

   
            // add card to grid
            $(".card-columns").prepend(cardBody);
    // var showDiv = $("<div class='col-md-4'>");


           
                
            
    
            
        
           
    
          
          
    
        }
    })
};
});