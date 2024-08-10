function getWeather() {
  const apiKey = '9171290f4e762f512739fa919648493';
  const city = document.getElementById('city').value;

  if (!city) {
    alert('please enter a city');
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
