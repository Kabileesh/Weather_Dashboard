import React, { useState, useEffect } from "react";
import ClockWidget from "../Components/ClockWidget";
import WeatherCard from "../Components/WeatherCard";
import axios from "axios";
import { weatherImage } from "../../Utils/constants";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
              params: {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                appid: process.env.REACT_APP_WEATHER_API,
                units: "metric",
              },
            }
          );
          setCity(response.data.name);
          setWeatherData(response.data);
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <>
      {weatherData && (
        <div
          className="h-screen w-screen p-8"
          style={{
            backgroundImage: `url('${
              weatherImage[weatherData.weather[0].description]
            }')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <header
            className="bg-blue-700 text-white py-4 px-6 rounded-3xl"
            style={{ backgroundColor: "rgba(29, 78, 216, 0.4)" }}
          >
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold">Weather Dashboard</h1>
              <p className="mt-2">Stay informed about the weather conditions</p>
            </div>
          </header>
          <div className="flex flex-col gap-8 justify-between lg:flex-row w-full px-6 py-1 items-center mt-24">
            <ClockWidget city={city} />
            <WeatherCard weatherData={weatherData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
