// Global variables
var lat;
var lon;

var covidApiKey = "0754bddab56f4369874e21793f17c9ea";
var openWeatherMapApiKey = "3e666a3d81484f1bb070cec8466f5dd9"
callLatLon("atlanta");


// Gets latitude and longitude of the city
function callLatLon(cityInput) {
    
    var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid="+openWeatherMapApiKey;
    
    fetch(latLonURL)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            cityName = data.name;
            lat = data.coord.lat;
            lon = data.coord.lon;
            console.log(lat);
            console.log(lon);
            var latLon = {
                lat: lat,
                lon: lon
            };
            
            //Include all functions that depends on latitude and longitude of the city
            getLocationDetails(lat, lon);
            
            // weatherUrl(lat, lon, cityName);
        })
        .catch((e) => {
        console.log("Error with Location Latitude and Longitude");
        });
}


// Get County Information from latitude and longitude
function getLocationDetails(lat, lon) {
    
    fetch("https://geo.fcc.gov/api/census/area?lat="+lat+"&lon="+lon+"&format=json")
        .then((response) => response.json())
        .then(function(data) {
        console.log(data);
        var countyFips = data.results[0].county_fips;
        console.log(countyFips); 
        getCovidData(countyFips);                                                                                   
        })
        .catch((e) => {
        console.log("Error with Location Details");
        });
}


// Get Covid Data for County
function getCovidData(countyFips) {
    
    fetch("https://api.covidactnow.org/v2/county/"+countyFips+".json?apiKey="+covidApiKey)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            var countyName = data.county;
            // var updateDate = data.lastUpdatedDate;
            var casesEl = data.actuals.cases;
            // var deathsEl = data.actuals.deaths;
            var caseDensityEL = data.metrics.caseDensity;
            // var icuCapacityRatioEl = data.metrics.icuCapacityRatio;
            // var testPositivityRatioEl = data.metrics.testPositivityRatio;
            // var vaccinationsInitiatedRatioEl = data.metrics.vaccinationsInitiatedRatio;
            console.log(countyName);
            console.log(casesEl);
            console.log(caseDensityEL);

            
            // $('<div>Cases: ' + casesEl +' </div>').appendTo("#covid-api-1");

            $('<h5>Covid Data</h5>').appendTo("#covid-api-1");
            
            // $('<p>Deaths: ' + deathsEl +' </p>').appendTo("#covid-api-1");
            // $('<p>Deaths: ' + icuCapacityRatioEl +' </p>').appendTo("#covid-api-1");
            // $('<p>Deaths: ' + testPositivityRatioEl +' </p>').appendTo("#covid-api-1");
            // $('<p>Deaths: ' + vaccinationsInitiatedRatioEl +' </p>').appendTo("#covid-api-1");
            // $('<p>Deaths: ' + caseDensityEL +' (cases/100k population using a 7-day rolling average)</p>').appendTo("#covid-api-1");
            // $('<p><img src= "http://https://drive.google.com/drive/folders/1p9SeJ6I28zzSrWEbmef5xi1vZr-GwhZB"/></p>').appendTo("#covid-api-1");
        })
        .catch((e) => {
            console.log("Error with Covid Data");
        });
};

