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

// Заглушка для архива
function showHistoryPlaceholder() {
  document.querySelector('#weather-history .forecast-cards').style.display = 'none';
  document.querySelector('#weather-history .history-placeholder').style.display = 'block';
}

// Показать архив погоды
function showHistoryData() {
  document.querySelector('#weather-history .forecast-cards').style.display = 'grid';
  document.querySelector('#weather-history .history-placeholder').style.display = 'none';
}

// Обновление архива погоды
async function updateWeatherHistory(cityName) {
  const today = new Date();
  const dates = [
    new Date(today.setDate(today.getDate() - 1)), // Вчера
    new Date(today.setDate(today.getDate() - 1)), // Позавчера
    new Date(today.setDate(today.getDate() - 1))  // 3 дня назад
  ];

  try {
    showHistoryData();
    
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=${apik}&q=${cityName}&dt=${formatDateForAPI(date)}`);
      const data = await response.json();
      
      const forecast = data.forecast.forecastday[0];
      const dateStr = formatDate(date);
      
      document.querySelector(`#timeh${i + 1}`).textContent = dateStr;
      document.querySelector(`#temph${i * 2 + 1}`).textContent = `Мин: ${Math.round(forecast.day.mintemp_c)}&deg;C`;
      document.querySelector(`#temph${i * 2 + 2}`).textContent = `Макс: ${Math.round(forecast.day.maxtemp_c)}&deg;C`;
      document.querySelector(`#windh${i + 1}`).textContent = `Ветер: ${Math.round(forecast.day.maxwind_kph)} км/ч, ${getWindDirection(forecast.hour[12].wind_degree)}`;
      document.querySelector(`#prech${i + 1}`).textContent = `Осадки: ${forecast.day.totalprecip_mm} мм`;
      document.querySelector(`#iconh${i + 1}`).innerHTML = 
        `<img src="${getWeatherIcon(forecast.day.condition.icon, 'day')}" alt="${forecast.day.condition.text}" />`;
    }
  } catch (err) {
    console.error('Ошибка при получении архива погоды:', err);
    showHistoryPlaceholder();
  }
}

// Форматирование даты для API
function formatDateForAPI(date) {
  return date.toISOString().split('T')[0];
}

// Показываем заглушку при загрузке
showHistoryPlaceholder();
