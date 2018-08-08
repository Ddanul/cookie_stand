'use strict';

console.log('js is linked');
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];

//create array of totals set to 0
var grandTotal = Array(16);
grandTotal.fill(0);

//Store constructor
function Store(name, min, max, avg){
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.cookiePerHour = [];
}

//assigns methods to Store objects
Store.prototype.custPerHr = randCust;
Store.prototype.salesPerHour = cookiesSold;
Store.prototype.addRow = addRow;
Store.prototype.finalTotal = finalTotal;
Store.prototype.updateFooter = updateFooter;

//Constructing new Stores
var firstAndPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seaCenter = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);

var locations = [firstAndPike, seaTac, seaCenter, capHill, alki];

//Generates a random number given min and max customers of store
function randCust() {
  var random = Math.floor(Math.random() * (this.max - this.min) + this.min);
  return random;
}

//Calculates the number of cookies sold per hour using random number generated and avg
function cookiesSold() {
  var total = 0;
  for (var i = 0; i < 15; i++) {
    var newCookie = Math.round(this.custPerHr() * this.avg)
    this.cookiePerHour.push(newCookie);
    total += newCookie;
  }
  this.cookiePerHour.push(total);
}

//populates header hours on table
function makeHeader() {

  //appends empty placeholder cell
  var timeHead = document.getElementById('time');
  var empty = document.createElement('th');
  empty.textContent = '';
  timeHead.appendChild(empty);
  
  for (var i = 0; i < 15; i++) {

    //adds in the times of operation to table header
    timeHead = document.getElementById('time');
    var hour = document.createElement('th');
    hour.textContent = `${hours[i]}`;
    timeHead.appendChild(hour);
  }
  //displays the total for location
  var location = document.getElementById('time');
  var hour = document.createElement('th');
  hour.textContent = hours[hours.length - 1];
  location.appendChild(hour);
}

//adds a row and populates the table with values
function addRow(){

  //generates random cookie sales values
  this.salesPerHour();

  //adds a new row with store name to the body of the table
  var newRow = document.getElementById('body');
  var store = document.createElement('tr');
  var storeName = document.createElement('th');
  storeName.textContent = this.name;
  store.appendChild(storeName);
  newRow.appendChild(store);

  //populates tBody items for each location in table
  for (var i = 0; i <= 15; i++) {
    var hour = document.createElement('td');
    hour.textContent = this.cookiePerHour[i];
    store.appendChild(hour)
    newRow.appendChild(store);
  }

  this.finalTotal();
}

//calculates the final total after a new store is added.
function finalTotal(){
  for (var j = 0; j <= 15; j++) {
    grandTotal[j] += parseInt(this.cookiePerHour[j]);
  }
  this.updateFooter();
}
  
//function used to update values of grand total in footer after a new store is added
function updateFooter(){
  for (var i = 0; i <= 15; i++) {
    var footer = document.getElementsByClassName('foot'+i);
    footer[0].textContent = grandTotal[i];
  }
}

//calls to populate all stores into the table
function populateTable(){
  for (var j = 0; j < locations.length; j++) {
    locations[j].addRow();
  }
}

//function used to initially add a footer to the table
function addFooter(){
  var footer = document.getElementById('foot');
  var footTitle = document.createElement('th');
  footTitle.textContent = 'Grand Total';
  footer.appendChild(footTitle);
  
  for (var i = 0; i < 15; i++) {

    //adds in the times of operation to table header
    footer = document.getElementById('foot');
    var hour = document.createElement('td');
    hour.textContent = grandTotal[i];
    hour.className = 'foot'+i;
    footer.appendChild(hour);
  }
  //displays the total for location
  var location = document.getElementById('foot');
  var hour = document.createElement('td');
  hour.className = 'foot'+15;
  hour.textContent = grandTotal[grandTotal.length-1];
  location.appendChild(hour);
}

//Form input used to generate new store location and populate new row
var newStore = document.getElementById('storeForm');
newStore.addEventListener('submit', function(e){
  e.preventDefault();
  console.log("Event has been triggered.");
  var name = e.target.storeName.value;
  var min = e.target.storeMin.value;
  var max = e.target.storeMax.value;
  var avg = e.target.storeAvg.value;

  if(min > max){
    alert('Your minimum value cannot be greater than your max!');
  }
  else{
    var addNewStore = new Store(name, min, max, avg);
    addNewStore.addRow();
    newStore.reset();
  }
})

//calls on functions
makeHeader();
addFooter();
populateTable();