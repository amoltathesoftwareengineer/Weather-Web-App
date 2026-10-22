const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const statusMessage = document.getElementById("status");
const weatherPanel = document.getElementById("weather-panel");

// Replace the image element with a weather emoji.
const originalIcon = document.getElementById("weather-icon");
const weatherIcon = document.createElement("div");

weatherIcon.id = "weather-icon";
weatherIcon.setAttribute("role", "img");
weatherIcon.setAttribute("aria-label", "Weather condition");
weatherIcon.style.fontSize = "64px";
weatherIcon.style.textAlign = "center";
weatherIcon.style.lineHeight = "1.3";

originalIcon.replaceWith(weatherIcon);

const weatherConditions = {
  0: { description: "Clear sky", day: "☀️", night: "🌙" },
  1: { description: "Mainly clear", day: "🌤️", night: "🌙" },
  2: { description: "Partly cloudy", day: "⛅", night: "☁️" },
  3: { description: "Overcast", day: "☁️", night: "☁️" },
  45: { description: "Fog", day: "🌫️", night: "🌫️" },
  48: { description: "Depositing rime fog", day: "🌫️", night: "🌫️" },
  51: { description: "Light drizzle", day: "🌦️", night: "🌧️" },
  53: { description: "Moderate drizzle", day: "🌦️", night: "🌧️" },
  55: { description: "Dense drizzle", day: "🌧️", night: "🌧️" },
  56: { description: "Light freezing drizzle", day: "🌧️", night: "🌧️" },
  57: { description: "Dense freezing drizzle", day: "🌧️", night: "🌧️" },
  61: { description: "Slight rain", day: "🌦️", night: "🌧️" },
  63: { description: "Moderate rain", day: "🌧️", night: "🌧️" },
  65: { description: "Heavy rain", day: "🌧️", night: "🌧️" },
  66: { description: "Light freezing rain", day: "🌧️", night: "🌧️" },
  67: { description: "Heavy freezing rain", day: "🌧️", night: "🌧️" },
  71: { description: "Slight snowfall", day: "🌨️", night: "🌨️" },
  73: { description: "Moderate snowfall", day: "❄️", night: "❄️" },
  75: { description: "Heavy snowfall", day: "❄️", night: "❄️" },
  77: { description: "Snow grains", day: "🌨️", night: "🌨️" },
  80: { description: "Slight rain showers", day: "🌦️", night: "🌧️" },
  81: { description: "Moderate rain showers", day: "🌧️", night: "🌧️" },
  82: { description: "Violent rain showers", day: "⛈️", night: "⛈️" },
  85: { description: "Slight snow showers", day: "🌨️", night: "🌨️" },
  86: { description: "Heavy snow showers", day: "❄️", night: "❄️" },
  95: { description: "Thunderstorm", day: "⛈️", night: "⛈️" },
  96: { description: "Thunderstorm with slight hail", day: "⛈️", night: "⛈️" },
  99: { description: "Thunderstorm with heavy hail", day: "⛈️", night: "⛈️" }
};

function getWeatherCondition(code, isDay) {
  const condition = weatherConditions[code] || {
    description: "Weather information unavailable",
    day: "🌡️",
    night: "🌡️"
  };

  return {
    description: condition.description,
    icon: isDay ? condition.day : condition.night
  };
}

function formatValue(value, unit) {
  return Number.isFinite(value) ? `${Math.round(value)}${unit}` : "N/A";
}

function formatUpdateTime(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  return date.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.setAttribute("role", isError ? "alert" : "status");
  statusMessage.style.color = isError ? "#ff8b8b" : "";
}

async function getCoordinates(city) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

  url.search = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json"
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to search for this city. Please try again.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found. Please check the spelling and try again.");
  }

  return data.results[0];
}

async function getCurrentWeather(latitude, longitude) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "pressure_msl",
      "wind_speed_10m"
    ].join(","),
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto"
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to retrieve weather data. Please try again.");
  }

  const data = await response.json();

  if (!data.current) {
    throw new Error("Weather data is currently unavailable.");
  }

  return data.current;
}

function displayWeather(place, current) {
  const condition = getWeatherCondition(
    current.weather_code,
    current.is_day === 1
  );

  document.getElementById("city-name").textContent =
    [place.name, place.admin1, place.country]
      .filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index)
      .join(", ");

  document.getElementById("weather-description").textContent =
    condition.description;

  weatherIcon.textContent = condition.icon;
  weatherIcon.setAttribute("aria-label", condition.description);

  document.getElementById("temperature").textContent =
    formatValue(current.temperature_2m, "°C");

  document.getElementById("feels-like").textContent =
    formatValue(current.apparent_temperature, "°C");

  document.getElementById("humidity").textContent =
    formatValue(current.relative_humidity_2m, "%");

  document.getElementById("wind-speed").textContent =
    formatValue(current.wind_speed_10m, " km/h");

  document.getElementById("pressure").textContent =
    formatValue(current.pressure_msl, " hPa");

  document.getElementById("updated-at").textContent =
    `Local time: ${formatUpdateTime(current.time)}`;

  weatherPanel.hidden = false;
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    setStatus("Please enter a city name.", true);
    cityInput.focus();
    return;
  }

  searchButton.disabled = true;
  setStatus("Getting the latest weather...");
  weatherPanel.hidden = true;

  try {
    const place = await getCoordinates(city);
    const current = await getCurrentWeather(place.latitude, place.longitude);

    displayWeather(place, current);
    setStatus(`Weather loaded successfully for ${place.name}.`);
  } catch (error) {
    setStatus(
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.",
      true
    );
  } finally {
    searchButton.disabled = false;
  }
});
