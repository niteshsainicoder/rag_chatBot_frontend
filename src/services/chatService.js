/**
 * Simulates generating a response from a chatbot
 * In a real application, this would be replaced with an actual API call
 */
export async function generateBotResponse(userMessage) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Simple response logic based on user input
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello there! How can I assist you today?";
  } else if (lowerMessage.includes('help')) {
    return "I'm here to help! You can ask me questions, and I'll do my best to assist you.";
  } else if (lowerMessage.includes('thank')) {
    return "You're welcome! Is there anything else you'd like to know?";
  } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return "Goodbye! Feel free to come back if you have more questions.";
  } else if (lowerMessage.includes('name')) {
    return "I'm your friendly AI assistant. What can I do for you today?";
  } else if (lowerMessage.includes('weather')) {
    return "I'm sorry, I don't have access to real-time weather data in this demo. In a real application, I could connect to a weather API to provide current conditions.";
  } else if (lowerMessage.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}. Is there anything specific you'd like to know about time management?`;
  } else if (lowerMessage.includes('feature') || lowerMessage.includes('do')) {
    return "In this demo, I can have a simple conversation with you. In a fully implemented version, I could answer questions, provide information, help with tasks, and much more!";
  } else if (lowerMessage.length < 5) {
    return "Could you please provide more details? I'd like to help you better.";
  } else {
    // Default responses for other inputs
    const responses = [
      "That's an interesting point. Could you tell me more?",
      "I understand. How can I help you with that?",
      "Thanks for sharing. Is there anything specific you'd like to know about this topic?",
      "I see what you mean. Would you like more information about this?",
      "That's a good question. In a full implementation, I could provide more detailed answers.",
      "I appreciate your question. In a complete version, I would have access to more information to help you.",
      "Great question! In a real application, I could connect to various services to provide accurate information."
    ];
    
    // Return a random response
    return responses[Math.floor(Math.random() * responses.length)];
  }
}