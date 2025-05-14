import { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ResetButton from './ResetButton';
import { ApiConstants } from '../constants/ApiConstants';
import axios from 'axios';

function ChatWindow({ isDarkMode }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [sessionId, setSessionId] = useState();

  const getHistory = async (savedSessionId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${ApiConstants.getHistory}${savedSessionId}`)
      setMessages(response?.data?.history)
    } catch (error) {
      console.log(error);

    }
  }

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('sessionId');
    if (savedSessionId) {
      getHistory(savedSessionId);
      setSessionId(savedSessionId);
    } else {
      const welcomeMessage = {
        id: Date.now(),
        message: "Hello! I'm your AI assistant. How can I help you today?",
        role: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [sessionId]);


  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      message: text,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsTyping(true);


    try {
      const botResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}${ApiConstants.askQuestion}`, {
        sessionId: sessionId,
        query: text
      });

     setTimeout(() => {
      
   

      const botMessage = {
        id: Date.now() + 1,
        message: botResponse.data.answer,
        role: 'bot',
        timestamp: new Date().toISOString(),
      };

      setIsTyping(false);
      setMessages((prevMessages) =>( [...prevMessages, botMessage]));
        }, 1000);
    } catch (error) {
      console.error('Failed to generate response:', error);
      setIsTyping(false);

      const errorMessage = {
        id: Date.now() + 1,
        message: "Sorry, I couldn't process your request. Please try again.",
        role: 'bot',
        isError: true,
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) =>( [...prevMessages, errorMessage]));
    }

  };

  const handleReset = async () => {
    const confirmReset = window.confirm('Are you sure you want to reset the chat?');
    if (confirmReset) {
      const welcomeMessage = {
        id: Date.now(),
        message: "Hello! I'm your AI assistant. How can I help you today?",
        role: 'bot',
        timestamp: new Date().toISOString(),
      };
      const resetSession = await axios.get(`${import.meta.env.VITE_BASE_URL}${ApiConstants.resetSession}${sessionId}`)
      if (resetSession?.data?.success) {
        localStorage.removeItem("sessionId")
      }

      setMessages([welcomeMessage]);
      localStorage.setItem('chatMessages', JSON.stringify([welcomeMessage]));
    }
  };

  return (
    <div className={`flex flex-col rounded-xl shadow-lg overflow-hidden h-[85vh] border ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
      }`}>
      <div className={`flex justify-between items-center px-4 py-3 border-b ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
        }`}>
        <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-800'}`}>
          Chat Assistant
        </h2>
        <ResetButton onReset={handleReset} isDarkMode={isDarkMode} />
      </div>

      <MessageList
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        isDarkMode={isDarkMode}
      />

      <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} isDarkMode={isDarkMode} />
    </div>
  );
}

export default ChatWindow;