import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css"; // We'll create this next

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setError("");
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          units: "metric",
          appid: import.meta.env.VITE_WEATHER_API_KEY,
        },
      });
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Try again.");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>🌤 Smart Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{weather.main.temp}°C</h3>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;