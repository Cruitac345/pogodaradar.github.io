var inputval = document.querySelector('#cityadd');
var btn = document.querySelector('#add');
var city = document.querySelector('#city');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var icon = document.querySelector('#icon');
var precip = document.querySelector('#precip');

var icon2 = document.querySelector('#icon2');
var icon3 = document.querySelector('#icon3');
var icon4 = document.querySelector('#icon4');

var apik = "cacfd66797d643b8bf6193226220101";

btn.addEventListener('click', function () {
  // Fetch weather data from weatherapi.com
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=` + apik + `&q=` + inputval.value + `&days=3&aqi=yes&alerts=yes`)
    .then(res => res.json())
    .then(data => {
      var nameval = data.location.name;
      var addressval = data.location.region;
      var tempature = Math.round(data.current.temp_c);
      var datatime = data.current.last_updated;
      var wndspd = data.current.wind_kph;
      var icons = data.current.condition.icon;
      var precips = data.current.precip_mm;
      
      // Determine if it's day or night for the current condition
      var isDay = data.current.is_day === 1 ? 'day' : 'night';

      // Get sunrise and sunset from forecast.json
      var sunrise = data.forecast.forecastday[0].astro.sunrise;
      var sunset = data.forecast.forecastday[0].astro.sunset;

      // Extract other data
      var datatime2 = data.forecast.forecastday[0].date;
      var datatime3 = data.forecast.forecastday[1].date;
      var datatime4 = data.forecast.forecastday[2].date;

      var tempature2 = Math.round(data.forecast.forecastday[0].day.mintemp_c);
      var tempature3 = Math.round(data.forecast.forecastday[1].day.mintemp_c);
      var tempature4 = Math.round(data.forecast.forecastday[2].day.mintemp_c);
      var tempature5 = Math.round(data.forecast.forecastday[0].day.maxtemp_c);
      var tempature6 = Math.round(data.forecast.forecastday[1].day.maxtemp_c);
      var tempature7 = Math.round(data.forecast.forecastday[2].day.maxtemp_c);

      var icons2 = data.forecast.forecastday[0].day.condition.icon;
      var icons3 = data.forecast.forecastday[1].day.condition.icon;
      var icons4 = data.forecast.forecastday[2].day.condition.icon;

      var date = new Date(datatime).toLocaleString();

      var date4 = new Date(datatime2).toLocaleDateString();
      var date5 = new Date(datatime3).toLocaleDateString();
      var date6 = new Date(datatime4).toLocaleDateString();

      // Extract the icon name from the URL
      var getIconName = (iconUrl) => {
        var parts = iconUrl.split('/');
        return parts[parts.length - 1].split('.')[0]; // Get the filename without extension
      };

      // Get icons from the 'weather-icon' folder based on day/night
      var getIcon = (iconName, isDay) => {
        return `weather-icon/${isDay}/${iconName}.svg`;
      };

      city.innerHTML = `${nameval}`;
      address.innerHTML = `(${addressval})`;
      temp.innerHTML = `${tempature} &deg; C`;
      time.innerHTML = `Время: ${date}`;
      time2.innerHTML = `Восход: ${sunrise}`;
      time3.innerHTML = `Закат: ${sunset}`;
      wind.innerHTML = `Скорость ветра: <span>${wndspd} km/h</span>`;
      icon.innerHTML = `<img width="120" height="120" src="${getIcon(getIconName(icons), isDay)}" />`;
      precip.innerHTML = `Осадки: <span>${precips} мм</span>`;

      time4.innerHTML = `${date4}`;
      time5.innerHTML = `${date5}`;
      time6.innerHTML = `${date6}`;
      temp2.innerHTML = `${tempature2} &deg; C`;
      temp3.innerHTML = `${tempature3} &deg; C`;
      temp4.innerHTML = `${tempature4} &deg; C`;
      temp5.innerHTML = `${tempature5} &deg; C`;
      temp6.innerHTML = `${tempature6} &deg; C`;
      temp7.innerHTML = `${tempature7} &deg; C`;

      // For forecast days, assume day icons if dealing with 'day' conditions
      icon2.innerHTML = `<img width="100" height="100" src="${getIcon(getIconName(icons2), 'day')}" />`;
      icon3.innerHTML = `<img width="100" height="100" src="${getIcon(getIconName(icons3), 'day')}" />`;
      icon4.innerHTML = `<img width="100" height="100" src="${getIcon(getIconName(icons4), 'day')}" />`;
    })
    .catch(err => alert('Ошибка получения данных о погоде: ' + err.message));
});