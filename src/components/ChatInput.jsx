import { useState, useRef, useEffect } from 'react';

function ChatInput({ onSendMessage, isTyping, isDarkMode }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  // Auto focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`border-t p-3 ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}
    >
      <div className="flex items-center space-x-2">
        <textarea
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className={`flex-1 min-h-[44px] max-h-[120px] resize-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
            isDarkMode 
              ? 'bg-neutral-700 text-white border-neutral-600 focus:ring-primary-500' 
              : 'bg-neutral-100 text-neutral-800 border-neutral-300 focus:ring-primary-400'
          } border transition duration-200`}
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!message.trim() || isTyping}
          className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
            !message.trim() || isTyping
              ? isDarkMode ? 'bg-neutral-700 text-neutral-500' : 'bg-neutral-200 text-neutral-400'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
      {isTyping && (
        <p className={`text-xs mt-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Assistant is typing...
        </p>
      )}
    </form>
  );
}

export default ChatInput;