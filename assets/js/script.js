var OpenTripKey = '5ae2e3f221c38a28845f05b664810e898547599530db788ca6c2863c';

var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search');
var tableBodyEl = document.querySelector('#table-body');
var buttonRowOne = document.querySelector('#button-1');
var tableRowEl = document.getElementsByTagName('tr')
var tableHeadEl = document.querySelector('#table-head')

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
    colHeadOne.textContent = 'Game Number';
    colHeadTwo.textContent = 'College Football Games';
    colHeadThree.textContent = 'Dates';
    colHeadFour.textContent = 'Cities';
    headerRow.appendChild(colHeadOne);
    headerRow.appendChild(colHeadTwo);
    headerRow.appendChild(colHeadThree);
    headerRow.appendChild(colHeadFour);
    tableHeadEl.appendChild(headerRow);

    // Extract endpoints and save as variables from schedule lookup
    for (i=0; i<teamSchedule.length; i++){
      var awayTeam = teamSchedule[i].away_team;
      var homeTeam = teamSchedule[i].home_team;
      var gameDateTime = dayjs(teamSchedule[i].start_date).format('dddd, MMMM D, YYYY  -  h:mma')
      var stadiumID = teamSchedule[i].venue_id;
      var startDateObject = dayjs(teamSchedule[i].start_date).subtract(2, 'days');
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
      
      // Append game to schedule table as a link
      var gameData = document.createElement('td');
      var linkClicker = document.createElement('a');
      rowEl.appendChild(gameData);
      linkClicker.classList.add('click-'+i);
      linkClicker.textContent= awayTeam + ' vs. ' + homeTeam;
      gameData.appendChild(linkClicker);
      
      // Append game date to schedule table as link
      var gameDate = document.createElement ('td');
      var linkClicker = document.createElement('a');
      linkClicker.classList.add('click-'+i);
      linkClicker.textContent = gameDateTime;
      rowEl.appendChild(gameDate);
      gameDate.appendChild(linkClicker);
  
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
      console.log('test')
      openTripMapCall(0);
      // tickemasterAPICall(0);
    }); 

    var buttonOne = document.querySelectorAll('.click-1')
    for (i=0; i<buttonOne.length; i++)
    buttonOne[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(1);
      // tickemasterAPICall(1);
    }); 

    var buttonTwo = document.querySelectorAll('.click-2')
    for (i=0; i<buttonTwo.length; i++)
    buttonTwo[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(2);
      // tickemasterAPICall(2);
    }); 

    var buttonThree = document.querySelectorAll('.click-3')
    for (i=0; i<buttonThree.length; i++)
    buttonThree[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(3);
      // tickemasterAPICall(3);
    }); 

    var buttonFour = document.querySelectorAll('.click-4')
    for (i=0; i<buttonFour.length; i++)
    buttonFour[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(4);
      // tickemasterAPICall(4);
    }); 

    var buttonFive = document.querySelectorAll('.click-5')
    for (i=0; i<buttonFive.length; i++)
    buttonFive[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(5);
      // tickemasterAPICall(5);
    }); 

    var buttonSix = document.querySelectorAll('.click-6')
    for (i=0; i<buttonSix.length; i++)
    buttonSix[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(6);
      // tickemasterAPICall(6);
    }); 

    var buttonSeven = document.querySelectorAll('.click-7')
    for (i=0; i<buttonSeven.length; i++)
    buttonSeven[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(7);
      // tickemasterAPICall(7);
    }); 

    var buttonEight = document.querySelectorAll('.click-8')
    for (i=0; i<buttonEight.length; i++)
    buttonEight[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(8);
      // tickemasterAPICall(8);
    }); 

    var buttonNine = document.querySelectorAll('.click-9')
    for (i=0; i<buttonNine.length; i++)
    buttonNine[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(9);
      // tickemasterAPICall(9);
    }); 

    var buttonTen = document.querySelectorAll('.click-10')
    for (i=0; i<buttonTen.length; i++)
    buttonTen[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(10);
      // tickemasterAPICall(10);
    }); 

    var buttonEleven = document.querySelectorAll('.click-11')
    for (i=0; i<buttonEleven.length; i++)
    buttonEleven[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(11);
      // tickemasterAPICall(11);
    });   

    var buttonTwelve = document.querySelectorAll('.click-12')
    for (i=0; i<buttonTwelve.length; i++)
    buttonTwelve[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(12);
      // tickemasterAPICall(12);
    });   
    
    var buttonThirteen = document.querySelectorAll('.click-13')
    for (i=0; i<buttonThirteen.length; i++)
    buttonThirteen[i].addEventListener("click", function (event) {
      console.log('test')
      openTripMapCall(13);
      // tickemasterAPICall(13);
    });   
  });  
};  


// ! Ticketmaster Fetch
function getTicketmasterApi(zipCode, startDate, endDate) {
  var tickemasterAPI = 'ZhQouzEAxvFo61xAEbXYq4kqmcjgUAqX'
  var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?postalCode=' + zipCode + '&startDateTime=' + startDate + '&endDateTime=' + endDate + '&apikey=' + tickemasterAPI;
  console.log(requestUrl)
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (Data) {

      // TODO: for loop to get data listed below and append to TM card
      console.log(Data);
      console.log(Data._embedded.events[0].dates.start.localDate);
      console.log(Data._embedded.events[0].dates.start.localTime);
      console.log(Data._embedded.events[0].name);
      console.log(Data._embedded.events[0].url);
      // doOtherThings(Data);
    });
};

var tickemasterAPICall = function(gameWeek){
  gameData = JSON.parse(localStorage.getItem('gameData'))
  var zipCode = gameData[gameWeek].zip;
  var startDate = gameData[gameWeek].earlyDate;
  var endDate = gameData[gameWeek].lateDate;
  getTicketmasterApi(zipCode, startDate, endDate)
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
  
  // reset local storage saved attractions
  savedLocalAttractions = [];
  localStorage.setItem('savedLocalAttractions', JSON.stringify(savedLocalAttractions))

  // For loop to fetch object data based on xid; limit 10/secoond per openTripMapAPI
  for (i=0; i<9; i++) {
    var xid = xidList[i];
    var requestUrl = 'https://api.opentripmap.com/0.1/en/places/xid/'+xid+'?apikey='+OpenTripKey;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (Data) {
        console.log(Data)
        var attractionName = Data.name;
        var attractionImage = Data.image;
        var attractionDescription = Data.wikipedia_extracts.text;
        var attractionAddress = Data.address;
        var attractionWikiLink = Data.wikipedia;

        // save details in object
        localAttractions ={
          name: attractionName,
          image: attractionImage,
          description: attractionDescription,
          address: attractionAddress,
          wikilink: attractionWikiLink,
        };

        // append array to save and store attraction details
        savedLocalAttractions.push(localAttractions);
        localStorage.setItem('savedLocalAttractions', JSON.stringify(savedLocalAttractions))

      });
  };
};

// TODO: get attractions out of localStorage and loop into Attractions Card. Discuss search parameters(types of results)




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
