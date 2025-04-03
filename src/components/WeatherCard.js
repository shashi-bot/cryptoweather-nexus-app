import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCity, removeFavoriteCity } from "../redux/slices/favoriteSlice";

const WeatherCard = ({ city, temperature, humidity, conditions }) => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector((state) => state.favorites.cities);
  const isFavorite = favoriteCities.includes(city);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavoriteCity(city));
    } else {
      dispatch(addFavoriteCity(city));
    }
  };

  return (
    <div className="card p-6 text-center flex flex-col items-center">
    <Link href={`/weather/${city}`} className="block">
      <h3 className="text-xl font-semibold text-blue-400">{city}</h3>
      <p className="text-lg text-gray-300 mt-2">🌡️ <span className="font-medium">{temperature}°C</span></p>
      <p className="text-gray-400">💧 Humidity: {humidity}%</p>
      <p className="text-gray-400">🌤 {conditions}</p>
</Link>
      <button 
        onClick={handleFavoriteToggle} 
        className={`mt-2 px-3 py-1 text-sm rounded text-white ${isFavorite ? "bg-red-500" : "bg-blue-500"}`}
      >
    {isFavorite ? "❌ Remove from Favorite" : "⭐ Add to Favorite"}
      </button>
    </div>
  );
};

export default WeatherCard;

