import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCrypto, removeFavoriteCrypto } from "../redux/slices/favoriteSlice";

const CryptoCard = ({ name, price, marketCap, change }) => {
  const dispatch = useDispatch();
  const favoriteCryptos = useSelector((state) => state.favorites.cryptos);
  const isFavorite = favoriteCryptos.includes(name);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavoriteCrypto(name));
    } else {
      dispatch(addFavoriteCrypto(name));
    }
  };

  return (
    <div className="card p-6 text-center flex flex-col items-center">
     <Link href={`/crypto/${name}`} className="block">
      <h3 className="text-xl font-semibold text-green-400">{name}</h3>
      <p className="text-lg text-gray-300 mt-2">💲 <span className="font-medium">${price.toFixed(2)}</span></p>
      <p className="text-gray-400">🏦 Market Cap: ${marketCap.toLocaleString()}</p>
      <p className={`text-lg font-medium ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
        {change >= 0 ? "📈 +" : "📉"} {change.toFixed(2)}%
      </p>
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

export default CryptoCard;
