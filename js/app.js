'use strict';

console.log('js is linked');
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];

var firstAndPike = {
  name: '1st and Pike',
  tag: 'firstAndPike',
  min: 23,
  max: 65,
  avg: 6.3,
  custPerHr: randCust,
  salesPerHour: cookiesSold,
  cookiePerHour: []
}

var seaTac = {
  name: 'SeaTac Airport',
  tag: 'seaTac',
  min: 3,
  max: 24,
  avg: 1.2,
  custPerHr: randCust,
  salesPerHour: cookiesSold,
  cookiePerHour: []
}

var seaCenter = {
  name: 'Seattle Center',
  tag: 'seaCenter',
  min: 11,
  max: 38,
  avg: 3.7,
  custPerHr: randCust,
  salesPerHour: cookiesSold,
  cookiePerHour: []
}

var capHill = {
  name: 'Capitol Hill',
  tag: 'capHill',
  min: 20,
  max: 38,
  avg: 2.3,
  custPerHr: randCust,
  salesPerHour: cookiesSold,
  cookiePerHour: []
}

var alki = {
  name: 'Alki',
  tag: 'alki',
  min: 2,
  max: 16,
  avg: 4.6,
  custPerHr: randCust,
  salesPerHour: cookiesSold,
  cookiePerHour: [],
}

var locations = [firstAndPike, seaTac, seaCenter, capHill, alki];

//Generates a random number given min and max customers of store
function randCust() {
  console.log('This is random!');
  var random = Math.floor(Math.random() * (this.max - this.min) + this.min);
  console.log('Random Number: ' + random);
  return random;
}

//Calculates the number of cookies sold per hour using random number generated and avg
function cookiesSold() {
  for (var i = 0; i < 15; i++) {
    var newCookie = Math.round(this.custPerHr() * this.avg)
    this.cookiePerHour.push(newCookie);
    console.log('Cookie per hour ' + i + ' : ' + newCookie);
  }
}

function display() {
  for (var j = 0; j < locations.length; j++) {
    //generates random cookies for each location
    locations[j].salesPerHour();
    var total = 0;
    //populates li items for location
    for (var i = 0; i < 15; i++) {
      var location = document.getElementById(locations[j].tag);
      var hour = document.createElement('li');
      hour.textContent = hours[i] + ' : ' + locations[j].cookiePerHour[i];
      location.appendChild(hour);
      total = total + locations[j].cookiePerHour[i];
      console.log('cookiePerHour: ' + locations[j].cookiePerHour[i] + ' total: ' + total);
    }
    //displays the total for location
    var location = document.getElementById(locations[j].tag);
    var hour = document.createElement('li');
    hour.textContent = hours[hours.length - 1] + ' : ' + total;
    location.appendChild(hour);
  }
}


