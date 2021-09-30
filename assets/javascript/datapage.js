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
// Global variables
// var lat;
// var lon;

// Gets latitude and longitude of the city
// use once for each city.
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
            // var latLon = {
            //     lat: lat,
            //     lon: lon
            // };
            //Include all functions that depends on latitude and longitude of the city
            //weatherUrl(lat, lon, cityName);
            //initMap(lat, lon); // tampa map
            initMapOne(lat,lon) // LA
    });
}

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
            // var latLon = {
            //     lat: lat,
            //     lon: lon
            // };
            //Include all functions that depends on latitude and longitude of the city
            //weatherUrl(lat, lon, cityName);
            initMapTwo(lat,lon);
    });
}

callLatLonOne("Boston");
callLatLonTwo("Cairo");

