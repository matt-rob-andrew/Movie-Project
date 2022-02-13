"use strict";
// Glitch base url
let url = 'https://stellar-trusting-death.glitch.me/movies';

// DISPLAY MOVIE CARDS FROM GLITCH SERVER
function moviePage() {
    return fetch(url)
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
                                <input class="btn btn-primary" type="button" value="Delete"
                                       onclick="deleteMovie(${id})">
                                <input class="btn btn-primary" type="button" value="Edit" onclick="openForm(${id})">
                                <div class="form-popup d-none" id="myForm${id}">
                                    <form class="form-container">
                                        <h1>Login</h1>

                                        <label for="title"><b>Title</b></label>
                                        <input type="text" id="title${id}" value="${title}" name="title">
                                        <label for="rating"><b>Rating</b></label>
                                        <input type="text" id="rating${id}" value="${rating}" name="rating">
                                        <label for="director"><b>Director</b></label>
                                        <input type="text" id="director${id}" value="${director}" name="director">
                                        <label for="actors"><b>Actors</b></label>
                                        <input type="text" id="actors${id}" value="${actors}" name="actors">

                                        <button type="button" class="btn" onclick="editMovie(${id})">Submit Edits
                                        </button>
                                        <button type="button" class="btn cancel" onclick="closeForm(${id})">Cancel
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            // APPEND CARDS TO MAIN CONTAINER
            $('#movie-container').html(card)
        })
        .then(function () {
            // ADDS MOVIES TO THE PAGE AND DB
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
                    .then(() => {
                        window.location.reload() // This reloads the entire page
                    })
                    .catch(error => console.log(error))
            })
        })
}

moviePage().then()

// DELETES MOVIE FROM DB
function deleteMovie(id) {
    let confirmation = confirm(`Are you sure you want to delete this movie?`);
    if (confirmation === true) {
        return fetch(`${url}/${id}`, {
            method: 'DELETE', headers: {'Content-Type': 'application/json'}
        }).then(() => {
            window.location.reload() // This reloads the entire page
        })
    }
}

// EDITS MOVIE - need to add popup or something to edit each field
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
            window.location.reload()
        })
}

// OPEN AND CLOSE EDIT FORM
function openForm(formId) {
    console.log(formId);
    $(`#myForm${formId}`).removeClass('d-none')
        .addClass('d-block');
}

function closeForm(formId) {
    $(`#myForm${formId}`).removeClass('d-block')
        .addClass('d-none');
}
