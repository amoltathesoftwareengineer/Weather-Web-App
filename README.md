# 🌦️ Weather Web App

A responsive weather application that allows users to search for a city and view its current weather conditions, temperature, humidity, wind speed, and atmospheric pressure.

## 🌐 Live Demo

**[Launch Weather Web App](https://amoltathesoftwareengineer.github.io/Weather-Web-App/)**

## 📌 Project Overview

Weather Web App is a front-end web application built with HTML, CSS, and JavaScript. It integrates the Open-Meteo Geocoding API to locate cities and the Open-Meteo Weather API to retrieve current weather information.

The application provides a clean, responsive interface and displays weather data for the selected location. It also handles invalid city names and API request errors.

## ✨ Features

- 🔍 Search for weather by city name
- 🌡️ Display current temperature in Celsius
- 🧥 Show feels-like temperature
- 💧 Display relative humidity
- 💨 Show wind speed in km/h
- 🌬️ Display atmospheric pressure in hPa
- 🌤️ Weather condition descriptions and weather icons
- 📱 Responsive user interface
- ⚠️ Error handling for invalid cities and API failures
- 🔑 No API key required for the configured Open-Meteo endpoints

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Application logic and API integration |
| Open-Meteo Geocoding API | City search and coordinates |
| Open-Meteo Weather API | Current weather data |
| Git & GitHub | Version control and source code hosting |
| GitHub Pages | Website deployment |

## ⚙️ How It Works

1. Enter a city name in the search field.
2. The application searches for the city using the Open-Meteo Geocoding API.
3. The selected location's latitude and longitude are retrieved.
4. JavaScript requests current weather data for those coordinates.
5. The application displays the weather information in the interface.
6. If a city cannot be found or a request fails, an appropriate error message is shown.

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- An internet connection

### Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/amoltathesoftwareengineer/Weather-Web-App.git
```

**2. Open the project folder**

```bash
cd Weather-Web-App
```

**3. Launch the application**

Open `index.html` in your web browser.

No package installation or API key is required for the configured API endpoints.

## 📂 Project Structure

```text
Weather-Web-App/
├── index.html
├── style.css
├── script.js
├── README.md
└── LICENSE
```

## 🧪 Testing

Test the application with the following scenarios:

- Search for a valid city such as Pune or Mumbai.
- Search for a city in another country.
- Enter an invalid city name.
- Test the layout on desktop and mobile screen sizes.
- Check the application when the internet connection or API is unavailable.

## 🔐 API and Data Source

This project uses the following public APIs from Open-Meteo:

- **Geocoding API:** https://geocoding-api.open-meteo.com/
- **Weather Forecast API:** https://api.open-meteo.com/

Weather data availability and accuracy depend on the external data provider. Review the provider's terms and attribution requirements before distributing or extending the application.

## 📈 Future Improvements

- Add a multi-day weather forecast.
- Add temperature unit conversion between Celsius and Fahrenheit.
- Add recent city search history.
- Add location-based weather using browser geolocation with user permission.
- Improve accessibility and automated testing.

## 👨‍💻 Author

**Amol Tathe**

- GitHub: [@amoltathesoftwareengineer](https://github.com/amoltathesoftwareengineer)
- LinkedIn: [Amol Tathe](https://www.linkedin.com/in/amoltathesoftwareengineer/)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
