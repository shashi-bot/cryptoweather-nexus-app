import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addNotification, removeNotification } from "../redux/slices/notificationSlice";
import axios from "axios";

const WebSocketComponent = () => {
  const dispatch = useDispatch();
  
  // Use refs to store last known values (prevents unnecessary re-renders)
  const lastPrices = useRef({ bitcoin: null, ethereum: null });
  const lastWeatherAlerts = useRef({});

  // Helper function to dispatch notifications with auto-remove
  const showNotification = (message, type = "info", duration = 7000) => {
    const id = Date.now(); // Unique ID for each notification
    dispatch(addNotification({ id, message, type }));

    // Remove notification after `duration`
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);
  };

  useEffect(() => {
    // 1️⃣ Establish WebSocket for Crypto Prices
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

    ws.onopen = () => console.log("✅ WebSocket Connected");
    ws.onerror = (error) => console.error("❌ WebSocket Error:", error);
    ws.onclose = () => console.log("🔴 WebSocket Disconnected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔹 Crypto WebSocket Data:", data);

      const btcPrice = data.bitcoin ? parseFloat(data.bitcoin) : lastPrices.current.bitcoin;
      const ethPrice = data.ethereum ? parseFloat(data.ethereum) : lastPrices.current.ethereum;

      if (lastPrices.current.bitcoin && btcPrice) {
        const btcChange = ((btcPrice - lastPrices.current.bitcoin) / lastPrices.current.bitcoin) * 100;
        console.log(`BTC Change: ${btcChange.toFixed(2)}%`);
        if (Math.abs(btcChange) >= 0.005) {
          showNotification(`📈 BTC: $${btcPrice.toFixed(2)} (${btcChange.toFixed(2)}%)`, "price_alert");
        }
      }

      if (lastPrices.current.ethereum && ethPrice) {
        const ethChange = ((ethPrice - lastPrices.current.ethereum) / lastPrices.current.ethereum) * 100;
        console.log(`ETH Change: ${ethChange.toFixed(2)}%`);
        if (Math.abs(ethChange) >= 0.005) {
          showNotification(`📉 ETH: $${ethPrice.toFixed(2)} (${ethChange.toFixed(2)}%)`, "price_alert");
        }
      }

      lastPrices.current = { bitcoin: btcPrice, ethereum: ethPrice };
    };

    // 2️⃣ Fetch Weather Updates for Multiple Cities
    const fetchWeatherUpdates = async () => {
      try {
        const { data } = await axios.get("/api/weather");

        data.forEach(({ city, data }) => {
          const { temp, humidity } = data.main;
          const conditions = data.weather[0].description;

          let alertMessage = null;

          if (temp > 35) {
            alertMessage = `🔥 Heat Alert! ${temp}°C in ${city}`;
          } else if (temp < 0) {
            alertMessage = `❄️ Cold Alert! ${temp}°C in ${city}`;
          } else if (humidity > 90) {
            alertMessage = `💧 High Humidity Alert in ${city}: ${humidity}%`;
          } else if (conditions.includes("storm") || conditions.includes("rain")) {
            alertMessage = `🌩️ Storm/Rain Alert in ${city}: ${conditions}`;
          }

          // Prevent duplicate alerts
          if (alertMessage && lastWeatherAlerts.current[city] !== alertMessage) {
            showNotification(alertMessage, "weather_alert");
            lastWeatherAlerts.current[city] = alertMessage;
          }
        });
      } catch (error) {
        console.error("Failed to fetch weather updates", error);
      }
    };

    // Initial fetch and start interval
    fetchWeatherUpdates();
    const weatherInterval = setInterval(fetchWeatherUpdates, 600000);

    // Cleanup function
    return () => {
      ws.close();
      clearInterval(weatherInterval);
    };
  }, [dispatch]); // ✅ Dependencies fixed

  return null;
};

export default WebSocketComponent;
