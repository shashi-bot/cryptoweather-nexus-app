import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog } from "react-icons/wi";

const WeatherDetails = () => {
  const router = useRouter();
  const { city } = router.query;
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [error, setError] = useState("");
  const formattedCity = city?.toLowerCase();

  // Function to get weather icon
  const getWeatherIcon = (condition) => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes("sun")) return <WiDaySunny className="text-yellow-500 text-3xl" />;
    if (lowerCaseCondition.includes("cloud")) return <WiCloud className="text-gray-500 text-3xl" />;
    if (lowerCaseCondition.includes("rain")) return <WiRain className="text-blue-500 text-3xl" />;
    if (lowerCaseCondition.includes("snow")) return <WiSnow className="text-white text-3xl" />;
    if (lowerCaseCondition.includes("fog")) return <WiFog className="text-gray-400 text-3xl" />;
    return <WiDaySunny className="text-yellow-500 text-3xl" />;
  };

  useEffect(() => {
    if (!router.isReady || !city) return;

    const fetchWeatherHistory = async () => {
      try {
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        });

        const historyPromises = last7Days.map((date) =>
          axios.get(
            `https://api.weatherapi.com/v1/history.json?key=${process.env.NEXT_PUBLIC_WEATHERAPI_KEY}&q=${formattedCity}&dt=${date}`
          )
        );

        const responses = await Promise.all(historyPromises);
        const historicalData = responses.map((res) => ({
          date: res.data.forecast.forecastday[0].date,
          temp: res.data.forecast.forecastday[0].day.avgtemp_c,
          weather: res.data.forecast.forecastday[0].day.condition.text,
        }));

        setWeatherHistory(historicalData.reverse());
      } catch (err) {
        console.error("❌ Error fetching weather data:", err);
        setError("⚠ Unable to fetch weather data.");
      }
    };

    fetchWeatherHistory();
  }, [city]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">
      {city}
      </h1>

      {error ? (
        <p className="text-red-500 text-center font-medium">{error}</p>
      ) : !weatherHistory.length ? (
        <p className="text-center text-gray-600">Loading weather history...</p>
      ) : (
        <>
          {/* 🔹 Weather List */}
          <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              Daily Weather Summary
            </h2>
            <ul>
              {weatherHistory.map((data, index) => (
                <li
                  key={index}
                  className="grid grid-cols-3 items-center border-b p-4 last:border-none bg-white shadow-sm rounded-lg mb-2 text-center"
                >
                  <span className="font-medium text-gray-800">{data.date}</span>
                  <span className="flex items-center justify-center gap-2 text-lg font-bold text-blue-600">
                    {getWeatherIcon(data.weather)}
                    {data.temp}°C
                  </span>
                  <span className="capitalize text-gray-700">{data.weather}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDetails;


