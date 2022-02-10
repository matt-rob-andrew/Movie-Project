"use strict";

let url = 'https://stellar-trusting-death.glitch.me/movies';

// NEW CARD FUNCTION
function newCard() {

}

// DISPLAY MOVIE CARDS FROM GLITCH SERVER
function moviePage() {
    // Glitch url
    return fetch(url)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => {
            let card = ""
            for (let i = 0; i < data.length; i++) {
                let title = data[i].title;
                let rating = data[i].rating;
                let director = data[i].director;
                let poster = data[i].poster;
                let actors = data[i].actors;
                let plot = data[i].plot
                let id = data[i].id

                card += `
                <div class="col">
                <div class="card h-100">
                  <img src="${poster}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title text-capitalize">${title}</h5>
                    <p class="card-text">Rating: ${rating}</p>
                    <p class="card-text">Directed by: ${director}</p>
                    <p class="card-text">Starring: ${actors}</p>
                    <p class="card-text">Plot: ${plot}</p>
                  </div>          
                </div>                  
                </div>
                `

            }
            // Append cards to main container
            $('#movie-container').html(card)
        }).then(function () {
            $("#add-movie").click(function (e) {
                e.preventDefault()
                fetch(url, {
                    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                        title: $("#movie-title").val(),
                        director: $("#movie-director").val(),
                        year: $("#movie-year").val(),
                        genre: $("#movie-genre").val(),
                        actors: $("#movie-actor").val(),
                        plot: $("#movie-plot").val(),
                        rating: $("#movie-rating").val(),
                        poster: $("#movie-img").val()
                    })
                })
                    .then(response => response.json())
                    .then(movie => console.log(movie))
                    .catch(error => console.log(error))
            })
        })
}

moviePage().then()

function deleteMovie(id) {
    fetch(url + '/id', {
        method: 'DELETE', headers: {'Content-Type': 'application/json'}
    })
}

// ADDING NEW MOVIE


//
// let imageUrl = $("#movie-img").val();
// console.log(imageUrl)
