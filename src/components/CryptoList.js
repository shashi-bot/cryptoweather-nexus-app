import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCrypto } from "../redux/slices/cryptoSlice";
import CryptoCard from "./CryptoCard";

const CryptoList = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchCrypto());
    const interval = setInterval(() => {
      dispatch(fetchCrypto());
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval); // Cleanup
  }, [dispatch]);

  

  if (status === "loading") return <p className="text-center text-gray-400">Loading crypto data...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Failed to load crypto data.</p>;
  if (!data || !Array.isArray(data)) {
    console.error("Error: Data is not an array", data);
    return <p className="text-center text-gray-400">No Data Available...</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2 text-green-400 text-center">💹 Cryptocurrency Prices</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            name={crypto.name}
            price={crypto.current_price}
            marketCap={crypto.market_cap}
            change={crypto.price_change_percentage_24h}
          />
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
