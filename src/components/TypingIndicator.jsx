function TypingIndicator({ isDarkMode }) {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className={`inline-flex items-center px-3 py-2 rounded-tl-lg rounded-tr-lg rounded-br-lg ${
        isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'
      }`}>
        <div className="flex space-x-1">
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-neutral-400' : 'bg-neutral-500'} animate-bounce [animation-delay:-0.3s]`}></div>
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-neutral-400' : 'bg-neutral-500'} animate-bounce [animation-delay:-0.15s]`}></div>
          <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-neutral-400' : 'bg-neutral-500'} animate-bounce`}></div>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;