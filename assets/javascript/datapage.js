function cityWeather(cityInput) {
    var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=3e666a3d81484f1bb070cec8466f5dd9";
    var lat;
    var lon;
    fetch(latLonURL)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            cityName = data.name;
            lat = data.coord.lat;
            lon = data.coord.lon;
            var latLon {
                lat: lat,
                lon: lon
            };
            weatherUrl(lat, lon, cityName);
            console.log(lat);
            console.log(lon);    
            return latLon; 
    });
    
    function weatherUrl(lat, lon, cityName) {
        var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&cnt=6&appid=3e666a3d81484f1bb070cec8466f5dd9";
        fetch(weatherUrl)
            .then(response =>response.json())
            .then(function(data) {
                console.log(data);
                getWeather(data, cityName);
        });
    };
};