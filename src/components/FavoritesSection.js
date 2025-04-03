import { useSelector } from "react-redux";
import Link from "next/link";


const FavoritesSection =() =>{
    const { cities, cryptos } = useSelector((state) => state.favorites);


return (
  
    <div className="card p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">⭐ Favorites</h2>
    <div className="flex flex-wrap gap-6 items-start">
       {cities.length > 0 && (
        <div className="w-auto">
          <h3 className="font-medium text-blue-400">🌍 Cities</h3>
          <ul className="mt-2 space-y-2">
            {cities.map((city) => (
              <li key={city}>
                <Link
                  href={`/weather/${city}`}
                  className="text-blue-300 hover:underline transition-all"
                >
                  📍 {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cryptos.length > 0 && (
        <div className="w-auto">
          <h3 className="font-medium text-green-400">💰 Cryptos</h3>
          <ul className="mt-2 space-y-2">
            {cryptos.map((crypto) => (
              <li key={crypto}>
                <Link
                  href={`/crypto/${crypto}`}
                  className="text-green-300 hover:underline transition-all"
                >
                  🚀 {crypto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cities.length === 0 && cryptos.length === 0 && (
        <p className="text-gray-400">No favorites added yet.</p>
      )}
    </div>
  </div>

);



};

export default FavoritesSection;