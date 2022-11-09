var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search');
var tableBodyEl = document.querySelector('#table-body');
var buttonRowOne = document.querySelector('#button-1');
var tableRowEl = document.getElementsByTagName('tr')
var tableHeadEl = document.querySelector('#table-head')

// CFB Fetch
// var teamSchedule = [];
var stadiumID = '';
var startDate ='';
var endDate='';
var stadiumsPlayed = [];
var gameData = [];

var fetchSchedule = function(team){
  fetch("./assets/js/2022.json")
  .then(response => response.json())
  .then(schedule => {
    var teamSchedule = [];
    for (i=0; i<schedule.length; i++){
      if (team===schedule[i].away_team || team===schedule[i].home_team){
        teamSchedule.push(schedule[i])
      };
    };
    fetchStadiums(teamSchedule, stadiumID, startDate, endDate);
  });  
};

var fetchStadiums = function(teamSchedule, stadiumID, startDate, endDate){
  fetch("./assets/js/stadiums.json")
  .then(response => response.json())
  .then(stadiums => {
      
      var headerRow = document.createElement('tr');
      var colHeadOne = document.createElement('th')
      var colHeadTwo = document.createElement('th')
      var colHeadThree = document.createElement('th')
      var colHeadFour = document.createElement('th')
      colHeadOne.setAttribute('scope', 'col')
      colHeadTwo.setAttribute('scope', 'col')
      colHeadThree.setAttribute('scope', 'col')
      colHeadFour.setAttribute('scope', 'col')
      colHeadOne.textContent = 'Game Week';
      colHeadTwo.textContent = 'College Football Games';
      colHeadThree.textContent = 'Dates';
      colHeadFour.textContent = 'Cities';
      headerRow.appendChild(colHeadOne);
      headerRow.appendChild(colHeadTwo);
      headerRow.appendChild(colHeadThree);
      headerRow.appendChild(colHeadFour);
      tableHeadEl.appendChild(headerRow);

    for (i=0; i<teamSchedule.length; i++){
      var awayTeam = teamSchedule[i].away_team;
      var homeTeam = teamSchedule[i].home_team;
      var gameDateTime = dayjs(teamSchedule[i].start_date).format('dddd, MMMM D, YYYY  -  h:mma')
      var stadiumID = teamSchedule[i].venue_id;
      var startDateObject = dayjs(teamSchedule[i].start_date).subtract(2, 'days');
      var startDate = dayjs(startDateObject).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      var endDateObject = dayjs(teamSchedule[i].start_date).add(2, 'days');
      var endDate = dayjs(endDateObject).format('YYYY-MM-DD[T]HH:mm:ss[Z]');

      // Post teams and game date/time onto list

      var rowEl = document.createElement('tr');
      tableBodyEl.appendChild(rowEl);
      var rowHeader = document.createElement('th');
      rowHeader.setAttribute('scope', 'row');
      rowHeader.textContent = i+1;
      rowEl.appendChild(rowHeader);
      var gameData = document.createElement('td');
      rowEl.appendChild(gameData);
      var linkClicker = document.createElement('a');
      linkClicker.setAttribute('id', 'click-'+i);
      linkClicker.textContent= awayTeam + ' vs. ' + homeTeam;
      gameData.appendChild(linkClicker);
      var gameDate = document.createElement ('td');
      gameDate.textContent = gameDateTime;
      rowEl.appendChild(gameDate);

      for(k=0; k<stadiums.length; k++){
        if (stadiumID===stadiums[k].id){
          stadiumsPlayed.push(stadiumID);
          var city = stadiums[k].city;
          var state = stadiums[k].state;
          var zipCode = stadiums[k].zip;
          var latitude = stadiums[k].location.x;
          var longitude = stadiums[k].location.y;
          var cityPlayed = document.createElement('td');
          cityPlayed.textContent = city + ', ' + state;
          rowEl.appendChild(cityPlayed);
        };         
      };

      // Save the information needed for API calls to localStorage as an object
      gameData = JSON.parse(localStorage.getItem('gameData')) ?? [];
      console.log(gameData)
      gameLocaleData = {
        gameWeek : i+1,
        zip : zipCode,
        lat : latitude,
        lon : longitude,
        earlyDate : startDate,
        lateDate : endDate 
      }

      gameData.push(gameLocaleData);
      localStorage.setItem('gameData', JSON.stringify(gameData));     
    };

    
    // TODO: pass latitude, longitude into openTrip fetch on eventlistener
    // getOpenTripApi(longitude, latitude);
    var buttonOne = document.querySelector('#click-11')
    buttonOne.addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall()
      tickemasterAPICall();
    });

    // TODO: pass zip into Ticketmaster fetch on eventlistener
    // getTicketmasterApi(zipCode, startDate, endDate);
    
  });  
};  


// TODO: Ticketmaster Fetch
// var zipCode = '45701';
// var startDate = '2022-11-20T19:00:00Z';
// var endDate = '2022-11-24T19:00:00Z';

function getTicketmasterApi(zipCode, startDate, endDate) {
  var tickemasterAPI = 'ZhQouzEAxvFo61xAEbXYq4kqmcjgUAqX'
  var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?postalCode=' + zipCode + '&startDateTime=' + startDate + '&endDateTime=' + endDate + '&apikey=' + tickemasterAPI;
  console.log(requestUrl)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {
      console.log(Data);
      console.log(Data._embedded.events[0].dates.start.localDate);
      console.log(Data._embedded.events[0].dates.start.localTime);
      console.log(Data._embedded.events[0].name);
      console.log(Data._embedded.events[0].url);
      // doOtherThings(Data);
    });
};

var tickemasterAPICall = function(){
  gameData = JSON.parse(localStorage.getItem('gameData'))
  console.log(gameData)
  var zipCode = gameData[11].zip;
  var startDate = gameData[11].earlyDate;
  var endDate = gameData[11].lateDate;
  getTicketmasterApi(zipCode, startDate, endDate)
}

// TODO: openTrip Fetch
// var michaelOpenTripAPI = '5ae2e3f221c38a28845f05b6575f1e2d3fe67b63bacb02ba2a3949fb';
// var longitude = '-82.99879';
// var latitude = '39.96118';

function getOpenTripApi(longitude, latitude) {
    // Insert the API url to get a list of your repos
  var julianOpenTripKey = '5ae2e3f221c38a28845f05b664810e898547599530db788ca6c2863c';
  var requestUrl = 'https://api.opentripmap.com/0.1/en/places/radius?radius=8046&lon='+ longitude +'&lat=' + latitude +'&apikey=' + julianOpenTripKey
  console.log(requestUrl)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {
      console.log(Data);
        
        console.log(Data.features[0].properties.xid) ;

        
      // doOtherThings(Data);
      });
};


var openTripMapCall = function(){
  gameData = JSON.parse(localStorage.getItem('gameData'))
  latitude = gameData[0].lat;
  longitude = gameData[0].lon;
  getOpenTripApi(longitude, latitude)
}


var xid = "Q2281225" ;
function getLocationDetails() {
  // Insert the API url to get a list of your repos
  var requestUrl = 'https://api.opentripmap.com/0.1/en/places/xid/'+xid+'?apikey=5ae2e3f221c38a28845f05b664810e898547599530db788ca6c2863c';
  
fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {
      console.log(Data);
      console.log(Data.image);
      console.log(Data.wikipedia_extracts.text);
      console.log(Data.address);
      console.log(Data.name);
      console.log(Data.wikipedia);
    });
};

// getlocationdetails()

searchButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  console.log(tableRowEl)
  for (i=0; i<tableRowEl.length; i++){
    tableRowEl[i].setAttribute('style', 'display: none')
  }
  gameData = [];
  console.log(gameData)
  localStorage.setItem('gameData', JSON.stringify(gameData));
  console.log(gameData)
  var team = searchInput.value;
  console.log(team)
  fetchSchedule(team)
});

