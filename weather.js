// Weather API URL and API key 
const API_KEY = 'a99a7e8b0015ddddd2c7649e40cd7543';
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

// DOM elements
const searchInput = document.querySelector("input[type='text']");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector("button:not(.search-btn)");

// Function to display weather data on the webpage
function displayWeatherData(data) {
  document.querySelector('.cityName').innerHTML = data.name;
  document.querySelector('.temperature').innerHTML = `${Math.round(data.main.temp)}&deg;C`;
  document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
  document.querySelector('.windSpeed').innerHTML = `${data.wind.speed} m/s`;

  // Set the weather icon based on weather condition
  const weatherMain = data.weather[0].main.toLowerCase();
  const weatherIconElement = document.getElementById('image');

  const weatherIcons = {
    "clear": "sunny.png",
    "clouds": "cloudy.png",
    "rain": "rainy.png",
    "snow": "snow.png",
  };

  weatherIconElement.setAttribute('src', `images/${weatherIcons[weatherMain] || "default.png"}`);
}

// Function to fetch weather data by city name
async function getWeatherData(cityName) {
  if (!cityName) {
    // If the input is empty, display an alert to the user
    alert("Please enter a city name");
    return;
  }

  fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      alert(error.message || "Unable to fetch weather data");
    });
}

// Add the event listener to search button
searchButton.addEventListener("click", () => {
  getWeatherData(searchInput.value);
});

// Search button landing on another page
function myFunction() {
  window.location.href = "weather_info.html";
}

// Back button 
function myFunction2() {
  window.location.href = "index.html";
}

// Event listeners for location button
locationButton.addEventListener("click", () => {
  // Check if geolocation is supported in the user's browser
  if ("geolocation" in navigator) {
    // If supported, retrieve the user's current position
    navigator.geolocation.getCurrentPosition((position) => {
      // Extract latitude and longitude from the position data
      const { latitude, longitude } = position.coords;
      // Call a function to fetch weather data based on the coordinates
      getWeatherDataByCoordinates(latitude, longitude);
    });
  } else {
    // If geolocation is not supported, display an alert to the user
    alert("Geolocation is not supported in your browser");
  }
});

// Fetch weather data by coordinates (latitude and longitude)
function getWeatherDataByCoordinates(latitude, longitude) {
  const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      getWeatherData(data.name);
    })
    .catch((error) => {
      alert(error.message || "Unable to fetch weather data");
    });
}
