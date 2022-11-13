var OpenTripKey = '5ae2e3f221c38a28845f05b664810e898547599530db788ca6c2863c';

var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search');
var tableBodyEl = document.querySelector('#table-body');
var buttonRowOne = document.querySelector('#button-1');
var tableRowEl = document.getElementsByTagName('tr');
var tableHeadEl = document.querySelector('#table-head');
var attractionsList = document.querySelector('.attractions-list');
var attractionsCardBody = document.querySelector('.attractions-card');
var attractionsCard = document.querySelector('.local-events');
var tmResults = document.querySelector('.results');
var tmCardBody = document.querySelector('.tm-card');
var tmTableHead = document.querySelector('#tm-table-head');
var tmTableBody = document.querySelector('#tm-table-body')
var tmTable = document.querySelector('.tm-table')

var savedLocalAttractions = [];
var localAttractions = {};
var stadiumID = '';
var startDate ='';
var endDate='';
var stadiumsPlayed = [];
var gameData = [];

// ! CFB Schedule Fetch
var fetchSchedule = function(team){
  // reset schedule data in local storage
  gameData = [];
  localStorage.setItem('gameData', JSON.stringify(gameData));

  fetch("./assets/js/2022.json")
  .then(response => response.json())
  .then(schedule => {
    var teamSchedule = [];
    // if team chosen is away team or home team in any game, the game is added to teamSchedule array
    for (i=0; i<schedule.length; i++){
      if (team===schedule[i].away_team || team===schedule[i].home_team){
        teamSchedule.push(schedule[i])
      };
    };
    fetchStadiums(teamSchedule);
  });  
};


// ! Stadium Fetch
// Specific location data only available in stadium fetch call
var fetchStadiums = function(teamSchedule){
  fetch("./assets/js/stadiums.json")
  .then(response => response.json())
  .then(stadiums => {
      
  // Populate new table header. 
  // ?Could we loop this?
    var headerRow = document.createElement('tr');
    var colHeadOne = document.createElement('th');
    var colHeadTwo = document.createElement('th');
    var colHeadThree = document.createElement('th');
    var colHeadFour = document.createElement('th');
    colHeadOne.setAttribute('scope', 'col');
    colHeadTwo.setAttribute('scope', 'col');
    colHeadThree.setAttribute('scope', 'col');
    colHeadFour.setAttribute('scope', 'col');
    colHeadOne.textContent = 'Game Number';
    colHeadTwo.textContent = 'Date';
    colHeadThree.textContent = 'Teams';
    colHeadFour.textContent = 'Location';
    headerRow.appendChild(colHeadOne);
    headerRow.appendChild(colHeadTwo);
    headerRow.appendChild(colHeadThree);
    headerRow.appendChild(colHeadFour);
    tableHeadEl.appendChild(headerRow);

    // Extract endpoints and save as variables from schedule lookup
    for (i=0; i<teamSchedule.length; i++){
      var awayTeam = teamSchedule[i].away_team;
      var homeTeam = teamSchedule[i].home_team;
      if (teamSchedule[i].start_time_tbd){
        var gameDateTime = dayjs(teamSchedule[i].start_date).format('dddd, MMMM D, YYYY  -  [TBD]')
      } else {
        var gameDateTime = dayjs(teamSchedule[i].start_date).format('dddd, MMMM D, YYYY  -  h:mma')
      };
      var stadiumID = teamSchedule[i].venue_id;
      var startDateObject = dayjs(teamSchedule[i].start_date).subtract(1, 'days');
      var startDate = dayjs(startDateObject).format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      var endDateObject = dayjs(teamSchedule[i].start_date).add(2, 'days');
      var endDate = dayjs(endDateObject).format('YYYY-MM-DD[T]HH:mm:ss[Z]');

      // Append game week to schedule table as a link
      var rowEl = document.createElement('tr');
      tableBodyEl.appendChild(rowEl);
      var rowHeader = document.createElement('th');
      rowHeader.setAttribute('scope', 'row');
      rowHeader.textContent = i+1;
      rowEl.appendChild(rowHeader);
          
      // Append game date to schedule table as link
      var gameDate = document.createElement ('td');
      var linkClicker = document.createElement('a');
      linkClicker.classList.add('click-'+i);
      linkClicker.textContent = gameDateTime;
      rowEl.appendChild(gameDate);
      gameDate.appendChild(linkClicker);

      // Append game to schedule table as a link
      var gameData = document.createElement('td');
      var linkClicker = document.createElement('a');
      rowEl.appendChild(gameData);
      linkClicker.classList.add('click-'+i);
      linkClicker.textContent= awayTeam + ' vs. ' + homeTeam;
      gameData.appendChild(linkClicker);
  
  
      // stadiumID from teamShedule is used to lookup specific location data.Extract endpoints and save as variables from stadium call
      for(k=0; k<stadiums.length; k++){
        if (stadiumID===stadiums[k].id){
          stadiumsPlayed.push(stadiumID);
          var city = stadiums[k].city;
          var state = stadiums[k].state;
          var zipCode = stadiums[k].zip;
          var latitude = stadiums[k].location.x;
          var longitude = stadiums[k].location.y;
          var cityPlayed = document.createElement('td');
          
          // Append city to schedule table
          var cityClicker = document.createElement('a');
          cityClicker.classList.add('click-'+i);
          cityClicker.textContent = city + ', ' + state;
          rowEl.appendChild(cityPlayed);
          cityPlayed.appendChild(cityClicker)
        };         
      };

      // Save the information needed for API calls to localStorage as an object
      gameData = JSON.parse(localStorage.getItem('gameData')) ?? [];
      gameLocaleData = {
        gameWeek : i+1,
        zip : zipCode,
        lat : latitude,
        lon : longitude,
        earlyDate : startDate,
        lateDate : endDate 
      };
      gameData.push(gameLocaleData);
      localStorage.setItem('gameData', JSON.stringify(gameData));     
    };


// ! Row Buttons
// ? Can we use a for loop to clean this up?
// ? Can we make entire row a button as opposed to individual items?

    var buttonZero = document.querySelectorAll('.click-0')
    for (i=0; i<buttonZero.length; i++)
    buttonZero[i].addEventListener("click", function (event) {
      openTripMapCall(0);
      tickemasterAPICall(0);
    }); 

    var buttonOne = document.querySelectorAll('.click-1')
    for (i=0; i<buttonOne.length; i++)
    buttonOne[i].addEventListener("click", function (event) {
      openTripMapCall(1);
      tickemasterAPICall(1);
    }); 

    var buttonTwo = document.querySelectorAll('.click-2')
    for (i=0; i<buttonTwo.length; i++)
    buttonTwo[i].addEventListener("click", function (event) {
      openTripMapCall(2);
      tickemasterAPICall(2);
    }); 

    var buttonThree = document.querySelectorAll('.click-3')
    for (i=0; i<buttonThree.length; i++)
    buttonThree[i].addEventListener("click", function (event) {
      openTripMapCall(3);
      tickemasterAPICall(3);
    }); 

    var buttonFour = document.querySelectorAll('.click-4')
    for (i=0; i<buttonFour.length; i++)
    buttonFour[i].addEventListener("click", function (event) {
      openTripMapCall(4);
      tickemasterAPICall(4);
    }); 

    var buttonFive = document.querySelectorAll('.click-5')
    for (i=0; i<buttonFive.length; i++)
    buttonFive[i].addEventListener("click", function (event) {
      openTripMapCall(5);
      tickemasterAPICall(5);
    }); 

    var buttonSix = document.querySelectorAll('.click-6')
    for (i=0; i<buttonSix.length; i++)
    buttonSix[i].addEventListener("click", function (event) {
      openTripMapCall(6);
      tickemasterAPICall(6);
    }); 

    var buttonSeven = document.querySelectorAll('.click-7')
    for (i=0; i<buttonSeven.length; i++)
    buttonSeven[i].addEventListener("click", function (event) {
      openTripMapCall(7);
      tickemasterAPICall(7);
    }); 

    var buttonEight = document.querySelectorAll('.click-8')
    for (i=0; i<buttonEight.length; i++)
    buttonEight[i].addEventListener("click", function (event) {
      openTripMapCall(8);
      tickemasterAPICall(8);
    }); 

    var buttonNine = document.querySelectorAll('.click-9')
    for (i=0; i<buttonNine.length; i++)
    buttonNine[i].addEventListener("click", function (event) {
      openTripMapCall(9);
      tickemasterAPICall(9);
    }); 

    var buttonTen = document.querySelectorAll('.click-10')
    for (i=0; i<buttonTen.length; i++)
    buttonTen[i].addEventListener("click", function (event) {
      openTripMapCall(10);
      tickemasterAPICall(10);
    }); 

    var buttonEleven = document.querySelectorAll('.click-11')
    for (i=0; i<buttonEleven.length; i++)
    buttonEleven[i].addEventListener("click", function (event) {
      openTripMapCall(11);
      tickemasterAPICall(11);
    });   

    var buttonTwelve = document.querySelectorAll('.click-12')
    for (i=0; i<buttonTwelve.length; i++)
    buttonTwelve[i].addEventListener("click", function (event) {
      openTripMapCall(12);
      tickemasterAPICall(12);
    });   
    
    var buttonThirteen = document.querySelectorAll('.click-13')
    for (i=0; i<buttonThirteen.length; i++)
    buttonThirteen[i].addEventListener("click", function (event) {
      openTripMapCall(13);
      tickemasterAPICall(13);
    });   
  });  
};  


// ! Ticketmaster Fetch
function getTicketmasterApi(tmGeohash, startDate, endDate) {
  savedTMEvents = [];
  localStorage.setItem('savedTMEvents', JSON.stringify(savedTMEvents))

  var tickemasterAPI = 'ZhQouzEAxvFo61xAEbXYq4kqmcjgUAqX'
  var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?radius=5&classificationName=sports,music&sort=date,asc&size=15&geoPoint=' + tmGeohash + '&startDateTime=' + startDate + '&endDateTime=' + endDate + '&apikey=' + tickemasterAPI;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {

      // loop to get TM data and save to localStorage
      for (i=0; i<Data._embedded.events.length; i++){

        if (Data._embedded.events[i].dates.start.timeTBA){
          var tmEventDate = dayjs(Data._embedded.events[i].dates.start.localDate).format('M/D/YYYY');
          var tmEventTime = 'TBA';
        } else {
          var tmEventDate = dayjs(Data._embedded.events[i].dates.start.dateTime).format('M/D/YYYY');
          var tmEventTime = dayjs(Data._embedded.events[i].dates.start.dateTime).format('h:mma');
        }

        var tmEventName = Data._embedded.events[i].name;
        var tmEventLink = Data._embedded.events[i].url;
        
        newTMResults = {
          tmEventName: tmEventName,
          tmEventDate: tmEventDate,
          tmEventTime: tmEventTime,
          tmEventLink: tmEventLink
        };
        
        savedTMEvents.push(newTMResults);
        localStorage.setItem('savedTMEvents', JSON.stringify(savedTMEvents))
      };
    });
    setTimeout(function() {
      displayTicketmaster()
    }, 2000);
};

// ! Ticketmaster Display
var displayTicketmaster = function() {
  var existingTMEvents = tmTable.getElementsByTagName('*');
  
  // Hides past results
  for (i=0; i<existingTMEvents.length; i++){
    existingTMEvents[i].setAttribute('style', 'display: none')
  }
 
  // Populate new table header. Could probably be done in for loop
  var headerRow = document.createElement('tr');
  var colHeadOne = document.createElement('th')
  var colHeadTwo = document.createElement('th')
  var colHeadThree = document.createElement('th')
  var colHeadFour = document.createElement('th')
  colHeadOne.setAttribute('scope', 'col')
  colHeadTwo.setAttribute('scope', 'col')
  colHeadThree.setAttribute('scope', 'col')
  colHeadFour.setAttribute('scope', 'col')
  colHeadOne.textContent = 'Date';
  colHeadTwo.textContent = 'Time';
  colHeadThree.textContent = 'Event';
  headerRow.appendChild(colHeadOne);
  headerRow.appendChild(colHeadTwo);
  headerRow.appendChild(colHeadThree);
  headerRow.appendChild(colHeadFour);
  tmTableHead.appendChild(headerRow);
 
  // Append each attraction to schedule table as a wikipedia link
  for (i=0; i<savedTMEvents.length; i++) {
    ticketmasterLink = savedTMEvents[i].tmEventLink;

    //  Populate TM row for each event
    var rowEl = document.createElement('tr');
    tmTableBody.appendChild(rowEl);

    // Append event date to table
    var eventDate = document.createElement('td');
    rowEl.appendChild(eventDate);
    eventDate.setAttribute('scope', 'row');
    eventDate.textContent = savedTMEvents[i].tmEventDate;
    
    // Append evnet time to table
    var eventTime = document.createElement('td');
    rowEl.appendChild(eventTime);
    eventTime.textContent = savedTMEvents[i].tmEventTime;

    // Append Event name to Title as link to TM
    var eventTitle = document.createElement('td');
    var tmLink = document.createElement('a');
    rowEl.appendChild(eventTitle);
    // tmLink.setAttribute('href', ticketmasterLink);
    eventTitle.textContent = savedTMEvents[i].tmEventName;
    // tmLink.textContent = savedTMEvents[i].tmEventName;
    // eventTitle.appendChild(tmLink);
    tmTableBody.appendChild(rowEl);

    // Tickets button
    var ticketButton = document.createElement('button');
    var tmLink = document.createElement('a');
    rowEl.appendChild(ticketButton);
    tmLink.setAttribute('href', ticketmasterLink);
    tmLink.textContent = 'Tickets';
    tmLink.setAttribute('target', '_blank')
    ticketButton.appendChild(tmLink);
    tmTableBody.appendChild(rowEl);

  };
  tmResults.setAttribute('style', 'display:block')
  tmTable.setAttribute('style', 'display:inline')
  tmTableHead.setAttribute('style', 'display:table-header-group')
  tmTableBody.setAttribute('style', 'display:table-row-group')
};

var tickemasterAPICall = function(gameWeek){
  gameData = JSON.parse(localStorage.getItem('gameData'))
  var tmLatitude = gameData[gameWeek].lat;
  var tmLongitude = gameData[gameWeek].lon;
  var tmGeohash = Geohash.encode(tmLatitude, tmLongitude, 5);
  var startDate = gameData[gameWeek].earlyDate;
  var endDate = gameData[gameWeek].lateDate;
  getTicketmasterApi(tmGeohash, startDate, endDate)
}

// ! openTripMap Fetch

function getOpenTripApi(longitude, latitude) {

  var requestUrl = 'https://api.opentripmap.com/0.1/en/places/radius?radius=16092&lon='+ longitude +'&lat=' + latitude +'&src_attr=wikidata&kinds=historic%2Cnatural%2Ccultural&apikey=' + OpenTripKey

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {

      // For loop extracts xid from each attraction
      var xidList = [];
      for (i=0; i<Data.features.length; i++){
        var xid = Data.features[i].properties.xid;
        xidList.push(xid);
      };
      getLocationDetails(xidList);
    });
};

// function passes in week number and matches with saved lat/lon to serve as variables in getOpenTrip fetch call
var openTripMapCall = function(gameWeek){
  gameData = JSON.parse(localStorage.getItem('gameData'))
  latitude = gameData[gameWeek].lat;
  longitude = gameData[gameWeek].lon;
  getOpenTripApi(longitude, latitude)
}

// ! openTripMap Details Fetch
// function accepts array of xid values to complete individual fetch calls. 
function getLocationDetails(xidList) {
  var pullDetails = function(){
    // reset local storage saved attractions
    savedLocalAttractions = [];
    localStorage.setItem('savedLocalAttractions', JSON.stringify(savedLocalAttractions));

    // For loop to fetch object data based on xid; limit 10/secoond per openTripMapAPI
    for (i=0; i<9; i++) {
      var xid = xidList[i];
      var requestUrl = 'https://api.opentripmap.com/0.1/en/places/xid/'+xid+'?apikey='+OpenTripKey;

      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (Data) {

          var attractionName = Data.name;
          var attractionWikiLink = Data.wikipedia;

          // TODO: utilize the following endpoints to expand what is on the card
          // var attractionImage = Data.image;
          // var attractionDescription = Data.wikipedia_extracts.text;
          // var attractionAddress = Data.address;
          
          // save details in object
          localAttractions ={
            name: attractionName,
            wikiLink: attractionWikiLink,
            
            // TODO: store the additional values in object
            // image: attractionImage,
            // description: attractionDescription,
            // address: attractionAddress,  
          };

          // append array to save and store attraction details
          savedLocalAttractions.push(localAttractions);
          localStorage.setItem('savedLocalAttractions', JSON.stringify(savedLocalAttractions))
        });   
    };
  };
  pullDetails();

  // delay displaying card until pullDetails function has time to save to and read from localStorage
  setTimeout(function() {
    displayAttractions()
  }, 2000);
};


// ! openTripMap Display Card
// Get attractions out of localStorage and loop into Attractions Card. 
var displayAttractions = function() {
  var existingAttractions = attractionsCardBody.getElementsByTagName('*')
  for (i=0; i<existingAttractions.length; i++){
    existingAttractions[i].setAttribute('style', 'display: none')
  }
  // attractionsList.setAttribute('style', 'display:inline-block')
  savedLocalAttractions = JSON.parse(localStorage.getItem('savedLocalAttractions')) ?? [];
  var attractionsHeader = document.createElement('h5');
  attractionsHeader.textContent = 'Local Attractions';
  attractionsHeader.classList.add('card-title');
  attractionsCardBody.appendChild(attractionsHeader);
 
  // Append each attraction to schedule table as a wikipedia link
  for (i=0; i<savedLocalAttractions.length; i++) {
    wikipedia = savedLocalAttractions[i].wikiLink;
    var nameEl = document.createElement('p');
    attractionsCardBody.appendChild(nameEl);
    if (savedLocalAttractions[i].wikiLink) {
      var wikiLink = document.createElement('a');
      wikiLink.textContent = savedLocalAttractions[i].name;
      wikiLink.setAttribute('href', savedLocalAttractions[i].wikiLink)
      wikiLink.setAttribute('target', '_blank')
      nameEl.appendChild(wikiLink);
    } else {
      nameEl.textContent = savedLocalAttractions[i].name;
    };
    
    // ?Can we add photos and description? Framework laid out in openTripDetails Fetch
    // var imageEl = document.createElement('img')
    // imageEl.setAttribute('src', savedLocalAttractions[i].image);
    // attractionsList.appendChild(imageEl)
    // descriptionEl.textContent = savedLocalAttractions.description;
    // addressEl.textContent = savedLocalAttractions.address;
    // wikiEl.textContent = savedLocalAttractions.wikilink;

  };
  attractionsCard.setAttribute('style', 'display:block')
};  

// !Search button 
searchButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  for (i=0; i<tableRowEl.length; i++){
    tableRowEl[i].setAttribute('style', 'display: none')
  }
  var team = searchInput.value;
  fetchSchedule(team)
});

// search input field as alternative selection method
searchInput.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    for (i=0; i<tableRowEl.length; i++){
      tableRowEl[i].setAttribute('style', 'display: none')
    }
    gameData = [];
    localStorage.setItem('gameData', JSON.stringify(gameData));
    var team = searchInput.value;
    fetchSchedule(team)
  };
});  


// Ticketmaster utilizes geoHashes for their API to fetch based on location. The open source function below takes in and converts latitude and longitude and returns geohashes that we can then pass into the TM fetch call. Previous method of using the zipcode query parameter would not return events outside of the zipcode used.

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Geohash encoding/decoding and associated functions   (c) Chris Veness 2014-2019 / MIT Licence  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // (geohash-specific) Base32 map


/**
 * Geohash: Gustavo Niemeyer’s geocoding system.
 */
 class Geohash {

  /**
   * Encodes latitude/longitude to geohash, either to specified precision or to automatically
   * evaluated precision.
   *
   * @param   {number} lat - Latitude in degrees.
   * @param   {number} lon - Longitude in degrees.
   * @param   {number} [precision] - Number of characters in resulting geohash.
   * @returns {string} Geohash of supplied latitude/longitude.
   * @throws  Invalid geohash.
   *
   * @example
   *     const geohash = Geohash.encode(52.205, 0.119, 7); // => 'u120fxw'
   */
  static encode(lat, lon, precision) {
      // infer precision?
      if (typeof precision == 'undefined') {
          // refine geohash until it matches precision of supplied lat/lon
          for (let p=1; p<=12; p++) {
              const hash = Geohash.encode(lat, lon, p);
              const posn = Geohash.decode(hash);
              if (posn.lat==lat && posn.lon==lon) return hash;
          }
          precision = 12; // set to maximum
      }

      lat = Number(lat);
      lon = Number(lon);
      precision = Number(precision);

      if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash');

      let idx = 0; // index into base32 map
      let bit = 0; // each char holds 5 bits
      let evenBit = true;
      let geohash = '';

      let latMin =  -90, latMax =  90;
      let lonMin = -180, lonMax = 180;

      while (geohash.length < precision) {
          if (evenBit) {
              // bisect E-W longitude
              const lonMid = (lonMin + lonMax) / 2;
              if (lon >= lonMid) {
                  idx = idx*2 + 1;
                  lonMin = lonMid;
              } else {
                  idx = idx*2;
                  lonMax = lonMid;
              }
          } else {
              // bisect N-S latitude
              const latMid = (latMin + latMax) / 2;
              if (lat >= latMid) {
                  idx = idx*2 + 1;
                  latMin = latMid;
              } else {
                  idx = idx*2;
                  latMax = latMid;
              }
          }
          evenBit = !evenBit;

          if (++bit == 5) {
              // 5 bits gives us a character: append it and start over
              geohash += base32.charAt(idx);
              bit = 0;
              idx = 0;
          }
      }

      return geohash;
  }
 };