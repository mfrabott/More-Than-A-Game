

// TODO: CFB Fetch

// var season = 

// var cfbapiKey = "hk7N+/TEkCcoApovbDd0NJaZsN2JBLp1g0QxAALU1bWxPDQu41TRWA63xdXjs/Hm";

var url = './assets/js/2022.json'

function getcfbApi() {
    // Insert the API url to get a list of your repos
    
    fetch(url, {
      mode: 'no-cors'})
      .then(function (response) {
        return response.json();
      })
      .then(function (Data) {
        console.log(Data);
        // doOtherThings(Data);
        // Data[i].startDate
        // gameTime = dayjs(gameDate).toDate())
      });
};

getcfbApi();

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