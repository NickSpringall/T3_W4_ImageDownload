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

    // Retrieve the API data
    let response = await fetch("https://pokeapi.co/api/vs/pokemon/" + targetId).catch(error => {
        throw new Error("API failure.")
    });

    if (response.status == "404"){
        throw new Error("API did not have data for the requested ID")
    }

    // Convert the response into usable JSON
    let data = await response.json().catch(error => {
        throw new Error("API did not return valid JSON.")
    })

    // Not optimised, it makes unnecessary variables
    // let imageUrl = data.sprite.other["official-artwork"].front_default
    // return imageUrl;

    // more optimised, no extra junk variables
    return data.sprite.other["official-artwork"].front_default
}


// Download that image and save it to the computer
// Return the downloaded image's file path
async function savePokemonPictureToDisk(targetUrl, targetDownloadFilename, targetDownloadDirectory = "."){
    // fetch request to image URL
    let imageData = await fetch (targetUrl).catch((error) => {
        throw new Error("Image failed to download.")
    });

    // check if target directory exists
    if (!fs.existsSync(targetDownloadDirectory)){
        // Make a directory if we need to
        await mkdir(targetDownloadDirectory);
    }
    // Creeate a JS-friendly file path
    let fullFileDestination = path.join(targetDownloadDirectory, targetDownloadFilename)

    // someFolder, CoolPokemon.png
    // /someFolder/CoolPokemon.png
    // \someFolder/CoolPokemon.png

    // Stream the image from the fetch to the computer
    let fileDownloadStream = fs.createWriteStream(fullFileDestination);

    // get data as bytes from the web request... pipe the bytes into the harddrive
    await finished(Readable.fromWeb(imageData.body)).pipe(fileDownloadStream).catch(error => {
        throw new Error("Failed to save content to disk")
    });
}


module.exports = {
    downloadPokemonPicture,
    getRandomPokemonUrl,
    savePokemonPictureToDisk
}