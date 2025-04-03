import CryptoList from "../components/CryptoList";
import WeatherList from "../components/WeatherList";
import NewsList from "../components/NewsList";
import WebSocketComponent from "../components/WebSocketComponent";
import ToastNotifications from "../components/ToastNotifications";
import FavoritesSection from "../components/FavoritesSection";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  const weatherStatus = useSelector((state) => state.weather.status);
  const cryptoStatus = useSelector((state) => state.crypto.status);
  const newsStatus = useSelector((state) => state.news.status);

  return (
    <div className="container mx-auto p-6">
      <WebSocketComponent />
      <ToastNotifications />

       <FavoritesSection/>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weather Section */}
        <div className="card p-6">
         
        {weatherStatus !== "failed" ? <WeatherList /> : <p>⚠️ Weather data unavailable.</p>}
        </div>

        {/* Crypto Section */}
        <div className="card p-6">
         
        {cryptoStatus !== "failed" ? <CryptoList /> : <p>⚠️ Crypto data unavailable.</p>}
        </div>
      </div>

      {/* News Section */}
      <div className="card p-6 mt-6">
      
        <NewsList />
      </div>
    </div>
  );
}
