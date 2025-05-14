import { useState, useEffect, useRef } from 'react';

function MessageItem({ messages, isDarkMode }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageRef = useRef(null);
  const { message, role, isError } = messages;
  
  // Animate bot messages with typing effect
  useEffect(() => {
    if (role === 'bot' && message) {
      let currentIndex = 0;
      setIsTyping(true);
      
      const interval = setInterval(() => {
        if (currentIndex <= message.length) {
          setDisplayText(message.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20); // Adjust speed of typing
      
      return () => clearInterval(interval);
    } else {
      setDisplayText(message);
    }
  }, [message, role]);

  // Add message-appear animation class when the element is mounted
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.classList.add('message-appear');
    }
    console.log(messages);
    
  }, [messages]);

  const userMessageClasses = `ml-auto bg-primary-600 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg`;
  const botMessageClasses = `mr-auto ${isDarkMode ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-800'} rounded-tl-lg rounded-tr-lg rounded-br-lg`;
  const errorMessageClasses = `mr-auto bg-red-500 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg`;

  return (
    <div 
      ref={messageRef}
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] px-4 py-2 shadow-sm ${
          isError ? errorMessageClasses : role === 'user' ? userMessageClasses : botMessageClasses
        }`}
      >
        <p className="whitespace-pre-wrap break-words">
          {displayText}
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  );
}

export default MessageItem;