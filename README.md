# **Next.js Dashboard – Weather, Crypto & News**
A **real-time Next.js dashboard** that provides weather forecasts, cryptocurrency prices, and news updates. It integrates **Redux**, **WebSockets**, and **Tailwind CSS** for a seamless user experience.


---

## **🚀 Features**
✅ **Weather Forecast** – Fetches real-time weather data from OpenWeatherMap API.  
✅ **Cryptocurrency Prices** – Displays crypto data from CoinGecko/CoinCap API with WebSocket updates.  
✅ **News Updates** – Fetches live news articles from NewsData.io API.  
✅ **Favorites System** – Save favorite cities and cryptocurrencies to local storage.  
✅ **Real-Time Notifications** – WebSocket-driven alerts for price spikes and weather warnings.  
✅ **Data Auto-Refresh** – Syncs data every **60 seconds**, handling **partial API failures gracefully**.  
✅ **Responsive UI** – Tailwind CSS-based layout, optimized for mobile and desktop.  
✅ **Error Handling** – Displays fallback UI when API calls fail.  
✅ **Deployed on Vercel** – Fully hosted and accessible online.  

---




## **🛠️ Setup & Installation**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/shashi-bot/cryptoweather-nexus-app
cd cryptoweather-nexus-app
```

### **2️⃣ Install Dependencies**
```bash
npm install
# OR
yarn install
```

### **3️⃣ Set Up Environment Variables**
Create a **`.env.local`** file in the project root and add:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_coingecko_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```

### **4️⃣ Run the Development Server**
```bash
npm run dev
# OR
yarn dev
```
Open **`http://localhost:3000`** in your browser.

---

## **📜 API Usage**
| Feature | API Used | Endpoint |
|---------|---------|----------|
| **Weather** | OpenWeatherMap | `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}` |
| **Crypto Prices** | CoinGecko/CoinCap | `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd` |
| **Live Crypto Updates** | CoinCap WebSocket | `wss://ws.coincap.io/prices?assets=bitcoin,ethereum` |
| **News** | NewsData.io | `https://newsdata.io/api/1/news?apikey={API_KEY}` |

---

## **🛠️ Build & Deploy**
### **1️⃣ Build for Production**
```bash
npm run build
# OR
yarn build
```

### **2️⃣ Start the Production Server**
```bash
npm run start
# OR
yarn start
```

### **3️⃣ Deploy to Vercel**
```bash
vercel deploy
```
*(Ensure you have the Vercel CLI installed.)*

---

## **🖌️ UI/UX Design Decisions**
1. **Tailwind CSS** – Used for a clean, responsive layout.  
2. **Card-Based UI** – Separate WeatherCard & CryptoCard components for modularity.  
3. **WebSocket Notifications** – Provides instant price/weather alerts.  
4. **State Persistence** – Redux state saved in `localStorage` for favorites.  
5. **Partial Failure Handling** – If one API fails, the rest of the data still loads.  

---



## **🛠️ Tech Stack**
✅ **Next.js 13+** – React framework for SSR & SSG  
✅ **Redux Toolkit** – State management  
✅ **Tailwind CSS** – Styling  
✅ **WebSockets** – Real-time crypto price updates  
✅ **API Integration** – OpenWeatherMap, CoinGecko, NewsData.io  
✅ **Vercel** – Deployment  

---

## **👨‍💻 Author & Contact**
🔗 GitHub: [your-github-username](https://github.com/shashi-bot)  
📧 Email: shashiranjankumar494@gmail.com  

If you found this project useful, **star ⭐ the repository** on GitHub! 🚀
