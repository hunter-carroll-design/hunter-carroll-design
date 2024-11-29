function getWeather() {
    const apiKey = '3e093e59335a6b12910d967d5f859827';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }
    // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e093e59335a6b12910d967d5f859827
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const mapDiv = document.getElementById('map');
    const cityInfo = document.getElementById('city-info');
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');



    // Clear previous content
    mapDiv.innerHTML = '';
    cityInfo.innerHTML = '';
    tempDivInfo.innerHTML = '';
    weatherInfoDiv.innerHTML = '';
    weatherIcon.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const celcius = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const temperature = Math.round(celcius * (9 / 5) + 32);  // Convert to Farenheit
        const description = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        const precipitation = data.main.humidity;
        const long = data.coord.lon;
        const lat = data.coord.lat;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
       

        const mapHTML = `
<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3438.2385053225394!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDI5JzA5LjYiTiA5MMKwMTEnNDIuMCJX!5e0!3m2!1sen!2sus!4v1732914250450!5m2!1sen!2sus" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


        `
        const cityHTML = `
        <p>${cityName}</p>
    `;
        const temperatureHTML = `
        <div class="boxes">
        <p>${temperature}°F</p>
        </div>

    `;
        const weatherHtml = `
        <div class="boxes">
        <p>${description}</p>
        <p>${windSpeed}</p>
        <p>${humidity}% humidity</p>
        <p>${precipitation}% humidity</p>

        </div>

    `;

        cityInfo.innerHTML = cityHTML;
        mapDiv.innerHTML = mapHTML;
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); //(24hrs at 3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
        <div class="boxes">
            <div class="hourly-item">       
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        </div>
    `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}