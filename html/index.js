// const userTab = document.querySelector("[data-userWeather]");
// const searchTab = document.querySelector("[data-searchWeather]");
// const userContainer = document.querySelector(".weather-container");

// const grantAccessContainer = document.querySelector(
//   ".grant-location-container"
// );
// const searchForm = document.querySelector("[data-searchForm]");
// const loadingScreen = document.querySelector(".loading-container");
// const userInfoContainer = document.querySelector(".user-info-container");

// let currentTab = userTab;
// const API_KEY = "5a1ffe034a6ed8a5c602f3b976786363";
// currentTab.classList.add("current-tab");

// // Function to switch tabs
// function switchTab(clickedTab) {
//   if (clickedTab !== currentTab) {
//     currentTab.classList.remove("current-tab");
//     currentTab = clickedTab;
//     currentTab.classList.add("current-tab");
//   }

//   if (!searchForm.classList.contains("active")) {
//     userInfoContainer.classList.remove("active");
//     grantAccessContainer.classList.remove("active");
//     searchForm.classList.add("active");
//   } else {
//     searchForm.classList.remove("active");
//     userInfoContainer.classList.remove("active");
//     getFromSessionStorage();
//   }
// }

// userTab.addEventListener("click", () => switchTab(userTab));
// searchTab.addEventListener("click", () => switchTab(searchTab));

// // Function to get user coordinates from session storage
// function getFromSessionStorage() {
//   const localCoordinates = sessionStorage.getItem("user-coordinates");
//   if (!localCoordinates) {
//     grantAccessContainer.classList.add("active");
//   } else {
//     const coordinates = JSON.parse(localCoordinates);
//     fetchUserWeatherInfo(coordinates);
//   }
// }

// // Function to fetch weather data using user's coordinates
// async function fetchUserWeatherInfo(coordinates) {
//   const { lat, lon } = coordinates;
//   grantAccessContainer.classList.remove("active");
//   loadingScreen.classList.add("active");

//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//     );
//     const data = await response.json();

//     loadingScreen.classList.remove("active");
//     userInfoContainer.classList.add("active");
//     renderWeatherInfo(data);
//   } catch (err) {
//     loadingScreen.classList.remove("active");
//     console.error("Error fetching weather data:", err);
//   }
// }

// // Function to render weather information
// function renderWeatherInfo(weatherInfo) {
//   const cityName = document.querySelector("[data-cityName]");
//   const countryIcon = document.querySelector("[data-countryIcon]");
//   const desc = document.querySelector("[data-weatherdesc]");
//   const weatherIcon = document.querySelector("[data-weatherIcon]");
//   const temp = document.querySelector("[data-temp]");
//   const windspeed = document.querySelector("[data-windspeed]");
//   const humidity = document.querySelector("[data-humidity]");
//   const cloudiness = document.querySelector("[data-cloudiness]");

//   cityName.innerText = weatherInfo?.name;
//   countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//   desc.innerText = weatherInfo?.weather?.[0]?.description;
//   weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//   temp.innerText = `${weatherInfo?.main?.temp}°C`;
//   windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
//   humidity.innerText = `${weatherInfo?.main?.humidity}%`;
//   cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
// }

// // Function to get user location
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
//   } else {
//     alert("Geolocation is not supported by this browser.");
//   }
// }

// // Function to handle geolocation success
// function showPosition(position) {
//   const userCoordinates = {
//     lat: position.coords.latitude,
//     lon: position.coords.longitude,
//   };
//   sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
//   fetchUserWeatherInfo(userCoordinates);
// }

// // Function to handle geolocation errors
// function showError(error) {
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       alert("User denied the request for Geolocation.");
//       break;
//     case error.POSITION_UNAVAILABLE:
//       alert("Location information is unavailable.");
//       break;
//     case error.TIMEOUT:
//       alert("The request to get user location timed out.");
//       break;
//     case error.UNKNOWN_ERROR:
//       alert("An unknown error occurred.");
//       break;
//   }
// }

// // Grant access button event listener
// const grantAccessButton = document.querySelector("[data-grantAccess]");
// grantAccessButton.addEventListener("click", getLocation);

// // Search weather by city name
// const searchInput = document.querySelector("[data-searchInput]");
// searchForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let cityName = searchInput.value.trim();

//   if (cityName === "") return;
//   fetchSearchWeatherInfo(cityName);
// });

// // Function to fetch weather data for a searched city
// async function fetchSearchWeatherInfo(city) {
//   loadingScreen.classList.add("active");
//   userInfoContainer.classList.remove("active");
//   grantAccessContainer.classList.remove("active");

//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     );

//     if (!response.ok) {
//       throw new Error(`City not found (Status: ${response.status})`);
//     }

//     const data = await response.json();
//     loadingScreen.classList.remove("active");
//     userInfoContainer.classList.add("active");
//     renderWeatherInfo(data);
//   } catch (err) {
//     loadingScreen.classList.remove("active");
//     console.error("Error fetching city weather:", err);
//     alert("City not found. Please enter a valid city name.");
//   }
// }

// weatherApp.js

const API_KEY = "5a1ffe034a6ed8a5c602f3b976786363";

export function renderWeatherInfo(weatherInfo) {
  // existing code
}

export async function fetchUserWeatherInfo(coordinates) {
  const { lat, lon } = coordinates;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    renderWeatherInfo(data);
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}

export async function fetchSearchWeatherInfo(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    renderWeatherInfo(data);
  } catch (err) {
    console.error("Error fetching city weather:", err);
  }
}

// Export more functions as needed for testing
export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

