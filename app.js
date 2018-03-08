window.addEventListener("DOMContentLoaded", function(){
    let userBirthYear = document.getElementById('year');
    let outputMovie = document.getElementById('movie');
    let poster = document.querySelector('.movie-poster');
    let cardBody = document.querySelector('.movie-image');

    let xhr = new XMLHttpRequest;
    //xhr.withCredentials = true;

    xhr.onreadystatechange = function() { //Function that runs when the data is returned
        if(xhr.readyState === xhr.DONE) { //Checking to see if a successful response was received
            let response = JSON.parse(xhr.responseText);
            console.log(response);
            outputMovie.innerHTML = response.results[0].original_title;
            poster.src = "https://image.tmdb.org/t/p/w300" + response.results[0].poster_path;
            poster.alt = "";
            cardBody.classList.add('card-content', 'card-header-title');
        }
    }

    document.getElementById('submit').addEventListener('click', function(){ //Listening for when a user clicks the submit button
        parseInt(userBirthYear.value); //Turn the user input into a number
        outputMovie.innerHTML = "We are finding your movie"; //Place holder text so the users know something is happening
        if(!isNaN(userBirthYear.value)) {
            if(userBirthYear.value < 1886 || userBirthYear.value >= 2019) {
                outputMovie.innerHTML = "You appear to be older than movies or have yet to be born, please find someone else to try this instead.";
                poster.src = "";
            } else {
                //Here is a method using the fetch api instead of the XMLHttpRequest, commented out currently
                // fetch('https://api.themoviedb.org/3/discover/movie?api_key=823a6bc56fe86717116ba35e70a26709&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&primary_release_year=' + userBirthYear.value)
                //   .then(function(response) {
                //     return response.json();
                //   })
                //   .then(function(myJson) {
                //     console.log(myJson);
                //     outputMovie.innerHTML = myJson.results[0].original_title;
                //     poster.src = "https://image.tmdb.org/t/p/w300" + myJson.results[0].poster_path;
                //     poster.alt = "";
                //   });


                makeCall();
            }
        } else {
            outputMovie.innerHTML = "Please enter a valid birth year in YYYY format.";
            poster.src = "";
            post.alt = "";
        }
    });

    //A funnction that opens and sends the XHR
    function makeCall() {
        xhr.open('GET','https://api.themoviedb.org/3/discover/movie?api_key=823a6bc56fe86717116ba35e70a26709&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&primary_release_year=' + userBirthYear.value, true);
        xhr.send();
    }
});
