"use strict";
// Glitch base url
let url = 'https://stellar-trusting-death.glitch.me/movies';

// OMDB url
let omdbUrl = `https://www.omdbapi.com/?`


// DISPLAY MOVIE CARDS FROM GLITCH SERVER
function moviePage() {
    fetch(url)
        .then(response => response.json())
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
                // POPULATES MAIN CONTAINER WITH MOVIE INFO
                //language=HTML
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
                            <div class="card-footer text-muted d-flex justify-content-between">
                                <input class="btn btn-danger col-4 col-md-5" type="button" value="Delete"
                                       onclick="deleteMovie(${id})">
                                <input class="btn btn-primary col-4 col-md-5" type="button" value="Edit"
                                       onclick="openForm(${id})">

                            </div>

                        </div>
                        <div class="form-popup d-none" id="myForm${id}">
                            <form class="form-container">
                                <h1 class="text-center">Edit Movie</h1>
                                <label for="title"><b>Title</b></label>
                                <input type="text" id="title${id}" value="${title}" class="text-capitalize"
                                       name="title">
                                <label for="rating"><b>Rating</b></label>
                                <input type="text" id="rating${id}" value="${rating}" name="rating">
                                <label for="director"><b>Director</b></label>
                                <input type="text" id="director${id}" value="${director}" class="text-capitalize"
                                       name="director">
                                <label for="actors"><b>Actors</b></label>
                                <input type="text" id="actors${id}" value="${actors}" class="text-capitalize"
                                       name="actors">
                                <button type="button" class="btn" onclick="editMovie(${id})">Submit Edits
                                </button>
                                <button type="button" class="btn cancel" onclick="closeForm(${id})">Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                `
            }
            // APPEND CARDS TO MAIN CONTAINER
            $('#movie-container').html(card)
        }).then(() => {
            let newTitle = $('#movie-title').val()
            fetch(`${omdbUrl}t=${newTitle}&apikey=${OMDB_KEY}`).then(
                response => response.json())
                // .then(data => console.log(data))
                .then(data => {
                    // ADDS MOVIES TO THE PAGE AND DB
                    $("#add-movie").click(function (e) {
                        e.preventDefault()
                        fetch(url, {
                            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
                                title: data.Title,
                                director: data.Director,
                                year: data.Year,
                                genre: data.Genre,
                                actors: data.Actors,
                                plot: data.Plot,
                                rating: data.Ratings[0].Value,
                                poster: data.Poster
                            })
                        })
                            .then(response => response.json())
                            .then(() => {
                                window.location.reload() // This reloads the entire page
                            })
                            .catch(error => console.log(error))
                    })
                })
        })

}

moviePage()

// DELETES MOVIE FROM DB
function deleteMovie(id) {
    $('.card').addClass('blur')
    let confirmation = confirm(`Are you sure you want to delete this movie?`);
    if (confirmation === true) {
        return fetch(`${url}/${id}`, {
            method: 'DELETE', headers: {'Content-Type': 'application/json'}
        }).then(() => {
            window.location.reload() // This reloads the entire page
        })
    }
    $('.card').removeClass('blur')
}

// EDITS MOVIE
function editMovie(id) {
    return fetch(`${url}/${id}`, {
        method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            title: $("#title" + id).val(),
            rating: $("#rating" + id).val(),
            director: $("#director" + id).val(),
            actors: $("#actors" + id).val(),
        })
    }).then(response => response.json())
        // .then(data => console.log(data))
        .then(() => {
            window.location.reload() // This reloads the entire page
        })
}

// OPEN EDIT FORM - ATTACHED TO 'EDIT' BUTTON
function openForm(formId) {
    console.log(formId);
    $('.card').addClass('blur')
    $(`#myForm${formId}`).removeClass('d-none')
        .addClass('d-block');
}

// CLOSE EDIT FORM - ATTACHED TO 'CANCEL' BUTTON
function closeForm(formId) {
    $('.card').removeClass('blur')
    $(`#myForm${formId}`).removeClass('d-block')
        .addClass('d-none');
}




