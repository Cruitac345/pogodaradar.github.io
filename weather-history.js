var inputval = document.querySelector('#cityadd');
var btn = document.querySelector('#add');
var city = document.querySelector('#city');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var icon = document.querySelector('#icon');
var precip = document.querySelector('#precip');

var iconh1 = document.querySelector('#iconh1');
var iconh2 = document.querySelector('#iconh2');
var iconh3 = document.querySelector('#iconh3');

var timeh1 = document.querySelector('#timeh1');
var timeh2 = document.querySelector('#timeh2');
var timeh3 = document.querySelector('#timeh3');

var temph1 = document.querySelector('#temph1');
var temph2 = document.querySelector('#temph2');
var temph3 = document.querySelector('#temph3');
var temph4 = document.querySelector('#temph4');
var temph5 = document.querySelector('#temph5');
var temph6 = document.querySelector('#temph6');

var apik = "cacfd66797d643b8bf6193226220101";

// Helper function to format dates
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Helper function to get the icon name from the URL
function getIconName(iconUrl) {
  var parts = iconUrl.split('/');
  return parts[parts.length - 1].split('.')[0]; // Get the filename without extension
}

// Helper function to get the local icon path based on day or night
function getIcon(iconName, isDay) {
  return `weather-icon/${isDay}/${iconName}.svg`;
}

// Fetch weather data for a specific date
function fetchWeatherData(date, index) {
  fetch(`https://api.weatherapi.com/v1/history.json?key=${apik}&q=${inputval.value}&dt=${formatDate(date)}&aqi=yes&alerts=yes`)
    .then(res => res.json())
    .then(data => {
      var forecast = data.forecast.forecastday[0];
      var icon = forecast.day.condition.icon;
      var isDay = forecast.day.condition.is_day ? 'day' : 'night';
      var mintemp = Math.round(forecast.day.mintemp_c);
      var maxtemp = Math.round(forecast.day.maxtemp_c);
      var formattedDate = new Date(forecast.date).toLocaleDateString();

      // Update the HTML elements with the weather data for the corresponding day
      document.querySelector(`#timeh${index}`).innerHTML = formattedDate;
      document.querySelector(`#temph${(index - 1) * 2 + 1}`).innerHTML = `${mintemp} &deg; C`;
      document.querySelector(`#temph${index * 2}`).innerHTML = `${maxtemp} &deg; C`;
      document.querySelector(`#iconh${index}`).innerHTML = `<img width="80" height="80" src="${getIcon(getIconName(icon), isDay)}" />`;
    })
    .catch(err => {
      alert('Ошибка получения данных');
    });
}

btn.addEventListener('click', function () {
  var today = new Date();
  
  var day1 = new Date(today); // today
  var day2 = new Date(today); // yesterday
  day2.setDate(today.getDate() - 1);
  
  var day3 = new Date(today); // day before yesterday
  day3.setDate(today.getDate() - 2);

  // Fetch weather data for the last 3 days
  fetchWeatherData(day1, 1);
  fetchWeatherData(day2, 2);
  fetchWeatherData(day3, 3);
});