import React, { useState, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = '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';

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a knowledgeable and compassionate medical AI assistant. While you can provide general health information and guidance, always remind users that they should consult with a qualified healthcare professional for specific medical advice, diagnosis, or treatment."
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      
      if (!data?.choices?.[0]?.message?.content) {
        console.error('Invalid API response:', data);
        throw new Error('Invalid response format');
      }

      setMessages(prev => [...prev, { text: data.choices[0].message.content, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again later. " + 
             (error instanceof Error ? error.message : ''),
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const welcomeMessage = "Hello! I'm your MediSync AI assistant, here to help you with health-related questions and concerns. While I can provide general medical information and guidance, please remember that I'm not a substitute for professional medical advice. How can I assist you today?";
    setMessages([{ text: welcomeMessage, isBot: true }]);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-xl ${
              msg.isBot ? 'bg-violet-50 text-violet-900' : 'bg-violet-600 text-white'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-violet-50 p-3 rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            className="p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
