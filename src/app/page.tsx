'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Name {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface APODData {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export default function Home() {
  const [names, setNames] = useState<Name[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [apodLoading, setApodLoading] = useState(true);
  const [apodError, setApodError] = useState('');

  // Fetch APOD data on component mount
  useEffect(() => {
    fetchAPOD();
  }, []);

  // Fetch names on component mount
  useEffect(() => {
    fetchNames();
  }, []);

  const fetchAPOD = async () => {
    try {
      setApodLoading(true);
      setApodError('');
      
      // Using NASA's APOD API (demo key for development)
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
      const data = await response.json();
      
      if (response.ok) {
        setApodData(data);
      } else {
        setApodError('Failed to fetch APOD data');
      }
    } catch {
      setApodError('Error fetching APOD data');
    } finally {
      setApodLoading(false);
    }
  };

  const fetchNames = async () => {
    try {
      const response = await fetch('/api/names');
      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/names', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Name added successfully!');
        setFirstName('');
        setLastName('');
        fetchNames(); // Refresh the list
      } else {
        setMessage(data.error || 'Error adding name');
      }
    } catch {
      setMessage('Error adding name');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🌌 NASA APOD Explorer
          </h1>
          <p className="text-xl text-gray-300">
            Discover the wonders of space with NASA&apos;s Astronomy Picture of the Day
          </p>
        </div>

        {/* APOD Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Astronomy Picture of the Day
          </h2>
          
          {apodLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                              <p className="text-gray-300">Loading today&apos;s cosmic wonder...</p>
            </div>
          ) : apodError ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-6xl mb-4">🚀</div>
              <p className="text-red-300 text-lg">{apodError}</p>
              <button 
                onClick={fetchAPOD}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : apodData ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {apodData.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {new Date(apodData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              
              {apodData.media_type === 'image' ? (
                <div className="flex justify-center">
                  <Image
                    src={apodData.hdurl || apodData.url}
                    alt={apodData.title}
                    width={800}
                    height={600}
                    className="max-w-full h-auto rounded-lg shadow-2xl border-4 border-white/20"
                    style={{ maxHeight: '70vh' }}
                    priority
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-300">Today&apos;s APOD is a video or other media type</p>
                  <a 
                    href={apodData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Media
                  </a>
                </div>
              )}
              
              <div className="bg-black/30 rounded-lg p-6">
                <p className="text-gray-200 leading-relaxed text-lg">
                  {apodData.explanation}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Name Management Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">
            👥 Space Explorer Registry
          </h2>
          
          {/* Add Name Form */}
          <div className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">
              Register as a Space Explorer
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Registering...' : 'Register Explorer'}
              </button>
            </form>
            {message && (
              <div className={`mt-4 p-3 rounded-md ${
                message.includes('successfully') 
                  ? 'bg-green-900/50 text-green-300 border border-green-500/50' 
                  : 'bg-red-900/50 text-red-300 border border-red-500/50'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Names List */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Registered Explorers ({names.length})
            </h3>
            {names.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">👨‍🚀</div>
                <p className="text-gray-300">No explorers registered yet</p>
                <p className="text-gray-400 text-sm">Be the first to join the space exploration registry!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-lg p-4 hover:shadow-lg transition-all hover:scale-105"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {name.firstName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {name.firstName} {name.lastName}
                        </p>
                        <p className="text-sm text-gray-300">
                          Explorer #{name.id} • {new Date(name.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
