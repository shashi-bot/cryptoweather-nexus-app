import axios from "axios";

export default async function handler(req, res) {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  // Predefined cities with latitude & longitude
  const cities = [
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  ];

  try {
    // Fetch weather data for all cities in parallel
    const weatherData = await Promise.all(
      cities.map(async ({ name, lat, lon }) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        return { city: name, data: response.data };
      })
    );

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Weather API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
