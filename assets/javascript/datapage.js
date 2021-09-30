// Global variables
var lat;
var lon;

var covidApiKey = "0754bddab56f4369874e21793f17c9ea";
var openWeatherMapApiKey = "3e666a3d81484f1bb070cec8466f5dd9"

// initializes map object
function initMapOne(lat,lon){
    
    //initialized map
    var latit = 27.7634;
    var long = -80.5437;
    var optionsOne = {
        zoom: 11,
        center: {lat: latit, lng: long}
    }
    var map1 = new google.maps.Map(document.getElementById("map-api-1"),optionsOne);
    
    //create marker based on user input
    var marker = new google.maps.Marker({
        position:{lat: lat, lng: lon},
        map:map1
    });

    // get location of marker & set map center to the marker
    var latLng = marker.getPosition();
    map1.setCenter(latLng);

}

function initMapTwo(lat,lon) {
    
    //initialize map 2
    var latLngTwo = {
        lat: 34.0522,
        lng: -118.2437
    }
    var optionsTwo = {
        zoom: 10,
        center: latLngTwo
    }
    var map2 = new google.maps.Map(document.getElementById("map-api-2"),optionsTwo);

    //create marker based on user input
    var marker = new google.maps.Marker({
        position:{lat: lat, lng: lon},
        map:map2
    });

    //get location of marker & set map to the markers center
    var latLng = marker.getPosition();
    map2.setCenter(latLng);
}

// on click of submit button, send text input to the two api calls
var submitButton = document.querySelector(".btn");
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    
    //select the input box element for both cities
    var searchInputOne = document.querySelector("#city-input-1").value;
    var searchInputTwo = document.querySelector("#city-input-2").value;

    if (searchInputOne ==="") {
        searchInputOne = "Atlanta";
    } if (searchInputTwo === "" ) {
        searchInputTwo = "Boston";
    }
    // clears the last input
    document.querySelector("#city-input-1").value = "";
    document.querySelector("#city-input-2").value = "";
    
    // sends string values to the api call
    callLatLonOne(searchInputOne);
    callLatLonTwo(searchInputTwo);
});

// Gets latitude and longitude of the city
// Gets latitude and longitude of the city 1
function callLatLonOne(cityInput) {
    var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3e666a3d81484f1bb070cec8466f5dd9";
    fetch(latLonURL)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            cityName = data.name;
            lat = data.coord.lat;
            lon = data.coord.lon;
            console.log(typeof(lat));
            getLocationDetailsOne(lat, lon);
            initMapOne(lat,lon); // LA
        })
        .catch((e) => {
        console.log("Error with Location: Latitude and Longitude");
        });
}

// Gets latitude and longitude of the city 2
function callLatLonTwo(cityInput) {
    var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3e666a3d81484f1bb070cec8466f5dd9";
    fetch(latLonURL)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            cityName = data.name;
            lat = data.coord.lat;
            lon = data.coord.lon;
            console.log(typeof(lat));
            //Include all functions that depends on latitude and longitude of the city
            getLocationDetailsTwo(lat, lon);
            initMapTwo(lat,lon);
            // weatherUrl(lat, lon, cityName);
        })
        .catch((e) => {
        console.log("Error with Location: Latitude and Longitude");
        });
}





// Get County Information from latitude and longitude for City 1
function getLocationDetailsOne(lat, lon) {
    
    fetch("https://geo.fcc.gov/api/census/area?lat="+lat+"&lon="+lon+"&format=json")
        .then((response) => response.json())
        .then(function(data) {
        console.log(data);
        var countyFips = data.results[0].county_fips;
        console.log(countyFips); 
        getCovidDataOne(countyFips);                                                                                   
        })
        .catch((e) => {
        console.log("Error with Location Details");
        });
};


// Get Covid Data for County for City 1
function getCovidDataOne(countyFips) {
    $("#covid-api-1").children().remove(); 
    fetch("https://api.covidactnow.org/v2/county/"+countyFips+".json?apiKey="+covidApiKey)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);

            var countyName = data.county;
            var updateDate = data.lastUpdatedDate;
            var casesEl = data.actuals.cases;
            var deathsEl = data.actuals.deaths;
            var caseDensityEL = data.metrics.caseDensity;
            var icuCapacityRatioEl = data.metrics.icuCapacityRatio;
            var testPositivityRatioEl = data.metrics.testPositivityRatio;
            var vaccinationsInitiatedRatioEl = data.metrics.vaccinationsInitiatedRatio;
            
            $('<h5>Covid Data</h5>').appendTo("#covid-api-1");
            $('<div>Cases: ' + casesEl +' </div>').appendTo("#covid-api-1");
            $('<p>Deaths: ' + deathsEl +' </p>').appendTo("#covid-api-1");
            $('<p>Deaths: ' + icuCapacityRatioEl +' </p>').appendTo("#covid-api-1");
            $('<p>Deaths: ' + testPositivityRatioEl +' </p>').appendTo("#covid-api-1");
            $('<p>Deaths: ' + vaccinationsInitiatedRatioEl +' </p>').appendTo("#covid-api-1");
            $('<p>Case Density: ' + caseDensityEL +' (cases/100k population using a 7-day rolling average)</p>').appendTo("#covid-api-1");
            $('<p>Data provided by <a href="https://apidocs.covidactnow.org/">Covid Act Now</a></p>').appendTo("#covid-api-1");
        })
        .catch((e) => {
            console.log("Error with Covid Data");
        });
};

// Get County Information from latitude and longitude for City 2
function getLocationDetailsTwo(lat, lon) {
    
    fetch("https://geo.fcc.gov/api/census/area?lat="+lat+"&lon="+lon+"&format=json")
        .then((response) => response.json())
        .then(function(data) {
        console.log(data);
        var countyFips = data.results[0].county_fips;
        console.log(countyFips); 
        getCovidDataTwo(countyFips);                                                                                   
        })
        .catch((e) => {
        console.log("Error with Location Details");
        });
};


// Get Covid Data for County for City 2
function getCovidDataTwo(countyFips) {
    $("#covid-api-2").children().remove();
    fetch("https://api.covidactnow.org/v2/county/"+countyFips+".json?apiKey="+covidApiKey)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            var countyName = data.county;
            var updateDate = data.lastUpdatedDate;
            var casesEl = data.actuals.cases;
            var deathsEl = data.actuals.deaths;
            var caseDensityEL = data.metrics.caseDensity;
            var icuCapacityRatioEl = data.metrics.icuCapacityRatio;
            var testPositivityRatioEl = data.metrics.testPositivityRatio;
            var vaccinationsInitiatedRatioEl = data.metrics.vaccinationsInitiatedRatio;
            
            $('<h5>Covid Data</h5>').appendTo("#covid-api-2");
            $('<div>Cases: ' + casesEl +' </div>').appendTo("#covid-api-2");
            $('<p>Deaths: ' + deathsEl +' </p>').appendTo("#covid-api-2");
            $('<p>Deaths: ' + icuCapacityRatioEl +' </p>').appendTo("#covid-api-2");
            $('<p>Deaths: ' + testPositivityRatioEl +' </p>').appendTo("#covid-api-2");
            $('<p>Deaths: ' + vaccinationsInitiatedRatioEl +' </p>').appendTo("#covid-api-2");
            $('<p>Case Density: ' + caseDensityEL +' (cases/100k population using a 7-day rolling average)</p>').appendTo("#covid-api-2");
            $('<p>Data provided by <a href="https://apidocs.covidactnow.org/">Covid Act Now</a></p>').appendTo("#covid-api-2");
        })
        .catch((e) => {
            console.log("Error with Covid Data");
        });
};
