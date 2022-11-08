

// TODO: CFB Fetch

// var cfbapiKey = "hk7N+/TEkCcoApovbDd0NJaZsN2JBLp1g0QxAALU1bWxPDQu41TRWA63xdXjs/Hm";

// function getcfbApi() {
//     // Insert the API url to get a list of your repos
    
//     fetch('https://api.collegefootballdata.com/games?year=2022&seasonType=regular&team=ohio%20state', {
         
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': 'Bearer hk7N+/TEkCcoApovbDd0NJaZsN2JBLp1g0QxAALU1bWxPDQu41TRWA63xdXjs/Hm',
//             'Origin': 'http://127.0.0.1:5500/',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, OPTIONS',
//             'Access-Control-Allow-Headers': '*'
//         }
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (Data) {
//         console.log(Data);
//         // doOtherThings(Data);
//         // Data[i].startDate
//         // gameTime = dayjs(gameDate).toDate())
//       });
//     }

// var getcfbApi = function(){
//     const data = null;

//     const xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
    
//     xhr.addEventListener("readystatechange", function () {
//       if (this.readyState === this.DONE) {
//         console.log(this.responseText);
//       }
//     });
    
//     xhr.open("GET", "https://api.collegefootballdata.com/games?year=2022&seasonType=regular&team=rutgers");
//     xhr.setRequestHeader("Authorization", "Bearer hk7N+/TEkCcoApovbDd0NJaZsN2JBLp1g0QxAALU1bWxPDQu41TRWA63xdXjs/Hm");
    
//     xhr.send(data);
//     }
// getcfbApi();

//       function performSignIn() {
//         let headers = new Headers();
    
//         // headers.append('Content-Type', 'application/json');
//         headers.append('accept', 'application/json');
//         headers.append('Authorization', 'Bearer hk7N+/TEkCcoApovbDd0NJaZsN2JBLp1g0QxAALU1bWxPDQu41TRWA63xdXjs/Hm');
//         // headers.append('Origin','http://localhost:3000');
    
//         fetch('https://api.collegefootballdata.com/games?year=2022&seasonType=regular&team=ohio%20state', {
//             mode: 'no-cors',
//             credentials: 'include',
//             method: 'POST',
//             headers: headers
//         })

//         .then(response => response.json())
//         .then(json => console.log(json))
//         .catch(error => console.log('Authorization failed: ' + error.message));
//     }

// performSignIn()
// getcfbApi()


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