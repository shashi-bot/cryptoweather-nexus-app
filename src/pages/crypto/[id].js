import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Required for Chart.js

const CryptoDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [history, setHistory] = useState([]);
  const [info, setInfo] = useState(null);
  const formattedId = id?.toLowerCase();

  useEffect(() => {
    if (!id) return;



    const fetchCryptoDetails = async () => {
      try {
        const historyRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${formattedId}/market_chart?vs_currency=usd&days=7`
        );
        const detailsRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${formattedId}`
        );

        setHistory(historyRes.data.prices);
        setInfo(detailsRes.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoDetails();
  }, [id]);

  if (!info) return <p>Loading...</p>;

  // Chart Data
  const chartData = {
    labels: history.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: `${info.name} Price (Last 7 Days)`,
        data: history.map(([, price]) => price),
        borderColor: "#00FFFF", // Vibrant Cyan
        backgroundColor: "rgba(0, 255, 255, 0.2)", // Light Cyan Glow
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: "#00FFFF",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{info.name} Details</h1>
      <p>Symbol: {info.symbol.toUpperCase()}</p>
      <p>Current Price: ${info.market_data.current_price.usd.toFixed(2)}</p>
      <p>Market Cap: ${info.market_data.market_cap.usd.toLocaleString()}</p>
      <p>24h Volume: ${info.market_data.total_volume.usd.toLocaleString()}</p>
      <p>
        24h Change:{" "}
        <span className={info.market_data.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}>
          {info.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>

      <div className="mt-6">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CryptoDetails;
