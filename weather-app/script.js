// function getWeather() {
document.getElementById("searchBtn").addEventListener("click", function() {

    const apiKey = '3e093e59335a6b12910d967d5f859827';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            // console.error('Error fetching current weather data', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            // console.error('Error fetching hourly forecast data', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
})

function displayWeather(data) {
    const navigation = document.getElementById('nav-div');
    // const mapDiv = document.getElementById('map-div');
    // const cityInfo = document.getElementById('city-info');
    const tempDivInfo = document.getElementById('temp-div');
    const iconDiv = document.getElementById('icon-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');


    // Clear previous content
    navigation.innerHTML = '';
    tempDivInfo.innerHTML = '';
    weatherInfoDiv.innerHTML = '';
    iconDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const celcius = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const temperature = Math.round(celcius * (9 / 5) + 32);  // Convert to Farenheit

        const description = data.weather[0].description;
        const windSpeed = Math.round(data.wind.speed * 2.23694);
        const humidity = data.main.humidity;
        const precipitation = data.main.humidity;
        const long = data.coord.lon;
        const lat = data.coord.lat;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const mapHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3438.2385053225394!2d${long}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDI5JzA5LjYiTiA5MMKwMTEnNDIuMCJX!5e0!3m2!1sen!2sus!4v1732914250450!5m2!1sen!2sus" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        const cityHTML = `<h2>${cityName}</h2>`;

        const navHTML = `
        
        <div class="boxes">
         <div>${mapHTML}</div>
        <div>${cityHTML}</div>
        </div>

        `;
        const iconHTML = `
        <div class="boxes">
        <img width="100%" height="auto" src="${iconUrl}">
        <p><strong>${description}</strong></p>
        </div>

        `
        const temperatureHTML = `
        <div class="boxes" style="justify-content: center; align-items: center;display: flex;vertical-align: middle;">
        <h3>${temperature}°F</h3>
        </div>

    `;
        const weatherHtml = `
        <div class="boxes row">
        <div class="col col-6">
        <p><strong>${windSpeed}<br>mph</strong></p></div>
        <div class="col col-6">
        <p><strong>${humidity}%<br>humidity</strong></p>
        </div>
        </div>

    `;
        navigation.innerHTML = navHTML;
        tempDivInfo.innerHTML = temperatureHTML;
        iconDiv.innerHTML = iconHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
     
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
        <div class="hourlyItemHtml m-1 p-2">
            <div class="hourly-item row">       
                
                    <div class="col-6">
                        <img src="${iconUrl}" alt="Hourly Weather Icon">
                    </div>
                    <div class="col-6 pl-0 ">
                        <div>${hour}:00</div>
                        <div>${temperature}°C</div>
                    </div>
               
            </div>
            </div>
       `

    

            ;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;

    });
}
