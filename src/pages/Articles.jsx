import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import { CircleNotch, WifiSlash, Newspaper, Calendar, UserCircle, MagnifyingGlass } from "@phosphor-icons/react";

const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY;

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentQuery, setCurrentQuery] = useState("financial literacy");

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const query = encodeURIComponent(currentQuery);
        const API_URL = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&sortBy=publishedAt&apiKey=${NEWSAPI_KEY}`;
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid API Key. Please check your NewsAPI key.");
          }
          throw new Error("Failed to fetch articles from NewsAPI.");
        }
        
        const data = await response.json();
        
        if (data.status !== "ok") {
          throw new Error(data.message || "Something went wrong with the API response.");
        }
        
        const filteredArticles = data.articles.filter(article => article.title && article.description && article.urlToImage);
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setCurrentQuery(searchQuery);
    }
  };

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-8">
          <div className="flex items-center space-x-4">
            <Newspaper size={40} className="text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Articles</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Your source for smart insights on personal finance.
              </p>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              <MagnifyingGlass size={20} />
            </button>
          </form>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <CircleNotch size={48} className="animate-spin text-indigo-500" />
            <p className="mt-4 text-lg text-gray-600">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 bg-red-50 rounded-xl border border-red-200">
            <WifiSlash size={48} className="text-red-500" />
            <h2 className="mt-4 text-xl font-bold text-red-700">Failed to Load Content</h2>
            <p className="mt-2 text-gray-600">
              {error.message || "We couldn't retrieve the articles. Please check your network connection or try again later."}
            </p>
          </div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-gray-500 bg-gray-100 rounded-xl">
            No articles found for "{currentQuery}".
          </div>
        ) : (
          <>
            {/* Featured Article Card (Large Card) */}
            {featuredArticle && (
              <a href={featuredArticle.url} target="_blank" rel="noopener noreferrer">
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
                  <img
                    src={featuredArticle.urlToImage}
                    alt={featuredArticle.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredArticle.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <UserCircle className="w-4 h-4 mr-1" />
                        {featuredArticle.source.name}
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
                      {featuredArticle.description}
                    </p>
                    <div className="mt-6 text-indigo-600 dark:text-indigo-400 font-semibold flex items-center transition-transform duration-300 group-hover:translate-x-1">
                      Read More →
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Other Articles Grid (Smaller Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((article) => (
                <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer">
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center space-x-2">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <UserCircle className="w-3 h-3 mr-1" />
                          {article.source.name}
                        </span>
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 line-clamp-3">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}