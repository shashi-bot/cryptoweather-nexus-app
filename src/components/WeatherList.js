import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../redux/slices/weatherSlice";
import WeatherCard from "./WeatherCard";

const WeatherList = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather());
    const interval = setInterval(() => {
      dispatch(fetchWeather());
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  if (status === "loading") return <p className="text-gray-400">Loading weather data...</p>;
  if (status === "failed") return <p className="text-red-400">Failed to load weather data.</p>;
  if (!data || !Array.isArray(data)) {
    console.error("Error: Data is not an array", data);
    return <p className="text-gray-400">No Data Available...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-blue-400 mb-4">🌦️ Weather Forecast</h2>
      
      {/* Grid Layout for Responsive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((city) => (
          <WeatherCard
            key={city.id}
            city={city.city}
            temperature={city.data?.main?.temp}
            humidity={city.data?.main?.humidity}
            conditions={city.data?.weather?.[0]?.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherList;
