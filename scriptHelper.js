// Write your helper functions here!
require('cross-fetch/polyfill');
 
function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
    //the HTML formatting for our mission target div
    let missionTarget = document.getElementById("missionTarget");
       missionTarget.innerHTML = 
       `<h2>Mission Destination</h2>
              <ol>
                  <li>Name: ${name}</li>
                  <li>Diameter: ${diameter} </li>
                  <li>Star: ${star}</li>
                  <li>Distance from Earth: ${distance}</li>
                  <li>Number of Moons: ${moons}</li>
             </ol>
             <img src=${image}>`;
 }
 
function validateInput(testInput) {  
   try {
      if (testInput === "") {
         console.log("Empty");
         return "Empty";
      } 
      else if (isNaN(Number(testInput))) { 
         console.log("Not a Number");
         return "Not a Number";
      } 
      else { (!isNaN(Number(testInput)))
         return "Is a Number";
      }
   } catch(error) {
      console.error(error);
   }
}
 
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let faultyItems = list; 
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus"); 
   let h2 = document.getElementById("launchStatus"); 

   if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
       alert("All fields are required to be filled out.");
       return;
   }
   else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
       alert("Only letters are allowed for the Pilot and Co-Pilot.");
       return;
   }
   else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
       alert("Only numbers are allowed for the Fuel Level and Cargo Mass.");
       return;
   }
   else {
      if (fuelLevel < 10000 && cargoLevel > 10000) {
         faultyItems.style.visibility = 'visible';
         pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
         fuelStatus.innerHTML = 'Fuel level too low for launch'; 
         cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
         h2.style.color = 'red';
         h2.innerHTML = 'Shuttle Not Ready for Launch';
      } 
      else if (fuelLevel < 10000 && cargoLevel <= 10000) {
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
         fuelStatus.innerHTML = 'Fuel level too low for launch';
         cargoStatus.innerHTML = 'Cargo mass low enough for launch';
         h2.style.color = 'red';
         h2.innerHTML = 'Shuttle Not Ready for Launch';
      }
      else if (fuelLevel >= 10000 && cargoLevel > 10000) { 
         faultyItems.style.visibility = 'visible';
         pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
         fuelStatus.innerHTML = 'Fuel level high enough for launch';
         cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
         h2.style.color = 'red';
         h2.innerHTML = 'Shuttle Not Ready for Launch';
      } 
      else {
         pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
         fuelStatus.innerHTML = 'Fuel level high enough for launch';
         cargoStatus.innerHTML = 'Cargo mass low enough for launch';
         h2.style.color = 'green'; 
         h2.innerHTML = 'Shuttle is Ready for Launch';
      }
   }   
}

async function myFetch() {
    
 let planetsReturned;
    
   planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
     let choices = response.json();
     console.log(choices);
     return choices
    });
   
    return planetsReturned;
} 

function pickPlanet(planets) {
  let choice = Math.floor(Math.random() * planets.length);
  return planets[choice];
}
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;

