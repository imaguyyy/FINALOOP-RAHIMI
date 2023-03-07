// Define a function to fetch weather data from an API
async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`);
    const data = await response.json();
    return data;
  }
  
  // Get references to the HTML elements
  const cityInput = document.getElementById('city');
  const searchBtn = document.getElementById('search-btn');
  const conditionsDiv = document.getElementById('conditions');
  
  // Add an event listener to the search button
  searchBtn.addEventListener('click', async () => {
    const city = cityInput.value;
    if (city) {
      try {
        const data = await fetchWeather(city);
        const celsiusTemp = (data.main.temp - 273.15).toFixed(1); // convert temperature to Celsius and round to 1 decimal place
        const conditions = `
          <h4>${city}</h4>
          <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
          <p>Description: ${data.weather[0].description}</p> 
          <p>Temperature: ${celsiusTemp} °C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
          <p>Elevation: ${data.main.sea_level} m</p>
          <p>Pressure: ${data.main.pressure} hPa</p>
        `;
        conditionsDiv.innerHTML = conditions;
      } catch (error) {
        console.error(error);
        conditionsDiv.innerHTML = 'An error occurred while fetching weather data.';
      }
    } else {
      conditionsDiv.innerHTML = 'Please enter a city name.';
    }
  });
  