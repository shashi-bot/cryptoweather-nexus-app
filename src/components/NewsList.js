import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../redux/slices/newsSlice';

const NewsList = () => {
  const dispatch = useDispatch();
  const { articles, status } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
    const interval = setInterval(() => {
      dispatch(fetchNews());
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval); // Cleanup
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load news</p>;
  if (!articles || !Array.isArray(articles)) {
    console.error("Error: Data is not an array", data);
    return <p>Loading or No Data Available...</p>;
  }
  return (
    <div>
       <h2 className="text-xl font-semibold mb-4">📰 Crypto News</h2>
      {articles.map((news, index) => (
        <a key={index} href={news.url} target="_blank" rel="noopener noreferrer" className="block mb-2">
          {news.title}
        </a>
      ))}
    </div>
  );
};

export default NewsList;
