




//setting my array of movies
var movies = ["Kill Bill", "King Kong", "John Wick", "Django Unchained","The Hateful Eight", "The Last Samurai", "Jack Reacher", "Home Alone 2", "Terminator 2: Judgment Day", "Hackers", "Snowden", "The Martian", "E.T. the Extra-Terrestrial", "Johnny 5", "Back to the Future", "Ferris Bueller's Day Off", "Raiders of the Lost Ark", "Return of the Jedi", "A Nightmare on Elm Street", "Footloose"];

Audio = new Audio('music.mp3');
Audio.loop = true;
Audio.play();


  //creating a display function for my giphys being pull from api
   function displayMovieGiphy() {
     var movie = $(this).attr("data-name");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
       movie + "&api_key=dc6zaTOxFJmzC&limit=10";
     $.ajax({
         url: queryURL,
         method: "GET"
       })


     // creating a function to responsed to the following
     .done(function(response) {
         //looping threw the array of movies and setting if statment for ratings of results, created a div to hold movie images/gifs.
         var results = response.data;
         for (var i = 0; i < results.length; i++) {
           if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
             var gifDiv = $("<div>");
             var rating = results[i].rating;
             var movieImage = $("<img>");
             var par = $("<p>").text("Rating: " + rating);
             
             movieImage.attr("src", results[i].images.fixed_height.url);
             gifDiv.append(par);
             gifDiv.append(movieImage);
             $("#gifs-area").prepend(gifDiv);
           }
         }
       });
   }



   //dynamicly rendering buttons for the movies being store in the area and adding a on click fucntions to those rendered buttons.
     function renderButtons() {
       $("#movies-area").empty();
       // Looping through the array of movies
       for (var i = 0; i < movies.length; i++) {
         
         var a = $("<button>");
         // Adding a class of movie to our button
         a.addClass("movie");
         // Adding a data-attribute
         a.attr("data-name", movies[i]);
         // Providing the initial button text
         a.text(movies[i]);
         // Adding the button to the buttons-view div
         $("#movies-area").append(a);
       }
       
     };
     
      $("#add-movie").on("click", function(event) {
       event.preventDefault();
       // This line grabs the input from the textbox
       var movie = $("#movie-input").val().trim();
       // Adding movie from the textbox to our array
       movies.push(movie);
       // Calling renderButtons which handles the processing of our movie array
       renderButtons();
     });
     // Adding a click event listener to all elements with a class of "movie"
     $(document).on("click", ".movie", displayMovieGiphy);
     // Calling the renderButtons function to display the intial buttons
     renderButtons();