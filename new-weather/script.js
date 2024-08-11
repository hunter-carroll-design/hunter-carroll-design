function getWeather() {
  const apiKey = '9171290f4e762f512739fa919648493';
  const city = document.getElementById('city').value;
// https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2019-01-01&end_date=2023-12-31&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_mean&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto
  


if (!city) {
    alert('please enter a city');
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  const historicalUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2019-01-01&end_date=2023-12-31&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_mean&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=auto`

  
    fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.error('Error fetching current weather data', error);
        alert('Error fetching current weather data. Please try again');
      });
    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        displayHourlyWeather(data.list);

      })
      .catch(error => {
        console.error('Error fetching hourly forecast data', error);
        alert('Error fetching hourly forecast data. Please try again');
      });

  }



function displayWeather(data){
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  

  weatherInfoDiv.innerHTML= '';
  hourlyForecastDiv.innerHTML= '';
  tempDivInfo.innerHTML= '';
  
}
console.log(currentWeatherUrl);
