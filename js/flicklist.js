
var model = {
  watchlistItems: [],
  browseItems: []
};


var api = {

  root: "https://api.themoviedb.org/3",
  token: "fdf2b6c2fd8bfe40d47c7080b3abac7c", // TODO 0 (DONE) add your api key
  imageBaseUrl: "https://image.tmdb.org/t/p/"

};


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
      console.log(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the 
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  
  var watchlistElement = $("#section-watchlist ul");
  var browseElement = $("#section-browse ul");

  // clear everything
  watchlistElement.empty();
  browseElement.empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    
    // TODO 2g (DONE)
    // re-implement the li as a bootstrap panel with a heading and a body
    
    // create panel heading
    var title = $("<h5></h5>").text(movie.original_title);
    var panelHeading = $("<div></div>").attr("class", "panel-heading")
        .append(title);
        
    // TODO 1 (DONE)
    // add an "I watched it" button and append it below the title
    // Clicking should remove this movie from the watchlist and re-render
    // TODO 2i (DONE)
    // apply the classes "btn btn-danger" to the "I watched it button"
    var watchButton = $("<button></button>").text("I watched it!")
        .attr("class","btn btn-danger")
        .click(function() {
          var movieSpot = model.watchlistItems.indexOf(movie);
          model.watchlistItems.splice(movieSpot, 1);
          render();
        });
        
    // TODO 4a (DONE)
    // add a poster image and append it inside the 
    // panel body above the button
    // create panel body
    var poster = $("<img></img>").attr("src", posterUrl(movie, "w300")
        .attr("class", "image-responsive"));
    var panelBody = $("<div></div>").attr("class", "panel-body")
        .append(poster)
        .append(watchButton);
    
    // create panel    
    var panel = $("<div></div>").attr("class", "panel panel-default")
        .append(panelHeading).append(panelBody);
        
     var itemView = $("<li></li>").append(panel).append(watchButton);
     watchlistElement.append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {

    // TODO 2d continued (DONE)
    // style this list item to look like the demo
    // You'll also need to make changes in index.html.
    // use the following BS classes:
    // "list-group", "list-group-item", btn", "btn-primary", 
    
    var title = $("<h4></h4>").text(movie.original_title);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .attr("class", "btn btn-primary")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1);
      

    var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .attr("class", "list-group-item")
      .append(title)
      .append(overview)
      .append(button);

    // append the itemView to the list
    browseElement.append(itemView);
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

/**
   * Given a movie object, returns the url to its poster image
   */
  function posterUrl(movie, width) {
    // TODO 4b (DONE)
    // implement this function
    
    return api.imageBaseUrl + width + "/" + movie.poster_path;
  }