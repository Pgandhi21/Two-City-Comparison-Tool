// Global variables
var lat;
var lon;

var covidApiKey = "0754bddab56f4369874e21793f17c9ea";
var openWeatherMapApiKey = "3e666a3d81484f1bb070cec8466f5dd9";
var openWeatherApiKey = "7e44ab7dc38056f61c9d41fc361df519";

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
        zoom: 11,
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

    // if no user input, selects default cities to be displayed.
    if (searchInputOne ==="") {
        searchInputOne = "Atlanta";
    } if (searchInputTwo === "" ) {
        searchInputTwo = "New York";
    }
    // clears the last input
    document.querySelector("#city-input-1").value = "";
    document.querySelector("#city-input-2").value = "";
    
    // sends string values to the api call
    callLatLonOne(searchInputOne);
    callLatLonTwo(searchInputTwo);

    //  get weather for city1 and city2
    weatherCityOne(searchInputOne);
    weatherCityTwo(searchInputTwo);

    //calls checkbox validation functions
    checkboxValidationMaps();
    checkboxValidationCovid();
    checkboxValidationJobs();
    checkboxValidationWeather();
    
    

    //Show Error message when none of the checkbox are clicked
    var checkboxMapEl = $("#checkbox-map").is(':checked');
    var checkboxCovidEl = $("#checkbox-covid").is(':checked');
    var checkboxJobsEl = $("#checkbox-jobs").is(':checked');
    var checkboxWeatherEl = $("#checkbox-weather").is(':checked');

    if(!checkboxMapEl && !checkboxCovidEl && !checkboxJobsEl && !checkboxWeatherEl){
    $('.modal').modal();
    };

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
            // creates job section using searched cities
            jobSearchOne(cityName);
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
            jobSearchTwo(cityName);
            // weatherUrl(lat, lon, cityName);
        })
        .catch((e) => {
        console.log("Error with Location: Latitude and Longitude");
        });
}

//checks if checkbox is clicked, if so display the map api
function checkboxValidationMaps() {
    var checkbox = document.querySelector("#checkbox-map");
    var mapApis = document.querySelectorAll(".map-api");

    if (checkbox.checked == true){
        for (var i = 0; i < mapApis.length; i++) {
            mapApis[i].setAttribute("style", "display: flex;");
            console.log("check is checked");
        }
    } else {
        for (var n = 0; n < mapApis.length; n++) {
            mapApis[n].setAttribute("style", "display:none;");
            console.log("check not checked");
        }
    }

}

function checkboxValidationCovid() {
    var checkbox = document.querySelector("#checkbox-covid");
    var covidApis = document.querySelectorAll(".covid-api");

    if (checkbox.checked == true){
        for (var i = 0; i < covidApis.length; i++) {
            covidApis[i].setAttribute("style", "display: block;");
            console.log("check is checked");
        }
    } else {
        for (var n = 0; n < covidApis.length; n++) {
            covidApis[n].setAttribute("style", "display:none;");
            console.log("check not checked");
        }
    }
}

function checkboxValidationJobs() {
    var checkbox = document.querySelector("#checkbox-jobs");
    var jobApis = document.querySelectorAll(".job-api");

    if (checkbox.checked == true){
        for (var i = 0; i < jobApis.length; i++) {
            jobApis[i].setAttribute("style", "display: flex;");
            console.log("check is checked");
        }
    } else {
        for (var n = 0; n < jobApis.length; n++) {
            jobApis[n].setAttribute("style", "display:none;");
            console.log("check not checked");
        }
    }
}

function checkboxValidationWeather() {
    var checkbox = document.querySelector("#checkbox-weather");
    var weatherApis = document.querySelectorAll(".weather-api");

    if (checkbox.checked == true){
        for (var i = 0; i < weatherApis.length; i++) {
            weatherApis[i].setAttribute("style", "display: block;");
            console.log(" weather checkbox is checked");
        }
    } else {
        for (var n = 0; n < weatherApis.length; n++) {
            weatherApis[n].setAttribute("style", "display:none;");
            console.log("weather checkbox not checked");
        }
    }
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


// list out job openings for certain cities, with respective positions, companies, languages required, and pay
var jobsArray = [
    {"city":"Atlanta","position":"Full Stack Software Engineer","company":"Microsuft","languages":"Java, C/C++, Python","pay":"$75,000/year"},
    {"city":"Atlanta","position":"Front End Web Developer","company":"Googul","languages":"CSS, JavaScript, Materialize","pay":"$90,000/year"},
    {"city":"Atlanta","position":"Entry Level Software Developer","company":"Malechimp","languages":"React JS","pay":"$65,000/year"},
    {"city":"Los Angeles","position":"Software Engineer, IOS","company":"Tweeter","languages":"Objective-C, C++, Swift","pay":"$60,000/year"},
    {"city":"Los Angeles","position":"Back End Software Engineer","company":"TitanZ","languages":"Python, NoSQL, GraphQL","pay":"$78,000/year"},
    {"city":"Los Angeles","position":"Entry Level Programmer","company":"HelloWorld","languages":"HTML, CSS, JavaScript","pay":"$30/hour"},
    {"city":"New York","position":"Full Stack Software Engineer","company":"Appel","languages":"Java, C/C++, Python","pay":"$95,000/year"},
    {"city":"New York","position":"Entry Level Software Developer","company":"Tweeter","languages":"CSS, JavaScript, Bootstrap","pay":"$66,000/year"},
    {"city":"New York","position":"Front End Web Developer","company":"Amazone","languages":"React.js, JavaScript, Angular","pay":"$92,000/year"},
    {"city":"Philadelphia","position":"Front End Web Developer","company":"Wallmart","languages":"HTML, CSS, Javascript","pay":"$57,000/year"},
    {"city":"Philadelphia","position":"Entry Level Software Developer","company":"HelloWorld","languages":"Java, C/C++, Python","pay":"$30/hour"},
    {"city":"Philadelphia","position":"Software Engineer, Android","company":"Faceboop","languages":"Java","pay":"$66,000/year"},
    {"city":"Chicago","position":"Entry Level Programmer","company":"iBay","languages":"React.js, JavaScript, Angular","pay":"$68,000/year"},
    {"city":"Chicago","position":"Full Stack Software Engineer","company":"Targit","languages":"Java, C/C++, Python","pay":"$77,000/year"},
    {"city":"Chicago","position":"Software Engineer","company":"Endeed","languages":"HTML, CSS, Javascript","pay":"$52,000/year"},
]

console.log(jobsArray);

var jobsApi1 = document.querySelector('#jobs-api-1');
var jobsApi2 = document.querySelector('#jobs-api-2');

// search through array to pick out the cities that match the user input and display its respective properties
function jobSearchOne(searchInputOne) {

    var selectedJobsOne = jobsArray.filter(location => (location.city.includes(searchInputOne)));
    console.log(selectedJobsOne);

    jobsApi1.textContent = "Job Search Results:";

    for (var i = 0; i < selectedJobsOne.length; i++) {
        var mainDiv1 = document.createElement('div');
        mainDiv1.classList.add("job"+i);
        jobsApi1.appendChild(mainDiv1);
        var position = document.createElement('p');
        position.textContent = 'Job Position: ' + selectedJobsOne[i].position;
        mainDiv1.appendChild(position);
        var company = document.createElement('p');
        company.textContent = 'Company: ' + selectedJobsOne[i].company;
        mainDiv1.appendChild(company);
        var languages = document.createElement('p');
        languages.textContent = 'Languages: ' + selectedJobsOne[i].languages;
        mainDiv1.appendChild(languages);
        var pay = document.createElement('p');
        pay.textContent = 'Pay: ' + selectedJobsOne[i].pay;
        mainDiv1.appendChild(pay);
    }

    if (selectedJobsOne.length === 0) {
        console.log("hello!")
    }
}

function jobSearchTwo(searchInputTwo) {
    var selectedJobsTwo = jobsArray.filter(location => (location.city.includes(searchInputTwo)));
    console.log(selectedJobsTwo);
    
    jobsApi2.textContent = "Job Search Results:";

    for (var i = 0; i < selectedJobsTwo.length; i++) {
        var mainDiv2 = document.createElement('div');
        mainDiv2.classList.add("job-"+i);
        jobsApi2.appendChild(mainDiv2);
        var position = document.createElement('p');
        position.textContent = 'Job Position: ' + selectedJobsTwo[i].position;
        mainDiv2.appendChild(position);
        var company = document.createElement('p');
        company.textContent = 'Company: ' + selectedJobsTwo[i].company;
        mainDiv2.appendChild(company);
        var languages = document.createElement('p');
        languages.textContent = 'Languages: ' + selectedJobsTwo[i].languages;
        mainDiv2.appendChild(languages);
        var pay = document.createElement('p');
        pay.textContent = 'Pay: ' + selectedJobsTwo[i].pay;
        mainDiv2.appendChild(pay);
    }

    if (selectedJobsTwo.length === 0) {
        console.log("hello!")
    }
}

// Weather API Section

// Get weather for city 1

function weatherCityOne(cityInput) {
    $("#weather-api-1").children().remove();
    var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=7e44ab7dc38056f61c9d41fc361df519&units=imperial";
    fetch(latLonURL)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            cityName = data.name;
             cityMinTemp = data.main.temp_min;
             cityMaxTemp = data.main.temp_max;
             tempIcon = data.weather[0].icon;
             cityWind = data.wind.speed;
             cityHumidity = data.main.humidity;

// dynamically generate weather card with weather elements  

$('<h5 class="weatherHeader">City Weather</h5>').appendTo("#weather-api-1");
$('<div class="location"> ' + cityName + '</div>').appendTo("#weather-api-1");
$('<div> <img id="temp-icon" src="' + "http://openweathermap.org/img/wn/" + tempIcon + ".png" +'" alt="WeatherIcon" /> </div>').appendTo("#weather-api-1");
$('<div class="mintemp-value"> Min Temp : ' + cityMinTemp + '<span class="deg"> °F </span></div>').appendTo("#weather-api-1");
$('<div class="maxtemp-value"> Max Temp : ' + cityMaxTemp + '<span class="deg"> °F </span></div>').appendTo("#weather-api-1");
$('<div class="humidity"> Humidity : ' + cityHumidity + '<span class="percent"> % </span></div>').appendTo("#weather-api-1");
$('<div class="wind"> Wind : ' + cityWind + '<span class="mph"> mph </span></div>').appendTo("#weather-api-1");


        })
        .catch((e) => {
        console.log("PLease add valid City name for Weather!");

        });
}

// Gets weather for the city 2

function weatherCityTwo(cityInput) {
    $("#weather-api-2").children().remove();
    var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=7e44ab7dc38056f61c9d41fc361df519&units=imperial" ;
    fetch(latLonURL)
        .then(response =>response.json())
        .then(function(data) {
            console.log(data);
            cityName = data.name;
            tempIcon = data.weather[0].icon;
            cityMinTemp = data.main.temp_min;
            cityMaxTemp = data.main.temp_max;
            cityWind = data.wind.speed;
             cityHumidity = data.main.humidity;

// Dynamically generate weather card with weather elements             
             
$('<h5 class="weatherHeader">City Weather</h5>').appendTo("#weather-api-2");
$('<div class="location"> ' + cityName + '</div>').appendTo("#weather-api-2");
$('<div> <img id="temp-icon" src="' + "http://openweathermap.org/img/wn/" + tempIcon + ".png" +'" alt="WeatherIcon" />  </div>').appendTo("#weather-api-2");
$('<div class="mintemp-value"> Min Temp  : ' + cityMinTemp + '<span class="deg"> °F </span></div>').appendTo("#weather-api-2");
$('<div class="maxtemp-value"> Max Temp : ' + cityMaxTemp + '<span class="deg"> °F </span></div>').appendTo("#weather-api-2");
$('<div class="humidity"> Humidity : ' + cityHumidity + '<span class="percent"> % </span></div>').appendTo("#weather-api-2");
$('<div class="wind"> Wind : ' + cityWind + '<span class="mph"> mph </span></div>').appendTo("#weather-api-2");
            
            
        })
        .catch((e) => {
        console.log("Please select valid City Name for Weather!");
        });
}

