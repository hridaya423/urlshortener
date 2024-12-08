/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Copy, Link2, Trash2 } from 'lucide-react';

type ShortenedUrl = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsClient(true);
    
    const savedUrls = localStorage.getItem('shortenedUrls');
    if (savedUrls) {
      setShortenedUrls(JSON.parse(savedUrls));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls));
    }
  }, [shortenedUrls, isClient]);

  const isValidUrl = (urlString: string) => {
    try {
      return Boolean(new URL(urlString));
    } catch {
      return false;
    }
  };

  const shortenUrl = async () => {
    setError('');

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.shortUrl) {
        const newUrl: ShortenedUrl = {
          id: nanoid(),
          shortUrl: data.shortUrl,
          originalUrl: url,
          createdAt: new Date().toISOString(),
        };

        setShortenedUrls(prev => [newUrl, ...prev]);
        setUrl('');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeUrl = (id: string) => {
    setShortenedUrls(prev => prev.filter(url => url.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform transition-all hover:scale-[1.01]">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
            URL Shortener
          </h1>
          <p className="text-gray-500">Simplify your links in seconds</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Paste your long URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}
          <button
            onClick={shortenUrl}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
      </div>

      {shortenedUrls.length > 0 && (
        <div className="w-full max-w-md mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 text-center">
            Your Shortened URLs
          </h2>
          {shortenedUrls.map((item) => (
            <div 
              key={item.id}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-all"
            >
              <div className="flex-grow min-w-0 mr-2">
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline truncate block max-w-full flex items-center"
                >
                  <Link2 className="w-4 h-4 mr-2 inline-block" />
                  {item.shortUrl}
                </a>
                <p className="text-xs text-gray-500 truncate">
                  Original: {item.originalUrl}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(item.shortUrl)}
                  className="text-gray-500 hover:text-purple-600 transition-colors"
                  title="Copy"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeUrl(item.id)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}