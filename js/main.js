"use strict";
// Glitch url
let url = 'https://stellar-trusting-death.glitch.me/movies'
fetch(url)
    .then(response=>response.json())
    .then(data => console.log(data))
