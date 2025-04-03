import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=crypto OR bitcoin OR ethereum&language=en&apiKey=${process.env.NEWS_API_KEY}`
    );

    // Return only the top 5 articles as required
    res.status(200).json(response.data.articles.slice(0, 5));
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    res.status(500).json({ error: "Failed to fetch crypto news data" });
  }
}
