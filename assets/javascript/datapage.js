
// initializes map object
function initMap(){
    
    var latLngOne = {
        lat: 27.7634,
        lng: -80.5437
    }
    var optionsOne = {
        zoom: 10,
        center: latLngOne
    }

    var map1 = new google.maps.Map(document.getElementById("map-api-1"),optionsOne);

    var latLngTwo = {
        lat: 34.0522,
        lng: -118.2437
    }
    var optionsTwo = {
        zoom: 10,
        center: latLngTwo
    }

    var map2 = new google.maps.Map(document.getElementById("map-api-2"),optionsTwo);
}
// Global variables
var lat;
var lon;

// Gets latitude and longitude of the city
// use once for each city.
function callLatLon(cityInput) {
    var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3e666a3d81484f1bb070cec8466f5dd9";
    fetch(latLonURL)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            cityName = data.name;
            lat = data.coord.lat;
            lon = data.coord.lon;
            var latLon = {
                lat: lat,
                lon: lon
            };
            //Include all functions that depends on latitude and longitude of the city
            weatherUrl(lat, lon, cityName);
            initMap(27.7634, -80.5437); // tampa map
            initMap(34.0522, -118.2437) // LA
    });
}


