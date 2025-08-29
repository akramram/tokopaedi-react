'use client';

import { useState } from 'react';
import axios from 'axios';

type searchResult = {
  product_id: number
  product_sku: string
  name: string
  category: string
  url: string
  sold_count: number
  original_price: string
  real_price: number
  real_price_text: string
  rating: number
  image: string
  shop: Shop
  product_detail: unknown
  product_reviews: unknown
}

type Shop = {
  shop_id: number
  name: string
  city: string
  url: string
  is_official: boolean
}

const FilterCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="bg-gray-700 border-gray-600 rounded focus:ring-green-500 w-4 h-4 text-green-600"
    />
    <span className="text-gray-300 select-none">{label}</span>
  </label>
);


export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<searchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [rating, setRating] = useState(0);
  const [condition, setCondition] = useState(2);
  const [latestProduct, setLatestProduct] = useState(0);
  const [isDiscount, setIsDiscount] = useState(false);
  const [isPlus, setIsPlus] = useState(false);
  const [cod, setCod] = useState(false);
  const [bebasOngkirExtra, setBebasOngkirExtra] = useState(false);


  const handleSearch = async () => {
    if (!keyword) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const params = {
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sortBy,
        rt: rating || undefined,
        condition: condition || undefined,
        latestProduct: latestProduct || undefined,
        isDiscount: isDiscount || undefined,
        isPlus: isPlus || undefined,
        cod: cod || undefined,
        bebasOngkirExtra: bebasOngkirExtra || undefined,
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tokopaedibe.vercel.app';
      const response = await axios.get(`${apiUrl}/search/${keyword}`, { params });

      console.log('API Response Data:', response.data);
      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        console.error("API did not return an array:", response.data);
        setResults([]);
      }
    } catch (err) {
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-900 p-4 sm:p-8 min-h-screen text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 font-bold text-green-400 text-4xl sm:text-5xl text-center">
          Tokopedia Scraper
        </h1>
        <p className="mb-8 text-gray-400 text-center">
          Powered by Next.js, Tailwind CSS, and a Python Backend
        </p>

        <div className="flex justify-center gap-2 mb-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for a product..."
            className="bg-gray-800 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full max-w-lg"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 px-6 py-2 rounded-lg font-semibold text-white transition-colors disabled:cursor-not-allowed shrink-0"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="bg-gray-800 mx-auto mb-8 p-4 rounded-lg max-w-4xl">
          <div className="gap-x-6 gap-y-4 grid grid-cols-2 sm:grid-cols-3 mb-4">
            <div>
              <label htmlFor="minPrice" className="block mb-1 font-medium text-gray-300 text-sm">Min Price</label>
              <input id="minPrice" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="e.g., 10000" className="bg-gray-700 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 w-full text-white"/>
            </div>
            <div>
              <label htmlFor="maxPrice" className="block mb-1 font-medium text-gray-300 text-sm">Max Price</label>
              <input id="maxPrice" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="e.g., 500000" className="bg-gray-700 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 w-full text-white"/>
            </div>
            <div>
              <label htmlFor="sortBy" className="block mb-1 font-medium text-gray-300 text-sm">Sort By</label>
              <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-700 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 w-full text-white">
                  <option value="relevance">Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="latest">Latest</option>
                  <option value="review">Review</option>
              </select>
            </div>
            <div>
              <label htmlFor="rating" className="block mb-1 font-medium text-gray-300 text-sm">Min Rating</label>
              <select id="rating" value={rating} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRating(Number(e.target.value))} className="bg-gray-700 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 w-full text-white">
                  <option value="0">Any</option>
                  <option value="1">1 ★ & up</option>
                  <option value="2">2 ★ & up</option>
                  <option value="3">3 ★ & up</option>
                  <option value="4">4 ★ & up</option>
                  <option value="4.5">4.5 ★ & up</option>
              </select>
            </div>
            <div>
              <label htmlFor="condition" className="block mb-1 font-medium text-gray-300 text-sm">Condition</label>
              <select
                id="condition"
                value={condition}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCondition(Number(e.target.value))}
                className="bg-gray-700 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 w-full text-white"
              >
                  <option value="0">Any</option>
                  <option value="1">New</option>
                  <option value="2">Used</option>
              </select>
            </div>
            <div>
                <label htmlFor="latestProduct" className="block mb-1 font-medium text-gray-300 text-sm">Product Recency</label>
                <select
                    id="latestProduct"
                    value={latestProduct}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLatestProduct(Number(e.target.value))}
                    className="bg-gray-700 px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 w-full text-white"
                >
                    <option value="0">Any</option>
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                </select>
            </div>
          </div>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-4 pt-4 border-gray-700 border-t">
            <FilterCheckbox label="Discount" checked={isDiscount} onChange={(e) => setIsDiscount(e.target.checked)} />
            <FilterCheckbox label="Tokopedia PLUS" checked={isPlus} onChange={(e) => setIsPlus(e.target.checked)} />
            <FilterCheckbox label="Cash on Delivery" checked={cod} onChange={(e) => setCod(e.target.checked)} />
            <FilterCheckbox label="Bebas Ongkir Extra" checked={bebasOngkirExtra} onChange={(e) => setBebasOngkirExtra(e.target.checked)} />
          </div>
        </div>

        {error && <p className="my-4 text-red-500 text-center">{error}</p>}

        {!loading && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {results.map((product) => (
              <div 
                key={product.product_id} 
                className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden group touch-manipulation active:scale-[0.98]"
              >
                {/* Product Image Section */}
                <div className="relative bg-gray-700 aspect-square p-4">
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover rounded-lg border border-gray-600 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </a>
                  {/* Discount Badge */}
                  {product.original_price && product.original_price !== product.real_price_text && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      SALE
                    </div>
                  )}
                  {/* Official Store Badge */}
                  {product.shop.is_official && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Official
                    </div>
                  )}
                </div>

                {/* Product Information Section */}
                <div className="p-4 space-y-3">
                  {/* Product Title */}
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-white hover:text-green-400 font-medium text-sm leading-tight transition-colors duration-200"
                  >
                    <h3 className="line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                  </a>

                  {/* Price Section */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-bold text-lg">{product.real_price_text}</span>
                      {product.original_price && product.original_price !== product.real_price_text && (
                        <span className="text-gray-400 line-through text-sm">{product.original_price}</span>
                      )}
                    </div>
                  </div>

                  {/* Rating and Sales */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <span className="text-gray-400">{product.sold_count.toLocaleString()} sold</span>
                  </div>

                  {/* Shop Information */}
                  <div className="pt-2 border-t border-gray-700">
                    <a 
                      href={product.shop.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block hover:text-green-400 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-300 truncate">{product.shop.name}</p>
                          <p className="text-xs text-gray-400 truncate">{product.shop.city}</p>
                        </div>
                        {product.shop.is_official && (
                          <div className="ml-2 flex-shrink-0">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 mb-4 text-gray-600">
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No results to show</p>
              <p className="text-gray-600 text-sm mt-1">Try searching for a different product</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}
