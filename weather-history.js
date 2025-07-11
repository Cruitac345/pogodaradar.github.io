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

// Функция для обновления архива погоды
async function updateWeatherHistory(cityName) {
    const today = new Date();
    const dates = [
        new Date(today.setDate(today.getDate() - 1)), // Вчера
        new Date(today.setDate(today.getDate() - 1)), // Позавчера
        new Date(today.setDate(today.getDate() - 1))  // 3 дня назад
    ];

    try {
        // Показываем карточки архива
        document.querySelector('.history-placeholder').style.display = 'none';
        document.querySelector('.forecast-cards').style.display = 'grid';
        
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const formattedDate = formatDateForAPI(date);
            const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=${apik}&q=${cityName}&dt=${formattedDate}`);
            
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            
            const data = await response.json();
            const forecast = data.forecast.forecastday[0];
            const dateStr = formatDate(date);
            
            // Обновляем данные для каждого дня
            switch(i) {
                case 0: // Вчера
                    timeh1.textContent = dateStr;
                    temph1.textContent = `${Math.round(forecast.day.avgtemp_c)}°C`;
                    temph4.textContent = forecast.day.condition.text;
                    windh1.textContent = `Ветер: ${Math.round(forecast.day.maxwind_kph)} км/ч, ${getWindDirection(forecast.hour[12].wind_degree)}`;
                    prech1.textContent = `Осадки: ${forecast.day.totalprecip_mm} мм`;
                    iconh1.innerHTML = `<img src="${getWeatherIcon(forecast.day.condition.icon, 'day')}" alt="${forecast.day.condition.text}" />`;
                    break;
                case 1: // Позавчера
                    timeh2.textContent = dateStr;
                    temph2.textContent = `${Math.round(forecast.day.avgtemp_c)}°C`;
                    temph5.textContent = forecast.day.condition.text;
                    windh2.textContent = `Ветер: ${Math.round(forecast.day.maxwind_kph)} км/ч, ${getWindDirection(forecast.hour[12].wind_degree)}`;
                    prech2.textContent = `Осадки: ${forecast.day.totalprecip_mm} мм`;
                    iconh2.innerHTML = `<img src="${getWeatherIcon(forecast.day.condition.icon, 'day')}" alt="${forecast.day.condition.text}" />`;
                    break;
                case 2: // 3 дня назад
                    timeh3.textContent = dateStr;
                    temph3.textContent = `${Math.round(forecast.day.avgtemp_c)}°C`;
                    temph6.textContent = forecast.day.condition.text;
                    windh3.textContent = `Ветер: ${Math.round(forecast.day.maxwind_kph)} км/ч, ${getWindDirection(forecast.hour[12].wind_degree)}`;
                    prech3.textContent = `Осадки: ${forecast.day.totalprecip_mm} мм`;
                    iconh3.innerHTML = `<img src="${getWeatherIcon(forecast.day.condition.icon, 'day')}" alt="${forecast.day.condition.text}" />`;
                    break;
            }
        }
    } catch (err) {
        console.error('Ошибка при получении архива погоды:', err);
        // Показываем заглушку при ошибке
        document.querySelector('.history-placeholder').style.display = 'block';
        document.querySelector('.forecast-cards').style.display = 'none';
    }
}

// Функция для определения направления ветра
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

// Функция для форматирования даты для API
function formatDateForAPI(date) {
    return date.toISOString().split('T')[0];
}

// Функция для форматирования даты для отображения
function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('ru-RU', options);
}

// Показываем заглушку при загрузке
showHistoryPlaceholder();
