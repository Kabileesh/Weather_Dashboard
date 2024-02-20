import React, { useState, useEffect } from "react";
import ClockWidget from "../Components/ClockWidget";
import WeatherCard from "../Components/WeatherCard";
import axios from "axios";
import { weatherImage } from "../../Utils/constants";
import Toggle from "../Components/ToggleButton";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState(new Date());

  const clickHandler = () => {
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          if (toggle) {
            const response = await axios.get(
              "https://api.openweathermap.org/data/2.5/forecast",
              {
                params: {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                  appid: process.env.REACT_APP_WEATHER_API,
                  units: "metric",
                },
              }
            );
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowDateString = tomorrow.toISOString().split("T")[0];

            const tomorrowWeather = response.data.list.find((item) =>
              item.dt_txt.includes(tomorrowDateString)
            );
            setDate(tomorrow);
            setWeatherData(tomorrowWeather);
          } else {
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
            setDate(new Date());
            setCity(response.data.name);
            setWeatherData(response.data);
          }
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [toggle]);

  return (
    <>
      {weatherData && (
        <div
          className="h-screen w-screen md:w-full md:p-16 p-4"
          style={{
            backgroundImage: `url('${
              weatherImage[weatherData.weather[0].description]
            }')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <header
            className="bg-blue-700 text-white py-4 px-6 rounded-3xl"
            style={{ backgroundColor: "rgba(29, 78, 216, 0.4)" }}
          >
            <div className="container mx-auto">
              <h1 className="text-3xl font-bold">Weather Dashboard</h1>
              <p className="mt-5">Stay informed about the weather conditions</p>
            </div>
          </header>
          <div className="flex flex-col items-center">
            <Toggle onClick={clickHandler} value={toggle} />
            <div className="flex flex-col gap-8 justify-between lg:flex-row w-full px-6 py-1 items-center mt-12">
              <ClockWidget city={city} date={date} />
              <WeatherCard weatherData={weatherData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
