// Write your JavaScript code here!

const { addDestinationInfo } = require("./scriptHelper");


window.addEventListener("load", function() {

    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");

    form.addEventListener("submit", function(event) {

        event.preventDefault();
        let document = window.document;
        let pilot= document.querySelector("input[name=pilotName]").value; 
        let copilot = document. querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value; 
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
    
    });    

    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        //console.log(listedPlanets);
    }).then(function () {
        //console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let choice = pickPlanet(listedPlanets);
       
       addDestinationInfo(document, choice.name, choice.diameter, choice.star, choice.distance, choice.moons, choice.image);
    })   
});