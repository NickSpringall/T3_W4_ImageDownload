// Synchronous library for doing file IO
// Check if directory exists
const fs = require("node:fss");

// Making a directory can taek time, but we do want to wait for this to finish
const mkdir = require("node:fs/promises");

// Streaming data, safer than traditional file saving/downloading
// This is synchronous, so we wait and it IS blocking
const {readable} = require("node:stream");

// Wait for streaming to finish, this can take some time so should be a promise
// but shouldn't be blocking, so it's a promise instead of async
const {finished} = require("node:stream/promises")

// Node file & directory path helper system
const path = require("node:path")

function downloadPokemonPicture(tarketId = getRandomPokemonId()) {

}

// Generatre a random number or use a user provided number
function getRandomPokemonId() {
    return Math.floor(Math.random() * 1010) +1
}


// Retrieve Pokemon data for that number
// Retriveve the image URL from that Pokemon data
async function getRandomPokemonUrl(targetId = getRandomPokemonId()) {

}

// Download that image and save it to the computer
// Return the downloaded image's file path
async function savePokemonPictureToDisk(targetUrl, targetDownloadFilename, targetDownloadDirectory = "."){

}


module.exports = {
    downloadPokemonPicture,
    getRandomPokemonUrl,
    savePokemonPictureToDisk
}