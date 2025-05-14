import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import './App.css';
import axios from 'axios';
import { ApiConstants } from './constants/ApiConstants';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getYourSessionId = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${ApiConstants.getSessionId}`)
      localStorage.setItem("sessionId", response.data.sessionId);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    const getSessionId = localStorage.getItem("sessionId");
    if (!getSessionId) {
      getYourSessionId();
    }
  }, [])

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'dark bg-neutral-900' : 'bg-neutral-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl w-full">
        <header className="mb-2">
          <h1 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
            Chat Interface
          </h1>
        </header>
        <main>
          <ChatWindow isDarkMode={isDarkMode} />
        </main>
      </div>
    </div>
  );
}

export default App;