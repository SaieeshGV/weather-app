function getWeather() {


    
    const apikey = '149b4d2e473e10b6b8d49fd14b1f6ee6';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('please enter city name');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

 
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });

        fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
        });
}    
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

     // Clear previous content
     weatherInfoDiv.innerHTML = '';
     hourlyForecastDiv.innerHTML = '';
     tempDivInfo.innerHTML = '';

     if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Celsius conversion
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        // const iconUrl = `https://openweathermap.org/img/wn/10d@2x.png`;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // next 24 hours

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); //timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}