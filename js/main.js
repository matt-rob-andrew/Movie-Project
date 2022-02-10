"use strict";

// Glitch url

function moviePage() {
    let url = 'https://stellar-trusting-death.glitch.me/movies'
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
                let actors = data[i].actors

                card += `
                <div class="col">
                <div class="card">
                  <img src="${poster}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title text-capitalize">${title}</h5>
                    <p class="card-text">Rating: ${rating}</p>
                    <p class="card-text">Directed by: ${director}</p>
                    <p class="card-text">Starring: ${actors}</p>
                  </div>          
                </div>                  
                </div>
                `
                
            }
            // Append cards to main container
            $('#movie-container').html(card)
        })
}
moviePage()
console.log(moviePage());
