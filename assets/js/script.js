

// TODO: CFB Fetch

var team='Nebraska'

var fetchSchedules = function(){
  fetch("./assets/js/2022.json")
  .then(response => response.json())
  .then(schedule => {
    console.log(schedule)
    for (i=0; i<schedule.length; i++){
      console.log
      if (team===schedule[i].away_team || team===schedule[i].home_team){
        console.log(schedule[i])
      }
    }
  });  
};
    
  // schedule = schedule;
  // for (i=0; i<schedule.length; i++){

stadium = 'Memorial Stadium';

var fetchStadiums = function(){
  fetch("./assets/js/stadiums.json")
  .then(response => response.json())
  .then(stadiums => {
    console.log(stadiums)
    for (i=0; i<stadiums.length; i++){
      if (stadium===stadiums[i].name){
        console.log(stadiums[i].zip)
        console.log(stadiums[i].location.x)
        console.log(stadiums[i].location.y)
      }
    }
  })  
}

fetchSchedules();
fetchStadiums();


// TODO: Ticketmaster Fetch
var zipCode = '43215';
var startDate = '2022-11-01T00:00:00Z';
var endDate = '2022-12-31T00:00:00Z';
var eventType = 'concerts';
var tickemasterAPI = 'ZhQouzEAxvFo61xAEbXYq4kqmcjgUAqX'

function getTicketmasterApi() {
    // Insert the API url to get a list of your repos
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?postalCode=' + zipCode + '&startDateTime=' + startDate + '&endDateTime=' + endDate + '&apikey=' + tickemasterAPI;
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (Data) {
        console.log(Data);
        // doOtherThings(Data);
      });
};

getTicketmasterApi()

// TODO: openTrip Fetch
var openTripAPI = '5ae2e3f221c38a28845f05b6575f1e2d3fe67b63bacb02ba2a3949fb'

function getopenTripApi() {
    // Insert the API url to get a list of your repos
    var requestUrl = 'https://api.opentripmap.com/0.1/en/places/geoname?name=Columbus&apikey=5ae2e3f221c38a28845f05b6575f1e2d3fe67b63bacb02ba2a3949fb';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (Data) {
        console.log(Data);
        // doOtherThings(Data);
      });
};

getopenTripApi()


