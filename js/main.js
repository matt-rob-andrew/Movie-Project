"use strict";
// Glitch url

function moviePage() {
    let url = 'https://stellar-trusting-death.glitch.me/movies'
    return fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(data => {
            let card = ""
            for (let i = 0; i < data.length; i++) {
                let title = data[i].title;
                let rating = data[i].rating;
                let director = data[i].director;
                let poster = data[i].poster;
                let actors = data[i].actors

                card += ``


            }
        })
}

console.log(moviePage());
