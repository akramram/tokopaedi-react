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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tokopaedibe-550ipor0q-akramrams-projects.vercel.app';
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
          <div className="overflow-x-auto">
            <table className="bg-gray-800 shadow-md rounded-lg min-w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4 font-semibold text-gray-300 text-left">Image</th>
                  <th className="p-4 font-semibold text-gray-300 text-left">Product Name</th>
                  <th className="p-4 font-semibold text-gray-300 text-left">Price</th>
                  <th className="p-4 font-semibold text-gray-300 text-left">Original Price</th>
                  <th className="p-4 font-semibold text-gray-300 text-left">Rating</th>
                  <th className="p-4 font-semibold text-gray-300 text-left">Shop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {results.map((product) => (
                  <tr key={product.product_id} className="hover:bg-gray-700 transition-colors">
                    <td className="p-4"><img src={product.image} alt={product.name} className="rounded-md w-16 h-16 object-cover"/></td>
                    <td className="p-4 font-medium"><a 
                        href={product.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-green-400 hover:underline"
                      >
                        {product.name}
                      </a></td>
                    <td className="p-4 text-green-400">{product.real_price_text}</td>
                    <td className="p-4 text-green-400">{product.original_price}</td>
                    <td className="p-4">{product.rating} ★</td>
                    <td className="p-4">
                      
                      <a 
                        href={product.shop.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-green-400 hover:underline"
                      >
                        {product.shop.name}
                      </a>
                      <span className="block text-gray-400 text-sm">{product.shop.city}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && !error && <p className="text-gray-500 text-center">No results to show. Try a new search!</p>
        )}
      </div>
    </main>
  );
}
