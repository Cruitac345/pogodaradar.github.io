var inputval = document.querySelector('#cityadd');
var btn = document.querySelector('#add');
var city = document.querySelector('#city');
var address = document.querySelector('#address');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var icon = document.querySelector('#icon');
var precip = document.querySelector('#precip');
var time = document.querySelector('#time');

// Элементы для текущей погоды
var icon2 = document.querySelector('#icon2');
var icon3 = document.querySelector('#icon3');
var icon4 = document.querySelector('#icon4');

// Элементы для прогноза на 3 дня
var time4 = document.querySelector('#time4');
var time5 = document.querySelector('#time5');
var time6 = document.querySelector('#time6');
var temp2 = document.querySelector('#temp2');
var temp3 = document.querySelector('#temp3');
var temp4 = document.querySelector('#temp4');
var temp5 = document.querySelector('#temp5');
var temp6 = document.querySelector('#temp6');
var temp7 = document.querySelector('#temp7');

// Элементы для ветра и осадков в прогнозе
var wind2 = document.querySelector('#wind2');
var wind3 = document.querySelector('#wind3');
var wind4 = document.querySelector('#wind4');
var precip2 = document.querySelector('#precip2');
var precip3 = document.querySelector('#precip3');
var precip4 = document.querySelector('#precip4');

var apik = "cacfd66797d643b8bf6193226220101";

btn.addEventListener('click', function () {
  if (!inputval.value) {
    alert('Пожалуйста, введите город');
    return;
  }

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=` + apik + `&q=` + inputval.value + `&days=3&aqi=yes&alerts=yes`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Город не найден или произошла ошибка сервера');
      }
      return res.json();
    })
    .then(data => {
      // Текущая погода
      updateCurrentWeather(data);
      
      // Прогноз на 3 дня
      updateForecast(data);
    })
    .catch(err => {
      alert('Ошибка: ' + err.message);
      console.error(err);
    });
});

function updateCurrentWeather(data) {
  var current = data.current;
  var location = data.location;
  
  city.innerHTML = location.name;
  address.innerHTML = `${location.region}, ${location.country}`;
  temp.innerHTML = `${Math.round(current.temp_c)}&deg;C`;
  wind.innerHTML = `Ветер: ${current.wind_kph} км/ч, ${getWindDirection(current.wind_degree)}`;
  precip.innerHTML = `Осадки: ${current.precip_mm} мм`;
  time.innerHTML = new Date(current.last_updated).toLocaleString();
  
  // Иконка текущей погоды
  var isDay = current.is_day ? 'day' : 'night';
  icon.innerHTML = `<img src="${getWeatherIcon(current.condition.icon, isDay)}" alt="${current.condition.text}" />`;
}

function updateForecast(data) {
  var forecastDays = data.forecast.forecastday;
  
  // Прогноз на сегодня (первый день в массиве)
  updateForecastDay(forecastDays[0], time4, temp2, temp5, icon2, wind2, precip2, 'Сегодня');
  
  // Прогноз на завтра
  updateForecastDay(forecastDays[1], time5, temp3, temp6, icon3, wind3, precip3, 'Завтра');
  
  // Прогноз на послезавтра
  updateForecastDay(forecastDays[2], time6, temp4, temp7, icon4, wind4, precip4, 'Послезавтра');
}

function updateForecastDay(dayData, dateElement, minTempElement, maxTempElement, iconElement, windElement, precipElement, dayName) {
  var date = new Date(dayData.date);
  dateElement.innerHTML = date.toLocaleDateString('ru-RU', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
  
  minTempElement.innerHTML = `Мин: ${Math.round(dayData.day.mintemp_c)}&deg;C`;
  maxTempElement.innerHTML = `Макс: ${Math.round(dayData.day.maxtemp_c)}&deg;C`;
  
  // Средний ветер за день
  var avgWind = Math.round(dayData.day.maxwind_kph);
  windElement.innerHTML = `Ветер: ${avgWind} км/ч, ${getWindDirection(dayData.hour[12].wind_degree)}`;
  
  // Общее количество осадков за день
  precipElement.innerHTML = `Осадки: ${dayData.day.totalprecip_mm} мм`;
  
  // Иконка дневной погоды
  iconElement.innerHTML = `<img src="${getWeatherIcon(dayData.day.condition.icon, 'day')}" alt="${dayData.day.condition.text}" />`;
}

function getWeatherIcon(iconUrl, isDay) {
  // Извлекаем код иконки из URL
  var iconCode = iconUrl.split('/').pop().split('.')[0];
  return `weather-icon/${isDay}/${iconCode}.svg`;
}

function getWindDirection(degree) {
  if (degree >= 337.5 || degree < 22.5) return 'С';
  if (degree >= 22.5 && degree < 67.5) return 'СВ';
  if (degree >= 67.5 && degree < 112.5) return 'В';
  if (degree >= 112.5 && degree < 157.5) return 'ЮВ';
  if (degree >= 157.5 && degree < 202.5) return 'Ю';
  if (degree >= 202.5 && degree < 247.5) return 'ЮЗ';
  if (degree >= 247.5 && degree < 292.5) return 'З';
  if (degree >= 292.5 && degree < 337.5) return 'СЗ';
  return '';
}
