
var myApi="4fb45a13f2403fc56b854533c82452f9";
var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl=document.querySelector("#city");
var forecastContainerEl=document.querySelector("#forecast-container");
var citySearchInputEl=document.querySelector("#searched-city");
var forecastSection=document.querySelector("#forecast");
var futureContainerEl=document.querySelector("future-container");
var recentSearchButtonEl=document.querySelector("recent-search");


var formSubmitHandler = function(event){
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCurrentWeather(city);
    getFiveDay(city);
  
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
  saveSearch();
  recentSearch(city);
}

// set up api key and fetch request
var getCurrentWeather = function(city){
  var myApi = "b94c75e83dfebff9129fddc3d2fe5a45"
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + myAPI`

  fetch(apiURL)
  .then(function(response){
    response.json().then(function(data){
      displayWeather(data, city);
    });
  });
};

var displayWeather = function(weather, citySearch){
  forecastContainerEl.textContent="";
  citySearchInputEl.textContent=citySearch;

  // insert date format
  var currentDate = document.createElement("span")
  currentDate.textContent=" (" + moment(weather.value).format("DD, MM, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  // add span to hold specified weather data
  var temperatureEl = document.createElement("span")
  temperatureEl.textContent = "Temperature:" + weather.main.temp + " °F";
  temperatureEl.classList = "list-group-item"

  var humidityEl = document.createElement("span")
  humidityEl.textContent = "Humidity:" + weather.main.humidity + " %";
  humidityEl.classList = "list-group-item"

  var windSpeedEl = document.createElement("span")
  windSpeedEl.textContent = "Wind Speed:" + weather.main.wind.speed + " MPH";
  windSpeedEl.classList = "list-group-item"

  forecastContainerEl.appendChild(temperatureEl);

  forecastContainerEl.appendChild(humidityEl);

  forecastContainerEl.appendChild(windSpeedEl);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  getUVIndex(lat,lon)
}

var getUVIndex = function(lat,lon){
  var apiKey = "b94c75e83dfebff9129fddc3d2fe5a45"
  var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${myApi}&lat=${lat}&lon=${lon}`
  fetch(apiURL)
    .then(function (response) {
      response.json().then(function (data) {
        displayUvIndex(data)
      });
    });
};

var displayUvIndex= function(index){
  var uvIndexEl = document.createElement("div")
  uvIndexEl.textContent = "UV Index: "
  uvIndexEl.classList = "list-group-item"

  uvIndexValue = document.createElement("span")
  uvIndexValue.textContent = index.value


  uvIndexEl.appendChild(uvIndexValue);

  forecastContainerEl.appendChild(uvIndexEl);
}

var getFiveDay = function(city){
  var myApi = "b94c75e83dfebff9129fddc3d2fe5a45"
  var apiURL = `api.openweathermap.org/data/2.5/forecast?q={city name}&appid={myApi}`

  fetch(apiURL)
  .then(function(response){
    response.json().then(function(data){
      displayFiveDay(data);
    });
  });
};

var displayFiveDay = function(forecast){
  futureContainerEl.textContent = ""
  forecastSection.textContent = "5-Day Forecast;";

  var forecast = forecast.list;
      for (var i = 5; i < forecast.length; i++) { 
    var dailyForecast = forecast[i];

    

      }

    var forecastDate = document.createElement("h5")
    forecastDate.textContent= moment.unix(dailyForecast.dt).format("MM D YYYY");
    
    forecastEl.appendChild(forecastDate);
}

var recentSearch= function(recentSearch){
  recentSearchEl = document.createElement("button");
  recentSearchEl.textContent = recentSearch;
  
  recentSearchEl.setAttribute("data-city", recentSearch)
  recentSearchEl.setAttribute("type", "submit");

  recentSearchButtonEl.prepend(recentSearchEl);
}

var recentSearchHandler = function (event) {
  var city = event.target.getAttribute("data-city")
  if (city) {
    getCurrentWeather(city);
    getFiveDay(city);
  }
}

cityFormEl.addEventListener("submit", formSubmitHandler);
recentSearchButtonEl.addEventListener("click", recentSearchHandler);

