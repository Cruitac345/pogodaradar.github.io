// Элементы для архива погоды
var timeh1 = document.querySelector('#timeh1');
var timeh2 = document.querySelector('#timeh2');
var timeh3 = document.querySelector('#timeh3');

var temph1 = document.querySelector('#temph1');
var temph2 = document.querySelector('#temph2');
var temph3 = document.querySelector('#temph3');
var temph4 = document.querySelector('#temph4');
var temph5 = document.querySelector('#temph5');
var temph6 = document.querySelector('#temph6');

var windh1 = document.querySelector('#windh1');
var windh2 = document.querySelector('#windh2');
var windh3 = document.querySelector('#windh3');

var prech1 = document.querySelector('#prech1');
var prech2 = document.querySelector('#prech2');
var prech3 = document.querySelector('#prech3');

var iconh1 = document.querySelector('#iconh1');
var iconh2 = document.querySelector('#iconh2');
var iconh3 = document.querySelector('#iconh3');

var apik = "cacfd66797d643b8bf6193226220101";

// Показываем заглушку при загрузке страницы
showHistoryPlaceholder();

// Функция для показа заглушки архива
function showHistoryPlaceholder() {
  document.querySelector('#weather-history .forecast-cards').style.display = 'none';
  document.querySelector('#weather-history .history-placeholder').style.display = 'block';
}

// Функция для показа данных архива
function showHistoryData() {
  document.querySelector('#weather-history .forecast-cards').style.display = 'grid';
  document.querySelector('#weather-history .history-placeholder').style.display = 'none';
}

// Основная функция для обновления архива погоды
async function updateWeatherHistory(cityName) {
    try {
        // Получаем даты для архива (вчера, позавчера, 3 дня назад)
        const dates = getHistoryDates();
        
        // Показываем карточки архива
        showHistoryData();
        
        // Загружаем данные для каждой даты
        for (let i = 0; i < dates.length; i++) {
            const dateStr = dates[i].dateStr;
            const formattedDate = dates[i].formattedDate;
            
            const response = await fetch(`https://api.weatherapi.com/v1/history.json?key=${apik}&q=${cityName}&dt=${formattedDate}&lang=ru`);
            
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            
            const data = await response.json();
            const forecast = data.forecast.forecastday[0];
            
            // Обновляем данные для каждого дня
            updateHistoryCard(i, dateStr, forecast);
        }
    } catch (err) {
        console.error('Ошибка при получении архива погоды:', err);
        // Показываем заглушку при ошибке
        showHistoryPlaceholder();
    }
}

// Функция для получения дат архива (вчера, позавчера, 3 дня назад)
function getHistoryDates() {
    const today = new Date();
    const dates = [];
    
    for (let i = 1; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        dates.push({
            dateStr: formatDate(date),
            formattedDate: formatDateForAPI(date)
        });
    }
    
    return dates;
}

// Функция для обновления карточки архива
function updateHistoryCard(index, dateStr, forecast) {
    const dayNames = ['Вчера', 'Позавчера', '3 дня назад'];
    
    switch(index) {
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

// Функция для форматирования даты для API (YYYY-MM-DD)
function formatDateForAPI(date) {
    return date.toISOString().split('T')[0];
}

// Функция для форматирования даты для отображения
function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('ru-RU', options);
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

// Функция для получения URL иконки погоды
function getWeatherIcon(iconUrl, isDay) {
    // Извлекаем код иконки из URL
    var iconCode = iconUrl.split('/').pop().split('.')[0];
    return `weather-icon/${isDay}/${iconCode}.svg`;
}
