# **Next.js Dashboard – Weather, Crypto & News**
A **real-time Next.js dashboard** that provides weather forecasts, cryptocurrency prices, and news updates. It integrates **Redux**, **WebSockets**, and **Tailwind CSS** for a seamless user experience.
---
## Screenshots

### 1 Dashboard View
![Dashboard](https://github.com/user-attachments/assets/327d0841-a3f4-43bb-944f-e9fd37275044)

### 2 Crypto Prices Page
![Crypto Prices](https://github.com/user-attachments/assets/4df25028-6d8f-4846-8b00-849442676844)

### 3 Weather Details Page
![Weather Details](https://github.com/user-attachments/assets/8f5bc430-8822-4c3d-b4f0-1a1addb82ad7)


---

## **Features**
 **Weather Forecast** – Fetches real-time weather data from OpenWeatherMap API.  
 **Cryptocurrency Prices** – Displays crypto data from CoinGecko/CoinCap API with WebSocket updates.  
 **News Updates** – Fetches live news articles from NewsData.io API.  
 **Favorites System** – Save favorite cities and cryptocurrencies to local storage.  
 **Real-Time Notifications** – WebSocket-driven alerts for price spikes and weather warnings.  
 **Data Auto-Refresh** – Syncs data every **60 seconds**, handling **partial API failures gracefully**.  
 **Responsive UI** – Tailwind CSS-based layout, optimized for mobile and desktop.  
 **Error Handling** – Displays fallback UI when API calls fail.  
 **Deployed on Vercel** – Fully hosted and accessible online.  

---




## **Setup & Installation**
### **1 Clone the Repository**
```bash
git clone https://github.com/shashi-bot/cryptoweather-nexus-app
cd cryptoweather-nexus-app
```

### **2 Install Dependencies**
```bash
npm install
# OR
yarn install
```

### **3 Set Up Environment Variables**
Create a **`.env.local`** file in the project root and add:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_coingecko_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```

### **4 Run the Development Server**
```bash
npm run dev
# OR
yarn dev
```
Open **`http://localhost:3000`** in your browser.

---

## **API Usage**
| Feature | API Used | Endpoint |
|---------|---------|----------|
| **Weather** | OpenWeatherMap | `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}` |
| **Crypto Prices** | CoinGecko/CoinCap | `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd` |
| **Live Crypto Updates** | CoinCap WebSocket | `wss://ws.coincap.io/prices?assets=bitcoin,ethereum` |
| **News** | NewsData.io | `https://newsdata.io/api/1/news?apikey={API_KEY}` |

---
## **UI/UX Design Decisions**
1. **Tailwind CSS** – Used for a clean, responsive layout.  
2. **Card-Based UI** – Separate WeatherCard & CryptoCard components for modularity.  
3. **WebSocket Notifications** – Provides instant price/weather alerts.  
4. **State Persistence** – Redux state saved in `localStorage` for favorites.  
5. **Partial Failure Handling** – If one API fails, the rest of the data still loads.  

---

## **Tech Stack**
**Next.js 13+** – React framework for SSR & SSG  
**Redux Toolkit** – State management  
**Tailwind CSS** – Styling  
**WebSockets** – Real-time crypto price updates  
**API Integration** – OpenWeatherMap, CoinGecko, NewsData.io  
**Vercel** – Deployment  

---
## Live Demo  
The project is deployed and accessible at: [https://cryptoweather-nexus-app-zg67-9ao70rkjd.vercel.app]

---
## **Author & Contact**
GitHub: [https://github.com/shashi-bot]  
Email: shashiranjankumar494@gmail.com  

If you found this project useful, **star  the repository** on GitHub!
