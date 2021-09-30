
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