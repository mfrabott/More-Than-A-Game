var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search');
var tableBodyEl = document.querySelector('#table-body');
var buttonRowOne = document.querySelector('#button-1');

// TODO: CFB Fetch

var teamSchedule = [];
var stadiumID = '';
var startDate ='';
var endDate='';
var stadiumsPlayed = [];
var gameInfo = [];

var fetchSchedule = function(team){
  fetch("./assets/js/2022.json")
  .then(response => response.json())
  .then(schedule => {
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
      // gameData.textContent = awayTeam + ' vs. ' + homeTeam;
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
      gameInfo = JSON.parse(localStorage.getItem('gameData')) ?? [];
      gameLocaleData = {
        gameWeek : i+1,
        zip : zipCode,
        lat : latitude,
        lon : longitude,
        earlyDate : startDate,
        lateDate : endDate 
      }
      gameInfo.push(gameLocaleData);
      localStorage.setItem('gameData', JSON.stringify(gameInfo));     
    };
    // TODO: pass latitude, longitude into openTrip fetch on eventlistener
    // getOpenTripApi(longitude, latitude);
    var buttonOne = document.querySelector('#click-1')
    buttonOne.addEventListener("click", function (event) {
      console.log('test')
    });

    // TODO: pass zip into Ticketmaster fetch on eventlistener
    // getTicketmasterApi(zipCode, startDate, endDate);
  });  
};  


// TODO: Ticketmaster Fetch
// var zipCode = '45701';
// var startDate = '2022-11-20T19:00:00Z';
// var endDate = '2022-11-24T19:00:00Z';
// var eventType = 'concerts';


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
      // doOtherThings(Data);
    });
};
  gameInfo = JSON.parse(localStorage.getItem('gameData'))
  console.log(gameInfo)
  var zipCode = gameInfo[107].zip;
  var startDate = gameInfo[107].earlyDate;
  var endDate = gameInfo[107].lateDate;

getTicketmasterApi(zipCode, startDate, endDate)


// TODO: openTrip Fetch
var michaelOpenTripAPI = '5ae2e3f221c38a28845f05b6575f1e2d3fe67b63bacb02ba2a3949fb';
var julianOpenTripKey = '5ae2e3f221c38a28845f05b664810e898547599530db788ca6c2863c';
var longitude = '-82.99879';
var latitude = '39.96118';

function getOpenTripApi(longitude, latitude) {
    // Insert the API url to get a list of your repos
    gameInfo = JSON.parse(localStorage.getItem('gameData'))
    latitude = gameInfo[0].lat;
    longitude = gameInfo[0].lon;
    var requestUrl = 'https://api.opentripmap.com/0.1/en/places/radius?radius=8046&lon='+ longitude +'&lat=' + latitude +'&apikey=' + julianOpenTripKey
    console.log(requestUrl)
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (Data) {
        console.log(Data);
        // doOtherThings(Data);
      });
};

// getOpenTripApi(longitude, latitude)

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
  var team = searchInput.value;
  console.log(team)
  fetchSchedule(team)
});

var buttonOne = document.querySelector('#button-01')
buttonOne.addEventListener("click", function (event) {
  console.log('test')
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  var team = searchInput.value;
  console.log(team)
  fetchSchedule(team)
});

