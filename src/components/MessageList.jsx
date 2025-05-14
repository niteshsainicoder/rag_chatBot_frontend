import { useEffect, useRef, useState } from 'react';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';

function MessageList({ messages, isTyping, messagesEndRef, isDarkMode }) {
  const containerRef = useRef(null);
  const [ShowMessages, setShowMessages] = useState([])
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    setShowMessages(messages)
    console.log(messages);
    
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="space-y-4">
        {ShowMessages.map((message, id) => (
          <MessageItem
            key={`${message.role}-${id}`}
            messages={message}
            isDarkMode={isDarkMode}
          />
        ))}

        {isTyping && <TypingIndicator isDarkMode={isDarkMode} />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default MessageList;