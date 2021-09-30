// Global variables
var lat;
var lon;

// Gets latitude and longitude of the city
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
    });
}


