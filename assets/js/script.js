var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search')
var tableBodyEl = document.querySelector('#table-body')


// TODO: CFB Fetch

var team='';
var teamSchedule = [];
var stadiumID = '';
var startDate ='';
var endDate='';


var fetchSchedule = function(team){
  fetch("./assets/js/2022.json")
  .then(response => response.json())
  .then(schedule => {
    
    for (i=0; i<schedule.length; i++){
      if (team===schedule[i].away_team || team===schedule[i].home_team){
        teamSchedule.push(schedule[i])
      }
    }

    console.log(teamSchedule)
    
    for (i=0; i<teamSchedule.length; i++){
      var awayTeam = teamSchedule[i].away_team;
      var homeTeam = teamSchedule[i].home_team;
      var gameDateTime = dayjs(teamSchedule[i].start_date).format('dddd, MMMM D, YYYY  -  h:mma')
      var stadiumID = teamSchedule[i].venue_id;
      var startDateObject = dayjs(teamSchedule[i].start_date).subtract(2, 'days');
      var startDate = dayjs(startDateObject).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      console.log(startDate)
      var endDateObject = dayjs(teamSchedule[i].start_date).add(2, 'days');
      console.log(endDate)
      var endDate = dayjs(endDateObject).format('YYYY-MM-DD[T]HH:mm:ss[Z]');

      // TODO: post teams and game date/time onto list
      var rowEl = document.createElement('tr');
      tableBodyEl.appendChild(rowEl);
      var rowHeader = document.createElement('th')
      rowHeader.setAttribute('scope', 'row');
      rowHeader.textContent = i+1;
      rowEl.appendChild(rowHeader);
      var gameData = document.createElement('td')
      gameData.textContent = awayTeam + ' vs. ' + homeTeam;
      var gameDate = document.createElement ('td')
      gameDate.textContent = gameDateTime;
      rowEl.appendChild(gameData);
      rowEl.appendChild(gameDate);

      // fetchStadiums(stadiumID, startDate, endDate);
    }
  })  
};

// var startDate = '2022-11-01T00:00:00Z';


var fetchStadiums = function(stadiumID, startDate, endDate){
  fetch("./assets/js/stadiums.json")
  .then(response => response.json())
  .then(stadiums => {
    
    for (i=0; i<stadiums.length; i++){
    
      if (stadiumID===stadiums[i].id){
        var city = stadiums[i].city;
        var state = stadiums[i].state;
        var zipCode = stadiums[i].zip;
        var latitude = stadiums[i].location.x;
        var longitude = stadiums[i].location.y;
        console.log(city + ', ' + state);
        console.log(zipCode);
        console.log(latitude);
        console.log(longitude);

        // TODO: post city, state onto list
   
      }
    }
    // TODO: pass latitude, longitude into openTrip fetch on eventlistener
    // getOpenTripApi(longitude, latitude);

    // TODO: pass zip into Ticketmaster fetch on eventlistener
    // getTicketmasterApi(zipCode, startDate, endDate);
  })  
};


// TODO: Ticketmaster Fetch
// var zipCode = '43215';
// var startDate = '2022-11-01T00:00:00Z';
// var endDate = '2022-12-31T00:00:00Z';
// var eventType = 'concerts';

https://app.ticketmaster.com/discovery/v2/events.json?postalCode=52242&startDateTime=2022-11-23T16:00:00Z&endDateTime=&apikey=ZhQouzEAxvFo61xAEbXYq4kqmcjgUAqX
function getTicketmasterApi(zipCode, startDate, endDate) {
    var tickemasterAPI = 'ZhQouzEAxvFo61xAEbXYq4kqmcjgUAqX'
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?postalCode=' + zipCode + '&startDateTime=' + startDate + '&endDateTime=' + endDate + '&apikey=' + tickemasterAPI;
    // var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?postalCode=52242&startDateTime=2022-11-23T16:00:00Z&endDateTime=2022-11-27T00:00:00Z&apikey=ZhQouzEAxvFo61xAEbXYq4kqmcjgUAqX'
    console.log(requestUrl)
    fetch(requestUrl, {
      mode: 'no-cors'
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {
      console.log(Data);
      // doOtherThings(Data);
    });
};



// TODO: openTrip Fetch
var michaelOpenTripAPI = '5ae2e3f221c38a28845f05b6575f1e2d3fe67b63bacb02ba2a3949fb';
var julianOpenTripKey = '5ae2e3f221c38a28845f05b664810e898547599530db788ca6c2863c';
// var longitude = '-82.99879';
// var latitude = '39.96118';

function getOpenTripApi(longitude, latitude) {
    // Insert the API url to get a list of your repos
    var requestUrl = 'https://api.opentripmap.com/0.1/en/places/radius?radius=8046&lon='+ longitude +'&lat=' + latitude +'&apikey=' + michaelOpenTripAPI
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (Data) {
        console.log(Data);
        // doOtherThings(Data);
      });
};


var xid = "Q2281225" ;

function getLocationDetails() {
  // Insert the API url to get a list of your repos
  var requestUrl = 'https://api.opentripmap.com/0.1/en/places/xid/'+xid+'?apikey=5ae2e3f221c38a28845f05b664810e898547599530db788ca6c2863c';
  
fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {
      // console.log(Data);
      // console.log(Data.image);
      // console.log(Data.wikipedia_extracts.text);
      // console.log(Data.address);
      // console.log(Data.name);
      // console.log(Data.wikipedia);

    });
};


// getlocationdetails()


searchButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  var team = searchInput.value;
  console.log(team)
  fetchSchedule(team)
});


