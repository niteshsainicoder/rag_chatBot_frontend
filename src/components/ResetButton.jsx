import { useState } from 'react';

function ResetButton({ onReset, isDarkMode }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      onClick={onReset}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`flex items-center rounded-md px-2 py-1 transition-colors duration-200 ${
        isDarkMode 
          ? isHovering ? 'bg-red-500 text-white' : 'bg-neutral-700 text-neutral-300' 
          : isHovering ? 'bg-red-500 text-white' : 'bg-neutral-200 text-neutral-700'
      }`}
      aria-label="Reset chat"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
      <span className="text-sm font-medium">Reset</span>
    </button>
  );
}

export default ResetButton;