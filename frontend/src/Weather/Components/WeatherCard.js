import { weatherDescription } from "../../Utils/constants";
import { HumidityIcon } from "../Icons/HumidityIcon";
import { PressureIcon } from "../Icons/PressureIcon";
import { SunriseIcon } from "../Icons/SunriseIcon";
import { SunsetIcon } from "../Icons/SunsetIcon";
import { WindAngleIcon } from "../Icons/WindAngleIcon";
import { WindIcon } from "../Icons/WindIcon";

const WeatherCard = (props) => {
  console.log(props);
  return (
    <>
      {props.weatherData && (
        <section
          className="flex md:w-3/4 w-full  gap-4 justify-between items-end pb-5 pr-5 rounded-[30px]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <article className="flex flex-col flex-1">
            <div className="flex justify-between mt-3 font-semibold text-white text-opacity-80">
              <p className="grow my-auto text-lg">Feels like:</p>
              <p className="grow text-lg">
                <span>{props.weatherData.main.feels_like}</span>
                <span className="font-bold text-white">°C</span>
              </p>
            </div>
            <div className="flex gap-3 self-center p-4">
              <div className="flex flex-col gap-4 items-center text-white">
                <div className="flex flex-row items-center gap-4">
                  <SunriseIcon />
                  <p className="text-md font-medium">
                    {new Date(
                      props.weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-4 text-white">
                  <SunsetIcon />
                  <p className="text-md font-medium">
                    {new Date(
                      props.weatherData.sys.sunset * 1000
                    ).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <figure className="flex flex-col flex-1 self-end text-lg font-semibold text-center text-white">
            <h1 className="text-5xl text-white font-bold bg-clip-text">
              {props.weatherData.main.temp} °C
            </h1>
            <img
              loading="lazy"
              srcSet={
                weatherDescription[props.weatherData.weather[0].description]
              }
              alt=""
              className="w-fit self-center"
            />
            <figcaption className="self-center">
              {props.weatherData.weather[0].main}
            </figcaption>
          </figure>

          <div className="flex flex-col text-lg font-semibold text-center text-white mr-12">
            <HumidityIcon />
            <p>{props.weatherData.main.humidity} %</p>
            <p className="text-base mt-2 font-medium">Humidity</p>
            <PressureIcon />
            <p>{props.weatherData.main.pressure} hPa</p>
            <p className="mt-2 text-base font-medium">Pressure</p>
          </div>
          <div className="flex flex-col text-lg font-semibold text-center text-white">
            <WindIcon />
            <p>{props.weatherData.wind.speed}</p>
            <p className="mt-2 text-base font-medium">Wind Speed</p>
            <WindAngleIcon />
            <p>{props.weatherData.wind.deg} °</p>
            <p className="mt-2 text-base font-medium">Wind Degree</p>
          </div>
        </section>
      )}
    </>
  );
};

export default WeatherCard;
